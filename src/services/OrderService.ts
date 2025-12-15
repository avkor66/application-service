import {IOrder} from "../interfaces/ICart.js";
import {Order} from "../models/Order.js";

export class OrderService {
  static async createOrder(order: IOrder) {
    try {
      const newOrder = new Order(order);
      await newOrder.save();
      return newOrder;
    } catch (error: any) {
      console.error('Mongoose save error:', error);
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((e: any) => e.message);
        console.error('Validation errors:', messages);
      }
      throw error;
    }
  }
  static async getOrder(cartId: string) {
    try {
      const order: IOrder[] = await Order.find({cartId});
      return order;
    } catch (error: any) {
      console.error('Mongoose save error:', error);
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((e: any) => e.message);
        console.error('Validation errors:', messages);
      }
      throw error;
    }
  }
  static async getAllOrders() {
    try {
      const orders: IOrder[] = await Order.find();
      return orders;
    } catch (error: any) {
      console.error('Mongoose save error:', error);
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((e: any) => e.message);
        console.error('Validation errors:', messages);
      }
      throw error;
    }
  }
}