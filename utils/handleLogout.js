import {signOut} from "next-auth/react";
import {router} from "next/client";

export const handleLogout = async () => {
    await signOut({ redirect: false })
    await router.push('/')
    // Effectue ici toute action supplémentaire que tu souhaites après la déconnexion
}