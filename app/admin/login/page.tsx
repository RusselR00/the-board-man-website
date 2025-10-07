"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/auth/login")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to login...</p>
    </div>
  )
}