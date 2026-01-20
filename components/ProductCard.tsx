"use client"

import Link from "next/link"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string | null
  tag?: string
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  tag,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="block bg-[#141414] border border-white/10 rounded-xl overflow-hidden hover:border-gold-light transition"
    >
      {/* IMAGE */}
      <div className="relative h-48 bg-black">
        {tag && (
          <span className="absolute top-2 left-2 z-10 text-[10px] px-2 py-1 bg-red-600 text-white font-black rounded">
            {tag}
          </span>
        )}

        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-text">
            Image not available
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="p-3">
        <p className="text-sm font-medium leading-tight mb-1">
          {name}
        </p>

        <p className="font-black text-gold-light mb-2">
          ₹{price}
        </p>

        <button className="w-full py-2 bg-gold-light text-black text-sm font-black rounded">
          Add to Cart
        </button>
      </div>
    </Link>
  )
}
