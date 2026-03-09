"use client"

import { useEffect,useState } from "react"
import { getProducts } from "@/lib/products"

export default function AdminProducts(){

const [products,setProducts] = useState<any[]>([])
const [editing,setEditing] = useState<number|null>(null)

useEffect(()=>{
setProducts(getProducts())
},[])

function deleteProduct(id:number){

const updated = products.filter(p=>p.id!==id)

localStorage.setItem("products",JSON.stringify(updated))
setProducts(updated)

}

function update(index:number,key:string,value:any){

const updated=[...products]

updated[index][key]=value

setProducts(updated)

}

function save(){

localStorage.setItem("products",JSON.stringify(products))
setEditing(null)

}

return(

<div className="max-w-7xl mx-auto p-10">

<h2 className="text-2xl font-bold mb-8">
Manage Products
</h2>

<table className="w-full border">

<thead className="bg-gray-100">

<tr>

<th className="p-3">Image</th>
<th>Name</th>
<th>Price</th>
<th>Category</th>
<th>Sale</th>
<th>Actions</th>

</tr>

</thead>

<tbody>

{products.map((p,index)=>(

<tr key={p.id} className="border-t">

<td className="p-3">

{editing===index ?

<input
value={p.image}
onChange={(e)=>update(index,"image",e.target.value)}
/>

:

<img src={p.image} width="60"/>

}

</td>

<td>

{editing===index ?

<input
value={p.name}
onChange={(e)=>update(index,"name",e.target.value)}
/>

:p.name}

</td>

<td>

{editing===index ?

<input
value={p.price}
onChange={(e)=>update(index,"price",e.target.value)}
/>

:`₹${p.price}`}

</td>

<td>

{editing===index ?

<select
value={p.category}
onChange={(e)=>update(index,"category",e.target.value)}

>

<option value="men">Men</option>
<option value="women">Women</option>

</select>

:p.category}

</td>

<td>

{editing===index ?

<input
type="checkbox"
checked={p.sale}
onChange={(e)=>update(index,"sale",e.target.checked)}
/>

:p.sale ? "Yes":"No"}

</td>

<td className="flex gap-2 p-3">

{editing===index ?

<button
onClick={save}
className="bg-green-600 text-white px-3 py-1 rounded"

>

Save </button>

:

<button
onClick={()=>setEditing(index)}
className="bg-blue-600 text-white px-3 py-1 rounded"

>

Edit </button>

}

<button
onClick={()=>deleteProduct(p.id)}
className="bg-red-600 text-white px-3 py-1 rounded"

>

Delete </button>

</td>

</tr>
))}

</tbody>

</table>

</div>

)

}
