"use client"

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Filter, X, ChevronDown, Grid3X3, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/products'
import { Suspense } from "react"

const categories = ['All', 'Men', 'Women', 'Jackets', 'Accessories']
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
]

export default function ShopPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : 'All'
  )
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [gridCols, setGridCols] = useState<3 | 4>(4)

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => (a.badge === 'new' ? -1 : 1))
        break
      default:
        break
    }

    return filtered
  }, [selectedCategory, sortBy])

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="bg-secondary py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-serif font-bold mb-4"
          >
            {selectedCategory === 'All' ? 'Shop All' : selectedCategory}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            Discover our curated collection of premium fashion essentials
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium tracking-wider uppercase transition-colors ${
                  selectedCategory === category
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-foreground hover:bg-foreground/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent border border-border px-4 py-2 pr-10 text-sm focus:outline-none focus:border-foreground cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
            </div>

            {/* Grid Toggle */}
            <div className="hidden lg:flex items-center border border-border">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 ${
                  gridCols === 3 ? 'bg-foreground text-background' : ''
                }`}
                aria-label="3 columns"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 ${
                  gridCols === 4 ? 'bg-foreground text-background' : ''
                }`}
                aria-label="4 columns"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredProducts.length} products
        </p>

        {/* Product Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 ${
            gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
          }`}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl font-medium mb-2">No products found</p>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters to find what you&apos;re looking for.
            </p>
            <Button onClick={() => setSelectedCategory('All')}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
