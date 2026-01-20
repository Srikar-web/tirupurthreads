"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

/* ================= TYPES ================= */

interface Product {
  id: string
  name: string
  price: number
  image_url: string
  sizes: string[]
  material: string
  discount?: number
}

interface FeaturedProduct {
  id: string
  name: string
  price: number
  image_url: string
}

/* ================= CATEGORY DATA ================= */

const MEN_TYPES = [
  { label: "Round Neck", value: "roundneck", image: "/categories/men-roundneck.avif" },
  { label: "Polo", value: "polo", image: "/categories/men-polo.avif" },
  { label: "Oversized", value: "oversized", image: "/categories/men-oversized.jpg" },
  { label: "Hoodies", value: "hoodie", image: "/categories/men-hoodie.jpg" },
  { label: "Joggers", value: "jogger", image: "/categories/men-joggers.jpg" },
]

const WOMEN_TYPES = [
  { label: "Casual Tops", value: "top", image: "/categories/women-casual.webp" },
  { label: "T-Shirts", value: "tshirt", image: "/categories/women-tshirt.jpg" },
  { label: "Oversized", value: "oversized", image: "/categories/women-oversized.avif" },
  { label: "Hoodies", value: "hoodie", image: "/categories/women-hoodie.jpg" },
  { label: "Joggers", value: "jogger", image: "/categories/women-joggers.webp" },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender")
  const type = searchParams.get("type")

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const [trending, setTrending] = useState<FeaturedProduct[]>([])
  const [newArrivals, setNewArrivals] = useState<FeaturedProduct[]>([])
  const [bestSellers, setBestSellers] = useState<FeaturedProduct[]>([])

  const [sort, setSort] = useState("")
  const [size, setSize] = useState("")
  const [material, setMaterial] = useState("")

  /* ================= FEATURED ================= */
  useEffect(() => {
    const fetchFeatured = async () => {
      const { data: t } = await supabase
        .from("products")
        .select("id, name, price, image_url")
        .limit(8)

      const { data: n } = await supabase
        .from("products")
        .select("id, name, price, image_url")
        .order("created_at", { ascending: false })
        .limit(8)

      const { data: b } = await supabase
        .from("products")
        .select("id, name, price, image_url")
        .order("price", { ascending: false })
        .limit(8)

      if (t) setTrending(t)
      if (n) setNewArrivals(n)
      if (b) setBestSellers(b)
    }

    fetchFeatured()
  }, [])

  /* ================= PRODUCTS ================= */
  useEffect(() => {
    if (!gender || !type) return

    const fetchProducts = async () => {
      setLoading(true)

      let query = supabase
        .from("products")
        .select("*")
        .eq("gender", gender)
        .eq("product_type", type)

      if (size) query = query.contains("sizes", [size])
      if (material) query = query.ilike("material", `%${material}%`)
      if (sort === "low") query = query.order("price", { ascending: true })
      if (sort === "high") query = query.order("price", { ascending: false })

      const { data } = await query
      if (data) setProducts(data)
      setLoading(false)
    }

    fetchProducts()
  }, [gender, type, sort, size, material])

  /* ================= STEP 1: COLLECTIONS ================= */
  if (!gender) {
    return (
      <main className="bg-[#0b0b0b] text-foreground">
        <section className="px-4 py-14 max-w-7xl mx-auto">

          <h1 className="text-3xl md:text-5xl font-black text-center mb-12">
            Shop Collections
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <HeroCard href="/products?gender=men" image="/categories/men-roundneck.avif" title="MEN" />
            <HeroCard href="/products?gender=women" image="/categories/women-casual.webp" title="WOMEN" />
          </div>

          <FeaturedRow title="Trending Now" items={trending} />
          <FeaturedRow title="New Arrivals" items={newArrivals} />
          <FeaturedRow title="Best Sellers" items={bestSellers} />

        </section>
      </main>
    )
  }

  /* ================= STEP 2: TYPES ================= */
  if (gender && !type) {
    const TYPES = gender === "men" ? MEN_TYPES : WOMEN_TYPES

    return (
      <main className="bg-[#0b0b0b] text-foreground px-4 py-12">
        <Link href="/products" className="text-sm text-muted-text mb-6 inline-block">
          ← Back
        </Link>

        <h1 className="text-3xl font-black uppercase mb-8">
          {gender} collections
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TYPES.map((item) => (
            <Link
              key={item.value}
              href={`/products?gender=${gender}&type=${item.value}`}
              className="relative h-40 rounded-xl overflow-hidden"
            >
              <img src={item.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60" />
              <p className="absolute bottom-3 left-3 font-black">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </main>
    )
  }

  /* ================= STEP 3: PRODUCT LIST ================= */
  return (
    <main className="bg-[#0b0b0b] text-foreground px-4 pb-24">
      <section className="max-w-7xl mx-auto py-8">

        <Link
          href={`/products?gender=${gender}`}
          className="text-sm text-muted-text mb-4 inline-block"
        >
          ← Back
        </Link>

        <h1 className="text-2xl md:text-4xl font-black uppercase mb-6">
          {gender} · {type}
        </h1>

        {/* FILTERS */}
        <div className="flex gap-3 overflow-x-auto mb-6">
          <select onChange={(e) => setSort(e.target.value)} className="bg-card px-3 py-2">
            <option value="">Sort</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

          <select onChange={(e) => setSize(e.target.value)} className="bg-card px-3 py-2">
            <option value="">Size</option>
            <option>S</option><option>M</option><option>L</option><option>XL</option>
          </select>

          <select onChange={(e) => setMaterial(e.target.value)} className="bg-card px-3 py-2">
            <option value="">Material</option>
            <option>Cotton</option><option>Fleece</option><option>Lycra</option>
          </select>
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 bg-card animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group">
                <div className="relative h-64 rounded-xl overflow-hidden mb-2">
                  <img src={p.image_url} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <h3 className="text-sm font-black leading-tight">
                  {p.name}
                </h3>
                <p className="text-gold-light font-black mt-1">
                  ₹{p.price}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

/* ================= REUSABLE ================= */

function HeroCard({ href, image, title }: any) {
  return (
    <Link href={href} className="relative h-80 rounded-xl overflow-hidden">
      <img src={image} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <h2 className="absolute inset-0 flex items-center justify-center text-5xl font-black">
        {title}
      </h2>
    </Link>
  )
}

function FeaturedRow({ title, items }: { title: string; items: FeaturedProduct[] }) {
  if (!items.length) return null

  return (
    <section className="mb-16">
      <h2 className="text-xl font-black mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-auto">
        {items.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} className="min-w-[180px]">
            <div className="h-52 rounded-xl overflow-hidden mb-2">
              <img src={p.image_url} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-black">{p.name}</p>
            <span className="text-gold-light font-black">₹{p.price}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
