"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface SecureAdminLayoutProps {
  children: React.ReactNode
}

export function SecureAdminLayout({ children }: SecureAdminLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (status === "unauthenticated") {
      console.log("No session found, redirecting to login")
      router.push("/auth/login?callbackUrl=/admin")
      return
    }

    if (session?.user?.role !== "admin") {
      console.log("User is not admin, redirecting to login")
      router.push("/auth/login?callbackUrl=/admin")
      return
    }

    console.log("Admin access confirmed for:", session.user.email)
  }, [session, status, router])

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    )
  }

  // Show loading if not authenticated or not admin
  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // Render admin content if authenticated and is admin
  return <>{children}</>
}