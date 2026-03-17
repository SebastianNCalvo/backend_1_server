import { Router } from "express";
import { Mongoose } from "mongoose";
import { Curso } from "../config/models/Curso.model.js";
import { User } from "../config/models/User.model.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const cursos = await Curso.find();
        res.status(200).json({cursos: cursos});
    } catch (err) {
        res.status(500).json({error: 'Error interno del servidor', message: err.message});
    }
})

router.post('/', async (req, res) => {
    try {
        const { title } = await req.body;
        const courseLoader = await Curso.findOne({title: title})
        if (courseLoader){
            res.status(400).json({message: 'El curso ya se encuentra cargado'})
        } else {
            const newCourse = await Curso.create(req.body);
            res.status(201).json({curso: newCourse})
        }
    } catch (err) {
        res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

router.post('/:courseId/inscription/:studentId', async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.courseId);
        const alumno = await User.findById(req.params.studentId);

        if(!curso || !alumno) {
            return res.status(404).json({error: 'Curso o alumno no encontrado'})
        }

        if(curso.students.includes(alumno._id)){
            return res.status(400).json({error: `El alumno ${alumno.name} ya está inscripto en el curso ${curso.title}`})
        }

        curso.students.push(alumno._id);
        await curso.save();

        res.status(201).json({message: `El alumno ${alumno.name} fue inscripto en el curso ${curso.title} correctamente`, curso: curso})

    } catch (err) {
        res.status(500).json({error: 'Error interno del servidor', message: err.message})
    }
})

router.delete('/:courseId/inscription/:studentId', async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.courseId);

        if(!curso) {
            return res.status(404).json({error: 'Curso no encontrado'})
        };

        curso.students = curso.students.filter(
            (id) => id.toString() !== req.params.studentId
        )
        await curso.save();

        res.status(200).json({message: `El alumno fue eliminado del curso ${curso.title} correctamente`})
    } catch (err) {
        res.status(500).json({error: 'Error interno del servidor', message: err.message});
    }
})

router.delete('/:courseId', async (req, res) => {
    try{
        const curso = await Curso.findByIdAndDelete(req.params.courseId);

        if(!curso) {
            return res.status(404).json({error: 'Curso no encontrado'})
        }

        res.status(204).end();
    } catch (err) {
        res.status(500).json({error: 'Error interno del servidor', message: err.message});
    }
})

export default router;