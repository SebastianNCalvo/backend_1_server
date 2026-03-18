import { Router } from "express";
import { aggregateCourses } from "../controllers/aggregations.controller.js";
import { ordenationProducts } from "../controllers/ordenationProducts.controller.js";
import { ordenationCart } from "../controllers/ordenationCart.controller.js";

const router = Router();

router.get('/cursos/resumen', aggregateCourses);

router.get('/ordenationProducts', ordenationProducts);

router.get('/ordenationCart', ordenationCart);

export default router;