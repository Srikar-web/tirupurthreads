"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import jsPDF from "jspdf"

/* ================= CONTENT COMPONENT ================= */
function OrderSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<any>(null)
  const [orderItems, setOrderItems] = useState<any[]>([])

  useEffect(() => {
    const fetchOrder = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user || !orderId) {
        router.replace("/")
        return
      }

      const { data: orderData } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .eq("user_id", user.id)
        .single()

      if (!orderData) {
        router.replace("/")
        return
      }

      const { data: items } = await supabase
        .from("order_items")
        .select(`quantity, price, products(name)`)
        .eq("order_id", orderId)

      setOrder(orderData)
      setOrderItems(items || [])
      setLoading(false)
    }

    fetchOrder()
  }, [orderId, router])

  if (loading) {
    return <div className="py-24 text-center">Loading…</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-md mx-auto bg-white rounded-xl p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Confirmed 🎉</h1>

        <p className="mb-2">
          Order ID: <b>{order.id.slice(0, 8).toUpperCase()}</b>
        </p>

        <p className="mb-6">
          Total: <b>₹{order.total_amount}</b>
        </p>

        <Link
          href="/products"
          className="block w-full py-3 border rounded-xl"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}

/* ================= PAGE ================= */
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading…</div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}
