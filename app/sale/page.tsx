"use client"

import { getProducts } from "@/lib/products"
import ProductCard from "@/components/ProductCard"

export default function Sale(){

const products = getProducts().filter((p:any)=>p.sale)

return(

<div style={{padding:"40px"}}>

<h2>Sale Products</h2>

<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"20px"}}>

{products.map((p:any)=>(
<ProductCard key={p.id} product={p}/>
))}

</div>

</div>

)

}