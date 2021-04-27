import mongoose, { mongo } from "mongoose"


const reportSchema = new mongoose.Schema({
    title: String,
    content: String,
    ngo: [{
        type: String,
    }],
    police: [{
        type: String,

    }],
    title: String,
    body: String,
    image: String,
    video: String,
    sound: String,
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
})


// const alertSchema = new mongoose.Schema({
//     title: String,
//     body: String,
//     content: String,
//     contact: [],
//      userId: {
//         type: mongoose.SchemaTypes.ObjectId,
//         ref: 'user'
//     }
// })

export const Report = mongoose.model('post', reportSchema)