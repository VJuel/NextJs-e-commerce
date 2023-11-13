import axios from "redaxios"

export async function getProductsBySort() {
  const data = await axios
    .get("http://localhost:3000/api/products", { next: { revalidate: 10 } })
    .then((res) => {
      return res.data.sort((a, b) => {
        return a.createdAt - b.createdAt
      })
    })
    .catch((err) => {
      console.log(err)
    })
  const productData =
    data &&
    data.sort((a, b) => {
      return a.createdAt - b.createdAt
    })
  return productData
}
