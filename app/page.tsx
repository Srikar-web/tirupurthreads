"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import ProductCard from "@/components/ProductCard"
import SkeletonProductCard from "@/components/SkeletonProductCard"

/* ================= TYPES ================= */

interface Product {
  id: string
  name: string
  price: number
  image_url: string
  category: string
  collection: string
  created_at: string
}

/* ================= PAGE ================= */

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  /* ================= FETCH REAL PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, price, image_url, category, collection, created_at"
        )
        .order("created_at", { ascending: false })
        .limit(12)

      if (!error && data) {
        setProducts(data)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  const trending = products.slice(0, 6)
  const bestSellers = products.slice(6, 12)

  return (
    <main className="bg-[#0b0b0b] text-foreground">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[55vh] flex items-center justify-center px-6">
        <div className="max-w-xl text-center animate-fadeIn">
          <p className="text-[11px] tracking-[0.35em] text-gold-light mb-4">
            TIRUPUR · KNITWEAR
          </p>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-5">
            Tirupur <span className="text-gold-light">Threads</span>
          </h1>

          <p className="text-sm text-muted-text mb-8 leading-relaxed">
            Premium knitwear and casual garments crafted in Tirupur,
            India’s knitwear capital.
          </p>

          <Link
            href="/products"
            className="inline-block px-12 py-4 bg-gold-light text-black font-black tracking-wide"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* ================= CATEGORY STRIP ================= */}
      <section className="px-4 py-4 border-b border-white/10">
        <div className="flex gap-6 overflow-x-auto text-sm font-medium">
          {["T-Shirts", "Oversized", "Hoodies", "Joggers", "Wholesale"].map(
            (c) => (
              <Link
                key={c}
                href="/products"
                className="shrink-0 pb-2 border-b-2 border-transparent hover:border-gold-light transition"
              >
                {c}
              </Link>
            )
          )}
        </div>
      </section>

      {/* ================= TRENDING ================= */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black">Trending Now</h2>
          <Link
            href="/products"
            className="text-sm text-gold-light font-black"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonProductCard key={i} />
              ))
            : trending.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  image={p.image_url}
                  tag={p.collection}
                />
              ))}
        </div>
      </section>

      {/* ================= BEST SELLERS ================= */}
      <section className="px-4 py-6 bg-[#101010] border-t border-white/5">
        <h2 className="text-xl font-black mb-4">Best Sellers</h2>

        <div className="flex gap-3 overflow-x-auto">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="min-w-[170px]">
                  <SkeletonProductCard />
                </div>
              ))
            : bestSellers.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="min-w-[170px] bg-[#141414] border border-white/10 rounded-xl p-3"
                >
                  <div className="h-36 bg-muted rounded mb-3 overflow-hidden">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-full h-full object-cover transition hover:scale-105"
                    />
                  </div>

                  <p className="text-sm font-medium leading-tight">
                    {p.name}
                  </p>
                  <p className="font-black text-gold-light mt-1">
                    ₹{p.price}
                  </p>
                </Link>
              ))}
        </div>
      </section>

     {/* ================= WHY TIRUPUR THREADS ================= */}
<section className="px-4 py-6">
  <h2 className="text-xl font-black mb-5">
    Why <span className="text-gold-light">Tirupur Threads</span>
  </h2>

  <div className="space-y-4">
    {[
      {
        title: "Factory Direct",
        desc: "Manufactured and supplied directly from Tirupur.",
      },
      {
        title: "Premium Fabric",
        desc: "High-quality knit fabrics with lasting comfort.",
      },
      {
        title: "Bulk & Custom Orders",
        desc: "Wholesale and private-label manufacturing supported.",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="
          relative
          bg-[#141414]
          p-5
          border border-white/10
          rounded-xl
          overflow-hidden
          hover:border-gold-light/60
          transition
        "
      >
        {/* Gold accent bar */}
        <div className="absolute left-0 top-0 h-full w-[3px] bg-gold-light/80" />

        <h3 className="font-black mb-1 text-gold-light">
          {item.title}
        </h3>

        <p className="text-sm text-muted-text leading-relaxed">
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</section>

{/* ================= WHOLESALE CTA ================= */}
<section className="px-4 pt-6 pb-6 border-t border-white/5">
  <div
    className="
      relative
      bg-gradient-to-br from-[#141414] to-[#0f0f0f]
      p-6
      border border-gold-light/40
      rounded-2xl
      text-center
      shadow-[0_0_40px_rgba(212,175,55,0.08)]
    "
  >
    <p className="text-[11px] tracking-[0.3em] text-gold-light mb-3">
      WHOLESALE & B2B
    </p>

    <h2 className="text-2xl font-black mb-3">
      Factory Manufacturing
    </h2>

    <p className="text-sm text-muted-text mb-6 leading-relaxed">
      Factory-direct pricing for retailers and resellers.
    </p>

    <Link
      href="/wholesale"
      className="
        inline-block
        px-10
        py-3
        border
        border-gold-light
        text-gold-light
        font-black
        hover:bg-gold-light
        hover:text-black
        transition
      "
    >
      Request Quote
    </Link>
  </div>

  {/* Gold section end divider */}
  <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gold-light/40 to-transparent" />
</section>

    </main>
  )
}
