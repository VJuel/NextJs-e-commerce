'use client'
import "../../styles/globals.css";
import {SessionProvider} from "next-auth/react"
// import Head from "next/head";
// import Head from "next/head";
// import {Metadata} from "next";

// import {ColorModeScript} from "@chakra-ui/react";
// import {NEXT_SEO_DEFAULT} from "@/src/components/next-seo-config";
// import {NextSeo} from "next-seo";

// export const metadata = {
//     title: 'test meta head'
// }

export default function RootLayout({
                                       // Layouts must accept a children prop.
                                       // This will be populated with nested layouts or pages
                                       pageProps: session,
                                       children,
                                   }) {
    //
    return (
        <html lang="fr" data-theme="lighting">
        <SessionProvider session={session}>
            <body>
            {children}
            </body>
        </SessionProvider>
        </html>
    )
}


//
// function Auth({children}) {
//     const {data: session, status} = useSession()
//     const router = useRouter()
//     const isUser = !!session?.user
//     const isDashboardPage = useRouter().pathname.startsWith("/dashboard");
//     const isUserAllowed = session?.user.role === "USER"; // Vérification du rôle de l'utilisateur
//     const loading = status === "loading"
//     const unauthenticated = status === "unauthenticated"
//     const authenticated = status === "authenticated"
//
//     if (loading) {
//         return (<div>LOADING...</div>)
//     }
//
//     if (unauthenticated) {
//         router.push('/signin')
//     }
//     if (session && session?.user?.role === "ADMIN") {
//         router.push('/dashboard')
//     }
//     if (session && session?.user?.role === "USER") {
//         router.push('/homepage')
//     }
// }

// return (
//     <SessionProvider session={session}>
//         {isUserLoggedIn && (
//             <Auth>
//                 <Component {...pageProps} />
//             </Auth>
//         )}
//     </SessionProvider>
// )