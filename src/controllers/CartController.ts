import { Request, Response } from 'express';
import {ICart, IOrder} from "../interfaces/ICart.js";
import { CartService } from "../services/CartService.js";
import {OrderService} from "../services/OrderService.js";
import {Order} from "../models/Order.js";

export class CartController {

  static async createCart(req: Request, res: Response) {
    try {
      if (req.body) req.body.cart.userMeta.ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress
      const cart = req.body.cart as ICart;
      const orders = req.body.orders as IOrder[];
      const newCart = await CartService.createCart(cart);
      const newOrders = []
      for (const currentOrder of orders) {
        currentOrder.cartId = newCart._id
        currentOrder.status = "Создана"
        newOrders.push(await OrderService.createOrder(currentOrder))
      }

      console.log(newCart)
      console.log(newOrders)

      fetch(process.env.COST_CALCULATION_SERVICE_HOST + '/calculation/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrders)
      }).then(async res => {
        const result = await res.json()
          console.log("result")
          console.log(result)
        if (result) {

          for (const line of result.orders) {
            const newData = await Order.findOneAndUpdate({_id: line.orderId},
              {
                price: line.totalPrice,
                status: "Посчитано"
              }, {new: true}
            )
            console.log(newData)
          }
        } else {
          console.log("status no OK")
        }


      }
      ).catch(err =>
      {
        console.log("err")
        console.log(err)
      }
      )
      return res.status(201).json({ success: true, message: 'Cart created and calculation started' })
    } catch (error) { res.status(400).json(error instanceof Error ? { error: error.message } : { error: 'Unknown error' })}
  }

  static async getAllCarts(req: Request, res: Response) {
    try {
      console.log('getAllCarts called');
      console.log(req.params);
      const carts = await CartService.getAllCarts();
      if (!carts) return res.status(404).json({ error: 'Carts not found' })
      const orders = await OrderService.getAllOrders()
      res.status(200).json({carts, orders})
    } catch (error) { res.status(400).json(error instanceof Error ? { error: error.message } : { error: 'Unknown error' })}
  }

  static async getCart(req: Request, res: Response) {
    try {
      console.log('getCart called');
      console.log(req.query);

      const carts = await CartService.getAllCarts();
      const newCart = carts.filter(cart => cart.contact.email === req.query.email);
      const Orders: IOrder[] = []
      for (const newCartElement of newCart) {
        const newOrder: IOrder[] = await OrderService.getOrder(newCartElement.id)
        Orders.push(...newOrder)
      }

      if (!newCart) return res.status(404).json({ error: 'Cart not found' })

      res.status(200).json(Orders)
    } catch (error) { res.status(400).json(error instanceof Error ? { error: error.message } : { error: 'Unknown error' })}
  }

  static async updateCart(req: Request, res: Response) {
    try {
      const cartUpdate = await CartService.updateCart(req.params.id, emptyFieldsObjectDelete(req.body));
      if (!cartUpdate) return res.status(404).json({ error: 'Cart not found' })
      res.status(200).json(cartUpdate)
    } catch (error) { res.status(400).json(error instanceof Error ? { error: error.message } : { error: 'Unknown error' })}
  }

  static async deleteCart(req: Request, res: Response) {
    try {
      const cartDelete = await CartService.deleteCart(req.params.id);
      if (!cartDelete) return res.status(404).json({ error: 'Cart not found' })
      res.status(200).json({ success: true, message: 'Cart was successfully deleted' })
    } catch (error) { res.status(400).json(error instanceof Error ? { error: error.message } : { error: 'Unknown error' })}
  }
}

function emptyFieldsObjectDelete(obj: any): any {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as any);
}