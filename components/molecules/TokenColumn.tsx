import React, { memo, useMemo } from 'react'
import { Token, SortField, SortDirection } from '@/lib/types/token'
import { TokenRow } from './TokenRow'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TokenColumnProps {
  title: string
  tokens: Token[]
  sortField: SortField
  sortDirection: SortDirection
  onSort: (field: SortField) => void
  onTokenClick: (token: Token) => void
}

const SortButton = memo(function SortButton({
  field,
  label,
  currentField,
  direction,
  onSort,
}: {
  field: SortField
  label: string
  currentField: SortField
  direction: SortDirection
  onSort: (field: SortField) => void
}) {
  const isActive = currentField === field
  
  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 text-xs font-medium hover:text-primary transition-colors"
    >
      {label}
      {isActive ? (
        direction === 'asc' ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-50" />
      )}
    </button>
  )
})

export const TokenColumn = memo(function TokenColumn({
  title,
  tokens,
  sortField,
  sortDirection,
  onSort,
  onTokenClick,
}: TokenColumnProps) {
  const sortedTokens = useMemo(() => {
    const sorted = [...tokens]
    sorted.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })
    
    return sorted
  }, [tokens, sortField, sortDirection])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="text-sm text-muted-foreground">
          {tokens.length} {tokens.length === 1 ? 'token' : 'tokens'}
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid gap-3 px-3 py-2 text-muted-foreground text-xs font-medium border-b border-border grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr]">
        <div>Token</div>
        <SortButton field="price" label="Price" currentField={sortField} direction={sortDirection} onSort={onSort} />
        <SortButton field="priceChange24h" label="24h %" currentField={sortField} direction={sortDirection} onSort={onSort} />
        <SortButton field="volume24h" label="Volume" currentField={sortField} direction={sortDirection} onSort={onSort} />
        <SortButton field="liquidity" label="Liquidity" currentField={sortField} direction={sortDirection} onSort={onSort} />
        <SortButton field="holders" label="Holders" currentField={sortField} direction={sortDirection} onSort={onSort} />
      </div>

      {/* Token Rows */}
      <div className="space-y-2">
        {sortedTokens.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No tokens found
          </div>
        ) : (
          sortedTokens.map((token) => (
            <TokenRow key={token.id} token={token} onRowClick={onTokenClick} />
          ))
        )}
      </div>
    </div>
  )
})
