"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

/* ===== BASIC INDIA STATE → DISTRICT SAMPLE ===== */
const STATE_DISTRICT_MAP: Record<string, string[]> = {
  "Tamil Nadu": ["Coimbatore", "Tiruppur", "Erode", "Chennai", "Salem"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
  "Kerala": ["Kochi", "Trivandrum", "Kozhikode"],
}

export default function Checkout() {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [loading, setLoading] = useState(true)

  const [userProfile, setUserProfile] = useState<any>(null)
  const [userEmail, setUserEmail] = useState("")
  const [cartItems, setCartItems] = useState<any[]>([])

  const [paymentSelected, setPaymentSelected] = useState(false)

  const [address, setAddress] = useState({
    address: "",
    district: "",
    state: "",
    pincode: "",
  })

  /* ================= LOAD USER + CART ================= */
  const loadCart = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.replace("/auth/signin")
      return
    }

    setUserEmail(user.email || "")

    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name,last_name,phone")
      .eq("id", user.id)
      .single()

    const { data: cart } = await supabase
      .from("cart_items")
      .select(`id, product_id, size, quantity, products ( name, price )`)
      .eq("user_id", user.id)

    setUserProfile(profile)
    setCartItems(cart || [])
    setLoading(false)
  }

  useEffect(() => {
    loadCart()
  }, [])

  /* ================= CART OPERATIONS ================= */
  const increaseQty = async (id: string, qty: number) => {
    await supabase.from("cart_items").update({ quantity: qty + 1 }).eq("id", id)
    loadCart()
  }

  const decreaseQty = async (id: string, qty: number) => {
    if (qty <= 1) return
    await supabase.from("cart_items").update({ quantity: qty - 1 }).eq("id", id)
    loadCart()
  }

  const removeItem = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id)
    loadCart()
  }

  /* ================= TOTALS ================= */
  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.products.price * i.quantity,
    0
  )
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + tax

  const isAddressValid =
    address.address && address.state && address.district && address.pincode

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    if (!isAddressValid || !paymentSelected) {
      alert("Please verify delivery details and payment method")
      return
    }

    setPlacingOrder(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        email: user.email,
        phone: userProfile.phone,
        address: address.address,
        city: address.district,
        state: address.state,
        pincode: address.pincode,
        subtotal,
        tax,
        total_amount: total,
        status: "placed",
      })
      .select()
      .single()

    if (error || !order) {
      alert("Order failed. Please try again.")
      setPlacingOrder(false)
      return
    }

    await supabase.from("order_items").insert(
      cartItems.map(i => ({
        order_id: order.id,
        product_id: i.product_id,
        size: i.size,
        quantity: i.quantity,
        price: i.products.price,
      }))
    )

    await supabase.from("cart_items").delete().eq("user_id", user.id)
    router.replace(`/order-success?orderId=${order.id}`)
  }

  if (loading) {
    return <div className="text-center py-24 text-gray-700">Loading checkout…</div>
  }

  /* ================= UI ================= */
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">

          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <div className="bg-white rounded-xl p-4 space-y-3 shadow-sm">
              <h2 className="font-bold text-base">Delivery Address</h2>

              <textarea
                className="input w-full"
                placeholder="Enter the House / Street address"
                value={address.address}
                onChange={e => setAddress({ ...address, address: e.target.value })}
              />

              <select
                className="input w-full"
                value={address.state}
                onChange={e => setAddress({ ...address, state: e.target.value, district: "" })}
              >
                <option value="">Select State</option>
                {Object.keys(STATE_DISTRICT_MAP).map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              <select
                className="input w-full"
                value={address.district}
                disabled={!address.state}
                onChange={e => setAddress({ ...address, district: e.target.value })}
              >
                <option value="">Select District</option>
                {address.state &&
                  STATE_DISTRICT_MAP[address.state].map(d => (
                    <option key={d}>{d}</option>
                  ))}
              </select>

              <input
                className="input w-full"
                placeholder="Pincode"
                value={address.pincode}
                onChange={e => setAddress({ ...address, pincode: e.target.value })}
              />

              {isAddressValid && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-sm text-green-700">
                  ✓ Delivery address looks good
                </div>
              )}

              <button
                disabled={!isAddressValid}
                onClick={() => setStep(2)}
                className="btn-primary w-full py-3"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 2 && (
            <div className="bg-white rounded-xl p-4 space-y-3 shadow-sm">
              <h2 className="font-bold text-base">Payment Method</h2>

              <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer">
                <input
                  type="radio"
                  checked={paymentSelected}
                  onChange={() => setPaymentSelected(true)}
                />
                <div>
                  <p className="font-semibold">Cash on Delivery</p>
                  <p className="text-xs text-gray-600">Pay when item is delivered</p>
                </div>
              </label>

              <button
                disabled={!paymentSelected}
                onClick={() => setStep(3)}
                className="btn-primary w-full py-3"
              >
                Review Order
              </button>
            </div>
          )}

          {/* STEP 3: CONFIRM */}
          {step === 3 && (
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
              <p className="text-sm">
                Payment Method: <span className="font-semibold">Cash on Delivery</span>
              </p>

              <button
                disabled={placingOrder}
                onClick={placeOrder}
                className="w-full py-4 text-lg font-bold rounded-xl
                           bg-black text-white shadow-lg
                           hover:opacity-90 active:scale-[0.98]"
              >
                {placingOrder ? "Placing Order…" : "Place Order Securely"}
              </button>

              {/* CONTINUE SHOPPING */}
              <button
                onClick={() => router.push("/")}
                className="w-full text-sm text-gray-600 underline"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="bg-white rounded-xl p-4 shadow-sm h-fit lg:sticky lg:top-20">
          <h3 className="font-bold mb-4 text-base">
            Order Summary ({cartItems.length} items)
          </h3>

          {cartItems.map(i => (
            <div key={i.id} className="border rounded-lg p-3 mb-3 space-y-2">
              <p className="text-sm font-medium whitespace-normal break-words leading-snug">
                {i.products.name}
              </p>

              <div className="flex justify-between text-xs text-gray-600">
                <span>Size: {i.size}</span>
                <span className="font-semibold text-gray-900">
                  ₹{i.products.price * i.quantity}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                  <button
                    onClick={() => decreaseQty(i.id, i.quantity)}
                    className="px-2 text-lg font-bold"
                  >
                    −
                  </button>

                  <span className="min-w-[20px] text-center text-sm">
                    {i.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(i.id, i.quantity)}
                    className="px-2 text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(i.id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <p className="text-xs text-gray-500">
              Inclusive of all taxes
            </p>
          </div>

          <p className="text-xs text-center text-gray-500 mt-4">
            🔒 Secure checkout · Modify cart anytime
          </p>
        </div>
      </div>
    </main>
  )
}
