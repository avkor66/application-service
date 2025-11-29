import { Router } from 'express';
import { CartController } from "../controllers/CartController.js";

const cartRoutes = Router();

cartRoutes.get('/costs', CartController.getAllCarts);
cartRoutes.post('/costs', CartController.createCart);
cartRoutes.put('/costs/:id', CartController.updateCart);
cartRoutes.delete('/costs/:id', CartController.deleteCart);
cartRoutes.get('/costs/user', CartController.getCart);

export default cartRoutes;