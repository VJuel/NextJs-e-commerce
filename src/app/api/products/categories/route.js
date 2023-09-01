import {NextResponse,NextRequest} from "next/server";
import mongooseConnect from '@/src/lib/mongoose';
import { Category } from '@/src/models/Category';
import { Product } from '@/src/models/Product';


async function main() {
    try {
        await mongooseConnect()
    } catch (e) {
        console.log(e)
    }
}

export async function GET(req, res) {
    await main();
    const productsByCategory = {};
    
    try {
        const allCategories = await Category.find();

        for (const category of allCategories) {
            const products = await Product.find({ category: category.name });
            productsByCategory[category.name] = products;
        }
        
        return NextResponse.json(productsByCategory);
    
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Une erreur est survenue" });
    }
}