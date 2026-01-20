"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export default function Header() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Hide header on auth pages
  const isAuthPage = pathname.startsWith("/auth") && !user
  if (isAuthPage) return null

  const isActive = (path: string) =>
    pathname === path ? "text-gold-light" : ""

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 bg-background border-b">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-lg font-black tracking-wide">
          Tirupur Threads
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href="/" className={isActive("/")}>
            Home
          </Link>

          <Link
            href="/products"
            className={pathname.startsWith("/products") ? "text-gold-light" : ""}
          >
            Collections
          </Link>

          <Link href="/wholesale" className={isActive("/wholesale")}>
            Wholesale
          </Link>

          <Link href="/story" className={isActive("/story")}>
            Story
          </Link>

          <Link href="/checkout" aria-label="Cart">
            <span className="material-icons-outlined">shopping_cart</span>
          </Link>

          <Link
            href={user ? "/profile" : "/auth/signin"}
            aria-label="Profile"
          >
            <span className="material-icons-outlined">person</span>
          </Link>
        </nav>

        {/* ================= MOBILE HEADER ================= */}
        {/* Mobile header stays minimal (NO cart/profile here) */}
        <div className="md:hidden" />
      </div>
    </header>
  )
}
