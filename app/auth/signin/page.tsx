"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function SignIn() {
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
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/")
    setLoading(false)
  }

  return (
    <main className="bg-background text-foreground pt-8 md:pt-12 px-4">
      <div className="w-full max-w-md mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            WELCOME <span className="text-gold-light">BACK</span>
          </h1>
          <p className="text-muted-text">
            Sign in to your Tirupur Threads account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-destructive/20 border border-destructive text-destructive rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-black tracking-wider mb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-card border border-border-luxury focus:outline-none focus:border-gold-light"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-black tracking-wider mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-card border border-border-luxury focus:outline-none focus:border-gold-light"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold-light text-background font-black tracking-wider hover:bg-gold-accent transition disabled:opacity-50"
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-muted-text mb-3">
            Don't have an account?
          </p>
          <Link
            href="/auth/signup"
            className="text-gold-light font-black hover:text-gold-accent"
          >
            CREATE ONE NOW
          </Link>
        </div>

        {/* Admin */}
        <div className="mt-10 pt-6 border-t border-border-luxury text-center">
          <p className="text-muted-text text-sm mb-3">
            Are you an admin?
          </p>
          <Link
            href="/admin/login"
            className="text-gold-light font-black text-sm hover:text-gold-accent"
          >
            ADMIN LOGIN
          </Link>
        </div>

      </div>
    </main>
  )
}
