import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { getAdminByUsername } from "../../../components/component-server-functions"
import createRateLimit from "../../../lib/rate-limit"
import { headers } from 'next/headers'

const rateLimit = createRateLimit();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Get IP address
          const headersList = headers()
          const ip = await headersList.get('x-forwarded-for') || 'unknown'

          // Check rate limit
          const isAllowed = rateLimit.check(ip)
          if (!isAllowed) {
            throw new Error('Too many login attempts. Please try again later.');
          }
          // this should never happen, since both username and pw are required fields
          if (!credentials?.username || !credentials?.password) {
            throw new Error('Missing credentials');
          }

          const admin = await getAdminByUsername(credentials.username)
          if (!admin) {
            throw new Error('Invalid credentials');
          }

          const isPasswordValid = await compare(credentials.password, admin.password)
          if (!isPasswordValid) {
            throw new Error('Invalid credentials');
          }

          return {
            id: admin.id.toString(),
            username: admin.username,
            role: 'admin'
          }
        } catch (error) {
          throw error
        }
      }
    })
  ],
  pages: {
    signIn: '/admin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.username = token.username
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: undefined
      }
    }
  },  
  csrf: {
    checkOrigin: true, // Enables CSRF protection
  },
})

export { handler as GET, handler as POST } 