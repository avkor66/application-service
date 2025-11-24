import { Router } from 'express';
import { CartController } from "../controllers/CartController.js";
import {ProductController} from "../controllers/ProductController.js";

const productRoutes = Router();

productRoutes.get('/', ProductController.getAllProducts);
productRoutes.get('/series', ProductController.getAllSeriesGroup);
productRoutes.get('/series/brands', ProductController.getAllSeriesBrands);

export default productRoutes;