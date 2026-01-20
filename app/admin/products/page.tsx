"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminProducts() {
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
              PRODUCT <span className="text-gold-light">MANAGEMENT</span>
            </h1>
            <p className="text-muted-text">Manage your product inventory</p>
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
            + ADD NEW PRODUCT
          </button>
          <Link
            href="/admin/dashboard"
            className="px-8 py-3 border-2 border-gold-light text-gold-light font-black hover:bg-gold-light hover:text-background transition-colors"
          >
            BACK TO DASHBOARD
          </Link>
        </div>

        {/* Products Table */}
        <div className="bg-card border border-border-luxury overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-luxury">
                  <th className="text-left py-4 px-6 font-black text-gold-light">PRODUCT NAME</th>
                  <th className="text-left py-4 px-6 font-black text-gold-light">SKU</th>
                  <th className="text-left py-4 px-6 font-black text-gold-light">CATEGORY</th>
                  <th className="text-left py-4 px-6 font-black text-gold-light">PRICE</th>
                  <th className="text-left py-4 px-6 font-black text-gold-light">STOCK</th>
                  <th className="text-left py-4 px-6 font-black text-gold-light">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Premium Cotton Shirt", sku: "SHIRT-001", cat: "Men", price: "₹2,500", stock: 45 },
                  { name: "Silk Blend Saree", sku: "SAREE-001", cat: "Women", price: "₹8,999", stock: 12 },
                  { name: "Formal Blazer", sku: "BLAZER-001", cat: "Men", price: "₹6,500", stock: 28 },
                  { name: "Evening Gown", sku: "GOWN-001", cat: "Women", price: "₹12,000", stock: 8 },
                  { name: "Casual T-Shirt", sku: "TSHIRT-001", cat: "Unisex", price: "₹1,200", stock: 156 },
                ].map((product, i) => (
                  <tr key={i} className="border-b border-border-luxury hover:bg-background/50 transition-colors">
                    <td className="py-4 px-6 font-semibold">{product.name}</td>
                    <td className="py-4 px-6 text-muted-text">{product.sku}</td>
                    <td className="py-4 px-6 text-muted-text">{product.cat}</td>
                    <td className="py-4 px-6 text-gold-light font-black">{product.price}</td>
                    <td className="py-4 px-6">
                      <span className={product.stock > 20 ? "text-green-400" : "text-yellow-400"}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-gold-light hover:text-gold-accent text-sm font-black">EDIT</button>
                    </td>
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
