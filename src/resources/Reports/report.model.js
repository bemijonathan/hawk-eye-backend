import mongoose, { mongo } from "mongoose"


const reportSchema = new mongoose.Schema({
    title: String,
    content: String,
    media: [String],
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
})


export const Report = mongoose.model('post', reportSchema)