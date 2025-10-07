"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Building, ArrowLeft, Calculator, FileText, Users, Briefcase } from "lucide-react"
import Link from "next/link"

interface SetupCosts {
  licenseAndRegistration: number
  visaAndLabor: number
  officeSetup: number
  additional: number
  total: number
}

export default function SetupCostCalculatorPage() {
  const [businessType, setBusinessType] = useState("")
  const [emirate, setEmirate] = useState("")
  const [employees, setEmployees] = useState("")
  const [officeSpace, setOfficeSpace] = useState("")
  const [additionalServices, setAdditionalServices] = useState<string[]>([])
  const [results, setResults] = useState<SetupCosts | null>(null)

  const businessTypes = {
    llc: "Limited Liability Company (LLC)",
    establishment: "Sole Establishment",
    branch: "Branch Office",
    representative: "Representative Office",
    freezone: "Free Zone Company"
  }

  const emirates = {
    dubai: "Dubai",
    abudhabi: "Abu Dhabi",
    sharjah: "Sharjah",
    ajman: "Ajman",
    rak: "Ras Al Khaimah",
    fujairah: "Fujairah",
    umm: "Umm Al Quwain"
  }

  const additionalServiceOptions = [
    { id: "bank", label: "Bank Account Opening Assistance", cost: 2000 },
    { id: "office", label: "Office Ejari Registration", cost: 1500 },
    { id: "accounting", label: "Accounting Setup", cost: 3000 },
    { id: "legal", label: "Legal Documentation Review", cost: 2500 },
    { id: "marketing", label: "Basic Marketing Setup", cost: 4000 }
  ]

  const calculateCosts = () => {
    if (!businessType || !emirate) return

    let licenseAndRegistration = 0
    let visaAndLabor = 0
    let officeSetup = 0
    const numEmployees = parseInt(employees) || 0
    const officeSpaceSize = parseInt(officeSpace) || 0

    // License and Registration Costs
    switch (businessType) {
      case "llc":
        licenseAndRegistration = emirate === "dubai" ? 15000 : 12000
        break
      case "establishment":
        licenseAndRegistration = emirate === "dubai" ? 12000 : 10000
        break
      case "branch":
        licenseAndRegistration = emirate === "dubai" ? 20000 : 18000
        break
      case "representative":
        licenseAndRegistration = emirate === "dubai" ? 8000 : 7000
        break
      case "freezone":
        licenseAndRegistration = 18000 // Average across major freezones
        break
    }

    // Visa and Labor costs
    if (numEmployees > 0) {
      const visaCostPerEmployee = businessType === "freezone" ? 4000 : 3500
      visaAndLabor = numEmployees * visaCostPerEmployee
      
      // Labor card costs
      visaAndLabor += numEmployees * 500
      
      // Medical and Emirates ID
      visaAndLabor += numEmployees * 800
    }

    // Office Setup costs
    if (officeSpaceSize > 0) {
      const rentPerSqft = emirate === "dubai" ? 100 : 80
      const annualRent = officeSpaceSize * rentPerSqft * 12
      
      // Security deposit (usually 5-10% of annual rent)
      const securityDeposit = annualRent * 0.1
      
      // Office fit-out (basic)
      const fitOutCost = officeSpaceSize * 150
      
      officeSetup = securityDeposit + fitOutCost + 2000 // DEWA connection
    }

    // Additional services
    const additional = additionalServices.reduce((total, serviceId) => {
      const service = additionalServiceOptions.find(s => s.id === serviceId)
      return total + (service?.cost || 0)
    }, 0)

    const total = licenseAndRegistration + visaAndLabor + officeSetup + additional

    setResults({
      licenseAndRegistration,
      visaAndLabor,
      officeSetup,
      additional,
      total
    })
  }

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setAdditionalServices([...additionalServices, serviceId])
    } else {
      setAdditionalServices(additionalServices.filter(id => id !== serviceId))
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED'
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/resources" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Business Setup Cost Calculator</h1>
          </div>
          <p className="text-gray-600">
            Estimate the costs for setting up your business in the UAE across different emirates and business types.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <Card>
            <CardHeader>
              <CardTitle>Setup Requirements</CardTitle>
              <CardDescription>
                Enter your business setup preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(businessTypes).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emirate">Emirate</Label>
                <Select value={emirate} onValueChange={setEmirate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select emirate" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(emirates).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  type="number"
                  placeholder="0"
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  Include visa and labor costs
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="officeSpace">Office Space (sq ft)</Label>
                <Input
                  id="officeSpace"
                  type="number"
                  placeholder="0"
                  value={officeSpace}
                  onChange={(e) => setOfficeSpace(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  Optional: Include setup and deposit costs
                </p>
              </div>

              <div className="space-y-3">
                <Label>Additional Services</Label>
                {additionalServiceOptions.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={service.id}
                      checked={additionalServices.includes(service.id)}
                      onCheckedChange={(checked) => 
                        handleServiceChange(service.id, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={service.id} 
                      className="text-sm flex-1 cursor-pointer"
                    >
                      {service.label}
                    </Label>
                    <span className="text-sm text-gray-500">
                      {formatCurrency(service.cost)}
                    </span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={calculateCosts}
                disabled={!businessType || !emirate}
                className="w-full"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Setup Costs
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
              <CardDescription>
                Estimated business setup costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">License & Registration:</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(results.licenseAndRegistration)}
                      </span>
                    </div>

                    {results.visaAndLabor > 0 && (
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Visa & Labor:</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(results.visaAndLabor)}
                        </span>
                      </div>
                    )}

                    {results.officeSetup > 0 && (
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-orange-600" />
                          <span className="font-medium">Office Setup:</span>
                        </div>
                        <span className="text-lg font-bold text-orange-600">
                          {formatCurrency(results.officeSetup)}
                        </span>
                      </div>
                    )}

                    {results.additional > 0 && (
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">Additional Services:</span>
                        </div>
                        <span className="text-lg font-bold text-purple-600">
                          {formatCurrency(results.additional)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center p-4 bg-gray-900 text-white rounded-lg">
                      <span className="font-bold text-lg">Total Estimated Cost:</span>
                      <span className="text-2xl font-bold">
                        {formatCurrency(results.total)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">Cost Breakdown Summary</h4>
                    <p className="text-sm text-amber-700">
                      Setting up a {businessTypes[businessType as keyof typeof businessTypes]} 
                      {" "}in {emirates[emirate as keyof typeof emirates]}
                      {employees && ` with ${employees} employee(s)`}
                      {officeSpace && ` and ${officeSpace} sq ft office space`}.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Building className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Select your business requirements to see cost estimates</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">License & Registration</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Trade license application and approval</li>
                    <li>MOA preparation and notarization</li>
                    <li>Initial approval and permit fees</li>
                    <li>DED/Economic Department registration</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Visa & Labor Costs</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Residence visa applications</li>
                    <li>Work permit processing</li>
                    <li>Medical examinations</li>
                    <li>Emirates ID issuance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Ongoing Costs</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Annual license renewal fees</li>
                    <li>Office rent and utilities</li>
                    <li>Employee salaries and benefits</li>
                    <li>Professional services (accounting, legal)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Timeline</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Mainland setup: 2-4 weeks</li>
                    <li>Free zone setup: 1-2 weeks</li>
                    <li>Visa processing: 2-3 weeks additional</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Important Note</h4>
              <p className="text-sm text-gray-600">
                These are estimated costs based on typical requirements. Actual costs may vary depending on specific business 
                activities, emirate regulations, and current government fees. We recommend consulting with our business setup 
                specialists for accurate quotations and personalized guidance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}