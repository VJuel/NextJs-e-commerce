'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BtnAddToCartSecondary } from "@/src/components/front/button/BtnAddToCart";
import { Skeleton } from "@/src/components/ui/skeleton";
import Slider from "react-slick";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [productsCategories, setProductsCategories] = useState(null);

  useEffect(() => {
    axios.get('/api/categories')
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => console.log(err));

    axios.get('/api/products/categories')
      .then(res => {
        setProductsCategories(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  if (!categories || !productsCategories) {
    return (
      <div className="flex flex-col w-full justify-center items-center py-10">
        <Skeleton className="text-left text-2xl font-bold mb-8" />
        <Slider>
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-semibold text-xl">Loading...</h2>
          </div>
        </Slider>
      </div>
    );
  }

  const docu = document.getElementById('nav-slide');

  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 1,
    dots: true,
    appendDots: docu,
  };


  return (
    <div className="flex flex-col w-full justify-center items-center py-10">
      <h1 className="text-left text-2xl font-bold mb-8">Catégories</h1>
        {Object.keys(productsCategories).map((category, index) => (
          <div key={category._id} className="flex flex-col justify-center items-center w-full mb-6">
            <h2 className="font-semibold text-xl mb-8">{category}</h2>
                <DynamicSlickSlider {...settings}>
                    <div className="!flex justify-center items-center min-w-full h-[400px]">
                        {productsCategories[category].map((product, index) => (
                            <Link key={product._id} href={`/homepage/products/${product._id}`} className="block px-2 min-h-full w-1/3">
                            <div className="!flex flex-col justify-start card w-full overflow-hidden bg-base-100 bg-white shadow-lg cursor-pointer rounded-sm  h-full">
                                    <img src={product.images[0]} alt={product.title} className="w-full object-cover max-h-[150px]" />
                                    <div className=" h-full !flex flex-col justify-between items p-4 w-full">
                                        <h2 className="card-title">{product.title}</h2>
                                        <p className="grow">{product.description}</p>
                                        <div className="card-actions justify-between flex items-center mt-4">
                                            <p className="text-2xl text-left font-bold w-1/2 whitespace-nowrap mb-4 grow">$ {product.price}</p>
                                            <BtnAddToCartSecondary id={product._id} className="flex justify-center m-auto grow"/>
                                    </div>
                                </div>
                            </div>
                            </Link>
                            ))}
                    </div>
                    <div className="flex" id="nav-slide"></div>
                </DynamicSlickSlider>
          </div>
        ))}
    </div>
  );
}
