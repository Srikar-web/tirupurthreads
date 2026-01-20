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

  /* ================= FETCH ORDER & ITEMS ================= */
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

  /* ================= DOWNLOAD INVOICE ================= */
  const downloadInvoice = () => {
    const doc = new jsPDF("p", "mm", "a4")

    const left = 20
    const right = 190

    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.text("TIRUPUR THREADS", 105, 18, { align: "center" })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text("Premium Apparel · Cash on Delivery", 105, 26, { align: "center" })

    doc.line(left, 30, right, 30)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("INVOICE", left, 42)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text(`Invoice No: TT-${order.id.slice(0, 8).toUpperCase()}`, left, 52)
    doc.text(`Order Date: ${new Date(order.created_at).toDateString()}`, left, 59)

    doc.setFont("helvetica", "bold")
    doc.text("Bill To:", left, 72)

    doc.setFont("helvetica", "normal")
    doc.text(`${order.first_name} ${order.last_name}`, left, 80)
    doc.text(order.address, left, 87)
    doc.text(`${order.city}, ${order.state} - ${order.pincode}`, left, 94)
    doc.text(`Phone: ${order.phone}`, left, 101)

    let y = 112
    doc.rect(left, y - 6, right - left, 10)

    doc.setFont("helvetica", "bold")
    doc.text("Product", left + 2, y)
    doc.text("Qty", 120, y)
    doc.text("Price", 145, y)
    doc.text("Total", 170, y)

    y += 8
    doc.setFont("helvetica", "normal")

    orderItems.forEach((item) => {
      doc.text(item.products.name, left + 2, y)
      doc.text(String(item.quantity), 120, y)
      doc.text(`₹ ${item.price}`, 145, y)
      doc.text(`₹ ${item.price * item.quantity}`, 170, y)
      y += 8
    })

    y += 6
    doc.line(left, y, right, y)
    y += 8

    doc.text("Grand Total", 145, y)
    doc.text(`₹ ${order.total_amount}`, 170, y)

    doc.text("Payment Method: Cash on Delivery", left, y + 14)

    doc.text("Thank you for shopping with Tirupur Threads!", 105, 270, { align: "center" })

    doc.save(`Invoice_TT-${order.id.slice(0, 8).toUpperCase()}.pdf`)
  }

  if (loading) {
    return (
      <main className="py-24 text-center text-gray-500">
        Loading order details…
      </main>
    )
  }

  /* ================= UI ================= */
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 text-center">

        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2">Order Confirmed 🎉</h1>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm space-y-3">
          <div className="flex justify-between">
            <span>Order ID</span>
            <strong>#{order.id.slice(0, 8).toUpperCase()}</strong>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <strong>₹{order.total_amount}</strong>
          </div>
          <div className="flex justify-between">
            <span>Status</span>
            <strong>{order.status}</strong>
          </div>
        </div>

        <button
          onClick={downloadInvoice}
          className="w-full py-3 mb-3 rounded-xl bg-black text-white font-semibold"
        >
          Download Invoice
        </button>

        <Link
          href="/products"
          className="block w-full py-3 rounded-xl border text-gray-700 font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}

/* ================= SUSPENSE WRAPPER ================= */
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading…</div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}
