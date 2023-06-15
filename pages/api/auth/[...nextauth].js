import db from '../../../lib/db'
import NextAuth, {getServerSession, NextAuthOptions} from "next-auth"
import Google from "next-auth/providers/google"
import {PrismaAdapter} from "@next-auth/prisma-adapter"

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    if (!clientId || clientId.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_ID')
    }
    if (!clientSecret || clientSecret.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_SECRET')
    }
    return {clientId, clientSecret}
}

export const authOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    // Configure one or more authentication providers
    secret: process.env.SECRET,
    providers: [
        Google({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
            // profile(profile) {
            //     return { role: profile.role ?? "user",  },
            // },
        }),
    ],

    callbacks: {
        async session({token, session, user}) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.role = token.role
            }
            return session
        },
        async jwt({token, user}) {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email
                }
            });

            console.log('dbUser' + dbUser)

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
    },
}

export default NextAuth(authOptions)

