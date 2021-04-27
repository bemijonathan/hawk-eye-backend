import mongoose from "mongoose"


const ContactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
    },
    phone: String,
    email: String,
    name: String
})

export const Contact = mongoose.model('contact', ContactSchema)