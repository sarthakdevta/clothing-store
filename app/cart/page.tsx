"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/cart-context'

const shippingThreshold = 100

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart()

  const shippingCost = total >= shippingThreshold ? 0 : 10
  const freeShippingRemaining = Math.max(0, shippingThreshold - total)

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-serif font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link href="/shop">
            <Button className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-sm uppercase tracking-wider">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-serif font-bold text-center"
          >
            Shopping Cart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center mt-2"
          >
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </motion.p>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {freeShippingRemaining > 0 && (
        <div className="bg-foreground text-primary-foreground py-3">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 text-sm">
              <Truck className="h-4 w-4" />
              <span>
                Add <strong>${freeShippingRemaining.toFixed(2)}</strong> more for FREE shipping!
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-sm font-medium text-muted-foreground uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
              <div className="col-span-1"></div>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-border">
              {items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="py-6"
                >
                  <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                    {/* Product Info */}
                    <div className="col-span-6 flex gap-4">
                      <Link
                        href={`/product/${item.id}`}
                        className="relative w-24 h-32 bg-secondary flex-shrink-0"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-col justify-center">
                        <Link
                          href={`/product/${item.id}`}
                          className="font-medium hover:text-accent transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          Size: {item.size}
                        </p>
                        <p className="text-sm font-medium mt-2 md:hidden">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center mt-4 md:mt-0">
                      <div className="inline-flex items-center border border-border">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity - 1)
                          }
                          className="p-2 hover:bg-secondary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="p-2 hover:bg-secondary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-3 text-right font-medium hidden md:block">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove */}
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="p-2 text-muted-foreground hover:text-accent transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="flex justify-between items-center pt-6">
              <Link
                href="/shop"
                className="text-sm font-medium uppercase tracking-wider hover:text-accent transition-colors"
              >
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-secondary p-6 lg:p-8 sticky top-24"
            >
              <h2 className="text-lg font-serif font-bold mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="text-sm font-medium block mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    className="bg-background border-border"
                  />
                  <Button variant="outline" className="border-foreground shrink-0">
                    Apply
                  </Button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 text-sm border-t border-border pt-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base pt-3 border-t border-border">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${(total + shippingCost).toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                className="w-full bg-foreground text-background hover:bg-foreground/90 mt-6 py-6 text-sm uppercase tracking-wider group"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center mb-3">
                  Secure checkout powered by
                </p>
                <div className="flex items-center justify-center gap-3">
                  {['Visa', 'MC', 'Amex', 'PayPal'].map((method) => (
                    <span
                      key={method}
                      className="px-2 py-1 bg-background text-xs rounded"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
