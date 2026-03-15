"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function PromoBanner() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-lg"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
              alt="Winter collection"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-foreground/60" />
          </div>

          {/* Content */}
          <div className="relative px-8 py-16 sm:px-16 sm:py-24 lg:py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1 bg-accent text-accent-foreground text-sm font-bold tracking-wider uppercase mb-6">
                Limited Time Offer
              </span>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-4">
                30% Off
              </h2>
              <p className="text-2xl sm:text-3xl font-serif text-primary-foreground/90 mb-8">
                Winter Collection
              </p>
              <p className="text-primary-foreground/70 max-w-md mx-auto mb-8">
                Embrace the season with our premium winter essentials. Quality craftsmanship meets contemporary design.
              </p>
              
              <Link href="/shop?sale=true">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 px-8 py-6 text-sm tracking-wider uppercase group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 w-20 h-20 border border-primary-foreground/20 rounded-full" />
          <div className="absolute bottom-8 right-8 w-32 h-32 border border-primary-foreground/20 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
