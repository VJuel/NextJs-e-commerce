"use client"
import React from "react"
import axios from "redaxios"
import { useEffect, useState } from "react"
import Link from "next/link"
import { BtnAddToCartSecondary } from "@/src/components/front/button/BtnAddToCart"
import { Skeleton } from "@/src/components/ui/skeleton"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function Categories() {
  const [categories, setCategories] = useState(null)
  const [productsCategories, setProductsCategories] = useState(null)

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => {
        console.log(res.data)
        setCategories(res.data)
      })
      .catch((err) => console.log(err))

    axios
      .get("/api/products/categories")
      .then((res) => {
        console.log(res.data)
        setProductsCategories(res.data)
      })
      .catch((err) => console.log(err))

    if (categories || productsCategories) {
      Object.keys(productsCategories).map((category, index) => {
        console.log("Rendu pour la catégorie: ", category)
      })
    }
  }, [])

  if (!categories || !productsCategories || typeof window === "undefined") {
    return (
      <div className="flex flex-col w-full justify-center items-center py-10">
        <Skeleton className="text-left text-2xl font-bold mb-8" />
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold text-xl">Loading...</h2>
        </div>
      </div>
    )
  }

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Adjust this for your needs
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  }

  return (
    <div className="flex flex-col w-full justify-center items-center py-10">
      <h1 className="text-left text-2xl font-bold mb-8">Catégories</h1>
      {Object.keys(productsCategories).map((category, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center w-full mb-6"
        >
          <h2 className="font-semibold text-xl mb-8">{category.name}</h2>
          <div className="!flex justify-center items-center min-w-full w-full">
            <Slider {...settings}>
              {productsCategories[category].map((product, index) => (
                <Link
                  key={product._id}
                  href={`/homepage/products/${product._id}`}
                  className="lg:shadow-lg block px-2 min-h-full w-full lg:w-1/3"
                >
                  <article className="!flex flex-row md:flex-col xl:flex-row justify-start card w-full overflow-hidden bg-base-100 bg-white shadow-lg cursor-pointer rounded-sm h-full">
                    <div className="flex justify-center items-center w-[48%] md:w-full h-auto xl:w-[42%]">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full object-cover max-h-[150px]"
                      />
                    </div>
                    <div className=" h-full !flex flex-col justify-between items p-4 w-[52%] md:w-full xl:w-[58%]">
                      <h2 className="card-title">{product.title}</h2>
                      <p className="grow">{product.description}</p>
                      <div className="card-actions justify-between flex flex-col md:flex-row items-start md:items-center mt-4">
                        <p className="text-2xl text-left font-bold w-1/2 whitespace-nowrap mb-2 md:mb-4 grow">
                          $ {product.price}
                        </p>
                        <BtnAddToCartSecondary
                          id={product._id}
                          className="flex justify-center m-auto grow"
                        />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </Slider>
            <div
              className="nav-slide flex bg-red-500 h-[15px] w-[15px] rounded-2xl cursor-pointer"
              id="nav-slide"
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
