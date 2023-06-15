import {useRouter} from "next/navigation";
import {signIn, useSession} from "next-auth/react";
import {useEffect} from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";


export const getServerSideProps = async (context) => {
        const session = await getServerSession(context.req, context.res, authOptions); // Supposons que les informations de l'utilisateur soient stockées dans la session
        console.log(typeof session)
        // const json = await session.json()
        if (session && session.user.role === "ADMIN") {
            console.log('admin')
            return {
                redirect: {
                    permanent: false,
                    destination: "/dashboard",
                },
                props: {
                    session
                }
            }
        }
        if (session && session.user.role === "USER") {
            return {
                redirect: {
                    permanent: false,
                    destination: "/homepage",
                },
                props: {
                    session
                }
            }
        }
        return {
            props: {
                session
            }
        }
    }
;

export default function  Login({...props}) {
    const {name} = {...props}
    if (!name) {
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