import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Calendar,
  FileText,
  Users,
  TrendingUp,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  // Mock data - in production, fetch from your database
  const stats = [
    {
      title: "Total Contacts",
      value: "127",
      change: "+12%",
      changeType: "positive" as const,
      icon: MessageSquare,
      description: "This month",
    },
    {
      title: "Active Bookings",
      value: "24",
      change: "+8%",
      changeType: "positive" as const,
      icon: Calendar,
      description: "This week",
    },
    {
      title: "Blog Posts",
      value: "15",
      change: "+2",
      changeType: "positive" as const,
      icon: FileText,
      description: "Published",
    },
    {
      title: "Total Clients",
      value: "89",
      change: "+15%",
      changeType: "positive" as const,
      icon: Users,
      description: "Active clients",
    },
  ]

  const recentContacts = [
    {
      id: "1",
      name: "Ahmed Hassan",
      email: "ahmed@company.com",
      subject: "VAT Registration Query",
      time: "2 hours ago",
      status: "new" as const,
    },
    {
      id: "2",
      name: "Fatima Al-Zahra",
      email: "fatima@business.ae",
      subject: "Audit Services Inquiry",
      time: "4 hours ago",
      status: "replied" as const,
    },
    {
      id: "3",
      name: "John Smith",
      email: "john@startup.com",
      subject: "Business Setup Consultation",
      time: "1 day ago",
      status: "new" as const,
    },
  ]

  const upcomingBookings = [
    {
      id: "1",
      client: "Sarah Ahmed",
      service: "Tax Consultation",
      date: "Today",
      time: "2:00 PM",
      type: "In-person",
    },
    {
      id: "2",
      client: "Mohammed Ali",
      service: "Audit Review",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Video Call",
    },
    {
      id: "3",
      client: "Lisa Johnson",
      service: "Business Setup",
      date: "Oct 15",
      time: "3:30 PM",
      type: "Phone Call",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <span
                  className={`font-medium ${
                    stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contact Submissions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Recent Contacts
                </CardTitle>
                <CardDescription>Latest contact form submissions</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/contacts">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{contact.name}</h4>
                    <p className="text-sm text-gray-600 truncate">{contact.subject}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{contact.email}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={contact.status === "new" ? "default" : "secondary"}
                    >
                      {contact.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{contact.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Bookings
                </CardTitle>
                <CardDescription>Your scheduled appointments</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/bookings">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{booking.client}</h4>
                    <p className="text-sm text-gray-600">{booking.service}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{booking.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{booking.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link href="/admin/contacts">
                <MessageSquare className="h-6 w-6" />
                <span>Manage Contacts</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link href="/admin/bookings">
                <Calendar className="h-6 w-6" />
                <span>View Bookings</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link href="/admin/blog">
                <FileText className="h-6 w-6" />
                <span>Manage Blog</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link href="/admin/analytics">
                <TrendingUp className="h-6 w-6" />
                <span>View Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            System Status
          </CardTitle>
          <CardDescription>All systems operational</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Website Online</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Email Service Active</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Booking System Operational</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}