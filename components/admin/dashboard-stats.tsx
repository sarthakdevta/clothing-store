'use client'

import { motion } from 'framer-motion'
import { Package, ShoppingBag, DollarSign, AlertTriangle } from 'lucide-react'

interface DashboardStatsProps {
  stats: {
    products: number
    orders: number
    revenue: number
    lowStock: number
  }
}

const statItems = [
  { key: 'products', label: 'Total Products', icon: Package, color: 'bg-blue-500' },
  { key: 'orders', label: 'Total Orders', icon: ShoppingBag, color: 'bg-green-500' },
  { key: 'revenue', label: 'Total Revenue', icon: DollarSign, color: 'bg-purple-500', isCurrency: true },
  { key: 'lowStock', label: 'Low Stock Items', icon: AlertTriangle, color: 'bg-amber-500' },
]

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => {
        const Icon = item.icon
        const value = stats[item.key as keyof typeof stats]
        
        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold">
                  {item.isCurrency ? `$${value.toLocaleString()}` : value}
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
