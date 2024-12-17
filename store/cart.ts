import { create } from 'zustand'
import { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  couponCode: string | null
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  toggleCart: () => void
  setCouponCode: (code: string | null) => void
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  isOpen: false,
  couponCode: null,
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          isOpen: true,
        }
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
        isOpen: true,
      }
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setCouponCode: (code) => set({ couponCode: code }),
}))

