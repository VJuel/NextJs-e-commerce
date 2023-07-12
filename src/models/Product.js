import moongoose, {model, Schema} from "mongoose";
import mongoose from "mongoose";

const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    category: {type:  String, ref:'Category'},
    images: [{type: String}],
    featured: {type: Boolean, default: false},
}, {timestamps: true})

export const Product =  mongoose.models.Product || mongoose.model('Product', ProductSchema)