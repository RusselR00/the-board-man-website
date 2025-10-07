"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Calculator,
  Lightbulb,
  HelpCircle,
  Plus,
  FileText,
  Settings,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function ResourcesAdminPage() {
  const [stats] = useState({
    downloads: 15,
    businessTools: 4,
    industryInsights: 8,
    faqs: 12,
    totalDownloads: 15847,
    activeTools: 3
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resources Management</h1>
          <p className="text-muted-foreground">
            Manage downloads, business tools, industry insights, and FAQ content.
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.downloads}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalDownloads.toLocaleString()} total downloads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Business Tools</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.businessTools}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeTools} active tools
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Industry Insights</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.industryInsights}</div>
            <p className="text-xs text-muted-foreground">
              Published articles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FAQ Entries</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.faqs}</div>
            <p className="text-xs text-muted-foreground">
              Active questions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Management Sections */}
      <Tabs defaultValue="downloads" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="downloads" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Downloads
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Business Tools
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Industry Insights
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="downloads" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Downloadable Resources</h2>
            <Button asChild>
              <Link href="/admin/resources/downloads/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Download
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Downloads Management</CardTitle>
              <CardDescription>
                Manage PDF guides, templates, and other downloadable resources.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/admin/resources/downloads">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage Downloads
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/resources/downloads/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Download Analytics
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Business Tools</h2>
            <Button asChild>
              <Link href="/admin/resources/tools/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Tool
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Business Tools Management</CardTitle>
              <CardDescription>
                Manage calculators, projectors, and other business tools.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/admin/resources/tools">
                  <Calculator className="h-4 w-4 mr-2" />
                  Manage Tools
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Industry Insights</h2>
            <Button asChild>
              <Link href="/admin/resources/insights/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Insight
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Industry Insights Management</CardTitle>
              <CardDescription>
                Manage industry articles, updates, and insights content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/admin/resources/insights">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Manage Insights
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">FAQ Management</h2>
            <Button asChild>
              <Link href="/admin/resources/faq/new">
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>FAQ Management</CardTitle>
              <CardDescription>
                Manage frequently asked questions and their answers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/admin/resources/faq">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Manage FAQ
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks for resources management.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              variant="outline"
              onClick={async () => {
                const response = await fetch('/api/admin/init-resources', { method: 'POST' })
                const data = await response.json()
                if (data.success) {
                  alert('Database tables initialized successfully!')
                } else {
                  alert('Failed to initialize database tables')
                }
              }}
            >
              <Settings className="h-4 w-4 mr-2" />
              Initialize Database
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}