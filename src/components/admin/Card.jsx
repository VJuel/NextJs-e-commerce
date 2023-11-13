import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { FaClipboardList, FaDollarSign, FaDollyFlatbed } from "react-icons/fa"
import { getProducts } from "@/src/lib/functions/getProducts"
import { getOrders } from "@/src/lib/functions/getOrders"
import { getIncome } from "@/src/lib/functions/getIncome"

export default async function CardDetails({ type }) {
  function getSvgIcon(type) {
    let svg
    // Logique pour choisir le bon SVG, peut-être même une requête à un serveur
    if (type === "Revenue") {
      svg = <FaDollarSign />
    } else if (type === "Orders") {
      svg = <FaClipboardList />
    } else {
      svg = <FaDollyFlatbed />
    }
    return svg
  }
  let svgIcon = getSvgIcon(type)

  async function getDifferentData() {
    let data
    // Logique pour choisir le bon SVG, peut-être même une requête à un serveur
    if (type === "Revenue") {
    } else if (type === "Orders") {
      data = await getOrders()
    } else {
      data = await getProducts()
    }
    return await getIncome()
  }

  let data = await getDifferentData()

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{type}</CardTitle>
          {svgIcon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-black">{data?.length}</div>
        </CardContent>
      </Card>
    </>
  )
}
