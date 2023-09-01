import Google from "next-auth/providers/google"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import db from '@/src/lib/db'

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
        signIn: '/signin',
        signOut: '/signout',
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
        async jwt({token, user}) {
            // function si il n'y a pas de token
        
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email
                }
            });


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
        async session({token, session}) {
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
