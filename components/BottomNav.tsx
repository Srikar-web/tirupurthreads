"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import ProfileSheet from "@/components/ProfileSheet"

export default function BottomNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [openProfile, setOpenProfile] = useState(false)

  const itemClass = (path: string) =>
    `flex flex-col items-center justify-center gap-1 text-xs font-medium ${
      pathname === path ? "text-gold-light" : "text-muted-foreground"
    }`

  return (
    <>
      <nav className="fixed bottom-0 inset-x-0 z-50 h-16 bg-background border-t md:hidden bottom-nav">
        <div className="grid grid-cols-5 h-full">

          <Link href="/" className={itemClass("/")}>
            <span className="material-symbols-rounded">home</span>
            Home
          </Link>

          <Link href="/products" className={itemClass("/products")}>
            <span className="material-symbols-rounded">storefront</span>
            Shop
          </Link>

          <Link href="/wholesale" className={itemClass("/wholesale")}>
            <span className="material-symbols-rounded">inventory_2</span>
            Wholesale
          </Link>

          <Link href="/checkout" className={itemClass("/checkout")}>
            <span className="material-symbols-rounded">shopping_bag</span>
            Cart
          </Link>

          <button
            onClick={() => setOpenProfile(true)}
            className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground"
          >
            <span className="material-symbols-rounded">person</span>
            Profile
          </button>

        </div>
      </nav>

      {/* Profile bottom sheet */}
      <ProfileSheet open={openProfile} onClose={() => setOpenProfile(false)} />
    </>
  )
}
