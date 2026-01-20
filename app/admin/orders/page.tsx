"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminOrders() {
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
              ORDER <span className="text-gold-light">MANAGEMENT</span>
            </h1>
            <p className="text-muted-text">View and manage customer orders</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border-2 border-gold-light text-gold-light font-black text-sm hover:bg-gold-light hover:text-background transition-colors"
          >
            LOGOUT
          </button>
        </div>

        {/* Status Filters */}
        <div className="flex gap-4 mb-8">
          <button className="px-4 py-2 bg-gold-light text-background font-black text-sm hover:bg-gold-accent transition-colors">
            ALL ORDERS
          </button>
          <button className="px-4 py-2 border-2 border-gold-light text-gold-light font-black text-sm hover:bg-gold-light hover:text-background transition-colors">
            PENDING
          </button>
          <button className="px-4 py-2 border-2 border-gold-light text-gold-light font-black text-sm hover:bg-gold-light hover:text-background transition-colors">
            DELIVERED
          </button>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 border-2 border-gold-light text-gold-light font-black text-sm hover:bg-gold-light hover:text-background transition-colors ml-auto"
          >
            BACK TO DASHBOARD
          </Link>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((order) => (
            <div
              key={order}
              className="p-6 bg-card border border-border-luxury hover:border-gold-light transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gold-light font-black">ORDER #SRI-{1000 + order}</p>
                  <p className="text-muted-text text-sm mt-1">2024-01-{10 + order}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-black rounded ${
                    order % 2 === 0 ? "bg-green-400/20 text-green-400" : "bg-yellow-400/20 text-yellow-400"
                  }`}
                >
                  {order % 2 === 0 ? "DELIVERED" : "PENDING"}
                </span>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-border-luxury">
                <p className="text-sm">
                  <span className="text-muted-text">Customer:</span> Customer {order}
                </p>
                <p className="text-sm">
                  <span className="text-muted-text">Email:</span> customer{order}@email.com
                </p>
                <p className="text-sm">
                  <span className="text-muted-text">Phone:</span> +91-98765-4{1000 + order}
                </p>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-border-luxury">
                <p className="text-sm">
                  <span className="text-muted-text">Payment:</span>{" "}
                  <span className="text-gold-light font-black">CASH ON DELIVERY</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-text">Total Amount:</span>{" "}
                  <span className="text-gold-light font-black">₹{(order * 1500).toLocaleString()}</span>
                </p>
              </div>

              <button className="text-gold-light hover:text-gold-accent font-black text-sm">VIEW DETAILS →</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
