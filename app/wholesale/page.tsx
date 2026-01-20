"use client"

import Link from "next/link"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function WholesalePage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")
    setSuccess(false)

    const { error } = await supabase
      .from("wholesale_enquiries")
      .insert([form])

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
    })

    setTimeout(() => setSuccess(false), 4000)
    setLoading(false)
  }

  return (
    <main className="bg-background text-foreground">

      {/* ================= HERO ================= */}
<section className="relative px-6 pt-20 pb-16 sm:pt-36 sm:pb-32 border-b border-border-luxury overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-black via-black/85 to-black" />
  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top,_#f5c16c_0%,_transparent_60%)]" />

  <div className="relative z-10 max-w-6xl mx-auto text-center">
    <span className="inline-block mb-4 px-4 py-1.5 border border-gold-light text-gold-light text-[10px] tracking-widest font-black">
      WHOLESALE & B2B MANUFACTURING
    </span>

    <h1 className="text-[32px] leading-tight sm:text-6xl md:text-7xl font-black mb-4">
      Premium Bulk Garment<br />Manufacturing
    </h1>

    <p className="text-muted-text text-sm sm:text-xl max-w-3xl mx-auto mb-8">
      Export-quality men’s & women’s knitwear manufactured in Tirupur.
    </p>

    <div className="flex flex-col gap-3 sm:flex-row sm:gap-6 justify-center">
      <a
        href="#enquiry"
        className="px-8 py-3 bg-gold-light text-background text-sm font-black hover:bg-gold-accent transition"
      >
        REQUEST QUOTE
      </a>

      <Link
        href="/products"
        className="px-8 py-3 border-2 border-gold-light text-gold-light text-sm font-black hover:bg-gold-light hover:text-background transition"
      >
        VIEW COLLECTIONS
      </Link>
    </div>
  </div>
</section>

      {/* ================= WHY US ================= */}
      <section className="py-20 sm:py-28 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">
          Why Businesses Choose Tirupur Threads
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["End-to-End Manufacturing", "Yarn to packing under one roof."],
            ["Private Label Support", "Labels, tags & packaging."],
            ["Export Quality Control", "Multi-stage inspection."],
            ["Flexible MOQ", "Start small, scale fast."],
            ["On-Time Delivery", "Domestic & export timelines."],
            ["Dedicated B2B Support", "Single point of contact."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="p-6 border border-border-luxury rounded-xl hover:border-gold-light transition"
            >
              <h3 className="font-black mb-2">{title}</h3>
              <p className="text-muted-text text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ENQUIRY ================= */}
      <section id="enquiry" className="py-24 px-4">
        <div className="max-w-lg mx-auto bg-card rounded-2xl p-6 sm:p-10 border border-border-luxury shadow-[0_0_40px_rgba(245,193,108,0.08)]">
          <h2 className="text-3xl font-black mb-2 text-center">
            Start Your Bulk Order
          </h2>

          <p className="text-muted-text text-center mb-8 text-sm">
            Get pricing & production details within 24 hours.
          </p>

          {success && (
            <p className="text-center text-green-500 font-black mb-6">
              ✅ Enquiry submitted successfully
            </p>
          )}

          {errorMsg && (
            <p className="text-center text-red-500 font-black mb-6">
              {errorMsg}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Full Name *"
              className="w-full rounded-lg bg-background border px-4 py-3 text-sm outline-none focus:border-gold-light"
            />

            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company / Brand"
              className="w-full rounded-lg bg-background border px-4 py-3 text-sm outline-none focus:border-gold-light"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email Address *"
              className="w-full rounded-lg bg-background border px-4 py-3 text-sm outline-none focus:border-gold-light"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Phone / WhatsApp *"
              className="w-full rounded-lg bg-background border px-4 py-3 text-sm outline-none focus:border-gold-light"
            />

            {/* Improved dropdown */}
            <div className="relative">
              <select
                name="interest"
                value={form.interest}
                onChange={handleChange}
                required
                className="w-full appearance-none rounded-lg bg-background border px-4 py-3 text-sm outline-none focus:border-gold-light"
              >
                <option value="">Interested In *</option>
                <option value="Men">Men’s Wear</option>
                <option value="Women">Women’s Wear</option>
                <option value="Men & Women">Men & Women</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-text">
                ▼
              </span>
            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Product, quantity, GSM, branding details"
              className="w-full rounded-lg bg-background border px-4 py-3 text-sm outline-none focus:border-gold-light"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 bg-gold-light text-background font-black hover:bg-gold-accent transition rounded-lg disabled:opacity-60"
            >
              {loading ? "SUBMITTING..." : "GET BULK PRICING"}
            </button>

            <p className="text-xs text-muted-text text-center mt-2">
              🔒 Your details are secure & confidential
            </p>
          </form>
        </div>
      </section>

      <section className="py-10 text-center border-t border-border-luxury">
        <p className="text-muted-text text-sm">
          Reliable & scalable garment manufacturing from Tirupur.
        </p>
      </section>
    </main>
  )
}
