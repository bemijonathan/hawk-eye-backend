import mongoose from "mongoose"


const categorySchema = new mongoose.Schema({
    title: String, //Rape
    slug: String, // rape
    message: String
})

export const Category = mongoose.model('category', categorySchema)