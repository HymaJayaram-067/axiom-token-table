import { PriceUpdate } from '@/lib/types/token'

type PriceUpdateCallback = (update: PriceUpdate) => void

class MockWebSocketService {
  private callbacks: Set<PriceUpdateCallback> = new Set()
  private intervalId: NodeJS.Timeout | null = null
  private tokenIds: string[] = []

  connect(tokenIds: string[]) {
    this.tokenIds = tokenIds
    this.startPriceUpdates()
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.callbacks.clear()
  }

  subscribe(callback: PriceUpdateCallback) {
    this.callbacks.add(callback)
    return () => {
      this.callbacks.delete(callback)
    }
  }

  private startPriceUpdates() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    this.intervalId = setInterval(() => {
      if (this.tokenIds.length === 0) return

      // Randomly update 1-3 tokens
      const numUpdates = Math.floor(Math.random() * 3) + 1
      const tokensToUpdate = [...this.tokenIds]
        .sort(() => Math.random() - 0.5)
        .slice(0, numUpdates)

      tokensToUpdate.forEach(id => {
        const priceChange = (Math.random() - 0.5) * 0.1 // -5% to +5% change
        const update: PriceUpdate = {
          id,
          price: 0, // Will be calculated based on current price
          priceChange24h: (Math.random() - 0.5) * 50,
          timestamp: Date.now(),
        }

        this.callbacks.forEach(callback => callback(update))
      })
    }, 2000) // Update every 2 seconds
  }
}

export const mockWebSocketService = new MockWebSocketService()
