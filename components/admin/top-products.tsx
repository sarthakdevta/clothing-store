import { prisma } from '@/lib/prisma'
import Image from 'next/image'

export async function TopProducts() {
  const products = await prisma.product.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      image: true,
      category: true,
    },
  })

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Latest Products</h2>
      
      {products.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No products yet</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
            >
              <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                    No img
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
              </div>
              
              <div className="text-right">
                <p className="font-semibold">${product.price}</p>
                <p className={`text-sm ${product.stock < 10 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                  {product.stock} in stock
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
