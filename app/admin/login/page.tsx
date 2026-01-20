"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Admin credentials check
    if (formData.email !== "admin@sritex.com" || formData.password !== "admin123") {
      setError("Invalid admin credentials")
      return
    }

    setLoading(true)
    setTimeout(() => {
      localStorage.setItem("admin", JSON.stringify({ email: formData.email }))
      router.push("/admin/dashboard")
      setLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center py-12 px-4 pt-32">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            ADMIN <span className="text-gold-light">LOGIN</span>
          </h1>
          <p className="text-muted-text text-sm">Sri Tex Management Portal</p>
          <p className="text-muted-text text-xs mt-4 p-4 bg-card border border-border-luxury rounded">
            Demo: admin@sritex.com / admin123
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-destructive/20 border border-destructive text-destructive rounded">{error}</div>
          )}

          <div>
            <label className="block text-sm font-black tracking-wider mb-3">ADMIN EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-card border border-border-luxury text-foreground placeholder-muted-text focus:outline-none focus:border-gold-light transition-colors"
              placeholder="Enter admin email"
            />
          </div>

          <div>
            <label className="block text-sm font-black tracking-wider mb-3">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-card border border-border-luxury text-foreground placeholder-muted-text focus:outline-none focus:border-gold-light transition-colors"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold-light text-background font-black tracking-wider hover:bg-gold-accent transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-border-luxury text-center">
          <Link href="/" className="text-muted-text hover:text-gold-light transition-colors text-sm">
            Back to Store
          </Link>
        </div>
      </div>
    </main>
  )
}
