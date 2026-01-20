"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminInventory() {
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
              INVENTORY <span className="text-gold-light">MANAGEMENT</span>
            </h1>
            <p className="text-muted-text">Real-time stock monitoring and updates</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border-2 border-gold-light text-gold-light font-black text-sm hover:bg-gold-light hover:text-background transition-colors"
          >
            LOGOUT
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex gap-4">
          <button className="px-8 py-3 bg-gold-light text-background font-black tracking-wider hover:bg-gold-accent transition-colors">
            + UPDATE STOCK
          </button>
          <Link
            href="/admin/dashboard"
            className="px-8 py-3 border-2 border-gold-light text-gold-light font-black hover:bg-gold-light hover:text-background transition-colors"
          >
            BACK TO DASHBOARD
          </Link>
        </div>

        {/* Inventory Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-card border border-border-luxury">
            <p className="text-muted-text text-sm font-black mb-2">LOW STOCK ITEMS</p>
            <p className="text-4xl font-black text-yellow-400">5</p>
            <p className="text-xs text-muted-text mt-2">Items below threshold</p>
          </div>

          <div className="p-6 bg-card border border-border-luxury">
            <p className="text-muted-text text-sm font-black mb-2">OUT OF STOCK</p>
            <p className="text-4xl font-black text-red-400">2</p>
            <p className="text-xs text-muted-text mt-2">Need immediate reorder</p>
          </div>

          <div className="p-6 bg-card border border-border-luxury">
            <p className="text-muted-text text-sm font-black mb-2">TOTAL ITEMS</p>
            <p className="text-4xl font-black text-gold-light">1,456</p>
            <p className="text-xs text-muted-text mt-2">Across all categories</p>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-card border border-border-luxury overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-luxury">
                  <th className="text-left py-4 px-6 font-black text-gold-light">PRODUCT</th>
                  <th className="text-left py-4 px-6 font-black text-gold-light">SKU</th>
                  <th className="text-left py-4 px-6 font-black text-gold-light">STOCK LEVEL</th>
                  <th className="text-left py-4 px-6 font-black text-gold-light">STATUS</th>
                  <th className="text-left py-4 px-6 font-black text-gold-light">REORDER POINT</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Premium Cotton Shirt", sku: "SHIRT-001", stock: 45, status: "healthy" },
                  { name: "Silk Blend Saree", sku: "SAREE-001", stock: 3, status: "low" },
                  { name: "Formal Blazer", sku: "BLAZER-001", stock: 28, status: "healthy" },
                  { name: "Evening Gown", sku: "GOWN-001", stock: 0, status: "out" },
                  { name: "Casual T-Shirt", sku: "TSHIRT-001", stock: 156, status: "healthy" },
                  { name: "Linen Jacket", sku: "JACKET-001", stock: 8, status: "low" },
                  { name: "Designer Kurta", sku: "KURTA-001", stock: 0, status: "out" },
                ].map((product, i) => (
                  <tr key={i} className="border-b border-border-luxury hover:bg-background/50 transition-colors">
                    <td className="py-4 px-6 font-semibold">{product.name}</td>
                    <td className="py-4 px-6 text-muted-text">{product.sku}</td>
                    <td className="py-4 px-6 font-black text-lg">{product.stock}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 text-xs font-black rounded ${
                          product.status === "healthy"
                            ? "bg-green-400/20 text-green-400"
                            : product.status === "low"
                              ? "bg-yellow-400/20 text-yellow-400"
                              : "bg-red-400/20 text-red-400"
                        }`}
                      >
                        {product.status === "healthy"
                          ? "HEALTHY"
                          : product.status === "low"
                            ? "LOW STOCK"
                            : "OUT OF STOCK"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-muted-text">20 units</td>
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
