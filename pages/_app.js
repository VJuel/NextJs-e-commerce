import '@/styles/globals.css'
import {SessionProvider, useSession} from "next-auth/react"
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function App({
                                Component,
                                pageProps: {session, ...pageProps},
                            }) {
    return (
        <SessionProvider session={session}>
            {Component.auth ? (
                <Auth>
                    <Component {...pageProps} />
                </Auth>
            ) : (
                <Component {...pageProps} />
            )}
        </SessionProvider>
    )
}

function Auth({children}) {
    const {data: session, status} = useSession()
    const router = useRouter()
    console.log(session)
    const isUser = !!session?.user
    useEffect(() => {
        if (status === "loading") return
        if (!isUser) router.push('/login')
    }, [])

    if (isUser) {
        return {children}
    }

    return <div>Loading...</div>
}