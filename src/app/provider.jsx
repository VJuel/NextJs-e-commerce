'use client'
import {SessionProvider} from "next-auth/react";
import CartContextProvider from "@/src/components/CartContext"

export default function Provider({children, session}) {
    return (
        <SessionProvider session={session}>
            <CartContextProvider>
                {children}
            </CartContextProvider>
        </SessionProvider>
    )
}