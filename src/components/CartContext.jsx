"use client"
import { createContext, useEffect, useState } from "react"

export const CartContext = createContext()

export default function CartContextProvider({ children }) {
  const ls = useMemo(
    () => (typeof window !== "undefined" ? localStorage : {}),
    []
  )
  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts))
    }
  }, [ls, cartProducts])

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")))
    }
  }, [ls, cartProducts])

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId])
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId)
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos)
      }
      return prev
    })
  }

  function clearCart() {
    setCartProducts([])
    localStorage.removeItem("cart")
  }
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
