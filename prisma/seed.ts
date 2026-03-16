import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  await prisma.admin.upsert({
    where: { email: 'sarthakpersonal755@gmail.com' },
    update: {},
    create: {
      email: 'sarthakpersonal755@gmail.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  })

  // Create sample products
  const products = [
    {
      name: 'Classic Wool Overcoat',
      description: 'A timeless wool overcoat crafted from premium Italian wool. Features a tailored fit with notched lapels and a double-breasted front closure.',
      price: 450,
      category: 'men',
      image: '/images/products/overcoat.jpg',
      stock: 25,
      featured: true,
      isNew: true,
      sizes: 'S,M,L,XL',
      colors: 'Black,Navy,Camel',
    },
    {
      name: 'Cashmere Blend Sweater',
      description: 'Luxuriously soft cashmere blend sweater with a relaxed fit. Perfect for layering or wearing alone.',
      price: 195,
      category: 'men',
      image: '/images/products/sweater.jpg',
      stock: 40,
      featured: true,
      isNew: false,
      sizes: 'S,M,L,XL,XXL',
      colors: 'Cream,Gray,Black',
    },
    {
      name: 'Silk Midi Dress',
      description: 'Elegant silk midi dress with a flattering A-line silhouette. Features delicate pleating and a concealed back zip.',
      price: 320,
      category: 'women',
      image: '/images/products/silk-dress.jpg',
      stock: 30,
      featured: true,
      isNew: true,
      sizes: 'XS,S,M,L',
      colors: 'Champagne,Black,Burgundy',
    },
    {
      name: 'Tailored Blazer',
      description: 'Perfectly tailored blazer in premium wool blend. Features a single-button closure and structured shoulders.',
      price: 285,
      category: 'women',
      image: '/images/products/blazer.jpg',
      stock: 35,
      featured: true,
      isNew: false,
      sizes: 'XS,S,M,L,XL',
      colors: 'Black,White,Navy',
    },
    {
      name: 'Leather Biker Jacket',
      description: 'Iconic leather biker jacket crafted from supple lambskin. Features asymmetric zip closure and silver-tone hardware.',
      price: 595,
      category: 'jackets',
      image: '/images/products/biker-jacket.jpg',
      stock: 20,
      featured: true,
      isNew: true,
      sizes: 'S,M,L,XL',
      colors: 'Black,Brown',
    },
    {
      name: 'Puffer Down Jacket',
      description: 'Warm and lightweight puffer jacket filled with premium down. Water-resistant outer shell with a detachable hood.',
      price: 380,
      category: 'jackets',
      image: '/images/products/puffer.jpg',
      stock: 45,
      featured: false,
      isNew: true,
      sizes: 'S,M,L,XL,XXL',
      colors: 'Black,Olive,Navy',
    },
    {
      name: 'Leather Belt',
      description: 'Classic leather belt with a polished silver buckle. Made from full-grain Italian leather.',
      price: 85,
      category: 'accessories',
      image: '/images/products/belt.jpg',
      stock: 60,
      featured: false,
      isNew: false,
      sizes: 'S,M,L,XL',
      colors: 'Black,Brown,Tan',
    },
    {
      name: 'Cashmere Scarf',
      description: 'Ultra-soft cashmere scarf with fringed edges. A versatile accessory for any season.',
      price: 145,
      category: 'accessories',
      image: '/images/products/scarf.jpg',
      stock: 50,
      featured: false,
      isNew: true,
      sizes: 'One Size',
      colors: 'Gray,Camel,Black,Burgundy',
    },
    {
      name: 'Slim Fit Chinos',
      description: 'Modern slim-fit chinos in stretch cotton twill. Features a flat front and tapered leg.',
      price: 120,
      category: 'men',
      image: '/images/products/chinos.jpg',
      stock: 55,
      featured: false,
      isNew: false,
      sizes: '28,30,32,34,36,38',
      colors: 'Khaki,Navy,Black,Olive',
    },
    {
      name: 'High-Waist Wide Leg Pants',
      description: 'Flattering high-waist pants with a flowing wide leg silhouette. Made from premium crepe fabric.',
      price: 165,
      category: 'women',
      image: '/images/products/wide-leg-pants.jpg',
      stock: 40,
      featured: false,
      isNew: true,
      sizes: 'XS,S,M,L',
      colors: 'Black,White,Cream',
    },
    {
      name: 'Cotton Oxford Shirt',
      description: 'Classic oxford shirt in premium cotton. Features a button-down collar and chest pocket.',
      price: 95,
      category: 'men',
      image: '/images/products/oxford-shirt.jpg',
      stock: 70,
      featured: false,
      isNew: false,
      sizes: 'S,M,L,XL,XXL',
      colors: 'White,Light Blue,Pink',
    },
    {
      name: 'Knit Cardigan',
      description: 'Cozy knit cardigan with a relaxed oversized fit. Features ribbed cuffs and hem.',
      price: 175,
      category: 'women',
      image: '/images/products/cardigan.jpg',
      stock: 35,
      featured: false,
      isNew: false,
      sizes: 'XS,S,M,L',
      colors: 'Cream,Gray,Black',
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
