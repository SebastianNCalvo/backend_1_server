import { Router } from "express";
import products from '../baseDeDatos.json' with { type: 'json' };

const router = Router()
router.get('/', (req, res) => {
    res.render('products', { 
        title: 'Productos', 
        products: products
    });
});

export default router;