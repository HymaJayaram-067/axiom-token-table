import React from 'react'
import { Token } from '@/lib/types/token'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatPrice, formatPercentage, formatNumber } from '@/lib/utils'

interface TokenDetailsModalProps {
  token: Token | null
  open: boolean
  onClose: () => void
}

export function TokenDetailsModal({ token, open, onClose }: TokenDetailsModalProps) {
  if (!token) return null

  const details = [
    { label: 'Symbol', value: token.symbol },
    { label: 'Name', value: token.name },
    { label: 'Price', value: formatPrice(token.price) },
    { label: '24h Change', value: formatPercentage(token.priceChange24h), highlight: true },
    { label: '24h Volume', value: formatPrice(token.volume24h) },
    { label: 'Market Cap', value: formatPrice(token.marketCap) },
    { label: 'Liquidity', value: formatPrice(token.liquidity) },
    { label: 'Holders', value: formatNumber(token.holders) },
    { label: 'Created', value: new Date(token.createdAt).toLocaleDateString() },
    { label: 'Category', value: token.category.replace('-', ' ').toUpperCase() },
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold">
              {token.symbol.substring(0, 2)}
            </div>
            <div>
              <div>{token.name}</div>
              <div className="text-sm text-muted-foreground font-normal">{token.symbol}</div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Detailed information about this token
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {details.map((detail, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center gap-4"
            >
              <span className="text-sm font-medium text-muted-foreground">
                {detail.label}
              </span>
              <span
                className={`col-span-2 text-sm font-mono ${
                  detail.highlight && token.priceChange24h >= 0
                    ? 'text-green-500'
                    : detail.highlight && token.priceChange24h < 0
                    ? 'text-red-500'
                    : ''
                }`}
              >
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
