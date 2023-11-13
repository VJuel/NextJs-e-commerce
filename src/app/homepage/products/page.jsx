import SearchBar from "@/src/components/front/SearchBar"
import Link from "next/link"

export default async function Products() {
  const productsData = await fetch(`http://localhost:3000/api/products`).then(
    (res) => {
      return res.json()
    }
  )
  return (
    <section className="p-10 flex flex-col justify-center items-center w-full">
      <SearchBar productsData={productsData} />
    </section>
  )
}
