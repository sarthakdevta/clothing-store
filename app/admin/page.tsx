"use client"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Admin(){

const [logged,setLogged] = useState(false)
const [pass,setPass] = useState("")
const router = useRouter()

useEffect(()=>{

const auth = localStorage.getItem("admin")

if(auth==="true") setLogged(true)

},[])

function login(){

if(pass==="trial"){

localStorage.setItem("admin","true")
setLogged(true)

}else{

alert("Wrong password")

}

}

function logout(){

localStorage.removeItem("admin")
router.refresh()

}

if(!logged){

return(

<div className="flex justify-center items-center h-[70vh]">

<div className="bg-white shadow-xl p-10 rounded-xl w-[350px]">

<h2 className="text-xl font-bold mb-6 text-center">
Admin Login
</h2>

<input
type="password"
placeholder="Enter password"
className="border w-full p-3 mb-4 rounded"
onChange={(e)=>setPass(e.target.value)}
/>

<button
className="bg-black text-white w-full py-3 rounded"
onClick={login}

>

Login </button>

</div>

</div>

)

}

return(

<div className="max-w-6xl mx-auto p-10">

<h1 className="text-3xl font-bold mb-10">
Admin Dashboard
</h1>

<div className="flex gap-6">

<Link href="/admin/products">
<button className="bg-black text-white px-6 py-3 rounded">
Manage Products
</button>
</Link>

<Link href="/admin/add">
<button className="bg-green-600 text-white px-6 py-3 rounded">
Add Product
</button>
</Link>

<button
className="bg-red-600 text-white px-6 py-3 rounded"
onClick={logout}

>

Logout </button>

</div>

</div>

)

}
