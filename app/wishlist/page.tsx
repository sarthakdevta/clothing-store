"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function WishlistPage() {
  // For now, show empty state. In a real app, this would be connected to user state/database
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
          <Heart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-serif font-bold mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Save your favorite items by clicking the heart icon on any product. Sign in to sync your wishlist across devices.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-sm uppercase tracking-wider">
              Explore Collection
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="border-foreground px-8 py-6 text-sm uppercase tracking-wider">
              Sign In
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
