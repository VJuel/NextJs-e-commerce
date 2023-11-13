import Image from "next/image"
import logo from "../../assets/moi.png"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/src/lib/auth"
import axios from "redaxios"
import CardDetails from "@/src/components/admin/Card"
import { Skeleton } from "@/src/components/ui/skeleton"
import { Suspense } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  const productData = await axios
    .get("http://localhost:3000/api/products", { next: { revalidate: 30 } })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })

  if (!session) {
    redirect("/signin")
  }

  if (session && session?.user?.role === "USER") {
    return redirect("/homepage")
  }

  function camelCase(string) {
    return string.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase()
    })
  }

  const MyLogo = (width, height) => {
    return <Image src={logo} alt="Photo de l'auteur" width="80" height="80" />
  }

  const Loading = () => {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="text-blue-800 flex flex-col gap-6">
      <div className="flex justify-start items-start md:justify-between md:items-center flex-col md:flex-row">
        <div className="font-semibold text-lg">
          Hello{" "}
          {(session?.user?.name !== null && camelCase(session?.user?.name)) ||
            ""}
        </div>
        <div className="flex md:bg-gray-200 bg-none md:items-center md:justify-center gap-4 flex-col md:flex-row justify-start items-start">
          {session?.user?.image ? (
            <img
              className="w-10"
              src={session?.user?.image}
              alt={session?.user?.name}
            />
          ) : (
            <MyLogo />
          )}
          <span className="pr-3 font-semibold text-lg">
            {session?.user?.email}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* products */}
        <Suspense fallback={<Loading />}>
          <CardDetails type="products" />
        </Suspense>

        {/* revenu */}
        <CardDetails type="Revenue" />

        {/* Orders */}
        <CardDetails type="Orders" />
      </div>
    </div>
  )
}
