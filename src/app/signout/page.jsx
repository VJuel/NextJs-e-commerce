'use client'
import {signOut, useSession} from "next-auth/react";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
export default function Page() {
    const {data: session, status} = useSession()
    const router = useRouter()
    const loading = status === 'loading'

    useEffect(() => {
        if (!loading && !session) {
            router.push('/signin')
        }
        if (!loading && session) {
            signOut({redirect: false})
            router.push('/signin')
        }

    }, [session,loading])

    if (loading) {
        return <div>Loading...</div>
    }
}
