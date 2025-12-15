export interface ICart {
  guestId: string,
  sessionId: string,
  device: string,
  comment: string,
  files: string[]
  contact: {
    name: string,
    phone: string,
    email: string
  },
  userMeta: {
    ip: string,
    userAgent: string,
    referer: string,
    createdAt: Date
  }
}

export interface IOrder {
  cartId: object,
  height: number,
  outerDiameter: number,
  innerDiameter: number,
  species: string,
  stateStandard: string,
  diameter: string,
  execution: string,
  length: string,
  threadLength: string,
  steelGrade: string,
  quantity: number,
  price: number,
  productId: string
  threadPitch: number,
  spannerSize: number,
  weightKg: number,
  plateDimensions: string,
  anchorSpecifications: string,
  status: string,
}

export interface IOrderUpdate {
  height?: number,
  outerDiameter?: number,
  innerDiameter?: number,
  species?: string,
  stateStandard?: string,
  diameter?: string,
  length?: string,
  threadLength?: string,
  steelGrade?: string,
}