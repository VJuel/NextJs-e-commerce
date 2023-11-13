import Hero from "../../components/front/Hero"
import { ProductsHome } from "@/src/components/front/ProductsHome"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
// import {NextSeo} from "next-seo";
import { cookies } from "next/headers"

export default async function Homepage() {
  // const cookieSession = cookies().get("session")

  // if (!cookieSession) {
  //   redirect("/login")
  // }

  return (
    <>
      <Hero />
      <div className="bg-slate-950">
        <ProductsHome />
      </div>
    </>
  )
}
