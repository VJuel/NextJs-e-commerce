import mongooseConnect from "@/src/lib/mongoose";
import {Product} from "@/src/models/Product";


export async function POST(req, res) {
    await mongooseConnect()
    const {name, email, city, codePostal, streetAdress, country, products} = await req.body;
    console.log(products)
    const productsIds = products.split(',')
    const uniqueIds = [...new Set(productsIds)]
    const productsInfos = await Product.find({_id: uniqueIds})

    let lineItems = []
    for (const productId of uniqueIds) {
        const productInfos = productsInfos.find(product => product._id.toString() === productId)
        const quantity = productsIds.filter(id => id == productId).length || 0
        if (quantity > 0 && productInfos) {
            lineItems.push({
                quantity: quantity,
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: productInfos.title,
                     },
                    unit_amount: productInfo.price * 100
                },
            })
        }
    }

    return NextResponse.json(lineItems)
}