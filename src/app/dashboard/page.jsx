import Image from "next/image";
import logo from "../../assets/moi.png";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/src/lib/auth";

// Dashboard.auth = {
//     role: "admin",
//     // loading: <AdminLoadingSkeleton />,
//     unauthorized: "/homepage", // redirect to this url
// }

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/signin')
    }

    if (session && session?.user?.role === 'USER') {
        return redirect('/homepage')
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
