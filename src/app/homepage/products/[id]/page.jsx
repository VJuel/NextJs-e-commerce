"use client"
import { useState, useEffect } from "react"
import { BtnAddToCartSecondary } from "@/src/components/front/button/BtnAddToCart"
import { Skeleton } from "@/src/components/ui/skeleton"
import Image from "next/image"

export default function ProductDetail({ params }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [productData, setProductData] = useState(null)
  const id = params.id

  useEffect(() => {
    async function fetchData() {
      const data = await getOneProduct(id)
      setProductData(data)
    }
    fetchData()
  }, [id])

  async function getOneProduct(id) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_VERCEL_URL + `/api/products/${id}`
    )
    return res.json()
  }

  if (!productData) {
    return (
      <div className="flex w-full justify-center bg-grey-100 py-10 ">
        <div className=" w-full px-4 flex flex-col lg:flex-row max-w-5xl gap-8">
          <div className="w-full lg:w-1/2 flex flex-col justify-start items-start">
            <Skeleton className="h-8 pb-4 text-3xl w-full mb-5" />
            <Skeleton className="h-16 text-lg mb-4 w-full" />
            <div className="flex justify-between items center w-full">
              <Skeleton className="h-6 text-lg mb-4 w-1/3" />
              <BtnAddToCartSecondary id={id} title={productData} />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
            <Skeleton className="pb-4 text-3xl h-[240px] w-full" />
            <div className="flex mt-6">
              <Skeleton className="h-24 w-24 mr-4" />
              <Skeleton className="h-24 w-24 mr-4" />
              <Skeleton className="h-24 w-24 mr-4" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full justify-center py-10">
      <div className="px-4 flex max-w-5xl gap-8 flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2 flex flex-col justify-start items-start">
          <h1 className="pb-4 text-3xl">{productData.title}</h1>
          <p className="text-lg mb-4">{productData.description}</p>
          <div className="flex justify-between items center w-full">
            <h1 className="font-bold text-3xl">$ {productData.price}</h1>
            <BtnAddToCartSecondary id={id} />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-muted/50">
          {productData.images && productData.images.length > 0 && (
            <>
              <Image
                width={300}
                height={300}
                src={productData.images[selectedImage]}
                alt={productData.title}
                className=" w-full min-h-[300px] object-cover"
              />
              <div className="flex gap-4 mt-4">
                {productData.images.map((img, index) => (
                  <div
                    key={index}
                    className="flex justify-content items-center p-2 borde borderr-1-black- rounded-sm"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={img}
                      alt={`${productData.title} ${index}`}
                      className="w-24 h-24 cursor-pointer object-cover"
                      onClick={() => setSelectedImage(index)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
