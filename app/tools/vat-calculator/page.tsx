"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, ArrowLeft, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function VATCalculatorPage() {
  const [amount, setAmount] = useState("")
  const [vatRate, setVatRate] = useState("5")
  const [calculationType, setCalculationType] = useState("add")
  const [results, setResults] = useState<{
    originalAmount: number
    vatAmount: number
    totalAmount: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateVAT = () => {
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) return

    const rate = parseFloat(vatRate) / 100
    let originalAmount: number
    let vatAmount: number
    let totalAmount: number

    if (calculationType === "add") {
      // Add VAT to amount
      originalAmount = numAmount
      vatAmount = numAmount * rate
      totalAmount = numAmount + vatAmount
    } else {
      // Remove VAT from amount (amount includes VAT)
      totalAmount = numAmount
      originalAmount = numAmount / (1 + rate)
      vatAmount = numAmount - originalAmount
    }

    setResults({
      originalAmount: Math.round(originalAmount * 100) / 100,
      vatAmount: Math.round(vatAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100
    })
  }

  const copyToClipboard = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED'
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/resources" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calculator className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">VAT Calculator</h1>
          </div>
          <p className="text-gray-600">
            Calculate VAT amounts for UAE tax rates. Add or remove VAT from any amount.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <Card>
            <CardHeader>
              <CardTitle>Calculate VAT</CardTitle>
              <CardDescription>
                Enter your amount and select calculation type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (AED)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vatRate">VAT Rate</Label>
                <Select value={vatRate} onValueChange={setVatRate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5% (Standard UAE VAT)</SelectItem>
                    <SelectItem value="0">0% (Zero-rated)</SelectItem>
                    <SelectItem value="10">10% (Custom)</SelectItem>
                    <SelectItem value="15">15% (Custom)</SelectItem>
                    <SelectItem value="20">20% (Custom)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="calculationType">Calculation Type</Label>
                <Select value={calculationType} onValueChange={setCalculationType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">Add VAT to amount</SelectItem>
                    <SelectItem value="remove">Remove VAT from amount</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  {calculationType === "add" 
                    ? "Calculate total price including VAT" 
                    : "Calculate original price excluding VAT"}
                </p>
              </div>

              <Button 
                onClick={calculateVAT}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full"
              >
                Calculate VAT
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Calculation Results</CardTitle>
              <CardDescription>
                VAT breakdown and totals
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Original Amount:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          {formatCurrency(results.originalAmount)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(results.originalAmount)}
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">VAT Amount ({vatRate}%):</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-blue-600">
                          {formatCurrency(results.vatAmount)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(results.vatAmount)}
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                      <span className="font-medium">Total Amount:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-green-600">
                          {formatCurrency(results.totalAmount)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(results.totalAmount)}
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">Calculation Summary</h4>
                    <p className="text-sm text-amber-700">
                      {calculationType === "add" 
                        ? `Added ${vatRate}% VAT (${formatCurrency(results.vatAmount)}) to ${formatCurrency(results.originalAmount)}`
                        : `Removed ${vatRate}% VAT (${formatCurrency(results.vatAmount)}) from ${formatCurrency(results.totalAmount)}`
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter an amount and click calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>UAE VAT Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Standard VAT Rate</h4>
                <p className="text-sm text-gray-600 mb-4">
                  The UAE applies a standard VAT rate of 5% on most goods and services.
                </p>
                
                <h4 className="font-semibold mb-2">Zero-rated Items</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Basic food items</li>
                  <li>Healthcare and medical services</li>
                  <li>Education services</li>
                  <li>Exports of goods and services</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Exempt Items</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Residential real estate sales</li>
                  <li>Financial services</li>
                  <li>Bare land</li>
                  <li>Local passenger transport</li>
                </ul>
                
                <h4 className="font-semibold mb-2 mt-4">VAT Registration</h4>
                <p className="text-sm text-gray-600">
                  Businesses with annual revenue exceeding AED 375,000 must register for VAT.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}