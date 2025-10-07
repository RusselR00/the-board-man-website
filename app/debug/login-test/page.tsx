// Simple test page to debug login issues
"use client"

import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginTest() {
  const [email, setEmail] = useState("admin@board-man.com")
  const [password, setPassword] = useState("admin123")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()

  const testLogin = async () => {
    setIsLoading(true)
    setResult(null)
    
    try {
      console.log("Testing login...")
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      })
      
      console.log("Login result:", res)
      setResult(res)
    } catch (error) {
      console.error("Login error:", error)
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setIsLoading(false)
    }
  }

  const testSession = async () => {
    try {
      const response = await fetch('/api/auth/session')
      const data = await response.json()
      console.log("Session data:", data)
      setResult(data)
    } catch (error) {
      console.error("Session error:", error)
    }
  }

  const testDebug = async () => {
    try {
      const response = await fetch('/api/debug/session')
      const data = await response.json()
      console.log("Debug data:", data)
      setResult(data)
    } catch (error) {
      console.error("Debug error:", error)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Login Debug Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p><strong>Session Status:</strong> {status}</p>
              <p><strong>User:</strong> {session?.user?.email || "None"}</p>
            </div>
            
            <div className="space-y-2">
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={testLogin} disabled={isLoading}>
                Test Login
              </Button>
              <Button onClick={testSession} variant="outline">
                Test Session
              </Button>
              <Button onClick={testDebug} variant="outline">
                Test Debug
              </Button>
            </div>

            {result && (
              <div className="mt-4">
                <h3 className="font-bold">Result:</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}