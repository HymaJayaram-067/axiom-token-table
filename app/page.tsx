'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux'
import { setTokens, setLoading, setError, updateTokenPrice } from '@/lib/store/tokensSlice'
import { fetchTokens } from '@/lib/services/tokenService'
import { mockWebSocketService } from '@/lib/services/websocketService'
import { TokenTable } from '@/components/organisms/TokenTable'
import { ErrorBoundary } from '@/components/atoms/ErrorBoundary'

export default function Home() {
  const dispatch = useAppDispatch()
  const tokens = useAppSelector((state) => state.tokens.tokens)

  // Fetch initial tokens data
  const { data, isLoading, error } = useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
  })

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true))
    } else if (error) {
      dispatch(setError(error.message))
    } else if (data) {
      dispatch(setTokens(data))
    }
  }, [data, isLoading, error, dispatch])

  // Set up WebSocket for real-time price updates
  useEffect(() => {
    if (tokens.length === 0) return

    const tokenIds = tokens.map((t) => t.id)
    mockWebSocketService.connect(tokenIds)

    const unsubscribe = mockWebSocketService.subscribe((update) => {
      const token = tokens.find((t) => t.id === update.id)
      if (token) {
        const priceChange = (Math.random() - 0.5) * 0.02 // -1% to +1%
        const newPrice = token.price * (1 + priceChange)
        dispatch(
          updateTokenPrice({
            ...update,
            price: newPrice,
          })
        )
      }
    })

    return () => {
      unsubscribe()
      mockWebSocketService.disconnect()
    }
  }, [tokens, dispatch])

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Axiom Trade Token Table
            </h1>
            <p className="text-muted-foreground">
              Real-time token prices with live updates
            </p>
          </header>

          <TokenTable />
        </div>
      </main>
    </ErrorBoundary>
  )
}
