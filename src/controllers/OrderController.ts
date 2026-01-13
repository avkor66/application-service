import {Request, Response} from 'express';
import {Cart} from "../models/Cart.js";
import {ICartMongoDB, ICartMongoDBCount, IOrder} from "../interfaces/ICart.js";
import {OrderService} from "../services/OrderService.js";
import {Order} from "../models/Order.js";

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

  static async getOrdersForAdmin(req: Request, res: Response) {
    try {
      const carts: ICartMongoDB[] = await Cart.find()
      const cartsOrders: Promise<ICartMongoDBCount>[] = carts.map(async (cart: ICartMongoDB) => {
        const ordersCount = await OrderService.getOrderCount(cart.id)
        return {...cart, ordersCount}
      })
      const finalCartsData: ICartMongoDBCount[] = await Promise.all(cartsOrders);
      return res.status(200).json(finalCartsData)
    } catch (error) { res.status(400).json(error instanceof Error ? { error: error.message } : { error: 'Unknown error' })}
  }

  static async getOrdersAndCartsForAdmin(req: Request, res: Response) {
    try {
      const carts = await Cart.find()
        .populate('orders')
        .exec();
      return res.status(200).json(carts)
    } catch (error) { res.status(400).json(error instanceof Error ? { error: error.message } : { error: 'Unknown error' })}
  }

}
