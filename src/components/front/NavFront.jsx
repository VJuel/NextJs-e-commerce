"use client"
import Image from "next/image"
import logo from "../../assets/moi.png"
import { useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import ButtonLogoutFront from "@/src/components/front/button/ButtonLogoutFront"
import { CartContext } from "@/src/components/CartContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "/src/components/ui/dropdown-menu"

export default function NavFront({ cookieSession }) {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "corporate"
  )
  const { data: session, status } = useSession()
  const [navActive, setNavActive] = useState(false)
  const pathname = usePathname()
  const { cartProducts } = useContext(CartContext)
  // const session = await getServerSession(authOptions);
  const inactiveLink =
    "flex w-fit lg:text-white text-gray-600 whitespace-nowrap"
  const activeLink =
    inactiveLink +
    "bg-white lg:bg-none [&>span]:inline-block [&>span]:text-gray-900 p-1 rounded-lg [&>svg]:stroke-primary lg:[&>svg]:stroke-current lg:[&>svg]:-mt-1"

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
      const localTheme = localStorage.getItem("theme")
      document.documentElement.setAttribute("data-theme", localTheme)
    }
  }, [theme])

  const handleToggleTheme = (e) => {
    if (e.target.checked) {
      setTheme("lighting")
    } else {
      setTheme("darkness")
    }
  }

  const MyLogo = (props) => {
    return (
      <Image
        src={logo}
        alt="Photo de l'auteur"
        width="50"
        height="50"
        priority="true"
      />
    )
  }

  const handleNavActiveChange = () => {
    setNavActive(!navActive)
    document.body.classList.toggle("overflow-hidden")
  }

  return (
    <>
      <header className="text-white flex bg-base-100 px-10 justify-between relative bg-slate-700 h-[80px] items-center">
        <div className="navbar-start p-4 bg-red flex-col justify-start items-start flex">
          <span>Ecommerce</span>
          <span>Welcome {session?.user?.name || session?.user?.email}</span>
        </div>

        {/*mobile* btn*/}
        <button
          onClick={handleNavActiveChange}
          className="order-3 lg:order-2 lg:hidden gap-4 items-center justify-end flex text-black [&>svg]:fill-white [&>svg]:z-50 [&>svg]:text-white"
        >
          {!navActive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>

        <nav
          className={`lg:w-auto z-20 p-4 lg:flex-row flex-col w-1/2 md:w-1/3 z-3 lg:flex items-center ${
            navActive ? "flex " : "hidden"
          } h-screen z-20 lg:h-auto bg-slate-700 absolute lg:relative top-0 left-0 lg:flex-row justify-start lg:justify-end`}
        >
          <ul className="items-start list-nav whitespace-nowrap px-1 flex flex-col lg:flex-row w-full lg:flex-nowrap lg:w-fit lg:items-center gap-4">
            <li>
              <a href="/homepage" className="link-nav w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Home
              </a>
            </li>
            <li>
              <a href="/homepage/products" className="link-nav w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
                Products
              </a>
            </li>
            <li>
              <a href="/homepage/categories" className={`link-nav w-full`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                  />
                </svg>
                Categories
              </a>
            </li>
            <li>
              <a href="/homepage/cart" className="flex link-nav w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                Cart({cartProducts?.length})
              </a>
            </li>
            <li tabIndex={0} className="link-nav">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  Account
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-700 border-none">
                  <DropdownMenuItem className="text-white">
                    <a>My account</a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white w-[90%] m-auto" />
                  <DropdownMenuItem>
                    <ButtonLogoutFront />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </header>
      <div
        onClick={() => setNavActive(!navActive)}
        className={`absolute w-full h-full bg-slate-500 z-10 ${
          navActive ? "block " : "hidden"
        } opacity-40 top-0`}
      ></div>
    </>
  )
}
