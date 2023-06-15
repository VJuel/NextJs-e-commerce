'use client'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

export const getServerSideProps = async (context) => {
        const session = await getServerSession(context.req, context.res, authOptions); // Supposons que les informations de l'utilisateur soient stockées dans la session

        if (!session) {
            return {
                redirect: {
                    destination: '/login', // Rediriger vers la page de connexion
                    permanent: false,
                },
                props: {}
            }
        }

        if (session && session?.user?.role === 'ADMIN') {
            return {
                redirect: {
                    destination: '/dashboard', // Rediriger vers la page de connexion
                    permanent: false,
                },
                props: {}
            };
        }
        return {
            props: {
                session
            }
        }
    }
;

export default function Home() {
    const router = useRouter()
    const {data: session, status} = useSession()
    console.log(session)

    if (!session) {
        router.push('/login')
    }
    return (
        <>
            <h1>Pas de log</h1>
        </>
    )
}
