export interface ICart {
  guestId: string,
  sessionId: string,
  device: string,
  status: string,
  cart: Cart[],
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

interface Cart {
  height: number,
  outerDiameter: number,
  innerDiameter: number,
  species: string,
  stateStandard: string,
  diameter: string,
  length: string,
  threadLength: string,
  steelGrade: string,
}


export interface ICartUpdate {
  cart: {
    height?: number,
    outerDiameter?: number,
    innerDiameter?: number,
    species?: string,
    stateStandard?: string,
    diameter?: string,
    length?: string,
    threadLength?: string,
    steelGrade?: string,
  },
}