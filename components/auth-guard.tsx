"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      // allow auth pages without login
      if (pathname.startsWith("/auth")) return

      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.replace("/auth/signin")
      }
    }

    checkAuth()
  }, [router, pathname])

  return <>{children}</>
}
