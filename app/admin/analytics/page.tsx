"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Mail,
  DollarSign,
  Clock,
  Target,
  Activity,
  Eye,
} from "lucide-react"
import { adminApi } from "@/lib/api-client"

interface AnalyticsData {
  contacts: {
    total: number
    pending: number
    responded: number
    thisWeek: number
  }
  bookings: {
    total: number
    pending: number
    confirmed: number
    completed: number
    thisWeek: number
  }
  monthlyTrends: Array<{
    month: string
    contacts: number
    bookings: number
  }>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("30d")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true)
      const response = await adminApi.getStats()
      if (response.success) {
        setAnalyticsData(response.data)
      } else {
        setError('Failed to fetch analytics')
      }
    } catch (err) {
      console.error('Analytics fetch error:', err)
      setError('Failed to load analytics')
    } finally {
      setIsLoading(false)
    }
  }

  const calculateGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
  }

  const getServiceDistribution = () => {
    // Mock data since we'd need to analyze actual service requests
    return [
      { name: 'Tax Services', value: 35, count: 42 },
      { name: 'Audit & Assurance', value: 28, count: 34 },
      { name: 'Accounting', value: 22, count: 26 },
      { name: 'Business Setup', value: 15, count: 18 },
    ]
  }

  const getConversionMetrics = () => {
    if (!analyticsData) return null
    
    const totalContacts = analyticsData.contacts.total
    const totalBookings = analyticsData.bookings.total
    const completedBookings = analyticsData.bookings.completed
    
    return {
      contactToBooking: totalContacts > 0 ? (totalBookings / totalContacts * 100).toFixed(1) : '0',
      bookingToCompletion: totalBookings > 0 ? (completedBookings / totalBookings * 100).toFixed(1) : '0',
      responseRate: totalContacts > 0 ? (analyticsData.contacts.responded / totalContacts * 100).toFixed(1) : '0',
    }
  }

  const getMonthlyData = () => {
    if (!analyticsData?.monthlyTrends) return []
    
    return analyticsData.monthlyTrends.map(item => ({
      ...item,
      month: new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    })).reverse()
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
          <p className="text-muted-foreground">Track business performance and growth metrics.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-16" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-8" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const conversionMetrics = getConversionMetrics()
  const serviceDistribution = getServiceDistribution()
  const monthlyData = getMonthlyData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
          <p className="text-muted-foreground">
            Track business performance and growth metrics.
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.contacts.total || 0}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{analyticsData?.contacts.thisWeek || 0} this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.bookings.total || 0}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{analyticsData?.bookings.thisWeek || 0} this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionMetrics?.contactToBooking || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Contact to booking conversion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionMetrics?.responseRate || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Average response rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Monthly Trends */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>
              Monthly contacts and bookings over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="contacts" 
                  stroke="#8884d8" 
                  name="Contacts"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#82ca9d" 
                  name="Bookings"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
            <CardDescription>
              Popular services by request volume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>
              Customer journey through your sales process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">Website Visitors</span>
                </div>
                <span className="text-sm font-medium">~1,000</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Contact Forms</span>
                </div>
                <span className="text-sm font-medium">{analyticsData?.contacts.total || 0}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                  <span className="text-sm">Bookings Made</span>
                </div>
                <span className="text-sm font-medium">{analyticsData?.bookings.total || 0}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="text-sm">Completed Services</span>
                </div>
                <span className="text-sm font-medium">{analyticsData?.bookings.completed || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Contact Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Pending</span>
                <Badge variant="secondary">{analyticsData?.contacts.pending || 0}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Responded</span>
                <Badge variant="default">{analyticsData?.contacts.responded || 0}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Pending</span>
                <Badge variant="secondary">{analyticsData?.bookings.pending || 0}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Confirmed</span>
                <Badge variant="default">{analyticsData?.bookings.confirmed || 0}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Completed</span>
                <Badge variant="outline">{analyticsData?.bookings.completed || 0}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Avg. Response Time</span>
                <Badge variant="outline">2.5 hrs</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Client Satisfaction</span>
                <Badge variant="default">4.8/5</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Completion Rate</span>
                <Badge variant="default">{conversionMetrics?.bookingToCompletion || 0}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}