import { Cart } from '../models/Cart.js';
import { ICart, ICartUpdate } from "../interfaces/ICart.js";

export class CartService {
  static async createCart(cartData: ICart) {
    const cart = new Cart(cartData);
    try {
      const saved = await cart.save();
      return saved;
    } catch (error: any) {
      console.error('Mongoose save error:', error);
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((e: any) => e.message);
        console.error('Validation errors:', messages);
      }
      throw error;
    }
  }
  static async findById(id: string) {
    return await Cart.findById(id);
  }
  static async getAllCarts() {
    return await Cart.find();
  }
  static async updateCart(id: string, updateCartData: ICartUpdate) {
      return await Cart.findByIdAndUpdate(id, updateCartData, {new: true, runValidators: false});
  }
  static async deleteCart(id: string) {
      return await Cart.findByIdAndDelete();
  }

}