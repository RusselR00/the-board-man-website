"use client"

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
import { MessageSquare, Mail, Phone, Search, Filter, Eye, Trash2, Reply, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { adminApi } from "@/lib/api-client"

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  service_type?: string
  urgency?: string
  status: string
  created_at: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    service: "all",
    urgency: "all"
  })

  const fetchContacts = async () => {
    try {
      setIsLoading(true)
      const data = await adminApi.getContacts(pagination.page, pagination.limit, filters.status)
      if (data.success) {
        setContacts(data.data.contacts || [])
        setPagination(data.data.pagination)
        setError(null)
      } else {
        setError('Failed to fetch contacts')
      }
    } catch (err) {
      console.error('Contacts API error:', err)
      setError('Failed to connect to database')
      setContacts([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [pagination.page, filters.status])

  const updateContactStatus = async (contactId: string, newStatus: string) => {
    try {
      const result = await adminApi.updateContactStatus(contactId, newStatus)
      if (result.success) {
        fetchContacts()
      } else {
        setError('Failed to update contact status')
      }
    } catch (err) {
      console.error('Update contact error:', err)
      setError('Failed to update contact')
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "destructive"
      case "responded":
        return "default"
      case "resolved":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const formatServiceType = (serviceType: string) => {
    switch (serviceType) {
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
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

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
          <div className="text-3xl font-bold text-blue-600">{pagination.total}</div>
          <div className="text-sm text-gray-500">Total Submissions</div>
        </div>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or subject..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="pl-10"
              />
            </div>
            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.service} onValueChange={(value) => setFilters({...filters, service: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="tax">Tax Services</SelectItem>
                <SelectItem value="accounting">Accounting</SelectItem>
                <SelectItem value="business-setup">Business Setup</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.urgency} onValueChange={(value) => setFilters({...filters, urgency: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgencies</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Recent Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>
            Latest contact form submissions and inquiries
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading contacts...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No contact submissions found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Contact submissions will appear here when customers fill out the contact form
              </p>
            </div>
          ) : (
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
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {contact.phone}
                            </div>
                          )}
                          {contact.company && (
                            <div className="text-xs text-gray-400">{contact.company}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium">{contact.subject}</div>
                          <div className="text-sm text-gray-500 truncate">
                            {contact.message}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {formatServiceType(contact.service_type || 'other')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={getUrgencyColor(contact.urgency || 'medium')}>
                          {contact.urgency || 'Medium'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(contact.status)}>
                          {contact.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(contact.created_at).toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Select
                            value={contact.status}
                            onValueChange={(newStatus) => updateContactStatus(contact.id, newStatus)}
                          >
                            <SelectTrigger className="w-24 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="responded">Responded</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPagination({...pagination, page: pagination.page - 1})}
            disabled={pagination.page <= 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPagination({...pagination, page: pagination.page + 1})}
            disabled={pagination.page >= pagination.pages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}