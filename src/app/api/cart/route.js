import {Product} from "@/src/models/Product";
import {NextResponse} from "next/server";
import mongooseConnect from "@/src/lib/mongoose";

export async function POST(req, res) {
    try {
        await mongooseConnect();

        // Récupérer les identifiants depuis les données du panier
        const ids = await req.json();

        // Rechercher les produits correspondant aux identifiants dans la base de données
        const data = await Product.find({ _id: ids });

        // Retourner les données en tant que réponse JSON
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        // Gérer l'erreur et renvoyer une réponse appropriée si nécessaire
        return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des produits.' });
    }
}