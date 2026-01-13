import { Schema, model } from 'mongoose';
import { ICart } from '../interfaces/ICart.js';

const CartSchema = new Schema<ICart>({
  guestId: { type: String, required: [true, "GuestId required"], trim: true, maxlength: 55 },
  sessionId: { type: String, required: [true, "SessionId required"], trim: true, maxlength: 55 },
  device: { type: String, trim: true, maxlength: 15 },
  comment: { type: String, trim: true, maxlength: 255 },
  files: [{ type: String }],
  contact: {
    name: { type: String, trim: true, maxlength: 55 },
    phone: { type: String, trim: true, maxlength: 55 },
    email: { type: String, trim: true, maxlength: 55 },
  },
  userMeta: {
    ip: { type: String, trim: true, maxlength: 15 },
    userAgent: { type: String, trim: true, maxlength: 155 },
    referer: { type: String, trim: true, maxlength: 155 },
    createdAt: { type: Date, required: true }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

CartSchema.virtual('orders', {
  ref: 'Order',           // Имя целевой модели (Cart)
  localField: '_id',     // Поле в текущей модели (User), которое будет использоваться для поиска (это _id пользователя)
  foreignField: 'cartId',// Поле в целевой модели (Cart), которое содержит ссылку на User (это userId)
  justOne: false         // Указываем, что один User может иметь много Cart (многие корзины)
});

CartSchema.methods.toJSON = function() {
  const cart = this.toObject();
  delete cart.__v;
  return cart;
};

export const Cart = model<ICart>('Cart', CartSchema);