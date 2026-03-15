import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { AdminHeader } from '@/components/admin/admin-header'
import { ProductForm } from '@/components/admin/product-form'

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    notFound()
  }

  return (
    <>
      <AdminHeader 
        title="Edit Product" 
        description={`Editing: ${product.name}`}
      />
      
      <div className="p-6">
        <ProductForm product={product} />
      </div>
    </>
  )
}
