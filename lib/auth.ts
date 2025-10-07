import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  console.error('Missing DATABASE_URL environment variable')
}

if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === 'production') {
  console.error('Missing NEXTAUTH_SECRET environment variable in production')
}

const sql = neon(process.env.DATABASE_URL!)

declare module "next-auth" {
  interface User {
    role?: string
  }
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log('NextAuth authorize called')
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials in NextAuth')
            return null
          }

          const email = credentials.email as string
          const password = credentials.password as string

          console.log('NextAuth: Attempting login for:', email)
          
          // Query the database for the user
          const users = await sql`
            SELECT id, email, password_hash, name, role
            FROM admin_users 
            WHERE email = ${email.toLowerCase()}
            LIMIT 1
          `

          console.log('NextAuth: Database query result:', users.length > 0 ? 'User found' : 'No user found')

          if (users.length === 0) {
            console.log('NextAuth: No user found with email:', email)
            return null
          }

          const user = users[0]
          console.log('NextAuth: Found user:', user.email, 'with role:', user.role)

          // Verify the password
          const isPasswordValid = await bcrypt.compare(password, user.password_hash)
          console.log('NextAuth: Password validation result:', isPasswordValid)

          if (!isPasswordValid) {
            console.log('NextAuth: Invalid password for user:', email)
            return null
          }

          console.log('NextAuth: Login successful for:', email)
          
          // Return user object (will be stored in JWT)
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('NextAuth authorize error:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
          })
          throw error // Re-throw to see the actual error
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        console.log('NextAuth JWT callback called')
        if (user) {
          token.role = user.role
          token.id = user.id
          console.log('NextAuth: JWT token updated with user data')
        }
        return token
      } catch (error) {
        console.error('NextAuth JWT callback error:', error)
        throw error
      }
    },
    async session({ session, token }) {
      try {
        console.log('NextAuth session callback called')
        if (token && session.user) {
          session.user.id = token.id as string
          session.user.role = token.role as string
          console.log('NextAuth: Session updated with token data')
        }
        return session
      } catch (error) {
        console.error('NextAuth session callback error:', error)
        throw error
      }
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  debug: true, // Enable debug mode in production
})