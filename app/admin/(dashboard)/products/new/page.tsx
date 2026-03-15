import { AdminHeader } from '@/components/admin/admin-header'
import { ProductForm } from '@/components/admin/product-form'

export default function NewProductPage() {
  return (
    <>
      <AdminHeader 
        title="Add Product" 
        description="Create a new product for your store"
      />
      
      <div className="p-6">
        <ProductForm />
      </div>
    </>
  )
}
