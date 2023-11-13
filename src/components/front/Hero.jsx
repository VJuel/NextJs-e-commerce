import { device } from "@/styles/abstract"
import mac from "../../assets/macbookpro.png"
import Image from "next/image"
import axios from "redaxios"
import BtnProduct from "@/src/components/front/button/BtnProduct"
import { BtnAddToCartPrimary } from "@/src/components/front/button/BtnAddToCart"
import FeatureImgSkelton from "@/src/components/skeleton/FeatureImgSkeleton"
// import BtnAddToCart from "../../components/front/button/BtnAddToCart";
// import BtnProduct from "../../components/front/button/BtnProduct";

export async function getFeatures() {
  try {
    const feature = await axios
      .get("http://localhost:3000/api/products/features")
      .then((res) => {
        return res.data
      })
    return feature
  } catch (err) {
    console.log(err)
  }
}

export default async function Hero() {
  const feature = await getFeatures()

  const MyHero = (props) => {
    return (
      <Image
        src={feature[0].images[1]}
        alt="macbook pro"
        style={{ width: "100%", objectFit: "contain", zIndex: 0 }}
        width={200}
        height={200}
        loadder={<FeatureImgSkelton />}
        className="rounded-sm shadow-lg"
      />
    )
  }

  return (
    <>
      {feature && (
        <section className="min-h-[60vh] w-full flex justify-center items-center py-10">
          <div className="flex flex-col md:flex-row justify-center items-center px-5 gap-6 w-full md:max-w-5xl m-auto">
            <div className="flex justify-center items-start flex-col gap-4 w-full md:w-1/2">
              <h1 className="text-4xl font-semibold text-left">
                {feature[0].title}
              </h1>
              <p className="text-lg font-regular text-left">
                {feature[0].description}
              </p>
              <div className="flex items-center justify-start gap-4">
                <BtnProduct featureId={feature[0]._id} />
                <BtnAddToCartPrimary
                  featureId={feature[0]._id}
                  featureName={feature[0].title}
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 relative overflow-hidden max-h-96">
              <MyHero />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
