import { Router } from "express";
import { Cart } from "../config/models/cart.model.js";
import mongoose from "mongoose";
import { Products } from "../config/models/product.model.js";

const router = Router();

router.get('/', async (req, res) => {
    try{
        const cart = await Cart.find();
        res.status(200).json({cart: cart})
    } catch (err) {
        return res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const Id = req.body.id;
        if(!mongoose.Types.ObjectId.isValid(Id)){
            return res.status(400).json({error: 'El formato del id no es valido'})
        }
        const newProduct = await Products.findById(Id);
        const productInCart = await Cart.findOne({name: newProduct.name});
        if (productInCart) {
            const newproductInCart = await Cart.findByIdAndUpdate(productInCart.id, {$inc: {quantity:1}}, {new: true})
            res.status(200).json({message: newproductInCart})
        }
        else {
            const {name, price, category} = newProduct
            const newCart = new Cart ({name, price, category});
            await newCart.save()
            res.status(200).json({newCart: newCart})
        }
    } catch (err) {
        return res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

router.put('/discountone/:id', async (req, res) => {
    try {
        const Id  = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).json({error: 'El formato del id no es valido'})
        };
        const productInCart = await Cart.findById(Id);
        if(!productInCart) {
            return res.status(404).json({error: 'El producto no existe'})
        }
        if(productInCart.quantity > 1) {
            const newproductInCart = await Cart.findByIdAndUpdate(Id, {$inc: {quantity:-1}}, {new: true})
        } else {
            const newproductInCart = await Cart.findByIdAndDelete(Id)
        }
        res.status(204).end();
    } catch (err) {
        return res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const Id  = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).json({error: 'El formato del id no es valido'})
        };
        const { quantity } = req.body
        if (quantity < 0 || !Number.isInteger(quantity)) {
            return res.status(404).json({error: 'El parametro no es valido. La cantidad ingresada debe ser un número entero mayor que cero'})
        } else {
            const productInCart = await Cart.findByIdAndUpdate(Id, { quantity }, { new: true });
            if(!productInCart) {
                return res.status(404).json({error: 'El producto no existe'})
            }
            res.status(200).json({messege: 'Producto actualizado correctamente', productInCart});
        }
    } catch (err) {
        return res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const Id  = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).json({error: 'El formato del id no es valido'})
        };
        const productInCart = await Cart.findByIdAndDelete(Id);
        if(!productInCart) {
            return res.status(404).json({error: 'El producto no existe'})
        }
        res.status(204).end();
    } catch (err) {
        return res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

export default router;