import { Router } from "express";
import { Curso } from "../config/models/Curso.model.js";
import { User } from "../config/models/User.model.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const cursos = await Curso.find();
        res.status(200).json({cursos: cursos})
    } catch (err) {
        res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

export default router;