import Hero from "../../components/front/Hero";
import {Products} from "@/src/components/front/Products";
// import {getServerSession} from "next-auth/next";
// import {authOptions} from "@/src/lib/auth";
// import {NextSeo} from "next-seo";
// import {redirect} from "next/navigation";

export default function Homepage() {

    return (
        <>
            <Hero/>
            <Products/>
        </>
    )
}

