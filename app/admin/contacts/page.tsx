import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MessageSquare, Mail, Phone, Search, Filter, Eye, Trash2, Reply } from "lucide-react"

export default function ContactsPage() {
  // Mock data - in production, fetch from your database
  const contacts = [
    {
      id: "1",
      name: "Ahmed Hassan",
      email: "ahmed@company.com",
      phone: "+971 50 123 4567",
      company: "Tech Solutions LLC",
      subject: "VAT Registration Query",
      message: "We need assistance with VAT registration for our new business...",
      serviceType: "tax",
      urgency: "medium",
      status: "new",
      submittedAt: "2024-10-07 14:30",
    },
    {
      id: "2",
      name: "Fatima Al-Zahra",
      email: "fatima@business.ae",
      phone: "+971 55 987 6543",
      company: "Green Energy DMCC",
      subject: "Audit Services Inquiry",
      message: "Looking for comprehensive audit services for our annual review...",
      serviceType: "audit",
      urgency: "high",
      status: "replied",
      submittedAt: "2024-10-07 10:15",
    },
    {
      id: "3",
      name: "John Smith",
      email: "john@startup.com",
      phone: "+971 54 567 8901",
      company: "Innovation Hub",
      subject: "Business Setup Consultation",
      message: "Need guidance on setting up a business in Dubai Free Zone...",
      serviceType: "business-setup",
      urgency: "low",
      status: "in-progress",
      submittedAt: "2024-10-06 16:45",
    },
    {
      id: "4",
      name: "Sarah Ahmed",
      email: "sarah@consulting.ae",
      phone: "+971 52 345 6789",
      company: "Consulting Partners",
      subject: "Accounting Software Recommendation",
      message: "We're looking for recommendations for accounting software suitable for...",
      serviceType: "accounting",
      urgency: "medium",
      status: "new",
      submittedAt: "2024-10-06 09:20",
    },
    {
      id: "5",
      name: "Mohammed Ali",
      email: "mohammed@trading.com",
      phone: "+971 56 789 0123",
      company: "Global Trading LLC",
      subject: "Tax Compliance Review",
      message: "Need a comprehensive review of our tax compliance procedures...",
      serviceType: "tax",
      urgency: "high",
      status: "completed",
      submittedAt: "2024-10-05 11:30",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "replied":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getServiceTypeLabel = (serviceType: string) => {
    switch (serviceType) {
      case "audit":
        return "Audit & Assurance"
      case "tax":
        return "Tax Services"
      case "accounting":
        return "Accounting"
      case "business-setup":
        return "Business Setup"
      case "consultation":
        return "Consultation"
      default:
        return "Other"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-8 w-8" />
            Contact Submissions
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and respond to customer inquiries and contact form submissions.
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
          <p className="text-sm text-gray-600">Total Submissions</p>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or subject..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="audit">Audit</SelectItem>
                  <SelectItem value="tax">Tax</SelectItem>
                  <SelectItem value="accounting">Accounting</SelectItem>
                  <SelectItem value="business-setup">Business Setup</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>
            Latest contact form submissions and inquiries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </div>
                        {contact.company && (
                          <p className="text-sm text-gray-500">{contact.company}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium max-w-xs truncate" title={contact.subject}>
                        {contact.subject}
                      </p>
                      <p className="text-sm text-gray-600 max-w-xs truncate" title={contact.message}>
                        {contact.message}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getServiceTypeLabel(contact.serviceType)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getUrgencyColor(contact.urgency)}>
                        {contact.urgency}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600">
                        {new Date(contact.submittedAt).toLocaleString('en-AE')}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Reply">
                          <Reply className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Delete">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">New</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {contacts.filter(c => c.status === 'new').length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">
              {contacts.filter(c => c.status === 'in-progress').length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Replied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {contacts.filter(c => c.status === 'replied').length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-600">
              {contacts.filter(c => c.status === 'completed').length}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}