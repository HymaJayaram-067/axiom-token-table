# Axiom Trade Token Table

A high-performance, real-time token trading table built with Next.js 14+, TypeScript, and modern web technologies. This application replicates the Axiom Trade token table (https://axiom.trade/pulse) with pixel-perfect design and enterprise-grade architecture.

![Axiom Token Table](https://github.com/user-attachments/assets/3b313b12-d6c5-4fb0-89cc-00db7bf45bd7)

## ✨ Features

### Core Functionality
- **Three Token Categories**: New Pairs, Final Stretch, and Migrated tokens displayed in separate columns
- **Real-time Price Updates**: Mock WebSocket service simulates live price changes every 2 seconds
- **Visual Price Indicators**: Color-coded backgrounds (green for increases, red for decreases) with smooth transitions
- **Sortable Columns**: Click any column header to sort by price, 24h change, volume, liquidity, holders, or creation time
- **Interactive Token Details**: Click any token row to view comprehensive details in a modal dialog
- **Tooltips & Popovers**: Hover interactions for additional information
- **Error Handling**: Error boundaries for graceful failure recovery
- **Loading States**: Skeleton loaders and shimmer effects for progressive loading

### Technical Highlights
- **Performance Optimized**: <100ms interactions with React.memo, useCallback, and useMemo
- **Atomic Architecture**: Scalable component structure (Atoms, Molecules, Organisms, Templates)
- **Type Safety**: TypeScript strict mode with comprehensive type definitions
- **State Management**: Redux Toolkit for global state, React Query for server state
- **Modern UI**: Radix UI primitives with shadcn/ui component library
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🚀 Tech Stack

- **Framework**: Next.js 14.2.33 (App Router)
- **Language**: TypeScript 5.3 (strict mode)
- **Styling**: Tailwind CSS 3.4 with custom animations
- **State Management**: Redux Toolkit 2.2
- **Data Fetching**: TanStack React Query 5.28
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Next.js built-in compiler (SWC)

## 📁 Project Structure

```
axiom-token-table/
├── app/                          # Next.js 14 App Router
│   ├── globals.css              # Global styles and Tailwind directives
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Home page with TokenTable
├── components/
│   ├── atoms/                   # Basic building blocks
│   │   ├── ErrorBoundary.tsx   # Error boundary component
│   │   └── LoadingSkeleton.tsx # Skeleton loaders
│   ├── molecules/               # Composite components
│   │   ├── TokenRow.tsx        # Individual token row
│   │   ├── TokenColumn.tsx     # Column with sorting
│   │   └── TokenDetailsModal.tsx # Token detail modal
│   ├── organisms/               # Complex components
│   │   └── TokenTable.tsx      # Main table component
│   ├── templates/               # Page templates
│   │   └── Providers.tsx       # Redux & React Query providers
│   └── ui/                      # Base UI components (shadcn)
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── popover.tsx
│       ├── skeleton.tsx
│       └── tooltip.tsx
├── lib/
│   ├── hooks/
│   │   └── redux.ts            # Typed Redux hooks
│   ├── services/
│   │   ├── tokenService.ts     # Token data fetching
│   │   └── websocketService.ts # Mock WebSocket service
│   ├── store/
│   │   ├── store.ts            # Redux store configuration
│   │   └── tokensSlice.ts      # Tokens state slice
│   ├── types/
│   │   └── token.ts            # TypeScript interfaces
│   └── utils.ts                # Utility functions
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HymaJayaram-067/axiom-token-table.git
cd axiom-token-table
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Component Architecture

### Atomic Design Principles

**Atoms**: Basic UI elements (ErrorBoundary, LoadingSkeleton, UI primitives)
**Molecules**: Simple combinations (TokenRow, TokenColumn, TokenDetailsModal)
**Organisms**: Complex features (TokenTable)
**Templates**: Page layouts (Providers)

### State Management

- **Redux Toolkit**: Global application state (tokens, sorting preferences)
- **React Query**: Server state and caching (token data fetching)
- **Local State**: Component-specific state (modal open/close, selected token)

### Performance Optimizations

1. **Memoization**: React.memo on all major components
2. **Callback Hooks**: useCallback to prevent unnecessary re-renders
3. **Memoized Values**: useMemo for expensive computations (sorting)
4. **Code Splitting**: Next.js automatic code splitting
5. **Optimized Images**: Next.js Image component (when applicable)

## 🔄 Real-time Updates

The application uses a mock WebSocket service to simulate real-time price updates:

- Updates occur every 2 seconds
- Randomly selects 1-3 tokens to update per cycle
- Price changes range from -1% to +1%
- Visual feedback with color-coded backgrounds
- Smooth CSS transitions for visual appeal

## 🎯 Key Features Explained

### Sorting
Click any column header to sort tokens. The first click sorts descending, second click sorts ascending.

### Token Details Modal
Click any token row to view:
- Symbol and full name
- Current price (formatted)
- 24-hour price change
- 24-hour volume
- Market cap
- Liquidity
- Number of holders
- Creation date
- Category

### Color-Coded Price Changes
- **Green background**: Price increased
- **Red/Pink background**: Price decreased
- **Neutral**: No recent change

## 📊 Performance Metrics

- **Build Time**: ~10-15 seconds
- **Page Load**: <2 seconds (first load)
- **Interaction Time**: <100ms (all interactions)
- **Bundle Size**: Optimized with Next.js tree-shaking
- **Lighthouse Score**: Target ≥90

## 🔒 Security

- No security vulnerabilities detected (CodeQL analysis passed)
- TypeScript strict mode for type safety
- ESLint configuration for code quality
- No exposed secrets or sensitive data

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by [Axiom Trade](https://axiom.trade/pulse)
- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
