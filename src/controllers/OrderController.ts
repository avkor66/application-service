import { Request, Response } from 'express';
import {Cart} from "../models/Cart.js";
import {IOrder} from "../interfaces/ICart.js";
import {OrderService} from "../services/OrderService.js";

export class OrderController {

  static async getOrdersByGuestId(req: Request, res: Response) {
    try {
      const {guestId} = req.params;
      console.log('guestId');
      console.log(guestId);
      const carts = await Cart.find({guestId})
      const orders: IOrder[] = []
      for (const newCartElement of carts) {
        const newOrder: IOrder[] = await OrderService.getOrder(newCartElement.id)
        orders.push(...newOrder)
      }
      console.log(orders);
      return res.status(200).json(orders)
    } catch (error) { res.status(400).json(error instanceof Error ? { error: error.message } : { error: 'Unknown error' })}
  }

}
