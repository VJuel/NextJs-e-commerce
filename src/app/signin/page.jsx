'use client'
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
export default function Page() {
    const {data: session, status} = useSession()
    const router = useRouter()
    const role = session?.user?.role
    const loading = status === 'loading'
    const userClient = session && role === 'USER'

    console.log(session)
    useEffect(() => {
        if (session && role === 'ADMIN') {
            router.push("/dashboard")
        }

        if (userClient || role === '') {
            router.push("/homepage")
        }

    }, [session,loading])

    if (loading) {
        return <div>Loading...</div>
    }


    if (!session) {
        return (
            <div className="bg-blue-800 h-screen flex items-center justify-center">
                <div className="text-center">
                    <button onClick={() => signIn('google')} className="bg-white px-4 py-2 rounded-lg">
                        Login with Google
                    </button>
                </div>
            </div>
        )
    }


}
