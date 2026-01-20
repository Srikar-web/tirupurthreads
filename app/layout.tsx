import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import Header from "@/components/header"
import Footer from "@/components/footer"
import BottomNav from "@/components/BottomNav"
import AuthGuard from "@/components/auth-guard"

import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tirupur Threads – Premium Garments from Tirupur",
  description:
    "Shop premium quality garments from Tirupur Threads. Modern fashion crafted with textile excellence.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
          rel="stylesheet"
        />
      </head>

      <body
        className={`${geist.className} bg-background text-foreground overflow-x-hidden`}
      >
        <Header />

        <AuthGuard>
          {/* ✅ ONLY space for BottomNav */}
          <main className="min-h-screen pt-[64px] pb-16">
            {children}
          </main>
        </AuthGuard>

        {/* ✅ Desktop only */}
        <Footer />

        {/* ✅ Mobile only */}
        <BottomNav />

        <Analytics />
      </body>
    </html>
  )
}
