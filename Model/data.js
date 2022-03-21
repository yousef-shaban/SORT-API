// const mongoose = require('mongoose')
import mongoose from 'mongoose'
const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{value} is not supported"
        }
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0.0
    },
    createdAt: {
        type: String,
        default: Date.now()
    },
    price: {
        type: Number,
        required: [true, "the product price must be provided."]
    }
})

export default mongoose.model('test', dataSchema)