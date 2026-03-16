import type { Product } from '@/components/product-card'

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Wool Overcoat',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80',
    category: 'Men',
    badge: 'sale',
  },
  {
    id: '2',
    name: 'Tailored Blazer',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    category: 'Men',
    badge: 'new',
  },
  {
    id: '3',
    name: 'Silk Evening Dress',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=600&q=80',
    category: 'Women',
    badge: 'bestseller',
  },
  {
    id: '4',
    name: 'Minimalist Watch',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    category: 'Accessories',
  },
  {
    id: '5',
    name: 'Leather Jacket',
    price: 399.99,
    originalPrice: 499.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&q=80',
    category: 'Jackets',
    badge: 'sale',
  },
  {
    id: '6',
    name: 'Cashmere Sweater',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    category: 'Women',
    badge: 'new',
  },
  {
    id: '7',
    name: 'Designer Sunglasses',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
    category: 'Accessories',
    badge: 'bestseller',
  },
  {
    id: '8',
    name: 'Premium Denim Jeans',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80',
    category: 'Men',
  },
  {
    id: '9',
    name: 'Elegant Handbag',
    price: 259.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
    category: 'Accessories',
    badge: 'new',
  },
  {
    id: '10',
    name: 'Wool Blend Coat',
    price: 279.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80',
    category: 'Women',
    badge: 'sale',
  },
  {
    id: '11',
    name: 'Cotton Polo Shirt',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1625910513413-5fc45890c596?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&q=80',
    category: 'Men',
  },
  {
    id: '12',
    name: 'Linen Summer Dress',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    category: 'Women',
    badge: 'bestseller',
  },
]

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  )
}

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 8)
}

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.badge === 'new')
}

export const getBestSellers = (): Product[] => {
  return products.filter((p) => p.badge === 'bestseller')
}

export const getSaleProducts = (): Product[] => {
  return products.filter((p) => p.badge === 'sale')
}
export const getProducts = (): Product[] => {
  return products
}

export const saveProduct = (product: Product) => {
  products.push(product)
}