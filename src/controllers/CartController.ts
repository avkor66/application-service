import { Request, Response } from 'express';
import { ICart } from "../interfaces/ICart.js";
import { CartService } from "../services/CartService.js";

export class CartController {

  static async createCart(req: Request, res: Response) {
    try {
      if (req.body) req.body.userMeta.ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress
      const cart = req.body as ICart;
      const newCart = await CartService.createCart(cart);
      if (newCart) res.status(201).json({ success: true, message: 'Cart created' })
      else res.status(404).json({ success: false, message: 'Unknown error' })
    } catch (error) { res.status(400).json(error instanceof Error ? { error: error.message } : { error: 'Unknown error' })}
  }

  static async getAllCarts(req: Request, res: Response) {
    try {
      const carts = await CartService.getAllCarts();
      if (!carts) return res.status(404).json({ error: 'Carts not found' })
      res.status(200).json(carts)
    } catch (error) { res.status(400).json(error instanceof Error ? { error: error.message } : { error: 'Unknown error' })}
  }

  static async getCart(req: Request, res: Response) {
    try {
      const cart = await CartService.findById(req.params.id);
      if (!cart) return res.status(404).json({ error: 'Cart not found' })
      res.status(200).json(cart)
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