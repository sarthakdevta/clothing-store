"use client"

import Image from "next/image"
import Link from "next/link"
import { addToCart } from "@/lib/cart"

export default function ProductCard({ product }: any){

return(

<div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">

<Link href={`/product/${product.id}`}>

<div className="overflow-hidden">

<Image
src={product.image}
alt={product.name}
width={400}
height={400}
className="w-full h-[300px] object-cover hover:scale-110 transition duration-300"
/>

</div>

</Link>

<div className="p-5">

<h3 className="font-semibold text-lg">
{product.name}
</h3>

<p className="text-gray-500 mt-1">
₹{product.price}
</p>

<button
onClick={()=>addToCart(product)}
className="mt-4 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
>

Add to Cart

</button>

</div>

</div>

)

}