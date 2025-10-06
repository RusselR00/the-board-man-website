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
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials')
            return null
          }

          const email = credentials.email as string
          const password = credentials.password as string

          console.log('Attempting login for:', email)
          
          // Check if DATABASE_URL is available
          if (!process.env.DATABASE_URL) {
            console.error('DATABASE_URL environment variable is not set')
            throw new Error('Database configuration missing')
          }

          console.log('Database URL configured, proceeding with query')
          
          // Query the database for the user
          const users = await sql`
            SELECT id, email, password_hash, name, role
            FROM admin_users 
            WHERE email = ${email.toLowerCase()}
            LIMIT 1
          `

          console.log('Database query result:', users.length > 0 ? 'User found' : 'No user found')

          if (users.length === 0) {
            console.log('No user found with email:', email)
            return null
          }

          const user = users[0]
          console.log('Found user:', user.email, 'with role:', user.role)

          // Verify the password
          const isPasswordValid = await bcrypt.compare(password, user.password_hash)
          console.log('Password validation result:', isPasswordValid)

          if (!isPasswordValid) {
            console.log('Invalid password for user:', email)
            return null
          }

          console.log('Login successful for:', email)
          
          // Return user object (will be stored in JWT)
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('Auth error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            name: error instanceof Error ? error.name : undefined,
            email: credentials?.email,
            timestamp: new Date().toISOString()
          })
          return null
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
      // Add user info to JWT token
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  debug: process.env.NODE_ENV === 'development',
})