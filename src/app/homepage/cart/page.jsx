'use client'
import { Suspense } from 'react'
import {useEffect, useState, useContext} from "react"
import {CartContext} from "@/src/components/CartContext";
import axios from "axios";
import Link from "next/link"
import FormPayement from '@/src/components/front/FormPayement'
import { CartTable } from "@/src/components/front/Cart"

export default function Page() {
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext)
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [isSucess, setIsSuccess] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined' && cartProducts.length > 0) {
            axios.post('/api/cart', cartProducts)
                .then(res => {
                    setProducts(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
            setLoading(false)
        } else {
            setProducts([])
            localStorage.removeItem('cart')
            setLoading(false)
        }
    }, [cartProducts])

    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }
        if (typeof window !== "undefined" && window.location.href.includes('success')) {
            setIsSuccess(true)
            clearCart()
        }
    },[])

   
      if (isSucess) {
        return (
            <>
                <div className='w-full flex justify-start p-10'>
                    <div className="flex flex-col w-fit rounded-md items-start justify-start shadow-md p-10">
                        <h1 className='text-left mb-5 px-4 text-2xl font-bold'>Thanks you for your order</h1>
                        <p>We will email you when your order wiell be sent</p>
                        <Link href="/homepage">Go homepage</Link>
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
                    <CartTable products={products} loading={loading}/>
                </div>
                {cartProducts && 
                    <aside className="flex flex-col flex-grow-1 w-auto sticky lg:w-1/3 rounded-xl shadow-xl bg-gray-100 p-4">
                        <h2 className="mb-2 text-2xl font-bold">Order information</h2>
                        <FormPayement loading={loading}/>
                    </aside>}
                </div>
        </>
    );
};

