import NavFront from "@/src/components/front/NavFront"

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

export default function Layout({ children }) {
  return (
    <>
      <NavFront />
      <main>{children}</main>
    </>
  )
}
