"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface MenuItem {
  label: string
  href: string
  icon: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const admin = localStorage.getItem("admin")
    if (!admin) {
      router.push("/admin/login")
    } else {
      setIsAdmin(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin")
    router.push("/admin/login")
  }

  const menuItems: MenuItem[] = [
    { label: "Dashboard Overview", href: "/admin/dashboard", icon: "📊" },
    { label: "Product Management", href: "/admin/products", icon: "📦" },
    { label: "Orders", href: "/admin/orders", icon: "🛒" },
    { label: "Inventory", href: "/admin/inventory", icon: "📋" },
    { label: "Analytics", href: "/admin/analytics", icon: "📈" },
  ]

  if (!isAdmin) return null

  return (
    <main className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-2">
              ADMIN <span className="text-gold-light">DASHBOARD</span>
            </h1>
            <p className="text-muted-text">Sri Tex Management System</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border-2 border-gold-light text-gold-light font-black text-sm hover:bg-gold-light hover:text-background transition-colors"
          >
            LOGOUT
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 bg-card border border-border-luxury">
            <p className="text-muted-text text-sm font-black mb-2">TOTAL ORDERS</p>
            <p className="text-4xl font-black text-gold-light">248</p>
            <p className="text-xs text-muted-text mt-2">↑ 12% from last month</p>
          </div>

          <div className="p-6 bg-card border border-border-luxury">
            <p className="text-muted-text text-sm font-black mb-2">REVENUE</p>
            <p className="text-4xl font-black text-gold-light">₹5.2L</p>
            <p className="text-xs text-muted-text mt-2">↑ 8% from last month</p>
          </div>

          <div className="p-6 bg-card border border-border-luxury">
            <p className="text-muted-text text-sm font-black mb-2">PRODUCTS</p>
            <p className="text-4xl font-black text-gold-light">84</p>
            <p className="text-xs text-muted-text mt-2">Active products</p>
          </div>

          <div className="p-6 bg-card border border-border-luxury">
            <p className="text-muted-text text-sm font-black mb-2">CUSTOMERS</p>
            <p className="text-4xl font-black text-gold-light">1,240</p>
            <p className="text-xs text-muted-text mt-2">↑ 24% from last month</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="p-6 bg-card border border-border-luxury hover:border-gold-light hover:bg-card/50 transition-all duration-300 group cursor-pointer"
            >
              <p className="text-3xl mb-3">{item.icon}</p>
              <p className="text-sm font-black tracking-wider group-hover:text-gold-light transition-colors">
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border-luxury p-8">
          <h2 className="text-2xl font-black tracking-tight mb-6">RECENT ORDERS</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-luxury">
                  <th className="text-left py-3 font-black text-gold-light">ORDER ID</th>
                  <th className="text-left py-3 font-black text-gold-light">CUSTOMER</th>
                  <th className="text-left py-3 font-black text-gold-light">AMOUNT</th>
                  <th className="text-left py-3 font-black text-gold-light">STATUS</th>
                  <th className="text-left py-3 font-black text-gold-light">DATE</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-border-luxury hover:bg-background/50 transition-colors">
                    <td className="py-3">#SRI-{1000 + i}</td>
                    <td className="py-3">Customer {i}</td>
                    <td className="py-3 text-gold-light">₹{(i * 1500).toLocaleString()}</td>
                    <td className="py-3">
                      <span className="px-3 py-1 bg-gold-light/20 text-gold-light text-xs font-black rounded">
                        {i % 2 === 0 ? "DELIVERED" : "PENDING"}
                      </span>
                    </td>
                    <td className="py-3 text-muted-text">2024-01-{10 + i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
