import { Suspense } from "react"
import ProductsClient from "./products-client"

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading products…</div>}>
      <ProductsClient />
    </Suspense>
  )
}
