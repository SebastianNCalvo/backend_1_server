import { Router } from "express";
import { Curso } from "../config/models/Curso.model.js";
import { User } from "../config/models/User.model.js";

const router = Router();

router.get('/demo', async (req, res) => {
    const cursos = await Curso.find().populate('students', 'name email age');
    res.status(200).json(cursos);
})

export default router;