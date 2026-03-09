import { defaultProducts } from "@/data/products"

export function getProducts(){

if(typeof window === "undefined") return defaultProducts

const stored = localStorage.getItem("products")

if(!stored){
localStorage.setItem("products",JSON.stringify(defaultProducts))
return defaultProducts
}

return JSON.parse(stored)
}

export function saveProduct(product:any){

const products = getProducts()

products.push(product)

localStorage.setItem("products",JSON.stringify(products))

}