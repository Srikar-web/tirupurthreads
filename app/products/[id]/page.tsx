"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

/* ================= TYPES ================= */

interface Product {
  id: string
  name: string
  price: number
  image_url: string
  description: string
  details: string[]
  sizes: string[]
  material: string
  collection: string
}

interface RelatedProduct {
  id: string
  name: string
  price: number
  image_url: string
}

/* ================= PAGE ================= */

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<RelatedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (!error) setProduct(data)
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  /* ================= FETCH RELATED ================= */
  useEffect(() => {
    if (!product) return

    const fetchRelated = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, image_url")
        .eq("collection", product.collection)
        .neq("id", product.id)
        .limit(4)

      if (data) setRelated(data)
    }

    fetchRelated()
  }, [product])

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async () => {
    if (!selectedSize || !product) return

    setAdding(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/auth/signin")
      return
    }

    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .eq("size", selectedSize)
      .single()

    if (existingItem) {
      await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + quantity })
        .eq("id", existingItem.id)
    } else {
      await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: product.id,
        size: selectedSize,
        quantity,
      })
    }

    setAdding(false)
    router.push("/checkout")
  }

  /* ================= LOADING SKELETON ================= */

  if (loading) {
    return (
      <div className="p-6 animate-pulse">
        <div className="h-72 bg-muted rounded-xl mb-6" />
        <div className="h-6 bg-muted w-3/4 mb-2" />
        <div className="h-6 bg-muted w-1/2" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-24 text-red-500">
        Product not found
      </div>
    )
  }

  /* ================= UI ================= */

  return (
    <main className="bg-background text-foreground pb-32">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* BACK */}
        <Link href="/products" className="text-sm text-muted-text">
          ← Back to Products
        </Link>

        {/* PRODUCT */}
        <div className="grid lg:grid-cols-2 gap-12 mt-8">

          {/* IMAGE */}
          <div className="rounded-xl overflow-hidden bg-card animate-fadeIn">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* INFO */}
          <div className="lg:sticky lg:top-24 animate-fadeIn">

            <p className="text-gold-light font-black tracking-widest mb-2">
              {product.collection}
            </p>

            <h1 className="text-3xl md:text-5xl font-black mb-4">
              {product.name}
            </h1>

            <p className="text-2xl text-gold-light font-black mb-6">
              ₹{product.price}
            </p>

            <p className="text-muted-text mb-6 leading-relaxed">
              {product.description}
            </p>

            <span className="inline-block bg-card px-4 py-2 rounded-full text-sm mb-6">
              {product.material}
            </span>

            {/* SIZE */}
            <h3 className="font-black mb-3">Select Size</h3>
            <div className="grid grid-cols-4 gap-3 mb-8">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 font-black rounded-md border transition ${
                    selectedSize === size
                      ? "bg-gold-light text-background border-gold-light"
                      : "border-border-luxury hover:border-gold-light"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* QUANTITY */}
            <h3 className="font-black mb-3">Quantity</h3>
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border font-black"
              >
                −
              </button>
              <span className="font-black">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border font-black"
              >
                +
              </button>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || adding}
              className={`w-full py-4 font-black rounded-lg ${
                selectedSize
                  ? "bg-gold-light text-background hover:bg-gold-accent"
                  : "bg-muted opacity-50 cursor-not-allowed"
              }`}
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>

            {/* DETAILS */}
            <div className="border-t border-border-luxury mt-10 pt-6">
              <h3 className="font-black mb-4">Product Details</h3>
              <ul className="space-y-2">
                {product.details.map((d, i) => (
                  <li key={i} className="text-muted-text flex gap-2">
                    <span className="text-gold-light">•</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-black mb-6">
              You may also like
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="group"
                >
                  <div className="h-48 bg-card rounded-xl overflow-hidden mb-3">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <p className="font-black text-sm group-hover:text-gold-light">
                    {item.name}
                  </p>
                  <span className="text-gold-light font-black">
                    ₹{item.price}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  )
}
