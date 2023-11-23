import axios from "redaxios"

export async function getProducts() {
  const productData = await axios
    .get(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/products`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })

  return productData
}
