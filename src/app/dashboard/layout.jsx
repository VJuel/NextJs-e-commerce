import Head from "next/head";
import Nav from "@/src/components/admin/Nav";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/src/lib/auth";
import {redirect} from "next/navigation";
import NavBarAdminSkeleton from "@/src/components/skeleton/navAdmin";


export default async function RootLayout({// Layouts must accept a children prop.
// This will be populated with nested layouts or pages
                                             children,
                                         }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return (
            <NavBarAdminSkeleton>
                <span className="loading loading-spinner loading-lg"></span>
            </NavBarAdminSkeleton>
        )
    }

    if (session && session?.user?.role === 'USER') {
        return redirect('/homepage')
    }

    if (!session) {
        return redirect('/signin')
    }


    return (
        <Nav>
            {children}
        </Nav>
    )
}


// function Auth({children}) {
//     const router = useRouter()
//     const isUser = !!session?.user
//     const isDashboardPage = useRouter().pathname.startsWith("/dashboard");
//     const isUserAllowed = session?.user.role === "USER"; // Vérification du rôle de l'utilisateur
//
//     if (status === "loading") return
//     // if (!isUser) router.push('/auth/sigin')
//
//
//     if (isUser) {
//         return children
//     }
//
//     return <Loader size="md" content="Medium"/>
// }

// return (
//     <SessionProvider session={session}>
//         {isUserLoggedIn && (
//             <Auth>
//                 <Component {...pageProps} />
//             </Auth>
//         )}
//     </SessionProvider>
// )