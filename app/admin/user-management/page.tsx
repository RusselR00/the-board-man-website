"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Key, Plus, Copy } from "lucide-react"

export default function UserManagementPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  // Create User Form
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    role: "admin"
  })

  // Hash Password Form
  const [passwordToHash, setPasswordToHash] = useState("")

  const createUser = async () => {
    setIsLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      })

      const data = await response.json()
      setResult(data)

      if (!data.success) {
        setError(data.error)
      } else {
        setUserData({ email: "", password: "", name: "", role: "admin" })
      }
    } catch (err) {
      setError("Failed to create user")
    } finally {
      setIsLoading(false)
    }
  }

  const generateHash = async () => {
    setIsLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/admin/hash-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordToHash })
      })

      const data = await response.json()
      setResult(data)

      if (!data.success) {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to generate hash")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Create new admin users and generate password hashes</p>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create User</TabsTrigger>
            <TabsTrigger value="hash">Generate Hash</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Admin User
                </CardTitle>
                <CardDescription>
                  Add a new admin user to the system with automatic password hashing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@board-man.com"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Admin User"
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter secure password"
                    value={userData.password}
                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={createUser} 
                  disabled={isLoading || !userData.email || !userData.password || !userData.name}
                  className="w-full"
                >
                  {isLoading ? "Creating..." : "Create User"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hash">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Generate Password Hash
                </CardTitle>
                <CardDescription>
                  Generate a bcrypt hash for manual database insertion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordToHash">Password</Label>
                  <Input
                    id="passwordToHash"
                    type="password"
                    placeholder="Enter password to hash"
                    value={passwordToHash}
                    onChange={(e) => setPasswordToHash(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={generateHash} 
                  disabled={isLoading || !passwordToHash}
                  className="w-full"
                >
                  {isLoading ? "Generating..." : "Generate Hash"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {error && (
          <Alert className="mt-6" variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.success ? (
                <div className="space-y-4">
                  <Alert>
                    <AlertDescription>
                      {result.message || "Operation completed successfully!"}
                    </AlertDescription>
                  </Alert>

                  {result.user && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">User Created:</h4>
                      <div className="bg-slate-100 p-3 rounded text-sm">
                        <p><strong>ID:</strong> {result.user.id}</p>
                        <p><strong>Email:</strong> {result.user.email}</p>
                        <p><strong>Name:</strong> {result.user.name}</p>
                        <p><strong>Role:</strong> {result.user.role}</p>
                      </div>
                    </div>
                  )}

                  {result.hash && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Password Hash:</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.hash)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Hash
                        </Button>
                      </div>
                      <Textarea
                        value={result.hash}
                        readOnly
                        className="font-mono text-xs"
                        rows={3}
                      />
                    </div>
                  )}

                  {result.sqlInsert && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">SQL Insert Statement:</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.sqlInsert)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy SQL
                        </Button>
                      </div>
                      <Textarea
                        value={result.sqlInsert}
                        readOnly
                        className="font-mono text-xs"
                        rows={4}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <Alert variant="destructive">
                  <AlertDescription>{result.error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Manual Database Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <p>If you prefer to add users directly to the database:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Use the &quot;Generate Hash&quot; tab to create a password hash</li>
                <li>Copy the generated SQL insert statement</li>
                <li>Run it in your database console (Neon, pgAdmin, etc.)</li>
                <li>The user will be able to log in immediately</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}