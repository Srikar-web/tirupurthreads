export const dynamic = "force-dynamic"

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

      const { data: orderData, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .eq("user_id", user.id)
        .single()

      if (error || !orderData) {
        router.replace("/")
        return
      }

      const { data: items } = await supabase
        .from("order_items")
        .select(`
          quantity,
          price,
          products ( name )
        `)
        .eq("order_id", orderId)

      setOrder(orderData)
      setOrderItems(items || [])
      setLoading(false)
    }

    fetchOrder()
  }, [orderId, router])

  const downloadInvoice = () => {
    const doc = new jsPDF("p", "mm", "a4")
    const left = 20
    const right = 190

    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.text("TIRUPUR THREADS", 105, 18, { align: "center" })

    doc.setFontSize(10)
    doc.text("Premium Apparel · Cash on Delivery", 105, 26, { align: "center" })
    doc.line(left, 30, right, 30)

    doc.setFontSize(12)
    doc.text("INVOICE", left, 42)

    doc.setFontSize(10)
    doc.text(`Invoice No: TT-${order.id.slice(0, 8).toUpperCase()}`, left, 52)
    doc.text(`Order Date: ${new Date(order.created_at).toDateString()}`, left, 59)

    doc.text("Bill To:", left, 72)
    doc.text(`${order.first_name} ${order.last_name}`, left, 80)
    doc.text(order.address, left, 87)
    doc.text(`${order.city}, ${order.state} - ${order.pincode}`, left, 94)
    doc.text(`Phone: ${order.phone}`, left, 101)

    let y = 112
    doc.rect(left, y - 6, right - left, 10)
    doc.text("Product", left + 2, y)
    doc.text("Qty", 120, y)
    doc.text("Price", 145, y)
    doc.text("Total", 170, y)

    y += 8
    orderItems.forEach((item) => {
      doc.text(item.products.name, left + 2, y)
      doc.text(String(item.quantity), 120, y)
      doc.text(`₹ ${item.price}`, 145, y)
      doc.text(`₹ ${item.price * item.quantity}`, 170, y)
      y += 8
    })

    doc.text(`Grand Total: ₹ ${order.total_amount}`, 145, y + 10)
    doc.save(`Invoice_TT-${order.id.slice(0, 8).toUpperCase()}.pdf`)
  }

  if (loading) {
    return <main className="py-24 text-center text-gray-500">Loading…</main>
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Confirmed 🎉</h1>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm">
          <div className="flex justify-between">
            <span>Order ID</span>
            <strong>#{order.id.slice(0, 8).toUpperCase()}</strong>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <strong>₹{order.total_amount}</strong>
          </div>
        </div>

        <button onClick={downloadInvoice} className="w-full py-3 mb-3 bg-black text-white rounded-xl">
          Download Invoice
        </button>

        <Link href="/products" className="block w-full py-3 border rounded-xl">
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading…</div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}
