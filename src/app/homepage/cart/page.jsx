"use client"
import { Suspense } from "react"
import { useEffect, useState, useContext } from "react"
import { CartContext } from "@/src/components/CartContext"
import axios from "redaxios"
import Link from "next/link"
import FormPayement from "@/src/components/front/FormPayement"
import { CartTable } from "@/src/components/front/Cart"

export default function Page() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [isSucess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && cartProducts.length > 0) {
      axios
        .post("/api/cart", cartProducts)
        .then((res) => {
          setProducts(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      setLoading(false)
    } else {
      setProducts([])
      localStorage.removeItem("cart")
      setLoading(false)
    }
  }, [cartProducts])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("success")
    ) {
      setIsSuccess(true)
      clearCart()
    }
  }, [])

  if (isSucess) {
    return (
      <>
        <div className="w-full flex justify-start p-10">
          <div className="flex flex-col w-fit rounded-md items-start justify-start shadow-md p-10">
            <h1 className="text-left mb-5 px-4 text-2xl font-bold">
              Thanks you for your order
            </h1>
            <p>We will email you when your order wiell be sent</p>
            <Link
              href="/homepage"
              className="inline-flex font-semibold underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
              Go homepage
            </Link>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <h1 className="text-left mb-5 px-4 text-2xl font-bold">Your Cart :</h1>
      <div className="flex flex-wrap lg:flex-nowrap md:flex-wrap px-4 w-full">
        <div className="flex w-full md:flex-wrap mb-6 lg:mb-0 lg:mr-6 lg:w-[60%] p-4 flex-col justify-start items-center h-auto">
          <CartTable products={products} loading={loading} />
        </div>
        {cartProducts.length > 0 && (
          <aside className="h-fit flex flex-col flex-grow-1 w-auto sticky lg:w-1/3 rounded-xl shadow-xl bg-gray-100 p-4">
            <h2 className="mb-2 text-2xl font-bold">Order information</h2>
            <FormPayement loading={loading} />
          </aside>
        )}
      </div>
    </>
  )
}
