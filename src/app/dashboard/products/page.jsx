import axios from "redaxios"
import { BtnDisabled } from "@/src/components/admin/button/BtnDisabled"

export default async function Page() {
  const productData = await axios
    .get(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/products`, {
      next: { revalidate: 30 },
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })

  return (
    <section className="layout">
      <h1 className="title-dashboard mb-2">Products</h1>

      <BtnDisabled
        message={"Add newproduct"}
        path={"products/new"}
        className={"flex btn-primary"}
        size={"large"}
        svgSpecial={null}
      />

      <table className="basic mt-2">
        <thead className="border-black border-1">
          <tr className="border-gray-400 border-1 border">
            <td className="border-black border-1 text-2xl whitespace-nowrap">
              Product name
            </td>
          </tr>
        </thead>
        <tbody>
          {productData &&
            productData.map((product) => (
              <tr key={product._id}>
                <td className="w-1/2 pl-2">{product.title}</td>
                <td className="p-2 flex gap-2 justify-end">
                  <BtnDisabled
                    message={"Edit"}
                    path={"products/edit/" + product._id}
                    className="flex btn-primary"
                    svgSpecial={"edit"}
                    size={"small"}
                  />
                  <BtnDisabled
                    message={"Delete"}
                    path={"products/delete/" + product._id}
                    className="flex btn-secondary"
                    svgSpecial={"delete"}
                    size={"medium"}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  )
}
