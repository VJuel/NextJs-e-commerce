'use client'
import Hero from "../../components/front/Hero";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {useEffect} from "react";
import Featured from "@/src/components/front/Featured";
// import {getServerSession} from "next-auth/next";
// import {authOptions} from "@/src/lib/auth";
// import {NextSeo} from "next-seo";
// import {redirect} from "next/navigation";

export default function Homepage() {
    const {data: session, status} = useSession()
    const router = useRouter()
    const loading = status === 'loading'

    useEffect(() => {
        // axios.ge
    }, [session])

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (!session) {
        router.push('signin')
    }

    if (session?.user?.role === 'admin') {
        router.push('/dashboard')
    }

    return (
        <>
            <Hero/>
            <Featured/>
        </>
    )
}

