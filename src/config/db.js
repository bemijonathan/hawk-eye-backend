import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/ordcycle', { useNewUrlParser: true })
}
