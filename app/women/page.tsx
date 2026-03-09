"use client"

import { getProducts } from "@/lib/products"
import ProductCard from "@/components/ProductCard"

export default function Women(){

const products = getProducts().filter((p:any)=>p.category==="women")

return(

<div style={{padding:"40px"}}>

<h2>Women Collection</h2>

<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"20px"}}>

{products.map((p:any)=>(
<ProductCard key={p.id} product={p}/>
))}

</div>

</div>

)

}