"use client"

import { useEffect, useState } from "react"

export default function Cart(){

const [cart,setCart] = useState<any[]>([])

useEffect(()=>{

const items = JSON.parse(localStorage.getItem("cart") || "[]")

setCart(items)

},[])

function updateCart(updated:any){

setCart(updated)

localStorage.setItem("cart",JSON.stringify(updated))

}

function increase(i:number){

const updated=[...cart]

updated[i].qty+=1

updateCart(updated)

}

function decrease(i:number){

const updated=[...cart]

if(updated[i].qty>1){

updated[i].qty-=1

}else{

updated.splice(i,1)

}

updateCart(updated)

}

function removeItem(i:number){

const updated = cart.filter((_,index)=>index!==i)

updateCart(updated)

}

const total = cart.reduce((sum,item)=>sum+item.price*item.qty,0)

function checkout(){

let message="Order:%0A"

cart.forEach(item=>{

message+=`${item.name} x${item.qty} - ₹${item.price*item.qty}%0A`

})

message+=`%0ATotal: ₹${total}`

window.open(`https://wa.me/919009585458?text=${message}`)

}

return(

<div className="max-w-4xl mx-auto py-16 px-6">

<h1 className="text-3xl font-bold mb-8">

Your Cart

</h1>

{cart.map((item,i)=>(

<div key={i} className="flex justify-between items-center border-b py-4">

<div>

<p>{item.name}</p>

<div className="flex items-center gap-3 mt-2">

<button
onClick={()=>decrease(i)}
className="px-3 bg-gray-200"
>
-
</button>

<span>{item.name} ({item.size}) x {item.qty}</span>

<button
onClick={()=>increase(i)}
className="px-3 bg-gray-200"
>
+
</button>

</div>

</div>

<div className="flex gap-6 items-center">

<span>₹{item.price*item.qty}</span>

<button
onClick={()=>removeItem(i)}
className="text-red-500"
>
Remove
</button>

</div>

</div>

))}

<div className="flex justify-between mt-8 text-xl font-semibold">

<span>Total</span>

<span>₹{total}</span>

</div>

<button
onClick={checkout}
className="w-full mt-6 bg-black text-white py-3 rounded-lg"
>

Checkout

</button>

</div>

)

}