import {getServerSession} from "next-auth/next";
import {authOptions} from "@/src/lib/auth";
import {redirect} from "next/navigation";
// import {Metadata} from "next";
//
// export const generateMetadata = ({ params }): Metadata => {
//     return {
//         title: `Product `,
//     };
// };

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session && session?.user?.role === 'ADMIN') {
        return redirect('/dashboard')
    }

    if (session && session?.user?.role === 'USER') {
        return redirect('/homepage')
    }

    if (!session) {
       return  redirect('/signin')
    }
}

