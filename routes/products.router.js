import { Router } from "express";
import products from '../baseDeDatos.json' with { type: 'json' };

const router = Router()
router.get('/', (req, res) => {
    res.status(200).json({products})
});

router.get('/:id', (req, res) => {
    const {id} = req.params
    res.status(200).json(`Estás buscando el producto con id: ${id}. que es el producto: ${JSON.stringify(products[id].name)}`)
})

export default router;