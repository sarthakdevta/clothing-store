import { Suspense } from "react"
import ShopContent from "./shop-content"

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  )
}