import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SCNT - Scent Different. Be Different.",
  description:
    "Premium fragrances for the new generation. Clean openings, rich dry-downs, and all-day performance. Made for those who refuse to blend in.",
  generator: "v0.app",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${bebasNeue.variable}`}>
      <body className="font-dm antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
