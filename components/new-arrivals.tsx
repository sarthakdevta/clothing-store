"use client"

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProductCard } from './product-card'
import { getNewArrivals, products } from '@/lib/products'

export function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const newProducts = getNewArrivals()
  // If we don't have enough new arrivals, show recent products
  const displayProducts = newProducts.length >= 4 ? newProducts : products.slice(0, 6)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12"
        >
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-2">
              Just Dropped
            </p>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
              New Arrivals
            </h2>
            <p className="text-muted-foreground max-w-md">
              The latest additions to our collection, fresh from the runway
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('left')}
                className="rounded-full border-foreground/20 hover:bg-foreground hover:text-background"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('right')}
                className="rounded-full border-foreground/20 hover:bg-foreground hover:text-background"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <Link
              href="/shop?category=new"
              className="hidden sm:inline-flex items-center text-sm font-medium uppercase tracking-wider hover:text-accent transition-colors group"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {displayProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[280px] sm:w-[300px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
