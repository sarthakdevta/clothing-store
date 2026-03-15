"use client"

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Minus, Plus, ShoppingBag, Truck, RotateCcw, Shield, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { getProductById, products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { notFound } from 'next/navigation'

const sizes = ['XS', 'S', 'M', 'L', 'XL']

const features = [
  { icon: Truck, label: 'Free Shipping', description: 'On orders over $100' },
  { icon: RotateCcw, label: 'Easy Returns', description: '30-day return policy' },
  { icon: Shield, label: 'Quality Guarantee', description: 'Premium materials' },
]

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const product = getProductById(resolvedParams.id)
  
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  if (!product) {
    notFound()
  }

  const images = [product.image, product.hoverImage || product.image]
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity,
    })
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <div
                  className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium uppercase tracking-wider ${
                    product.badge === 'sale'
                      ? 'bg-accent text-accent-foreground'
                      : product.badge === 'new'
                      ? 'bg-foreground text-background'
                      : 'bg-background text-foreground'
                  }`}
                >
                  {product.badge === 'sale' ? `${discount}% Off` : product.badge}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-secondary overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-foreground' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-bold">
                      SAVE {discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Size</span>
                <button className="text-sm text-muted-foreground hover:text-accent underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-sm font-medium border transition-colors ${
                      selectedSize === size
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="text-sm font-medium block mb-3">Quantity</span>
              <div className="inline-flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-secondary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-secondary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 bg-foreground text-background hover:bg-foreground/90 py-6 text-sm uppercase tracking-wider"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={() => setIsWishlisted(!isWishlisted)}
                size="lg"
                variant="outline"
                className={`px-6 py-6 border-foreground ${
                  isWishlisted ? 'bg-accent text-accent-foreground border-accent' : ''
                }`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Buy Now */}
            <Link href="/cart">
              <Button
                onClick={handleAddToCart}
                size="lg"
                variant="outline"
                className="w-full border-foreground py-6 text-sm uppercase tracking-wider"
              >
                Buy Now
              </Button>
            </Link>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              {features.map((feature) => (
                <div key={feature.label} className="text-center">
                  <feature.icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs font-medium">{feature.label}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-sm font-medium uppercase tracking-wider mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Elevate your wardrobe with this premium piece crafted from the finest materials. 
                Designed with attention to detail, this {product.name.toLowerCase()} combines 
                contemporary style with timeless elegance. Perfect for both casual and formal occasions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
