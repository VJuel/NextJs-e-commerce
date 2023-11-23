import SearchBar from "@/src/components/front/SearchBar"
import Link from "next/link"

export default async function Products() {
  const productsData = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/products`
  ).then((res) => {
    return res.json()
  })
  return (
    <section className="layout bg-gray-100 min-h-[90vh] p-10 flex flex-col justify-center items-center w-full">
      <SearchBar productsData={productsData} />
    </section>
  )
}
