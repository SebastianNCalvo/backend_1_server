import { Router } from "express";
import { Curso } from "../config/models/Curso.model.js";
import { Cart } from "../config/models/cart.model.js";

const router = Router();

router.get('/demo', async (req, res) => {
    const cursos = await Curso.find().populate('students', 'name email age');
    res.status(200).json(cursos);
})

router.get('/democart', async (req, res) => {
    const cart = await Cart.find().populate('idProduct', 'name');
    res.status(200).json(cart)
})


export default router;