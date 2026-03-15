'use client'

import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'

interface Order {
  id: string
  email: string
  name: string
  total: number
  status: string
  createdAt: Date
  items: {
    id: string
    quantity: number
    product: {
      name: string
    }
  }[]
}

interface RecentOrdersProps {
  orders: Order[]
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      
      {orders.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{order.name}</p>
                <p className="text-sm text-muted-foreground truncate">{order.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''} • {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                </p>
              </div>
              
              <div className="text-right ml-4">
                <p className="font-semibold">${order.total.toFixed(2)}</p>
                <span className={cn(
                  'inline-block px-2 py-1 text-xs rounded-full mt-1 capitalize',
                  statusColors[order.status] || statusColors.pending
                )}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
