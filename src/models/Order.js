import { Timestamp } from "mongodb";
import mongoose, {model, Schema} from "mongoose";

const orderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    city: String,
    codePostal: String,
    StreetAdress: String,
    country: String,
    paid: Boolean,
}, {timestamps: true})

export const Order = mongoose.models.Order || model('Order', orderSchema)