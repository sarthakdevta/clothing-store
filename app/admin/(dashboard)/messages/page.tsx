import { prisma } from '@/lib/prisma'
import { AdminHeader } from '@/components/admin/admin-header'
import { formatDistanceToNow } from 'date-fns'
import { Mail, MailOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function MessagesPage() {
  const messages = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      <AdminHeader 
        title="Messages" 
        description={`Customer inquiries (${messages.length} total)`}
      />
      
      <div className="p-6">
        {messages.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={cn(
                  'bg-card border border-border rounded-xl p-6',
                  !message.read && 'border-l-4 border-l-foreground'
                )}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {message.read ? (
                      <MailOpen className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Mail className="h-5 w-5 text-foreground" />
                    )}
                    <div>
                      <h3 className="font-semibold">{message.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        From: {message.name} ({message.email})
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
