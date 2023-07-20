'use client';
import {useContext, useEffect, useState} from 'react';
import {CartContext} from "@/src/components/CartContext";
import axios from "axios";
import FormPayement from "@/src/components/front/FormPayement";

export default function Cart() {
    const {cartProducts, addProduct, removeProduct} = useContext(CartContext)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const price = 'font-medium text-xl text-right grow'


    useEffect(() => {
        if (typeof window !== 'undefined' && cartProducts.length > 0) {
            setLoading(true)
            axios.post('/api/cart', cartProducts)
                .then(res => {
                    setProducts(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
            setLoading(false)
        }
    }, [cartProducts])

    function totalCart() {
        let total = 0
        for (let productId of cartProducts) {
            const price = products.find(product => product._id === productId)?.price || 0
            total += price
        }
        return total
    }

    function moreOfThisProducts(id) {
        addProduct(id)
    }

    function lessOfThisProducts(id) {
        removeProduct(id)
    }


    return (
        <section className="flex flex-col justify-center items-start py-10 w-full max-w-4xl bg-white m-auto">
            <h1 className="text-left mb-5 px-4 text-2xl font-bold">Your Cart :</h1>
            <div className="flex flex-wrap lg:flex-nowrap md:flex-wrap px-4 w-full">

                <div
                    className="flex md:flex-wrap mb-6 lg:mb-0 lg:mr-6 w-full lg:w-[60%] rounded-xl shadow-xl bg-gray-100 p-4 flex-col">
                    <table className="w-full">
                        <tbody className="w-full">
                        <tr className="flex justify-between items-center border-b border-black mb-2">
                            <td className="w-1/3 font-medium">Product</td>
                            <td className="w-1/3 pl-6 font-medium">Quantity</td>
                            <td className="font-medium">Price</td>
                        </tr>
                        {products.length > 0 && products.map((product, index) => {
                            return (
                                <tr key={index} className="flex justify-between items-center mb-4">
                                    <td className="w-1/2 flex flex-col -mr-4">
                                        <div>{product.image ? product.image[0] : 'img'}</div>
                                        <p className="title text-center">{product.title}</p>
                                    </td>
                                    <td className="flex items-center justify-center gap-2">
                                        <button className="text-xl bg-gray-300 px-2 rounded-lg hover:bg-gray-400"
                                                onClick={() => moreOfThisProducts(product._id)}>+
                                        </button>
                                        <span
                                            className="rounded-lg bg-white p-2 min-w-[40px] text-center">{cartProducts ? cartProducts.filter(id => id === product._id).length : 1}</span>
                                        <button className="text-xl bg-gray-300 px-2 rounded-lg hover:bg-gray-400"
                                                onClick={() => lessOfThisProducts(product._id)}>-
                                        </button>
                                    </td>
                                    <td className={price}>${cartProducts.filter(id => id === product._id).length * product.price}</td>
                                </tr>
                            )
                        })}
                        <tr className="flex justify-between items-center border-b border-black grow">
                            <td className="text-xl font-medium">Total</td>
                            <td className={price}>$ {totalCart()}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {products.length > 0 && <FormPayement/>}

            </div>
        < /section>
    );
};

