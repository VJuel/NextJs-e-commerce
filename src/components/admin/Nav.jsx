'use client'
import React, {useEffect, useState} from 'react';
import NavBarAdmin from "./NavBarAdmin";
import Link from "next/link";
// import {useRouter} from "next/navigation";
// import {useSession} from "next-auth/react";

export default function Nav({children}) {
    // const router = useRouter()
    const [navActive, setNavActive] = useState(false)
    // const {data: session, status} = useSession({required: true})

    // useEffect(() => {
    //     if (status === "loading") {
    //         return "Loading or not authenticated..."
    //     }
    //     if (!session) {
    //         console.log('layout')
    //         router.push('auth/signin')
    //     }
    // }, [router, status])

    const handleNavActiveChange = () => {
        setNavActive(!navActive);
    };

    return (
        <div className="bg-primary w-full min-h-screen">
            <div className="md:hidden flex header items-center justify-center p-4">
                <button onClick={() => setNavActive(!navActive)}>
                    {navActive ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="w-6 h-6">
                            <path fillRule="evenodd"
                                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                  clipRule="evenodd"/>
                        </svg>
                    )}
                </button>
                <div className="flex grow justify-center mr-6 items-center">
                    <Link href="/dashboard"
                          className="text-gray-500 flex gap-4 items-center md:mb-4 mb-0 mr-2 md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"/>
                        </svg>
                        <span>E-commerceAdmin</span>
                    </Link>
                </div>
            </div>
            <div className="flex bg-Gray relative">
                <NavBarAdmin navActive={navActive} handleNavActiveChange={handleNavActiveChange}/>
                <div
                    className="lg:w-1/2 lg:flex-grow-0 bg-Gray flex-grow p-4 rounded-l-xl rounded-r-xl bg-white mt-2 mr-2">
                    {children}
                </div>
            </div>
        </div>
    );
};


