import { Hero } from '@/components/hero'
import { CategorySection } from '@/components/category-section'
import { FeaturedProducts } from '@/components/featured-products'
import { NewArrivals } from '@/components/new-arrivals'
import { PromoBanner } from '@/components/promo-banner'
import { BestSellers } from '@/components/best-sellers'

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <NewArrivals />
      <PromoBanner />
      <BestSellers />
    </>
  )
}
