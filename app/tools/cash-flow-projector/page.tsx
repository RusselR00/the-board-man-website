"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, ArrowLeft, Plus, Minus, BarChart3, Download } from "lucide-react"
import Link from "next/link"

interface CashFlowItem {
  id: string
  name: string
  amount: number
  type: "income" | "expense"
  frequency: "monthly" | "quarterly" | "annually"
}

interface MonthlyProjection {
  month: string
  income: number
  expenses: number
  netCashFlow: number
  cumulativeCashFlow: number
}

export default function CashFlowProjectorPage() {
  const [startingCash, setStartingCash] = useState("")
  const [projectionPeriod, setProjectionPeriod] = useState("12")
  const [cashFlowItems, setCashFlowItems] = useState<CashFlowItem[]>([])
  const [newItem, setNewItem] = useState({
    name: "",
    amount: "",
    type: "income" as "income" | "expense",
    frequency: "monthly" as "monthly" | "quarterly" | "annually"
  })
  const [projections, setProjections] = useState<MonthlyProjection[]>([])

  const addCashFlowItem = () => {
    if (!newItem.name || !newItem.amount) return

    const item: CashFlowItem = {
      id: Date.now().toString(),
      name: newItem.name,
      amount: parseFloat(newItem.amount),
      type: newItem.type,
      frequency: newItem.frequency
    }

    setCashFlowItems([...cashFlowItems, item])
    setNewItem({ name: "", amount: "", type: "income", frequency: "monthly" })
  }

  const removeCashFlowItem = (id: string) => {
    setCashFlowItems(cashFlowItems.filter(item => item.id !== id))
  }

  const getMonthlyAmount = (item: CashFlowItem): number => {
    switch (item.frequency) {
      case "monthly":
        return item.amount
      case "quarterly":
        return item.amount / 3
      case "annually":
        return item.amount / 12
      default:
        return 0
    }
  }

  const generateProjections = () => {
    const months = parseInt(projectionPeriod)
    const start = parseFloat(startingCash) || 0
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    const newProjections: MonthlyProjection[] = []
    let cumulativeCash = start

    for (let i = 0; i < months; i++) {
      const monthIndex = i % 12
      const monthName = `${monthNames[monthIndex]} ${Math.floor(i / 12) + new Date().getFullYear()}`

      let monthlyIncome = 0
      let monthlyExpenses = 0

      cashFlowItems.forEach(item => {
        const monthlyAmount = getMonthlyAmount(item)
        if (item.type === "income") {
          monthlyIncome += monthlyAmount
        } else {
          monthlyExpenses += monthlyAmount
        }
      })

      const netCashFlow = monthlyIncome - monthlyExpenses
      cumulativeCash += netCashFlow

      newProjections.push({
        month: monthName,
        income: Math.round(monthlyIncome * 100) / 100,
        expenses: Math.round(monthlyExpenses * 100) / 100,
        netCashFlow: Math.round(netCashFlow * 100) / 100,
        cumulativeCashFlow: Math.round(cumulativeCash * 100) / 100
      })
    }

    setProjections(newProjections)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getTotalMonthlyIncome = () => {
    return cashFlowItems
      .filter(item => item.type === "income")
      .reduce((total, item) => total + getMonthlyAmount(item), 0)
  }

  const getTotalMonthlyExpenses = () => {
    return cashFlowItems
      .filter(item => item.type === "expense")
      .reduce((total, item) => total + getMonthlyAmount(item), 0)
  }

  const exportProjections = () => {
    const csvContent = [
      ["Month", "Income", "Expenses", "Net Cash Flow", "Cumulative Cash Flow"],
      ...projections.map(p => [p.month, p.income, p.expenses, p.netCashFlow, p.cumulativeCashFlow])
    ].map(row => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cash-flow-projection.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/resources" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Cash Flow Projector</h1>
          </div>
          <p className="text-gray-600">
            Project your business cash flow scenarios and plan for future financial needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Starting Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Setup Parameters</CardTitle>
                <CardDescription>
                  Configure your cash flow projection settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="startingCash">Starting Cash Balance (AED)</Label>
                  <Input
                    id="startingCash"
                    type="number"
                    placeholder="Enter current cash balance"
                    value={startingCash}
                    onChange={(e) => setStartingCash(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectionPeriod">Projection Period (Months)</Label>
                  <Select value={projectionPeriod} onValueChange={setProjectionPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 Months</SelectItem>
                      <SelectItem value="12">12 Months</SelectItem>
                      <SelectItem value="18">18 Months</SelectItem>
                      <SelectItem value="24">24 Months</SelectItem>
                      <SelectItem value="36">36 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Add Cash Flow Items */}
            <Card>
              <CardHeader>
                <CardTitle>Add Income & Expenses</CardTitle>
                <CardDescription>
                  Add recurring income and expense items
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    placeholder="e.g., Monthly Revenue, Office Rent"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemAmount">Amount (AED)</Label>
                    <Input
                      id="itemAmount"
                      type="number"
                      placeholder="Amount"
                      value={newItem.amount}
                      onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itemType">Type</Label>
                    <Select 
                      value={newItem.type} 
                      onValueChange={(value: "income" | "expense") => 
                        setNewItem({ ...newItem, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="itemFrequency">Frequency</Label>
                  <Select 
                    value={newItem.frequency} 
                    onValueChange={(value: "monthly" | "quarterly" | "annually") => 
                      setNewItem({ ...newItem, frequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={addCashFlowItem}
                  disabled={!newItem.name || !newItem.amount}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </CardContent>
            </Card>

            {/* Current Items */}
            {cashFlowItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Items</CardTitle>
                  <CardDescription>
                    Monthly equivalent amounts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {cashFlowItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex-1">
                          <span className="font-medium">{item.name}</span>
                          <div className="text-sm text-gray-500">
                            {formatCurrency(getMonthlyAmount(item))}/month
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${
                              item.type === "income" 
                                ? "bg-green-100 text-green-700" 
                                : "bg-red-100 text-red-700"
                            }`}>
                              {item.type}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCashFlowItem(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Income:</span>
                      <span className="text-green-600 font-semibold">
                        {formatCurrency(getTotalMonthlyIncome())}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly Expenses:</span>
                      <span className="text-red-600 font-semibold">
                        {formatCurrency(getTotalMonthlyExpenses())}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold border-t pt-2 mt-2">
                      <span>Net Monthly Cash Flow:</span>
                      <span className={getTotalMonthlyIncome() - getTotalMonthlyExpenses() >= 0 ? "text-green-600" : "text-red-600"}>
                        {formatCurrency(getTotalMonthlyIncome() - getTotalMonthlyExpenses())}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Projection</CardTitle>
                <CardDescription>
                  Create your cash flow forecast
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={generateProjections}
                  disabled={cashFlowItems.length === 0}
                  className="w-full mb-4"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Cash Flow Projection
                </Button>

                {projections.length > 0 && (
                  <Button 
                    onClick={exportProjections}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export to CSV
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Projections Results */}
            {projections.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Cash Flow Projection</CardTitle>
                  <CardDescription>
                    Monthly cash flow forecast for {projectionPeriod} months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {projections.map((projection, index) => (
                      <div key={index} className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded text-sm">
                        <div>
                          <div className="font-medium">{projection.month}</div>
                          <div className="text-green-600">
                            Income: {formatCurrency(projection.income)}
                          </div>
                          <div className="text-red-600">
                            Expenses: {formatCurrency(projection.expenses)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${
                            projection.netCashFlow >= 0 ? "text-green-600" : "text-red-600"
                          }`}>
                            Net: {formatCurrency(projection.netCashFlow)}
                          </div>
                          <div className={`text-lg font-bold ${
                            projection.cumulativeCashFlow >= 0 ? "text-blue-600" : "text-red-600"
                          }`}>
                            Balance: {formatCurrency(projection.cumulativeCashFlow)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Stats */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div>Starting Balance: {formatCurrency(parseFloat(startingCash) || 0)}</div>
                        <div>Ending Balance: {formatCurrency(projections[projections.length - 1]?.cumulativeCashFlow || 0)}</div>
                      </div>
                      <div>
                        <div>Avg Monthly Income: {formatCurrency(getTotalMonthlyIncome())}</div>
                        <div>Avg Monthly Expenses: {formatCurrency(getTotalMonthlyExpenses())}</div>
                      </div>
                    </div>
                  </div>

                  {/* Cash Flow Warnings */}
                  {projections.some(p => p.cumulativeCashFlow < 0) && (
                    <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">⚠️ Cash Flow Warning</h4>
                      <p className="text-sm text-red-700">
                        Your projections show negative cash flow in some periods. Consider:
                      </p>
                      <ul className="text-sm text-red-700 list-disc list-inside mt-2">
                        <li>Increasing revenue streams</li>
                        <li>Reducing expenses</li>
                        <li>Securing additional funding</li>
                        <li>Adjusting payment terms with customers/suppliers</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}