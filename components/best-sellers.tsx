"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { ProductCard } from './product-card'
import { getBestSellers, products } from '@/lib/products'

export function BestSellers() {
  const bestSellers = getBestSellers()
  // If not enough best sellers, show some featured products
  const displayProducts = bestSellers.length >= 4 ? bestSellers : products.slice(2, 6)

  return (
    <section className="py-16 lg:py-24 bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent">
                Trending Now
              </p>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
              Best Sellers
            </h2>
            <p className="text-primary-foreground/70 max-w-md">
              Our most loved pieces that continue to define modern elegance
            </p>
          </div>
          <Link
            href="/shop?sort=bestselling"
            className="mt-4 sm:mt-0 inline-flex items-center text-sm font-medium uppercase tracking-wider hover:text-accent transition-colors group"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {displayProducts.map((product, index) => (
            <div key={product.id} className="[&_*]:text-primary-foreground [&_.bg-secondary]:bg-primary-foreground/10">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
