'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { coupons } from '@/lib/data'

export function Cart() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, couponCode, setCouponCode } = useCart()
  const [couponInput, setCouponInput] = useState('')

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const discount = couponCode ? 
    coupons.find(c => c.code === couponCode)?.discount || 0 : 0
  const total = subtotal * (1 - discount)

  const handleApplyCoupon = () => {
    const validCoupon = coupons.find(c => c.code === couponInput)
    if (validCoupon) {
      setCouponCode(couponInput)
      setCouponInput('')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l bg-background p-6"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                <Button variant="ghost" size="icon" onClick={toggleCart}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-auto py-4">
                {items.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-lg border p-4"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)}/kg
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(item.id, item.quantity - 1)
                                } else {
                                  removeItem(item.id)
                                }
                              }}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const value = parseInt(e.target.value)
                                if (!isNaN(value) && value > 0) {
                                  updateQuantity(item.id, value)
                                }
                              }}
                              className="w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <Button onClick={handleApplyCoupon}>Apply</Button>
                </div>
                {couponCode && (
                  <p className="text-sm text-green-600">
                    Coupon applied: {(discount * 100)}% off
                  </p>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span>Discount</span>
                    <span>-${(subtotal * discount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

