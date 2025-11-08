import React, { memo } from 'react'
import { Token } from '@/lib/types/token'
import { formatPrice, formatPercentage, formatNumber, cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Info } from 'lucide-react'

interface TokenRowProps {
  token: Token
  onRowClick: (token: Token) => void
}

export const TokenRow = memo(function TokenRow({ token, onRowClick }: TokenRowProps) {
  const isPriceUp = token.previousPrice !== undefined && token.price > token.previousPrice
  const isPriceDown = token.previousPrice !== undefined && token.price < token.previousPrice
  const priceChangeClass = isPriceUp ? 'text-price-up' : isPriceDown ? 'text-price-down' : ''
  const bgChangeClass = isPriceUp ? 'bg-price-up' : isPriceDown ? 'bg-price-down' : ''

  return (
    <div
      className={cn(
        "grid gap-3 p-3 rounded-lg border border-border hover:border-accent-foreground/20 transition-all duration-150 cursor-pointer group",
        "grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr]",
        bgChangeClass
      )}
      onClick={() => onRowClick(token)}
    >
      {/* Token Info */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-sm flex-shrink-0">
          {token.symbol.substring(0, 2)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
            {token.symbol}
          </div>
          <div className="text-xs text-muted-foreground truncate">{token.name}</div>
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col justify-center min-w-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={cn("font-mono text-sm font-medium truncate", priceChangeClass)}>
                {formatPrice(token.price)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Current Price: ${token.price.toFixed(8)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* 24h Change */}
      <div className="flex flex-col justify-center min-w-0">
        <div
          className={cn(
            "text-sm font-medium truncate",
            token.priceChange24h >= 0 ? "text-green-500" : "text-red-500"
          )}
        >
          {formatPercentage(token.priceChange24h)}
        </div>
      </div>

      {/* Volume */}
      <div className="flex flex-col justify-center min-w-0">
        <Popover>
          <PopoverTrigger asChild>
            <div className="text-sm font-medium flex items-center gap-1 cursor-help min-w-0">
              <span className="truncate">{formatPrice(token.volume24h)}</span>
              <Info className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">24h Volume</h4>
              <p className="text-sm text-muted-foreground">
                ${formatNumber(token.volume24h)}
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Liquidity */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="text-sm truncate">{formatPrice(token.liquidity)}</div>
      </div>

      {/* Holders */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="text-sm truncate">{formatNumber(token.holders)}</div>
      </div>
    </div>
  )
})
