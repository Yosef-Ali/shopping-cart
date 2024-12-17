import { Product } from '@/types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Dates',
    price: 12.99,
    image: '/placeholder.svg?height=300&width=300',
    description: 'Sweet and nutritious organic dates',
    category: 'dried-fruits',
  },
  {
    id: '2',
    name: 'Fresh Kiwis',
    price: 8.99,
    image: '/placeholder.svg?height=300&width=300',
    description: 'Vitamin-rich organic kiwis',
    category: 'fresh-fruits',
  },
  {
    id: '3',
    name: 'Juicy Oranges',
    price: 5.99,
    image: '/placeholder.svg?height=300&width=300',
    description: 'Sweet and juicy organic oranges',
    category: 'citrus',
  },
  {
    id: '4',
    name: 'Fresh Apples',
    price: 6.99,
    image: '/placeholder.svg?height=300&width=300',
    description: 'Crisp and delicious organic apples',
    category: 'fresh-fruits',
  },
]

export const coupons = [
  { code: 'FRESH10', discount: 0.1 },
  { code: 'ORGANIC20', discount: 0.2 },
]

