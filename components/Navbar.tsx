"use client"

import Link from "next/link"
import { useEffect,useState } from "react"

export default function Navbar(){

const [count,setCount] = useState(0)

function updateCart(){

const cart = JSON.parse(localStorage.getItem("cart") || "[]")

setCount(cart.length)

}

useEffect(()=>{

updateCart()

window.addEventListener("cartUpdated",updateCart)

return ()=>window.removeEventListener("cartUpdated",updateCart)

},[])

return(

<header style={{borderBottom:"1px solid #ddd",padding:"20px"}}>

<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

<h2>STYLESTORE</h2>

<nav style={{display:"flex",gap:"30px"}}>

<Link href="/">Home</Link>
<Link href="/men">Men</Link>
<Link href="/women">Women</Link>
<Link href="/sale">Sale</Link>

</nav>

<Link href="/cart">
🛒 {count}
</Link>

</div>

</header>

)

}