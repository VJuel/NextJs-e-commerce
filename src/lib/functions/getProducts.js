import axios from "redaxios"

export async function getProducts() {
  const productData = await axios
    .get("http://localhost:3000/api/products")
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })

  return productData
}
