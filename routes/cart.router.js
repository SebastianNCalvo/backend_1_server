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
        const {name, price, category} = await Products.findById(Id);
        if(!mongoose.Types.ObjectId.isValid(Id)){
            return res.status(400).json({error: 'El formato del id no es valido'})
        }
        const segundoNombre= Cart.findOne(name)
        // if (name === Cart.findOne(name)){

        // }
        // const newCart = new Cart ({name, price, category});
        // await newCart.save()
        res.status(200).json({segundoNombre: segundoNombre})
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