'use client'
// import NavBarAdmin from "../../components/admin/NavBarAdmin";
import Image from "next/image";
import logo from "../../assets/moi.png";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
// import {getServerSession} from "next-auth/next";
// import {authOptions} from "@/src/lib/auth";
// import {Loader} from 'rsuite';

// Dashboard.auth = {
//     role: "admin",
//     // loading: <AdminLoadingSkeleton />,
//     unauthorized: "/homepage", // redirect to this url
// }

export default function Dashboard() {
    // const session = await getServerSession(authOptions);
    const {data: session, status} = useSession()
    const loading = status === 'loading'

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    if (session && session?.user?.role === 'USER') {
        return redirect('/homepage')
    }

    if (!session) {
        return  redirect('/signin')
    }

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
            <div className="text-blue-800 flex justify-between items-center">
                <div className="font-semibold text-lg">Hello, {session?.user?.name}</div>
                <div className="flex bg-gray-200 items-center justify-center gap-4">
                    {session?.user?.image ? (
                        <img className="w-10" src={session?.user?.image} alt="vicktor juhel"/>
                    ) : (
                        <MyLogo/>
                    )}
                    <span className="pr-3">{session?.user?.name}</span>
                </div>
            </div>
    )
}
