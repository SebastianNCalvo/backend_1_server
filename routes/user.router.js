import { Router } from "express";
import { User } from "../config/models/User.model.js";
import mongoose from "mongoose";

const router = Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({users: users});
    } catch (err) {
        return router.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

// Get user by Id
router.get('/:id', async (req, res) => {
    try {
        const Id  = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).json({error: 'El formato del id no es valido'})
        };
        const user = await User.findById(Id);
        if(!user) {
            return res.status(404).json({error: 'El usuario no existe'})
        }
        res.status(200).json({user});
    } catch (err) {
        return router.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

// Post user
router.post('/', async (req, res) => {
    try {
        const {name, email, age} = req.body;
        if(!name || !email || !age){
            return res.status(400).json({error: 'Todos los campos son requeridos'});
        }
        const newUser = new User ({name, email, age});
        newUser.save();
        res.status(201).json({message: 'Usuario creado exitosamente', newUser})
    } catch (err) {
        return router.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

// Update user by Id
router.put('/:id', async (req, res) => {
    try {
        const Id  = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).json({error: 'El formato del id no es valido'})
        };
        const user = await User.findByIdAndUpdate(Id, req.body, {
            new: true,
            runValidators: true
        });
        if(!user) {
            return res.status(404).json({error: 'El usuario no existe'})
        }
        res.status(200).json({messege: 'Ususario actualizado correctamente', user});
    } catch (err) {
        return router.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

// Delete user by Id
router.delete('/:id', async (req, res) => {
    try {
        const Id  = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).json({error: 'El formato del id no es valido'})
        };
        const user = await User.findByIdAndDelete(Id);
        if(!user) {
            return res.status(404).json({error: 'El usuario no existe'})
        }
        res.status(204).end();
    } catch (err) {
        return router.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})
export default router;