"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'

  // If user is already authenticated, redirect
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      console.log('User already authenticated, redirecting to:', callbackUrl)
      router.push(callbackUrl)
    }
  }, [session, status, router, callbackUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    try {
      console.log('Attempting login with:', { email, callbackUrl })
      
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl
      })

      console.log('SignIn result:', result)

      if (result?.error) {
        setError("Invalid email or password")
        console.error('Login error:', result.error)
      } else if (result?.ok) {
        console.log('Login successful, redirecting to:', callbackUrl)
        router.push(callbackUrl)
        router.refresh() // Force a refresh to update middleware
      }
    } catch (error) {
      console.error('Login exception:', error)
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading if we're checking authentication status
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@board-man.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Default credentials:</p>
            <p className="font-mono">admin@board-man.com / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminLoginPage() {
  return <LoginForm />
}