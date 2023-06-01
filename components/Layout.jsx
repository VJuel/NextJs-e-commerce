'use client'

import React from 'react';
import {signIn, useSession} from "next-auth/react";
import Nav from "@/components/Nav";
// import Nav from "@/components/Nav";
// import {useRouter} from "next/router";
// import Homepage from "@/pages/homepage";

const Layout = ({children}) => {
    const { data: session } = useSession();
    if (!session) {
        return (
            <div className="bg-blue-800 bg-bgGray w-screen h-screen flex items-center">
                <div className="text-center w-full">
                    <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-blue-800 bg-bgGray min-h-screen">
            <div className="md:hidden flex items-center p-4">
                <button >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="flex grow justify-center mr-6">
                    {/*<Logo />*/}
                </div>
            </div>
            <div className="flex bg-blue-800">
                <Nav />
                <div className="flex-grow p-4 rounded-l-xl rounded-r-xl bg-white mt-2 mr-2 mb-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;