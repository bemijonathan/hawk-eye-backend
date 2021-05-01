import mongoose from "mongoose"


const alertSchema = new mongoose.Schema({
    contacts: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'contact'
        }
    ],
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})

export const Alert = mongoose.model('alert', alertSchema)



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