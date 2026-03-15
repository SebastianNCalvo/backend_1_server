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
        const {name, price, category} = await Products.findById(Id);
        const isInCart = await Cart.findOne({name: name});
        if (isInCart) {
            isInCart.quantity +=1
            res.status(200).json({message: 'Se sumó 1 más'})
        } else {
            const newCart = new Cart ({name, price, category});
            await newCart.save()
            res.status(200).json({newCart: newCart})
        }
    } catch (err) {
        return res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

router.delete('/', async (req, res) => {
    try {

    } catch (err) {
        return res.status(500).json({error: 'Error interno del servidor', message: err.message})
    } 
})

export default router;