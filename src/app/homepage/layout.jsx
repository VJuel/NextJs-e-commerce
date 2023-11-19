import NavFront from "@/src/components/front/NavFront"
import { authOptions } from "@/src/lib/auth"
import { getServerSession } from "next-auth"

// import dynamic from "next/dynamic";
// const NavFront = dynamic(() => import('@/src/components/front/NavFront'), {
//     loading: () => <p>Loading...</p>,
//     ssr: false,
// })

//meta
// import { Metadata } from 'next'
// favicon.ico, apple-icon.jpg, and icon.jpg
// opengraph-image.jpg and twitter-image.jpg
// robots.txt
// sitemap.xml

// export const metadata = {
//     title: 'Homepage E-commerce',
//     description: 'Awesome E-commerce website',
// }

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <NavFront session={session} />
      <main>{children}</main>
    </>
  )
}
