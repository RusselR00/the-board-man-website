"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, ArrowLeft, Calculator, DollarSign, Target, Clock } from "lucide-react"
import Link from "next/link"

interface ROIResults {
  simpleROI: number
  annualizedROI: number
  totalReturn: number
  totalGain: number
  paybackPeriod: number
  breakEvenPoint: number
}

export default function ROICalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState("")
  const [finalValue, setFinalValue] = useState("")
  const [timeHorizon, setTimeHorizon] = useState("")
  const [timeUnit, setTimeUnit] = useState("years")
  const [additionalCosts, setAdditionalCosts] = useState("")
  const [annualCashFlow, setAnnualCashFlow] = useState("")
  const [results, setResults] = useState<ROIResults | null>(null)

  const calculateROI = () => {
    const initial = parseFloat(initialInvestment) || 0
    const final = parseFloat(finalValue) || 0
    const additional = parseFloat(additionalCosts) || 0
    const cashFlow = parseFloat(annualCashFlow) || 0
    const time = parseFloat(timeHorizon) || 1

    if (initial <= 0) return

    // Convert time to years
    let timeInYears = time
    if (timeUnit === "months") {
      timeInYears = time / 12
    } else if (timeUnit === "quarters") {
      timeInYears = time / 4
    }

    const totalInvestment = initial + additional
    const totalCashFlows = cashFlow * timeInYears
    const totalReturn = final + totalCashFlows
    const totalGain = totalReturn - totalInvestment

    // Simple ROI percentage
    const simpleROI = (totalGain / totalInvestment) * 100

    // Annualized ROI
    const annualizedROI = timeInYears > 0 
      ? (Math.pow(totalReturn / totalInvestment, 1 / timeInYears) - 1) * 100
      : simpleROI

    // Payback period (in years)
    const paybackPeriod = cashFlow > 0 
      ? totalInvestment / cashFlow 
      : timeInYears

    // Break-even point
    const breakEvenPoint = totalInvestment

    setResults({
      simpleROI: Math.round(simpleROI * 100) / 100,
      annualizedROI: Math.round(annualizedROI * 100) / 100,
      totalReturn: Math.round(totalReturn * 100) / 100,
      totalGain: Math.round(totalGain * 100) / 100,
      paybackPeriod: Math.round(paybackPeriod * 100) / 100,
      breakEvenPoint: Math.round(breakEvenPoint * 100) / 100
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getROIStatus = (roi: number) => {
    if (roi > 15) return { text: "Excellent", color: "text-green-600 bg-green-50" }
    if (roi > 8) return { text: "Good", color: "text-blue-600 bg-blue-50" }
    if (roi > 0) return { text: "Positive", color: "text-yellow-600 bg-yellow-50" }
    return { text: "Negative", color: "text-red-600 bg-red-50" }
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
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">ROI Calculator</h1>
          </div>
          <p className="text-gray-600">
            Calculate Return on Investment for business projects, marketing campaigns, and investment opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
              <CardDescription>
                Enter your investment parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="initialInvestment">Initial Investment (AED)</Label>
                <Input
                  id="initialInvestment"
                  type="number"
                  placeholder="Enter initial investment amount"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                  className="text-lg"
                />
                <p className="text-sm text-gray-500">
                  The total upfront cost of your investment
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalValue">Final Value / Current Value (AED)</Label>
                <Input
                  id="finalValue"
                  type="number"
                  placeholder="Enter final or current value"
                  value={finalValue}
                  onChange={(e) => setFinalValue(e.target.value)}
                  className="text-lg"
                />
                <p className="text-sm text-gray-500">
                  Current worth or expected final value of the investment
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeHorizon">Time Period</Label>
                  <Input
                    id="timeHorizon"
                    type="number"
                    placeholder="Time"
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeUnit">Time Unit</Label>
                  <Select value={timeUnit} onValueChange={setTimeUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="quarters">Quarters</SelectItem>
                      <SelectItem value="years">Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalCosts">Additional Costs (AED)</Label>
                <Input
                  id="additionalCosts"
                  type="number"
                  placeholder="Ongoing costs, fees, maintenance"
                  value={additionalCosts}
                  onChange={(e) => setAdditionalCosts(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  Optional: Include maintenance, fees, or ongoing costs
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualCashFlow">Annual Cash Flow (AED)</Label>
                <Input
                  id="annualCashFlow"
                  type="number"
                  placeholder="Annual income or savings"
                  value={annualCashFlow}
                  onChange={(e) => setAnnualCashFlow(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  Optional: Annual income, dividends, or cost savings
                </p>
              </div>

              <Button 
                onClick={calculateROI}
                disabled={!initialInvestment || !finalValue || parseFloat(initialInvestment) <= 0}
                className="w-full"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate ROI
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>ROI Analysis</CardTitle>
              <CardDescription>
                Investment performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Simple ROI:</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600">
                          {results.simpleROI.toFixed(2)}%
                        </span>
                        <div className={`text-xs px-2 py-1 rounded mt-1 ${getROIStatus(results.simpleROI).color}`}>
                          {getROIStatus(results.simpleROI).text}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Annualized ROI:</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">
                        {results.annualizedROI.toFixed(2)}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Total Return:</span>
                      <span className="text-lg font-bold">
                        {formatCurrency(results.totalReturn)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">Total Gain/Loss:</span>
                      </div>
                      <span className={`text-lg font-bold ${
                        results.totalGain >= 0 ? "text-emerald-600" : "text-red-600"
                      }`}>
                        {results.totalGain >= 0 ? "+" : ""}{formatCurrency(results.totalGain)}
                      </span>
                    </div>

                    {parseFloat(annualCashFlow) > 0 && (
                      <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-amber-600" />
                          <span className="font-medium">Payback Period:</span>
                        </div>
                        <span className="text-lg font-bold text-amber-600">
                          {results.paybackPeriod.toFixed(1)} years
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Investment Summary */}
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Investment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Initial Investment:</span>
                        <span>{formatCurrency(parseFloat(initialInvestment))}</span>
                      </div>
                      {parseFloat(additionalCosts) > 0 && (
                        <div className="flex justify-between">
                          <span>Additional Costs:</span>
                          <span>{formatCurrency(parseFloat(additionalCosts))}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Total Investment:</span>
                        <span className="font-semibold">
                          {formatCurrency(parseFloat(initialInvestment) + (parseFloat(additionalCosts) || 0))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current/Final Value:</span>
                        <span>{formatCurrency(parseFloat(finalValue))}</span>
                      </div>
                      {parseFloat(annualCashFlow) > 0 && (
                        <div className="flex justify-between">
                          <span>Total Cash Flows:</span>
                          <span>
                            {formatCurrency(parseFloat(annualCashFlow) * (parseFloat(timeHorizon) || 1) * 
                              (timeUnit === "months" ? 1/12 : timeUnit === "quarters" ? 1/4 : 1))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ROI Interpretation */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">ROI Interpretation</h4>
                    {results.simpleROI > 15 && (
                      <p className="text-sm text-blue-700">
                        Excellent ROI! This investment shows strong performance with returns well above typical market rates.
                      </p>
                    )}
                    {results.simpleROI > 8 && results.simpleROI <= 15 && (
                      <p className="text-sm text-blue-700">
                        Good ROI. This investment is performing well and beating average market returns.
                      </p>
                    )}
                    {results.simpleROI > 0 && results.simpleROI <= 8 && (
                      <p className="text-sm text-blue-700">
                        Positive but modest ROI. Consider if this meets your investment goals and risk tolerance.
                      </p>
                    )}
                    {results.simpleROI <= 0 && (
                      <p className="text-sm text-blue-700">
                        Negative ROI indicates a loss. Review the investment strategy and consider alternatives.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter investment details to calculate ROI</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Understanding ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Simple ROI Formula</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    ROI = (Total Return - Total Investment) / Total Investment × 100
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Annualized ROI</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Accounts for time factor to compare investments of different durations.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">ROI Benchmarks</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Stock market average: 7-10% annually</li>
                    <li>Real estate: 8-12% annually</li>
                    <li>Business investments: 15-25%</li>
                    <li>Marketing campaigns: 5:1 ratio (500%)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ROI Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Include All Costs</h4>
                  <p className="text-sm text-gray-600">
                    Factor in hidden costs like maintenance, taxes, and opportunity costs.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Consider Risk</h4>
                  <p className="text-sm text-gray-600">
                    Higher ROI often comes with higher risk. Evaluate risk-adjusted returns.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Time Value of Money</h4>
                  <p className="text-sm text-gray-600">
                    Use annualized ROI for long-term investments and compare with inflation rates.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Multiple Scenarios</h4>
                  <p className="text-sm text-gray-600">
                    Calculate best-case, worst-case, and most likely scenarios.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}