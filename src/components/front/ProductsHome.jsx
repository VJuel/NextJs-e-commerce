
import Link from 'next/link';
import getProductsBySort from '@/src/lib/getProductsBySort';
import axios from 'axios';
import {BtnAddToCartSecondary} from "@/src/components/front/button/BtnAddToCart";

export async function getLastProducts() {
    try {
      const feature = await axios.get('http://localhost:3000/api/products').then(res => {
        return res.data
      })
      return feature
    } catch(err) {
      console.log(err)
    }
  }


export async function ProductsHome() {
    const lastProducts = await getLastProducts()

    console.log(lastProducts);
    return (
        <>
            <section className="p-10 flex flex-col justify-center items-center">
                <div className="flex justify-center items-center gap-4 mb-6">
                    <h2 className="mb-4 text-xl text-white">
                        Last products
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lastProducts && lastProducts.slice(0, 3).map((product, index) => (
                        <a href={`/homepage/products/${product._id}`} 
                            className="bg-base-100 bg-white shadow-lg rounded-sm flex flex-col justify-between" 
                            key={index}>
                            <img className="w-full object-cover h-52 mb-4" src={product.images[0]} alt={product.title} />
                            <div className="flex flex-col justify-between px-4 mb-4 flex-grow">
                                <h2 className="text-lg font-bold mb-2">{product.title}</h2>
                                <p className="text-base mb-4">{product.description}</p>
                                <div className="flex justify-between">
                                    <p className="text-2xl font-bold">$ {product.price}</p>
                                    <BtnAddToCartSecondary id={product._id} className="justify-center m-auto"/>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <Link href="/homepage/products" className="gap-2 text-white text-center underline whitespace-nowrap inline-flex mt-6">See more
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mt-1">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                        </svg>
                    </Link>
            </section>
        </>

    )
}