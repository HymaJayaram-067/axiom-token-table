import { Token } from '@/lib/types/token'

// Mock token data generator
const generateMockTokens = (): Token[] => {
  const categories: Array<'new' | 'final-stretch' | 'migrated'> = ['new', 'final-stretch', 'migrated']
  const tokens: Token[] = []
  
  const tokenNames = [
    { symbol: 'PEPE', name: 'Pepe' },
    { symbol: 'DOGE', name: 'Dogecoin' },
    { symbol: 'SHIB', name: 'Shiba Inu' },
    { symbol: 'FLOKI', name: 'Floki' },
    { symbol: 'BONK', name: 'Bonk' },
    { symbol: 'WIF', name: 'Dogwifhat' },
    { symbol: 'MYRO', name: 'Myro' },
    { symbol: 'MEME', name: 'Memecoin' },
    { symbol: 'SAMO', name: 'Samoyedcoin' },
    { symbol: 'POPCAT', name: 'Popcat' },
    { symbol: 'BRETT', name: 'Brett' },
    { symbol: 'MOG', name: 'Mog Coin' },
    { symbol: 'TURBO', name: 'Turbo' },
    { symbol: 'WOJAK', name: 'Wojak' },
    { symbol: 'SNEK', name: 'Snek' },
  ]

  categories.forEach((category, categoryIndex) => {
    for (let i = 0; i < 5; i++) {
      const tokenInfo = tokenNames[categoryIndex * 5 + i]
      const basePrice = Math.random() * 10
      tokens.push({
        id: `${category}-${i}`,
        symbol: tokenInfo.symbol,
        name: tokenInfo.name,
        price: basePrice,
        priceChange24h: (Math.random() - 0.5) * 50,
        volume24h: Math.random() * 10000000,
        marketCap: Math.random() * 100000000,
        liquidity: Math.random() * 5000000,
        holders: Math.floor(Math.random() * 50000),
        createdAt: Date.now() - Math.random() * 86400000 * 30,
        category,
      })
    }
  })

  return tokens
}

export const fetchTokens = async (): Promise<Token[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return generateMockTokens()
}
