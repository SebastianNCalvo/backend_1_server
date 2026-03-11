import { Router } from "express";
import products from '../baseDeDatos.json' with { type: 'json' };

const router = Router()
router.get('/', (req, res) => {
    res.render('products', { 
        title: 'Productos', 
        products: products
    });
});

router.get('/:id', (req, res) => {
    const {id} = req.params
    // res.render('products', {
    //     products: products
    // })
    res.status(200).json(`Estás buscando el producto con id: ${id}. que es el producto:`, products)
})

export default router;