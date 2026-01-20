"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setUser(null)
        setProfile(null)
        setLoading(false)
        return
      }

      setUser(user)

      // ✅ FIX: fetch correct columns
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("first_name,last_name")
        .eq("id", user.id)
        .single()

      if (error) {
        console.error("Profile fetch error:", error)
      }

      setProfile(profileData)
      setLoading(false)
    }

    loadUser()
  }, [])

  return { user, profile, loading }
}
