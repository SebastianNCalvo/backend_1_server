import { Router } from "express";

const router = Router();
router.get('/', (req, res) =>{
    res.status(200).json( {title: 'Bienvenidos a los enrutadores'})
})

export default router;