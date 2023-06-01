'use client'
import {useSession} from "next-auth/react";
import Layout from "@/components/Layout";
import Nav from "@/components/Nav";
import {useEffect} from "react";
import {router} from "next/client";
import {ButtonLogout} from "@/components/button/ButtonLogout";

export default function Homepage() {
    const {data: session} = useSession()

    useEffect(() => {
        if (!session) {
            // L'email correspond à celui choisi, redirige vers la page de tableau de bord
            router.push('/')
        }
    }, [session])


    return (
        <div>
            homePage
            <ButtonLogout/>
        </div>
    )
}