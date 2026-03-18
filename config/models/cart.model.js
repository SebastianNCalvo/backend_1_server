import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uniqued: true,
        index: true
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

cartSchema.pre('save', function(){
    console.log(`El producto ${this.name} se agregó al carrito exitosamente`);
})

cartSchema.post('find', function(result){
    console.log(`En el carrito hay ${result.length} productos`)
})

export const Cart = mongoose.model('Cart', cartSchema);