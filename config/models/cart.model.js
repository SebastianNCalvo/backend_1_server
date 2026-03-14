import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uniqued: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
})

export const Cart = mongoose.model('Cart', cartSchema);