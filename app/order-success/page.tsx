"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import jsPDF from "jspdf"

export default function OrderSuccess() {
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

  /* ================= DOWNLOAD HIGH-LEVEL INVOICE ================= */
  const downloadInvoice = () => {
  const doc = new jsPDF("p", "mm", "a4")

  /* PAGE SETUP */
  const left = 20
  const right = 190

  /* HEADER */
  doc.setFont("helvetica", "bold")
  doc.setFontSize(20)
  doc.text("TIRUPUR THREADS", 105, 18, { align: "center" })

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text("Premium Apparel · Cash on Delivery", 105, 26, { align: "center" })

  doc.setLineWidth(0.5)
  doc.line(left, 30, right, 30)

  /* INVOICE INFO */
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text("INVOICE", left, 42)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(`Invoice No: TT-${order.id.slice(0, 8).toUpperCase()}`, left, 52)
  doc.text(
    `Order Date: ${new Date(order.created_at).toDateString()}`,
    left,
    59
  )

  /* BILL TO */
  doc.setFont("helvetica", "bold")
  doc.text("Bill To:", left, 72)

  doc.setFont("helvetica", "normal")
  doc.text(`${order.first_name} ${order.last_name}`, left, 80)
  doc.text(order.address, left, 87)
  doc.text(`${order.city}, ${order.state} - ${order.pincode}`, left, 94)
  doc.text(`Phone: ${order.phone}`, left, 101)

  /* PRODUCT TABLE */
  let y = 112
  doc.setLineWidth(0.3)
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

  /* TOTALS BOX */
  y += 4
  doc.line(left, y, right, y)
  y += 8

  doc.text("Subtotal", 145, y)
  doc.text(`₹ ${order.subtotal}`, 170, y)

  y += 8
  doc.text("Tax", 145, y)
  doc.text(`₹ ${order.tax}`, 170, y)

  y += 10
  doc.setFont("helvetica", "bold")
  doc.text("Grand Total", 145, y)
  doc.text(`₹ ${order.total_amount}`, 170, y)

  /* FOOTER */
  y += 14
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text("Payment Method: Cash on Delivery", left, y)
  doc.text(`Order Status: ${order.status}`, left, y + 6)

  doc.setFontSize(9)
  doc.text(
    "Thank you for shopping with Tirupur Threads!",
    105,
    270,
    { align: "center" }
  )
  doc.text(
    "This is a system generated invoice.",
    105,
    276,
    { align: "center" }
  )

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
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center">

        {/* SUCCESS ICON */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Order Confirmed 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {/* ORDER DETAILS */}
<div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm space-y-3">

  <div className="grid grid-cols-2 items-center">
    <span className="text-gray-500">Order ID</span>
    <span className="text-right font-semibold text-green-600 whitespace-nowrap">
      #{order.id.slice(0, 8).toUpperCase()}
    </span>
  </div>

  <div className="grid grid-cols-2 items-center">
    <span className="text-gray-500">Total Amount</span>
    <span className="text-right font-semibold text-green-600 whitespace-nowrap">
      ₹{order.total_amount}
    </span>
  </div>

  <div className="grid grid-cols-2 items-center">
    <span className="text-gray-500">Payment Method</span>
    <span className="text-right font-semibold text-green-600 whitespace-nowrap">
      Cash on Delivery
    </span>
  </div>

  <div className="grid grid-cols-2 items-center">
    <span className="text-gray-500">Order Status</span>
    <span className="text-right font-semibold text-green-700 whitespace-nowrap">
      {order.status}
    </span>
  </div>

</div>


        {/* ACTIONS */}
        <div className="flex flex-col gap-3">
          <button
            onClick={downloadInvoice}
            className="w-full py-3 rounded-xl bg-black text-white font-semibold
                       hover:opacity-90 active:scale-[0.98]"
          >
            Download Invoice (PDF)
          </button>

          <Link
            href="/products"
            className="w-full py-3 rounded-xl border border-gray-300
                       text-gray-700 font-semibold text-center
                       hover:bg-gray-100"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </main>
  )
}
