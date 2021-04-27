import mongoose from "mongoose"


const categorySchema = new mongoose.Schema({
    title: String,
    slug: String
})

export const Category = mongoose.model('category', categorySchema)