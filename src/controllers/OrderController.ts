import { Request, Response } from 'express';
import {Cart} from "../models/Cart.js";

export class OrderController {

  static async getOrdersByGuestId(req: Request, res: Response) {
    try {
      const {guestId} = req.params;
      console.log('guestId');
      console.log(guestId);
      const orders = await Cart.find({guestId})
      console.log(orders);
      return res.status(200).json(orders)
    } catch (error) { res.status(400).json(error instanceof Error ? { error: error.message } : { error: 'Unknown error' })}
  }

}
