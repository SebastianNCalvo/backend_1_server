import { Router } from "express";
import { Products } from "../config/models/product.model.js";
import mongoose from "mongoose";

const router = Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json({products: products});
    } catch (err) {
        return res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

// Get product by Id
router.get('/:id', async (req, res) => {
    try {
        const Id  = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).json({error: 'El formato del id no es valido'})
        };
        const product = await Products.findById(Id);
        if(!product) {
            return res.status(404).json({error: 'El producto no existe'})
        }
        res.status(200).json({product});
    } catch (err) {
        return res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

// Post product
router.post('/', async (req, res) => {
    try {
        const {name, price, category, stock} = req.body;
        if(!name || !price || !category || !stock){
            return res.status(400).json({error: 'Todos los campos son requeridos'});
        }
        const newProducts = new Products ({name, price, category, stock});
        await newProducts.save();
        res.status(201).json({message: 'Producto creado exitosamente', newProducts})
    } catch (err) {
        return res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

// Update product by Id
router.put('/:id', async (req, res) => {
    try {
        const Id  = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).json({error: 'El formato del id no es valido'})
        };
        const product = await Products.findByIdAndUpdate(Id, req.body, {
            new: true,
            runValidators: true
        });
        if(!product) {
            return res.status(404).json({error: 'El producto no existe'})
        }
        res.status(200).json({messege: 'Producto actualizado correctamente', product});
    } catch (err) {
        return res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

// Delete product by Id
router.delete('/:id', async (req, res) => {
    try {
        const Id  = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).json({error: 'El formato del id no es valido'})
        };
        const product = await Products.findByIdAndDelete(Id);
        if(!product) {
            return res.status(404).json({error: 'El producto no existe'})
        }
        res.status(204).end();
    } catch (err) {
        return res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})
export default router;