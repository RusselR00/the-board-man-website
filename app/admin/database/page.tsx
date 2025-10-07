'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function DatabaseSetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; tables?: string[] } | null>(null)

  const initializeDatabase = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/admin/init-enhanced-resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: `Failed to initialize database: ${error instanceof Error ? error.message : 'Unknown error'}`
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Database Setup</h1>
        <p className="text-gray-600">Initialize the enhanced database schema for your CMS system</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Enhanced Resources Schema
          </CardTitle>
          <CardDescription>
            This will create or update the database tables needed for your resources management system:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">Tables to be created:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <strong>downloads</strong> - PDF guides, templates, documents</li>
                  <li>• <strong>business_tools</strong> - Calculators, interactive tools</li>
                  <li>• <strong>industry_insights</strong> - Articles, blog posts, reports</li>
                  <li>• <strong>faqs</strong> - Frequently asked questions</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Additional features:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <strong>file_uploads</strong> - Centralized file management</li>
                  <li>• <strong>categories</strong> - Content categorization</li>
                  <li>• Database indexes for performance</li>
                  <li>• Default categories and settings</li>
                </ul>
              </div>
            </div>

            <Button 
              onClick={initializeDatabase} 
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Initializing Database...' : 'Initialize Enhanced Database Schema'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          <div className="flex items-start gap-2">
            {result.success ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
            )}
            <div className="flex-1">
              <AlertDescription className={result.success ? 'text-green-800' : 'text-red-800'}>
                {result.message}
              </AlertDescription>
              {result.success && result.tables && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-green-800">Tables created:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.tables.map((table) => (
                      <span 
                        key={table} 
                        className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                      >
                        {table}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Alert>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>After initializing the database schema, you&apos;ll be able to:</p>
            <ul className="space-y-2 text-gray-600 ml-4">
              <li>1. <strong>Upload and manage files</strong> - PDFs, images, documents</li>
              <li>2. <strong>Create downloadable resources</strong> - Guides, templates, white papers</li>
              <li>3. <strong>Build business tools</strong> - Calculators, interactive tools</li>
              <li>4. <strong>Publish industry insights</strong> - Articles, reports, analysis</li>
              <li>5. <strong>Manage FAQs</strong> - Organized by categories</li>
              <li>6. <strong>Connect your frontend</strong> - Replace static data with dynamic content</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}