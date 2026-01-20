"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminAnalytics() {
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

  if (!isAdmin) return null

  return (
    <main className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-2">
              ANALYTICS <span className="text-gold-light">DASHBOARD</span>
            </h1>
            <p className="text-muted-text">Performance metrics and insights</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border-2 border-gold-light text-gold-light font-black text-sm hover:bg-gold-light hover:text-background transition-colors"
          >
            LOGOUT
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 bg-card border border-border-luxury">
            <p className="text-muted-text text-sm font-black mb-2">TOTAL REVENUE</p>
            <p className="text-3xl font-black text-gold-light">₹12.5L</p>
            <p className="text-xs text-green-400 mt-2">↑ 15% this month</p>
          </div>

          <div className="p-6 bg-card border border-border-luxury">
            <p className="text-muted-text text-sm font-black mb-2">CONVERSION RATE</p>
            <p className="text-3xl font-black text-gold-light">3.2%</p>
            <p className="text-xs text-green-400 mt-2">↑ 0.5% from last month</p>
          </div>

          <div className="p-6 bg-card border border-border-luxury">
            <p className="text-muted-text text-sm font-black mb-2">AVG ORDER VALUE</p>
            <p className="text-3xl font-black text-gold-light">₹5,042</p>
            <p className="text-xs text-green-400 mt-2">↑ 8% from last month</p>
          </div>

          <div className="p-6 bg-card border border-border-luxury">
            <p className="text-muted-text text-sm font-black mb-2">CUSTOMER RETENTION</p>
            <p className="text-3xl font-black text-gold-light">42%</p>
            <p className="text-xs text-green-400 mt-2">↑ 5% from last month</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Trend */}
          <div className="bg-card border border-border-luxury p-8">
            <h3 className="text-xl font-black tracking-tight mb-6">MONTHLY SALES TREND</h3>
            <div className="space-y-4">
              {[
                { month: "Jan", sales: 45, bar: "45%" },
                { month: "Feb", sales: 52, bar: "52%" },
                { month: "Mar", sales: 48, bar: "48%" },
                { month: "Apr", sales: 61, bar: "61%" },
                { month: "May", sales: 55, bar: "55%" },
                { month: "Jun", sales: 72, bar: "72%" },
              ].map((item) => (
                <div key={item.month} className="flex items-center gap-4">
                  <div className="w-12 text-right text-sm font-black">{item.month}</div>
                  <div className="flex-1 h-8 bg-background rounded overflow-hidden">
                    <div
                      className="h-full bg-gold-light flex items-center justify-end pr-3 text-background font-black text-xs"
                      style={{ width: item.bar }}
                    >
                      {item.sales}K
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-card border border-border-luxury p-8">
            <h3 className="text-xl font-black tracking-tight mb-6">TOP SELLING PRODUCTS</h3>
            <div className="space-y-4">
              {[
                { name: "Premium Cotton Shirt", sales: 245, revenue: "₹6.1L" },
                { name: "Silk Blend Saree", sales: 128, revenue: "₹11.5L" },
                { name: "Formal Blazer", sales: 95, revenue: "₹6.1L" },
                { name: "Casual T-Shirt", sales: 412, revenue: "₹4.9L" },
                { name: "Evening Gown", sales: 52, revenue: "₹6.2L" },
              ].map((product, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 bg-background rounded border border-border-luxury"
                >
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-muted-text text-sm">{product.sales} sold</p>
                  </div>
                  <p className="text-gold-light font-black">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Insights */}
        <div className="bg-card border border-border-luxury p-8">
          <h3 className="text-xl font-black tracking-tight mb-6">CUSTOMER INSIGHTS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-background rounded">
              <p className="text-muted-text text-sm font-black mb-2">NEW CUSTOMERS THIS MONTH</p>
              <p className="text-2xl font-black text-gold-light">284</p>
            </div>
            <div className="p-4 bg-background rounded">
              <p className="text-muted-text text-sm font-black mb-2">REPEAT CUSTOMERS</p>
              <p className="text-2xl font-black text-gold-light">156</p>
            </div>
            <div className="p-4 bg-background rounded">
              <p className="text-muted-text text-sm font-black mb-2">CUSTOMER SATISFACTION</p>
              <p className="text-2xl font-black text-gold-light">4.7/5</p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href="/admin/dashboard"
            className="inline-block px-8 py-3 border-2 border-gold-light text-gold-light font-black hover:bg-gold-light hover:text-background transition-colors"
          >
            BACK TO DASHBOARD
          </Link>
        </div>
      </div>
    </main>
  )
}
