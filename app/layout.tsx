import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/templates/Providers"

export const metadata: Metadata = {
  title: "Axiom Trade Token Table",
  description: "Real-time token trading table with live price updates",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
