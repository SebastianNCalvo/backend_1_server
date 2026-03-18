import { json } from "express";
import { Curso } from "../config/models/Curso.model.js";

export const aggregateCourses = async (req, res) => {
    try {
        const resultado = await Curso.aggregate([
            {
                $sort: {name:1}
            },
            {
                $group: {
                    _id: null,
                    cursos: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    _id: "resumenCursos",
                    totalCursos: { $size: "$cursos" },
                    cursos: 1
                }
            },
            {
                $merge: {
                    into: "orders",
                    whenMatched: "replace",
                    whenNotMatched: "insert"
                }
            }
        ])

        res.status(200).json({ message: "Resumen generado y guardado en 'orders'" });
    } catch (error) {
        console.error("Error, se producjo un error en aggregateCourses. ", error);
        res.status(500).json({ error: "Error, se producjo un error en aggregateCourses."})
    }
}