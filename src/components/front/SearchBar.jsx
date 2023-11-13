"use client"
import { Input } from "@/src/components/ui/input"
import { useState, useEffect } from "react"
import { BtnAddToCartSecondary } from "@/src/components/front/button/BtnAddToCart"
import Image from "next/image"
import { FaSearch } from "react-icons/fa"
import clsx from "clsx"
export default function SearchBar({ productsData }) {
  const [searchValue, setSearchValue] = useState(null)

  const filteredData = productsData.filter((el) => {
    //if no input the return the original
    if (searchValue === "" || searchValue === null) {
      return el
    }
    //return the item which contains the user input
    else {
      return el.title.toLowerCase().includes(searchValue)
    }
  })

  return (
    <div className="flex flex-col w-full">
      <div className="relative mb-6 w-full md:w-1/2 lg:w-[40%] mx-auto px-6 z-0">
        <Input
          type="search"
          placeholder="Search..."
          className="w-full mx-auto relative z-10"
          onChange={(ev) => {
            setSearchValue(ev.target.value.toLowerCase())
          }}
        />
        {!searchValue && (
          <FaSearch className="absolute top-1/2 right-[8%] z-50 -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>

      <div
        className={clsx(
          "flex flex-wrap justify-center items-center w-full gap-4",
          filteredData.length === 0 && "min-w-full"
        )}
      >
        {filteredData &&
          filteredData.map((product, index) => {
            return (
              <a
                href={`/homepage/products/${product._id}`}
                className={clsx(
                  "w-full",
                  "pl-4",
                  "md:w-[45%]",
                  "lg:w-[30%]",
                  " min-h-[340px]"
                )}
                key={index}
              >
                <article className="flex flex-col justify-start card overflow-hidden bg-base-100 bg-white shadow-lg cursor-pointer rounded-sm">
                  <div className="flex w-full items-start justify-start ">
                    <Image
                      src={product.images[0]}
                      width={500}
                      height={500}
                      alt={product.title}
                      className="w-full object-cover max-h-[150px]"
                    />
                  </div>
                  <div className="card-body min-h-[190px] h-full p-4 flex flex-col justify-between items">
                    <h2 className="card-title">{product.title}</h2>
                    <p className="grow">{product.description}</p>
                    <div className="card-actions justify-between flex items-center mt-4">
                      <p className="text-2xl text-left font-bold w-1/2">
                        $ {product.price}
                      </p>
                      <BtnAddToCartSecondary
                        id={product._id}
                        className="justify-center m-auto"
                      />
                    </div>
                  </div>
                </article>
              </a>
            )
          })}
      </div>
    </div>
  )
}
