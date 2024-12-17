export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Coupon {
  code: string
  discount: number
}

