import React, {useEffect} from "react";
import NavFront from "@/components/front/NavFront";
import Hero from "@/components/front/Hero";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";


export const getServerSideProps = async (context) => {
        const session = await getServerSession(context.req, context.res, authOptions); // Supposons que les informations de l'utilisateur soient stockées dans la session

        if (!session) {
            return {
                redirect: {
                    destination: '/login', // Rediriger vers la page de connexion
                    permanent: false,
                },
                props: {
                    session
                },
            }
        }

        if (session && session?.user?.role === 'ADMIN') {
            return {
                redirect: {
                    destination: '/dashboard', // Rediriger vers la page de connexion
                    permanent: false,
                },
                props: {
                    session,
                    isAdmin: true,
                },
            };
        }
        console.log(session)

        return {
            props: {
                session: {
                    name: session?.user.name,
                    email: session?.user.email,
                    image: session?.user.image || null,
                    role: session?.user.role,
                }
            }
        }
    }
;

export default function Homepage({session}) {

    // const {data: session, status} = useSession()
    // const router = useRouter()

    console.log('user')
    console.log(session)
    // async function handleLogout() {
    //     await router.push('/');
    //     await signOut()
    // }
    //
    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (!session || session?.user?.email !== EMAIL_ADMIN) {
    //     handleLogout();
    //     return null; // Render null or a loading indicator while logging out
    // }

    return (
        <>
            <NavFront/>
            <main>
                <Hero/>

            </main>
        </>
    )
}

