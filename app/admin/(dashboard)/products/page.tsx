import { prisma } from '@/lib/prisma'
import { AdminHeader } from '@/components/admin/admin-header'
import { ProductsTable } from '@/components/admin/products-table'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      <AdminHeader 
        title="Products" 
        description={`Manage your product catalog (${products.length} products)`}
      />
      
      <div className="p-6">
        <div className="flex justify-end mb-6">
          <Link href="/admin/products/new">
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
        
        <ProductsTable products={products} />
      </div>
    </>
  )
}
