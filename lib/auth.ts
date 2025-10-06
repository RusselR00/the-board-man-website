import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

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
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        try {
          console.log('Attempting login for:', email)
          
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
          console.error('Auth error:', error)
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