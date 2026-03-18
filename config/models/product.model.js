import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
    stock: {
        type: Number,
        required: true
    }
});

productSchema.pre('save', function(){
    console.log(`Guardado el producto ${this.name}`);
})

productSchema.post('find', function(result){
    console.log(`Se consultaron por ${result.length} productos`)
})

export const Products = mongoose.model('Product', productSchema);