"use client"
import React from "react"
import axios from "redaxios"
import { useEffect, useState } from "react"
import Image from "next/image"
import { BtnAddToCartSecondary } from "@/src/components/front/button/BtnAddToCart"
import { Skeleton } from "@/src/components/ui/skeleton"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import BtnReadMore from "@/src/components/front/button/BtnReadMore"

export default function Categories() {
  const [categories, setCategories] = useState(null)
  const [productsCategories, setProductsCategories] = useState(null)

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/categories`)
      .then((res) => {
        console.log(res.data)
        setCategories(res.data)
      })
      .catch((err) => console.log(err))

    axios
      .get(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/products/categories`)
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
  })

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

  function addPadding() {
    let padding = 0
    if (productsCategories[category].length === 1) {
      padding = 0
    } else if (productsCategories[category].length === 2) {
      padding = 0
    } else {
      padding = 0
    }
    return padding
  }

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // appendDots: ".slider-container .slider-nav",
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
      {productsCategories &&
        Object.keys(productsCategories).map((category, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center w-full mb-6"
          >
            <h2 className="font-semibold text-xl mb-8">{category.name}</h2>
            <div className="max-w-7xl padding-slider !flex justify-center items-center w-full">
              <Slider {...settings}>
                {productsCategories &&
                  productsCategories[category].map((product, index) => (
                    <article
                      key={product._id}
                      className="min-h-[270px] h-auto border-2 border-blacklg:shadow-lg px-2w-full lg:w-1/3 !flex flex-row md:flex-col xl:flex-row justify-start card overflow-hidden bg-base-100 bg-white shadow-lg cursor-pointer rounded-sm"
                    >
                      <div className="flex justify-center items-center w-[48%] md:w-full h-auto xl:w-[42%]">
                        <Image
                          width={150}
                          height={150}
                          src={product.images[0]}
                          alt={product.title}
                          className="h-full flex w-full object-cover"
                        />
                      </div>
                      <div className=" h-full !flex flex-col justify-between items p-4 w-[52%] md:w-full xl:w-[58%]">
                        <h2 className="card-title mb-2">{product.title}</h2>
                        <p className="grow mb-1">{product.description}</p>
                        <p className="text-2xl text-left font-bold w-1/2 whitespace-nowrap grow">
                          $ {product.price}
                        </p>
                        <div className="card-actions justify-between flex flex-col md:flex-row items-start md:items-center mt-2 gap-2">
                          <BtnAddToCartSecondary
                            id={product._id}
                            className="text-sm !px-2 flex justify-center m-auto grow w-1/2 [&>svg]:text-xs"
                          />
                          <BtnReadMore className=" w-1/2" />
                        </div>
                      </div>
                    </article>
                  ))}
              </Slider>
              {/* <div
              className="nav-slide flex bg-red-500 h-[15px] w-[15px] rounded-2xl cursor-pointer"
              id="nav-slide"
            ></div> */}
            </div>
          </div>
        ))}
    </div>
  )
}
