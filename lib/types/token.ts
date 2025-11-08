export interface Token {
  id: string
  symbol: string
  name: string
  price: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  liquidity: number
  holders: number
  createdAt: number
  category: 'new' | 'final-stretch' | 'migrated'
  previousPrice?: number
}

export type SortField = 'price' | 'priceChange24h' | 'volume24h' | 'marketCap' | 'liquidity' | 'holders' | 'createdAt'
export type SortDirection = 'asc' | 'desc'

export interface TokensState {
  tokens: Token[]
  loading: boolean
  error: string | null
  sortField: SortField
  sortDirection: SortDirection
}

export interface PriceUpdate {
  id: string
  price: number
  priceChange24h: number
  timestamp: number
}
