import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost:27017/ordcycle', { useNewUrlParser: true })
}
