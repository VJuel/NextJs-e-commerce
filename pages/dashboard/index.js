'use client';

import {useSession, signIn, signOut} from "next-auth/react";
import Nav from "@/components/Nav";
import Layout from "@/components/Layout";

export default function Dashboard() {
    const {data: session} = useSession()
    return (
        <Layout>
            <div className="text-blue-800 flex justify-between">
                <div className="font-semibold text-lg">Hello, {session?.user?.name}</div>
                <div className="flex bg-gray-200 items-center justify-center gap-4">
                    <img className="w-10" src={session?.user?.image} alt="vicktor juhel"/>
                    <span className="pr-3">{session?.user?.name}</span>
                </div>
            </div>
        </Layout>
    )
}
