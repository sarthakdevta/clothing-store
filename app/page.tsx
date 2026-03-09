import { getProducts } from "@/lib/products"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"

export default function Home(){

const products = getProducts()

return(

<main>

<section className="bg-gray-100 h-[70vh] flex items-center justify-center">

<div className="text-center">

<h1 className="text-5xl font-bold mb-6">
New Streetwear Collection
</h1>

<p className="text-gray-600 mb-8">
Discover premium quality fashion designed for modern lifestyle
</p>

<Link href="#products">

<button className="bg-black text-white px-8 py-3 rounded-lg">
Shop Now
</button>

</Link>

</div>

</section>

<section id="products" className="max-w-7xl mx-auto px-6 py-16">

<h2 className="text-3xl font-bold mb-10">
Featured Products
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

{products.map((product:any)=>(
<ProductCard key={product.id} product={product}/>
))}

</div>

</section>

</main>

)

}