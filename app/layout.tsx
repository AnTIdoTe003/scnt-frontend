import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/cart-context"
import { CartDrawer } from "@/components/cart-drawer"
import { OfferPopupWrapper } from "@/components/offer-popup-wrapper"
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
  title: "XPerfumes - Premium Perfumes for Gen Z | Buy Luxury Fragrances Online India",
  description:
    "XPerfumes offers premium luxury perfumes for the new generation. Shop long-lasting fragrances for men, women & unisex. Free shipping on orders above ₹999. Made in India.",
  keywords: [
    "XPerfumes perfume",
    "luxury perfumes India",
    "premium fragrances",
    "perfumes for Gen Z",
    "long lasting perfumes",
    "perfumes for men",
    "perfumes for women",
    "unisex fragrances",
    "buy perfumes online India",
    "affordable luxury perfumes",
    "Indian perfume brand",
    "XPerfumes fragrances",
    "eau de parfum India",
    "best perfumes 2026",
    "trending perfumes India"
  ],
  authors: [{ name: "XPerfumes" }],
  creator: "XPerfumes",
  publisher: "XPerfumes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://xperfumes.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "XPerfumes - Premium Perfumes for Gen Z | Luxury Fragrances India",
    description: "Shop premium long-lasting perfumes for men, women & unisex. Free shipping above ₹999. Made in India for the new generation.",
    url: 'https://xperfumes.in',
    siteName: 'XPerfumes',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'XPerfumes Premium Perfumes',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XPerfumes - Premium Perfumes for Gen Z',
    description: 'Shop premium long-lasting perfumes. Free shipping above ₹999. Made in India.',
    images: ['/og-image.jpg'],
    creator: '@XPERFUMES',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${bebasNeue.variable}`}>
      <head>
        <link rel="canonical" href="https://xperfumes.in" />
        <meta name="theme-color" content="#14161d" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "XPerfumes",
              "url": "https://xperfumes.in",
              "logo": "https://xperfumes.in/icon.png",
              "description": "Premium luxury perfumes for the new generation. Made in India.",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hello@xperfumes.in",
                "contactType": "Customer Service",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"]
              },
              "sameAs": [
                "https://www.instagram.com/xperfumes.in/",
                "https://twitter.com/xperfumes"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "XPerfumes",
              "url": "https://xperfumes.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://xperfumes.in/shop?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="font-dm antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
          <OfferPopupWrapper />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
