import moongoose, {model, models, Schema} from "mongoose";
import mongoose from "mongoose";

const CategorySchema = new Schema({
    name: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, ref:'Category'},
    propreties: [{type: Object}]
})

export const Category= moongoose.models.Category || moongoose.model('Category', CategorySchema)