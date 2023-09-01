import "../../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Provider from "./provider";
// import Head from "next/head";
// import Head from "next/head";
// import {Metadata} from "next";

// import {ColorModeScript} from "@chakra-ui/react";
// import {NEXT_SEO_DEFAULT} from "@/src/components/next-seo-config";
// import {NextSeo} from "next-seo";

export const metadata = {
    title: 'Site E-commerce',
    descripton: 'Site E-commerce'
}

export default function RootLayout({children}) {
    //
    return (
        <html lang="fr" data-theme="corporate">
            <Provider>
                <body>
                    {children}
                </body>
            </Provider>
        </html>
    )
}