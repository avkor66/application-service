import { Router } from 'express';
import { OrderController } from "../controllers/OrderController.js";

const orderRoutes = Router();

orderRoutes.get('/', OrderController.getOrdersAndCartsForAdmin);
orderRoutes.get('/guest/:guestId', OrderController.getOrdersByGuestId);

export default orderRoutes;