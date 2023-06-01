import {signIn, signOut, useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {EMAIL_ADMIN} from '../.env.js'
const emailAdmin = EMAIL_ADMIN

export default function Home() {
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session) {
            if (session.user.email === emailAdmin) {
                // L'email correspond à celui choisi, redirige vers la page de tableau de bord
                router.push('/dashboard')
            } else {
                // L'utilisateur est connecté mais l'email ne correspond pas, redirigez vers la page d'accueil
                router.push('/homepage')
            }
        }
    }, [session])

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
