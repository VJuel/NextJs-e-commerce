import Hero from "../../components/front/Hero";
import {ProductsHome} from "@/src/components/front/ProductsHome";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/src/lib/auth";
import { redirect } from "next/dist/server/api-utils";
// import {NextSeo} from "next-seo";
// import {redirect} from "next/navigation";

export default async function Homepage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return redirect('/signin')
    }

    return (
        <>
            <Hero/>
            <div className="bg-slate-950">
                <ProductsHome/>
            </div>
        </>
    )
}

