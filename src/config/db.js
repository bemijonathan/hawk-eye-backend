import mongoose from "mongoose";
import { Category } from "../resources/category/category.model";
import { data } from '../utils/data/category';
import { Logger } from "../utils/logger";

export const dbConnection = () => {
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/ordcycle', { useNewUrlParser: true })
}

export const SetUp = async () => {
    try {
        const categoryData = await Category.find({});
        if (categoryData.length !== data.length) {
            await Category.deleteMany()
            await Category.insertMany(data)
            Logger("fixed setup")
        }

    } catch (error) {
        Logger(error)
    }
}