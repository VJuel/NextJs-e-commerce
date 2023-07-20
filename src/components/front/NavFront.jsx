'use client'
import Image from 'next/image'
import logo from '../../assets/moi.png'
import {useContext, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import ButtonLogoutFront from "@/src/components/front/button/ButtonLogoutFront";
import {Theme, Button} from 'react-daisyui'
import {CartContext} from "@/src/components/CartContext";

export default function NavFront() {
    const [theme, setTheme] = useState( typeof window !== 'undefined' && localStorage.getItem('theme') ? localStorage.getItem('theme') : 'corporate')
    const {data: session, status} = useSession()
    const [navActive, setNavActive] = useState(true)
    const pathname = usePathname()
    const {cartProducts} = useContext(CartContext)
    // const session = await getServerSession(authOptions);
    const inactiveLink = 'flex w-fit lg:text-white text-gray-600 whitespace-nowrap'
    const activeLink = inactiveLink + 'bg-white lg:bg-none [&>span]:inline-block [&>span]:text-gray-900 p-1 rounded-lg [&>svg]:stroke-primary lg:[&>svg]:stroke-current lg:[&>svg]:-mt-1'
    // const loading = status === 'loading'

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme)
            const localTheme = localStorage.getItem('theme')
            document.documentElement.setAttribute('data-theme', localTheme)
        }
    }, [theme])

    const handleToggleTheme = (e) => {
        if (e.target.checked) {
            console.log('checked')
        }
        if (e.target.checked) {
            setTheme('lighting')
        } else {
            setTheme('darkness')
        }
    }
    // Todo: add media query


    const MyLogo = (props) => {
        return (<Image
            src={logo}
            alt="Photo de l'auteur"
            width="50"
            height="50"
            priority="true"
        />)
    }

    // if (loading) {
    //     return (
    //         <div>
    //             /auth/siginding...
    //         </div>
    //     )
    // }

    const handleNavActiveChange = () => {
        setNavActive(!navActive);
    };


    return (<header className="navbar bg-base-100 px-10">
        <div className="navbar-start bg-red flex-col justify-start items-start">
            <span>Ecommerce</span>
            <span>Welcome {session?.user?.name}</span>
        </div>

        {/*mobile* btn*/}
        <button
            onClick={handleNavActiveChange}
            className="order-3 lg:order-2 lg:hidden gap-4 items-center justify-end flex text-white">
            {navActive ? (<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5}
                               stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
            </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>

            )}
        </button>

        <nav
            className={`z-10 p-4 lg:navbar-center navbar-end w-1/2 md:w-1/3 z-3 ${!navActive ? 'block ' : 'hidden'} h-screen lg:h-auto lg:w-inherit lg:w-1/2 lg:bg-white bg-secondary absolute lg:relative top-0 left-0 lg:flex lg:flex-row flex-col`}>
            <ul className="list-nav whitespace-nowrap menu menu-horizontal px-1 flex-col lg:flex-row w-full lg:flex-nowrap lg:w-fit">
                <li><a href="/homepage" className="link-nav w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                    </svg>
                    Home</a></li>
                <li><a className="link-nav w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                    </svg>
                    Products</a></li>
                <li><a className={`link-nav w-full`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"/>
                    </svg>
                    Categories</a></li>
                <li><a href="/homepage/cart" className="flex link-nav w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                    </svg>
                    Cart({cartProducts?.length})</a></li>
                <li tabIndex={0} className="link-nav">
                    <details>
                        <summary>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                            </svg>
                            Account
                        </summary>
                        <ul className="drop p-2 w-full lg:w-auto bg-accent" data-theme="corporate">
                            <li><a>My account</a></li>
                            <li><ButtonLogoutFront/></li>
                        </ul>
                    </details>
                </li>
            </ul>
        </nav>
        <div className="pr-4 w-full lg:w-auto navbar-end order-2 lg:order-3">
            <label className="swap swap-rotate mt-0" onChange={handleToggleTheme}>
                <input type="checkbox" className="border-none"/>
                <svg className="swap-off fill-gray-400 w-8 h-8" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                    <path
                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                </svg>
                <svg className="swap-on fill-gray-400 w-8 h-8" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                    <path
                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                </svg>
            </label>
        </div>
    </header>
    )
}
