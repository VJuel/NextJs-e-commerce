import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextResponse } from "next/server"
import CredentialsProvider from "next-auth/providers/credentials"
import db from "@/src/lib/db"
import { z } from "zod"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { createCookieSession } from "@/src/app/actions"

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID")
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET")
  }
  return { clientId, clientSecret }
}

const loginUserSchema = z.object({
  username: z.string().regex(/^[a-z0-9_-]{3,15}$/g, "Invalid username"),
  password: z.string().min(5, "Password should be minimum 5 characters"),
})

export const authOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pa1ges: {
    signIn: "/signin",
    signOut: "/signout",
    login: "/login",
    error: "/signin",
  },
  // Configure one or more authentication providers
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials, req) {
        if (credentials == null) return null

        const { email, password } = credentials

        const user = await db.user.findUnique({
          where: { email },
        })

        if (!user) {
          throw new Error("Email not found")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
          throw new Error("Invalid password")
        }

        createCookieSession(user)

        return user
      },
    }),
    Google({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // function si il n'y a pas de token

      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        token.id = user?.id
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        role: dbUser.role,
        email: dbUser.email,
        picture: dbUser.picture,
      }
    },
    async session({ token, session }) {
      if (!token) {
        session.user.id = "loading"
        return session
      }
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.role = token.role
      }
      return session
    },
  },
}
