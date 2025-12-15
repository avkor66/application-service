import { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces/ICart.js';

const OrderSchema = new Schema<IOrder>({
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart' },
    diameter: { type: String, trim: true, maxlength: 10 },
    height: Number,
    innerDiameter: Number,
    length: { type: String, trim: true, maxlength: 15 },
    outerDiameter: Number,
    price: Number,
    productId: { type: String, trim: true, maxlength: 45 },
    quantity: Number,
    species: { type: String, required: true, trim: true, maxlength: 15 },
    stateStandard: { type: String, trim: true, maxlength: 55 },
    steelGrade: { type: String, trim: true, maxlength: 25 },
    threadLength: { type: String, trim: true, maxlength: 15 },
    execution: { type: String, trim: true, maxlength: 15 },
    threadPitch: Number,
    spannerSize: Number,
    weightKg: Number,
    plateDimensions: { type: String, trim: true, maxlength: 55 },
    anchorSpecifications: { type: String, trim: true, maxlength: 55 },
    status: { type: String, trim: true, maxlength: 15 },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

OrderSchema.methods.toJSON = function() {
  const order = this.toObject();
  delete order.__v;
  return order;
};

export const Order = model<IOrder>('Order', OrderSchema);