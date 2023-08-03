'use client'
import { Input } from "@/src/components/ui/input"
import {useState,useEffect} from "react"
import {BtnAddToCartSecondary} from "@/src/components/front/button/BtnAddToCart";

export default function SearchBar({productsData}) {
    const [searchValue, setSearchValue] = useState(null)

        const filteredData = productsData.filter((el) => {
            //if no input the return the original
            if (searchValue === '' || searchValue === null) {
                return el;
            }
            //return the item which contains the user input
            else {
                return el.title.toLowerCase().includes(searchValue)
            }
        })

    

    return (
        <div className="flex flex-col w-full">
            <Input
            type="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[300px] mb-4 mx-auto"
            onChange={ev => {setSearchValue(ev.target.value.toLowerCase())}}/>
            <div className="flex flex-wrap justify-center items-center gap-4 min-w-full w-full">
                {filteredData && filteredData.map((product, index) => { 
                    return (
                        <a href={`/homepage/products/${product._id}`} 
                            className="w-[80%] lg:w-[28%]"
                            key={index}>
                            <div className="flex flex-col justify-center card overflow-hidden bg-base-100 bg-white shadow-lg cursor-pointer rounded-sm">
                                <div className="flex w-full">
                                <img className="w-full object-cover max-h-52" src={product.images[0]} alt={product.title} />
                                </div>
                                <div className="card-body p-4">
                                    <h2 className=" card-title">{product.title}</h2>
                                    <p className="">{product.description}</p>
                                    <div className="card-actions justify-end flex items-center mt-4">
                                        <p className="text-2xl text-left font-bold w-1/2">$ {product.price}</p>
                                        <BtnAddToCartSecondary id={product._id} className="justify-center m-auto"/>
                                    </div>
                                </div>
                            </div>
                        </a>)
                })}
            </div>
        </div>
    )
}
