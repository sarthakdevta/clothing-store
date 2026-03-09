"use client"

import { useState } from "react"
import { saveProduct } from "@/lib/products"

export default function AddProduct(){

const [name,setName] = useState("")
const [price,setPrice] = useState("")
const [image,setImage] = useState("")
const [category,setCategory] = useState("men")
const [sale,setSale] = useState(false)

function add(){

const product={
id:Date.now(),
name,
price:Number(price),
image,
category,
sale,
sizes:["S","M","L","XL"]
}

saveProduct(product)

alert("Product added")

}

return(

<div className="max-w-xl mx-auto p-10">

<h2 className="text-2xl font-bold mb-6">
Add Product
</h2>

<input
placeholder="Name"
className="border w-full p-3 mb-3"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Price"
className="border w-full p-3 mb-3"
onChange={(e)=>setPrice(e.target.value)}
/>

<input
placeholder="Image URL"
className="border w-full p-3 mb-3"
onChange={(e)=>setImage(e.target.value)}
/>

<select
className="border w-full p-3 mb-3"
onChange={(e)=>setCategory(e.target.value)}

>

<option value="men">Men</option>
<option value="women">Women</option>

</select>

<label className="flex gap-2 mb-4">

<input type="checkbox" onChange={(e)=>setSale(e.target.checked)}/>

Sale Product

</label>

<button
className="bg-black text-white px-6 py-3 rounded"
onClick={add}

>

Add Product </button>

</div>

)
}
