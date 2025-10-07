"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Users,
  Building,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Search,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Star,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { adminApi } from "@/lib/api-client"

interface Client {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  services: string[]
  total_contacts: number
  total_bookings: number
  last_contact: string
  status: 'active' | 'inactive' | 'potential'
  value: number
  created_at: string
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  potential: 'bg-blue-100 text-blue-800',
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setIsLoading(true)
      // Since we don't have a clients API yet, let's generate data from contacts and bookings
      const [contactsResponse, bookingsResponse] = await Promise.all([
        adminApi.getContacts(1, 100),
        adminApi.getBookings(1, 100)
      ])

      if (contactsResponse.success && bookingsResponse.success) {
        // Combine contacts and bookings to create client records
        const clientMap = new Map<string, Client>()
        
        // Process contacts
        contactsResponse.data.contacts.forEach((contact: any) => {
          const key = contact.email.toLowerCase()
          if (!clientMap.has(key)) {
            clientMap.set(key, {
              id: contact.id,
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
              company: contact.company,
              services: [contact.service || 'General Inquiry'],
              total_contacts: 1,
              total_bookings: 0,
              last_contact: contact.created_at,
              status: 'potential',
              value: 0,
              created_at: contact.created_at
            })
          } else {
            const client = clientMap.get(key)!
            client.total_contacts++
            if (!client.services.includes(contact.service)) {
              client.services.push(contact.service)
            }
          }
        })

        // Process bookings
        bookingsResponse.data.bookings.forEach((booking: any) => {
          const key = booking.email.toLowerCase()
          if (!clientMap.has(key)) {
            clientMap.set(key, {
              id: booking.id + 1000, // Offset to avoid conflicts
              name: booking.name,
              email: booking.email,
              phone: booking.phone,
              company: booking.company,
              services: [booking.service],
              total_contacts: 0,
              total_bookings: 1,
              last_contact: booking.created_at,
              status: booking.status === 'completed' ? 'active' : 'potential',
              value: booking.status === 'completed' ? 5000 : 0,
              created_at: booking.created_at
            })
          } else {
            const client = clientMap.get(key)!
            client.total_bookings++
            if (!client.services.includes(booking.service)) {
              client.services.push(booking.service)
            }
            if (booking.status === 'completed') {
              client.status = 'active'
              client.value += 5000
            }
          }
        })

        setClients(Array.from(clientMap.values()))
      }
    } catch (err) {
      console.error('Clients fetch error:', err)
      setError('Failed to load clients')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    const matchesService = serviceFilter === "all" || client.services.some(s => s === serviceFilter)

    return matchesSearch && matchesStatus && matchesService
  })

  const getClientStats = () => {
    return {
      total: clients.length,
      active: clients.filter(c => c.status === 'active').length,
      potential: clients.filter(c => c.status === 'potential').length,
      inactive: clients.filter(c => c.status === 'inactive').length,
      totalValue: clients.reduce((sum, c) => sum + c.value, 0),
    }
  }

  const stats = getClientStats()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Management</h1>
          <p className="text-muted-foreground">Manage client relationships and track engagement.</p>
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Client Management</h1>
        <p className="text-muted-foreground">
          Manage client relationships and track engagement history.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.potential}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${stats.totalValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="potential">Potential</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Service</Label>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="Audit & Assurance">Audit & Assurance</SelectItem>
                  <SelectItem value="Tax Services">Tax Services</SelectItem>
                  <SelectItem value="Accounting">Accounting</SelectItem>
                  <SelectItem value="Business Setup">Business Setup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Client Directory</CardTitle>
          <CardDescription>
            Complete list of clients and their engagement history
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredClients.length === 0 ? (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" || serviceFilter !== "all" 
                  ? "No clients match your filters" 
                  : "No clients yet"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Info</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">{client.name}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" />
                          {client.email}
                        </div>
                        {client.phone && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="h-3 w-3 mr-1" />
                            {client.phone}
                          </div>
                        )}
                        {client.company && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Building className="h-3 w-3 mr-1" />
                            {client.company}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {client.services.slice(0, 2).map((service, index) => (
                          <Badge key={index} variant="outline" className="mr-1">
                            {service}
                          </Badge>
                        ))}
                        {client.services.length > 2 && (
                          <Badge variant="secondary">
                            +{client.services.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {client.total_contacts} contacts
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {client.total_bookings} bookings
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[client.status]}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ${client.value.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(client.last_contact).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact History
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="h-4 w-4 mr-2" />
                            Add to Favorites
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}