"use client"
import { useEffect, useState, useContext } from "react"
import { CartContext } from "@/src/components/CartContext"
import CartSkeleton from "@/src/components/skeleton/CartSkeleton"
import clsx from "clsx"

export const CartTable = ({ products, loading }) => {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext)
  const price = "font-medium text-xl text-right grow"

  function totalCart() {
    let total = 0
    for (let productId of cartProducts) {
      const price =
        products.find((product) => product._id === productId)?.price || 0
      total += price
    }
    return total
  }

  function moreOfThisProducts(id) {
    addProduct(id)
  }

  function lessOfThisProducts(id) {
    removeProduct(id)
    if (!products?.length > 0) {
      clearCart()
    }
  }

  if (loading) {
    return (
      <>
        <CartSkeleton />
      </>
    )
  }

  return (
    <>
      <table className="w-full">
        <tbody className="w-full">
          <tr className="flex justify-between items-center border-b border-black mb-2">
            <td className="font-medium">Product</td>
            <td className="pl-6 font-medium">Quantity</td>
            <td className="font-medium">Price</td>
          </tr>
          {products?.length > 0 ? (
            products.map((product, index) => {
              return (
                <tr
                  key={index}
                  className="flex justify-between items-center mb-4"
                >
                  <td className="w-1/3 flex flex-col -mr-4">
                    <img
                      className="objectif-cover w-full"
                      src={product?.images[0]}
                      alt="yes work"
                    />
                    <p className="title text-center">{product.title}</p>
                  </td>
                  <td className="w-1/3 flex items-center justify-center gap-2">
                    <button
                      className="w-[35px] h-[35px] flex justify-center items-center text-xl bg-gray-300 px-2 rounded-lg hover:bg-gray-400"
                      onClick={() => moreOfThisProducts(product._id)}
                    >
                      +
                    </button>
                    <span className="rounded-lg bg-white p-2 min-w-[40px] text-center font-bold">
                      {cartProducts
                        ? cartProducts.filter((id) => id === product._id).length
                        : 1}
                    </span>
                    <button
                      className="w-[35px] h-[35px] flex justify-center items-center text-xl bg-gray-300 px-2 rounded-lg hover:bg-gray-400"
                      onClick={() => lessOfThisProducts(product._id)}
                    >
                      -
                    </button>
                  </td>
                  <td className={clsx(price, "w-1/3")}>
                    $
                    {cartProducts.filter((id) => id === product._id).length *
                      product.price}
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td>Your cart is empty</td>
            </tr>
          )}
          {products.length > 0 && (
            <tr className="flex justify-between items-center border-b border-black">
              <td className="text-xl font-medium">Total</td>
              <td className={price}>$ {totalCart()}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}
