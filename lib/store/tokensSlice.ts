import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Token, TokensState, SortField, SortDirection, PriceUpdate } from '@/lib/types/token'

const initialState: TokensState = {
  tokens: [],
  loading: false,
  error: null,
  sortField: 'createdAt',
  sortDirection: 'desc',
}

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    updateTokenPrice: (state, action: PayloadAction<PriceUpdate>) => {
      const token = state.tokens.find(t => t.id === action.payload.id)
      if (token) {
        token.previousPrice = token.price
        token.price = action.payload.price
        token.priceChange24h = action.payload.priceChange24h
      }
    },
    setSorting: (state, action: PayloadAction<{ field: SortField; direction: SortDirection }>) => {
      state.sortField = action.payload.field
      state.sortDirection = action.payload.direction
    },
  },
})

export const { setTokens, setLoading, setError, updateTokenPrice, setSorting } = tokensSlice.actions
export default tokensSlice.reducer
