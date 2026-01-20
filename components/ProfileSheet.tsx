"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function ProfileSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { user, profile } = useAuth()

  if (!open) return null

  const userName =
    profile?.first_name ||
    user?.email?.split("@")[0] ||
    "User"

  return (
    <div className="fixed inset-0 z-[999] md:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 inset-x-0 bg-background rounded-t-2xl p-6 shadow-2xl animate-slideUp">
        {/* Handle */}
        <div className="h-1 w-12 bg-muted mx-auto mb-5 rounded-full" />

        {/* ================= USER INFO ================= */}
        {user && (
          <div className="mb-6">
            <p className="text-lg font-semibold">
              {userName}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {user.email}
            </p>
          </div>
        )}

        {!user && (
          <div className="mb-6">
            <p className="text-lg font-semibold">
              Account
            </p>
            <p className="text-sm text-muted-foreground">
              Sign in to manage orders and wholesale
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-border mb-5" />

        {/* ================= ACTIONS ================= */}
        {!user ? (
          <div className="flex flex-col gap-5">
            <Link
              href="/auth/signin"
              onClick={onClose}
              className="flex items-center gap-4 font-medium"
            >
              <span className="material-symbols-rounded">login</span>
              Sign In
            </Link>

            <Link
              href="/auth/signup"
              onClick={onClose}
              className="flex items-center gap-4 font-medium"
            >
              <span className="material-symbols-rounded">person_add</span>
              Create Account
            </Link>

            <Link
              href="/wholesale"
              onClick={onClose}
              className="flex items-center gap-4"
            >
              <span className="material-symbols-rounded">inventory_2</span>
              Wholesale Enquiry
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Orders */}
            <Link
              href="/orders"
              onClick={onClose}
              className="flex items-center gap-4 font-medium"
            >
              <span className="material-symbols-rounded">package</span>
              My Orders
            </Link>

            {/* Wholesale */}
            <Link
              href="/wholesale"
              onClick={onClose}
              className="flex items-center gap-4"
            >
              <span className="material-symbols-rounded">factory</span>
              Wholesale
            </Link>

            {/* Divider */}
            <div className="h-px bg-border my-2" />

            {/* Logout */}
            <div className="pt-4">
              <button
                onClick={onClose}
                className="flex items-center gap-4 text-red-500"
              >
                <span className="material-symbols-rounded">logout</span>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
