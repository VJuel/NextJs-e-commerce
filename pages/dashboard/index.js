'use client'
import Layout from "@/components/admin/Layout";
import {useSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";
import Image from "next/image";
import logo from "@/assets/moi.png";

export const getServerSideProps = async (context) => {
        const session = await getServerSession(context.req, context.res, authOptions); // Supposons que les informations de l'utilisateur soient stockées dans la session

        if (session) {
            return {
                props: {
                    name: session?.user?.name,
                    email: session?.user?.email,
                    image: session?.user?.image || null,
                    role: session?.user?.role,
                }
            }
        } else {
            return {
                redirect: {
                    destination: '/login', // Rediriger vers la page de connexion
                    permanent: false,
                },
            }
        }
    }
;

export default function Dashboard({role}) {
    const {data: session, status} = useSession()
    // console.log('dashboard')
    // console.log(role)
    // console.log(session)

    const MyLogo = (props) => {
        return (
            <Image
                src={logo}
                alt="Photo de l'auteur"
                width="50"
                height="50"
            />
        )
    }


    return (
        <Layout>
            <div className="text-blue-800 flex justify-between items-center">
                <div className="font-semibold text-lg">Hello, {session?.user?.name}</div>
                <div className="flex bg-gray-200 items-center justify-center gap-4">
                    {session?.user?.image ? (
                            <img className="w-10" src={session?.user?.image} alt="vicktor juhel"/>
                        )
                        :
                        (
                            <MyLogo/>
                        )}
                    <span className="pr-3">{session?.user?.name}</span>
                </div>
            </div>
        </Layout>
    )
}
