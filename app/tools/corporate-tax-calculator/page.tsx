"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, ArrowLeft, Calculator, Info, TrendingUp, Minus } from "lucide-react"
import Link from "next/link"

export default function CorporateTaxCalculatorPage() {
  const [revenue, setRevenue] = useState("")
  const [expenses, setExpenses] = useState("")
  const [businessType, setBusinessType] = useState("mainland")
  const [results, setResults] = useState<{
    taxableIncome: number
    taxAmount: number
    netIncome: number
    effectiveRate: number
  } | null>(null)

  const calculateTax = () => {
    const totalRevenue = parseFloat(revenue) || 0
    const totalExpenses = parseFloat(expenses) || 0
    
    if (totalRevenue <= 0) return

    const taxableIncome = Math.max(0, totalRevenue - totalExpenses)
    let taxAmount = 0
    let taxRate = 0

    // UAE Corporate Tax rates (as of 2023)
    if (businessType === "freezone") {
      // Free zone companies - 0% on qualifying income
      taxAmount = 0
      taxRate = 0
    } else {
      // Mainland companies
      if (taxableIncome <= 375000) {
        // Small business relief - 0% up to AED 375,000
        taxAmount = 0
        taxRate = 0
      } else {
        // 9% on income above AED 375,000
        taxAmount = (taxableIncome - 375000) * 0.09
        taxRate = 9
      }
    }

    const netIncome = taxableIncome - taxAmount
    const effectiveRate = taxableIncome > 0 ? (taxAmount / taxableIncome) * 100 : 0

    setResults({
      taxableIncome: Math.round(taxableIncome * 100) / 100,
      taxAmount: Math.round(taxAmount * 100) / 100,
      netIncome: Math.round(netIncome * 100) / 100,
      effectiveRate: Math.round(effectiveRate * 100) / 100
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED'
    }).format(amount)
  }

  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('en-AE').format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/resources" 
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Corporate Tax Calculator</h1>
          </div>
          <p className="text-gray-600">
            Calculate your UAE corporate tax liability based on current tax rates and regulations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Calculation</CardTitle>
              <CardDescription>
                Enter your business financial details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="revenue">Annual Revenue (AED)</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="Enter total annual revenue"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expenses">Annual Expenses (AED)</Label>
                <Input
                  id="expenses"
                  type="number"
                  placeholder="Enter total deductible expenses"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className="text-lg"
                />
                <p className="text-sm text-gray-500">
                  Include all legitimate business expenses and deductions
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mainland">Mainland Company</SelectItem>
                    <SelectItem value="freezone">Free Zone Company</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  {businessType === "freezone" 
                    ? "Free zone companies may qualify for 0% tax on qualifying income" 
                    : "Mainland companies are subject to standard corporate tax rates"}
                </p>
              </div>

              <Button 
                onClick={calculateTax}
                disabled={!revenue || parseFloat(revenue) <= 0}
                className="w-full"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Corporate Tax
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Calculation Results</CardTitle>
              <CardDescription>
                Your estimated corporate tax liability
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Taxable Income:</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(results.taxableIncome)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Minus className="h-4 w-4 text-red-600" />
                        <span className="font-medium">Corporate Tax ({businessType === "freezone" ? "0%" : "9%"}):</span>
                      </div>
                      <span className="text-lg font-bold text-red-600">
                        {formatCurrency(results.taxAmount)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                      <span className="font-medium">Net Income After Tax:</span>
                      <span className="text-xl font-bold text-green-600">
                        {formatCurrency(results.netIncome)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Effective Tax Rate:</span>
                      <span className="text-lg font-bold">
                        {results.effectiveRate.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {businessType === "mainland" && results.taxableIncome <= 375000 && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-800">Small Business Relief</h4>
                          <p className="text-sm text-green-700">
                            Your business qualifies for small business relief. No corporate tax is due on income up to AED 375,000.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {businessType === "freezone" && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-800">Free Zone Status</h4>
                          <p className="text-sm text-blue-700">
                            Free zone companies may qualify for 0% corporate tax on qualifying income. Consult with a tax advisor for specific requirements.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter your financial details to calculate corporate tax</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Corporate Tax Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Mainland Companies</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 0% on taxable income up to AED 375,000</li>
                    <li>• 9% on taxable income above AED 375,000</li>
                    <li>• Large multinationals may face additional rates</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Free Zone Companies</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 0% on qualifying income</li>
                    <li>• Must meet specific qualifying conditions</li>
                    <li>• Subject to substance requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Key Deductions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-semibold mb-2">Allowable Expenses</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Employee salaries and benefits</li>
                  <li>• Rent and utilities</li>
                  <li>• Office supplies and equipment</li>
                  <li>• Professional services fees</li>
                  <li>• Depreciation on assets</li>
                  <li>• Interest on business loans</li>
                  <li>• Marketing and advertising costs</li>
                  <li>• Travel and entertainment (conditions apply)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-1">Important Disclaimer</h4>
                <p className="text-sm text-amber-700">
                  This calculator provides estimates based on simplified assumptions. Actual tax liability may vary based on specific circumstances, 
                  additional income sources, and complex tax rules. Please consult with a qualified tax advisor or the Federal Tax Authority for 
                  accurate tax planning and compliance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}