import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        // ...add more providers here
    ],
    session: {
        jwt: true,
        maxAge: 60 * 60 * 24, // Durée de validité du token en secondes (par exemple, 24 heures)
        destroyCookies: true, // Réinitialise les cookies de session lors de la déconnexion
    },
    adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions)

