import { Suspense } from "react"
import ProductClient from "./products-client"

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading product…</div>}>
      <ProductClient />
    </Suspense>
  )
}
