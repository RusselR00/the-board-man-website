'use client'

import { useState } from 'react'
import { FileUpload } from '@/components/admin/file-upload'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function FileUploadTestPage() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])

  const handleUploadComplete = (file: any) => {
    console.log('File uploaded:', file)
    setUploadedFiles(prev => [...prev, file])
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">File Upload System Test</h1>
        <p className="text-gray-600">Test the file upload functionality for different content types</p>
      </div>

      <Tabs defaultValue="downloads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="downloads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Download Files</CardTitle>
              <CardDescription>
                Upload PDF guides, templates, and documents for the downloads section
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                uploadType="downloads"
                onUploadComplete={handleUploadComplete}
                acceptedTypes={[
                  'application/pdf',
                  'application/msword',
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  'application/vnd.ms-excel',
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                  'text/csv'
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Tools</CardTitle>
              <CardDescription>
                Upload templates and files for business tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                uploadType="tools"
                onUploadComplete={handleUploadComplete}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>
                Upload images for industry insights and other content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                uploadType="insight_image"
                onUploadComplete={handleUploadComplete}
                acceptedTypes={[
                  'image/jpeg',
                  'image/png',
                  'image/gif',
                  'image/webp'
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Files</CardTitle>
              <CardDescription>
                Upload any supported file type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                uploadType="general"
                onUploadComplete={handleUploadComplete}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Uploaded files summary */}
      {uploadedFiles.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Upload Summary</CardTitle>
            <CardDescription>Files uploaded in this session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{file.originalName}</p>
                    <p className="text-sm text-gray-500">
                      Type: {file.uploadType} • Size: {file.sizeFormatted} • Path: {file.url}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}