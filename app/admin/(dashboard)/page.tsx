import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AdminHeader } from '@/components/admin/admin-header'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { RecentOrders } from '@/components/admin/recent-orders'
import { TopProducts } from '@/components/admin/top-products'

export default async function AdminDashboardPage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  const [productCount, orderCount, totalRevenue, lowStockCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true },
    }),
    prisma.product.count({
      where: { stock: { lt: 10 } },
    }),
  ])

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: { product: true },
      },
    },
  })

  const stats = {
    products: productCount,
    orders: orderCount,
    revenue: totalRevenue._sum.total || 0,
    lowStock: lowStockCount,
  }

  return (
    <>
      <AdminHeader 
        title="Dashboard" 
        description="Welcome back! Here's what's happening with your store."
      />
      
      <div className="p-6 space-y-6">
        <DashboardStats stats={stats} />
        
        <div className="grid lg:grid-cols-2 gap-6">
          <RecentOrders orders={recentOrders} />
          <TopProducts />
        </div>
      </div>
    </>
  )
}
