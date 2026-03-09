export function getCart(){

if(typeof window === "undefined") return []

return JSON.parse(localStorage.getItem("cart") || "[]")

}

export function addToCart(product:any){

const cart = getCart()

const existing = cart.find((p:any)=>p.id === product.id)

if(existing){

existing.qty = (existing.qty || 1) + 1

}else{

cart.push({...product,qty:1})

}

localStorage.setItem("cart",JSON.stringify(cart))

window.dispatchEvent(new Event("cartUpdated"))

}

export function removeFromCart(id:number){

const cart = getCart().filter((p:any)=>p.id !== id)

localStorage.setItem("cart",JSON.stringify(cart))

window.dispatchEvent(new Event("cartUpdated"))

}