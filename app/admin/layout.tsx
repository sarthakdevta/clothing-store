import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | SARTHAK CLOTHINGS',
  description: 'SARTHAK CLOTHINGS Admin Dashboard - Manage your store',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      {children}
    </div>
  )
}
