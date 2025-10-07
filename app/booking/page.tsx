"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Clock, User, Building2, Phone, Video, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Form validation schema
const bookingFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  
  // Appointment Details
  appointmentDate: z.date({
    message: "Please select an appointment date",
  }),
  appointmentTime: z.string({
    message: "Please select an appointment time",
  }),
  serviceType: z.string({
    message: "Please select a service type",
  }),
  consultationType: z.enum(["in-person", "virtual", "phone"], {
    message: "Please select a consultation type",
  }),
  
  // Additional Information
  description: z.string().min(10, "Please provide at least 10 characters describing your needs"),
  urgency: z.enum(["low", "medium", "high"]),
})

type BookingFormValues = z.infer<typeof bookingFormSchema>

// Available time slots
const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
]

// Service types
const serviceTypes = [
  { value: "audit", label: "Audit & Assurance", icon: "📊" },
  { value: "tax", label: "Tax Services", icon: "📋" },
  { value: "accounting", label: "Accounting & Bookkeeping", icon: "💼" },
  { value: "business-setup", label: "Business Setup", icon: "🏢" },
  { value: "consultation", label: "General Consultation", icon: "💬" },
  { value: "compliance", label: "Regulatory Compliance", icon: "✅" },
]

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      appointmentDate: new Date(), // Provide a default date to avoid undefined
      appointmentTime: "",
      serviceType: "",
      description: "",
      urgency: "medium",
      consultationType: "in-person",
    },
    mode: "onChange", // This helps with controlled inputs
  })

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true)
    
    try {
      // Validate required fields
      if (!data.appointmentDate) {
        alert('Please select an appointment date')
        return
      }
      
      if (!data.appointmentTime) {
        alert('Please select an appointment time')
        return
      }
      
      if (!data.serviceType) {
        alert('Please select a service type')
        return
      }

      // Prepare the data for the API
      const bookingData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company || '',
        serviceType: data.serviceType,
        serviceDescription: data.description,
        meetingType: data.consultationType,
        preferredDate: data.appointmentDate ? format(data.appointmentDate, 'yyyy-MM-dd') : '',
        preferredTime: data.appointmentTime,
        urgency: data.urgency,
        estimatedDuration: '1-hour',
        additionalNotes: '',
        preferredContact: 'email',
        sendReminders: true,
      }

      console.log("Submitting booking data:", bookingData)

      // Call the booking API
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit booking')
      }

      console.log("Booking API response:", result)
      setIsSubmitted(true)
      form.reset()
    } catch (error) {
      console.error("Booking submission error:", error)
      // You might want to show an error message to the user here
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Failed to submit booking: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for booking an appointment with THE BOARD MAN. We&apos;ll send you a confirmation email shortly 
                with all the details and next steps.
              </p>
              <div className="space-y-2">
                <Button onClick={() => setIsSubmitted(false)} className="mr-4">
                  Book Another Appointment
                </Button>
                <Button variant="outline" asChild>
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Book Your Consultation
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Schedule a consultation with our expert team. Choose from in-person meetings at our Dubai office, 
          virtual consultations, or phone calls to discuss your accounting and business needs.
        </p>
      </div>

      {/* Quick Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader className="text-center">
            <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <CardTitle className="text-lg">In-Person</CardTitle>
            <CardDescription>Meet at our Dubai office</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              12A01, DAMAC XL Tower<br />
              Business Bay, Dubai
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Video className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Virtual Meeting</CardTitle>
            <CardDescription>Online video consultation</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Secure video call via<br />
              Zoom or Microsoft Teams
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Phone className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Phone Call</CardTitle>
            <CardDescription>Direct phone consultation</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Professional phone call<br />
              at your scheduled time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Booking Form */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Appointment Details</CardTitle>
            <CardDescription>
              Please fill out the form below to schedule your consultation. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+971 XX XXX XXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Company Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
                          </FormControl>
                          <FormDescription>
                            If you&apos;re booking on behalf of a company
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                {/* Appointment Details Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Appointment Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="appointmentDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Appointment Date *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Select your preferred appointment date
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="appointmentTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Appointment Time *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time slot" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            All times are in UAE time (UTC+4)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="What can we help you with?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {serviceTypes.map((service) => (
                                <SelectItem key={service.value} value={service.value}>
                                  <span className="flex items-center gap-2">
                                    <span>{service.icon}</span>
                                    {service.label}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">Low</Badge>
                                  <span>Regular consultation</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="medium">
                                <div className="flex items-center gap-2">
                                  <Badge variant="default">Medium</Badge>
                                  <span>Important matter</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="high">
                                <div className="flex items-center gap-2">
                                  <Badge variant="destructive">High</Badge>
                                  <span>Urgent consultation</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                {/* Consultation Type Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Consultation Type *</h3>
                  <FormField
                    control={form.control}
                    name="consultationType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid md:grid-cols-3 gap-6"
                          >
                            <div className="flex items-center space-x-2 border rounded-lg p-4">
                              <RadioGroupItem value="in-person" id="in-person" />
                              <Label htmlFor="in-person" className="flex-1 cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <MapPin className="h-5 w-5 text-blue-600" />
                                  <div>
                                    <div className="font-medium">In-Person</div>
                                    <div className="text-sm text-muted-foreground">Meet at our office</div>
                                  </div>
                                </div>
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2 border rounded-lg p-4">
                              <RadioGroupItem value="virtual" id="virtual" />
                              <Label htmlFor="virtual" className="flex-1 cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <Video className="h-5 w-5 text-green-600" />
                                  <div>
                                    <div className="font-medium">Virtual Meeting</div>
                                    <div className="text-sm text-muted-foreground">Video call</div>
                                  </div>
                                </div>
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2 border rounded-lg p-4">
                              <RadioGroupItem value="phone" id="phone" />
                              <Label htmlFor="phone" className="flex-1 cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <Phone className="h-5 w-5 text-purple-600" />
                                  <div>
                                    <div className="font-medium">Phone Call</div>
                                    <div className="text-sm text-muted-foreground">Voice consultation</div>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                {/* Additional Information Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please describe your needs or questions *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your business situation, specific questions, or what you'd like to discuss during the consultation..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The more details you provide, the better we can prepare for your consultation
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Booking...
                      </>
                    ) : (
                      <>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Book Appointment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <div className="mt-12 text-center">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Need Immediate Assistance?</h3>
            <p className="text-muted-foreground mb-4">
              If you have urgent matters or need to speak with someone immediately, feel free to contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <a href="tel:+971557477855">
                  <Phone className="mr-2 h-4 w-4" />
                  Call: +971 55 747 7855
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:info@board-man.com">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Email: info@board-man.com
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}