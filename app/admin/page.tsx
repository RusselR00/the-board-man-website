"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  MessageSquare,
  Calendar,
  Users,
  TrendingUp,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { adminApi } from "@/lib/api-client"

interface DashboardStats {
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
    cancelled: number
    thisWeek: number
  }
  recentActivity: Array<{
    type: 'contact' | 'booking'
    name: string
    email: string
    created_at: string
    status: string
  }>
}

export default function AdminDashboard() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        const data = await adminApi.getStats()
        if (data.success) {
          setDashboardStats(data.data)
        } else {
          setError('Failed to fetch dashboard stats')
        }
      } catch (err) {
        console.error('Dashboard stats error:', err)
        setError('Failed to connect to database. Using demo data.')
        // Fallback to demo data
        setDashboardStats({
          contacts: { total: 127, pending: 45, responded: 82, thisWeek: 12 },
          bookings: { total: 24, pending: 8, confirmed: 12, completed: 4, cancelled: 0, thisWeek: 5 },
          recentActivity: [
            {
              type: 'contact',
              name: 'John Doe',
              email: 'john@example.com',
              created_at: new Date().toISOString(),
              status: 'pending'
            }
          ]
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your business activities</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error && !dashboardStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertCircle className="mr-2 h-5 w-5" />
              Error Loading Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Contacts",
      value: dashboardStats?.contacts.total.toString() || "0",
      change: `+${dashboardStats?.contacts.thisWeek || 0} this week`,
      changeType: "positive" as const,
      icon: MessageSquare,
      description: `${dashboardStats?.contacts.pending || 0} pending responses`,
      href: "/admin/contacts"
    },
    {
      title: "Active Bookings", 
      value: dashboardStats?.bookings.total.toString() || "0",
      change: `+${dashboardStats?.bookings.thisWeek || 0} this week`,
      changeType: "positive" as const,
      icon: Calendar,
      description: `${dashboardStats?.bookings.pending || 0} pending approval`,
      href: "/admin/bookings"
    },
    {
      title: "Confirmed Bookings",
      value: dashboardStats?.bookings.confirmed.toString() || "0", 
      change: `${dashboardStats?.bookings.completed || 0} completed`,
      changeType: "neutral" as const,
      icon: CheckCircle,
      description: "Ready for consultation",
      href: "/admin/bookings?status=confirmed"
    },
    {
      title: "Response Rate",
      value: dashboardStats?.contacts.total 
        ? `${Math.round(((dashboardStats.contacts.responded || 0) / dashboardStats.contacts.total) * 100)}%`
        : "0%",
      change: "Last 30 days",
      changeType: "neutral" as const, 
      icon: TrendingUp,
      description: "Contact response rate",
      href: "/admin/contacts"
    },
  ]

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your business.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <div className="flex items-center space-x-2 text-xs mt-2">
                  <Badge 
                    variant={stat.changeType === 'positive' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest contacts and bookings from your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardStats?.recentActivity.length ? (
                dashboardStats.recentActivity.slice(0, 8).map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                      {activity.type === 'contact' ? (
                        <Mail className="h-4 w-4" />
                      ) : (
                        <Calendar className="h-4 w-4" />
                      )}
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.type === 'contact' ? 'New contact' : 'New booking'} • {activity.email}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                      <Badge variant={activity.status === 'pending' ? 'destructive' : 'default'}>
                        {activity.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <Link href="/admin/contacts">
                <MessageSquare className="mr-2 h-4 w-4" />
                View All Contacts ({dashboardStats?.contacts.pending || 0} pending)
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/bookings">
                <Calendar className="mr-2 h-4 w-4" />
                Manage Bookings ({dashboardStats?.bookings.pending || 0} pending)
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/contact">
                <Users className="mr-2 h-4 w-4" />
                View Website
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}