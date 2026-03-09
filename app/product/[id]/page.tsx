"use client"

import { getProducts } from "@/lib/products"
import { useState } from "react"
import { useParams } from "next/navigation"
import { addToCart } from "@/lib/cart"

export default function ProductPage(){

const params = useParams()

const products = getProducts()

const product = products.find((p:any)=>p.id==Number(params.id))

const [size,setSize] = useState(product?.sizes?.[0])

if(!product) return <p>Product not found</p>

return(

<div className="max-w-6xl mx-auto p-10 grid grid-cols-2 gap-10">

<img src={product.image} className="w-full rounded-xl"/>

<div>

<h1 className="text-3xl font-bold mb-3">
{product.name}
</h1>

<p className="text-xl mb-6">
₹{product.price}
</p>

<h3 className="font-semibold mb-3">
Select Size
</h3>

<div className="flex gap-3 mb-6">

{product.sizes.map((s:any)=>(

<button
key={s}
onClick={()=>setSize(s)}
className={`px-4 py-2 border rounded-lg ${
size===s ? "bg-black text-white" : "bg-white"
}`}
>

{s}

</button>

))}

</div>

<button
onClick={()=>addToCart({...product,size})}
className="bg-black text-white px-8 py-3 rounded-lg"
>

Add To Cart

</button>

</div>

</div>

)

}