'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  File, 
  Image, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react'

interface FileUploadProps {
  uploadType?: string
  relatedId?: number
  onUploadComplete?: (file: any) => void
  acceptedTypes?: string[]
  maxSize?: number
  multiple?: boolean
}

interface UploadedFile {
  id: number
  originalName: string
  fileName: string
  filePath: string
  fileType: string
  mimeType: string
  fileSize: number
  url: string
  sizeFormatted?: string
}

const DEFAULT_ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp'
]

export function FileUpload({
  uploadType = 'general',
  relatedId,
  onUploadComplete,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = false
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [altText, setAltText] = useState('')
  const [caption, setCaption] = useState('')
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-4 w-4" aria-label="Image file" />
    if (mimeType === 'application/pdf') return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed`
    }
    
    if (file.size > maxSize) {
      return `File size must be less than ${formatFileSize(maxSize)}`
    }
    
    return null
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const uploadFile = async (file: File) => {
    const validation = validateFile(file)
    if (validation) {
      setError(validation)
      return
    }

    setUploading(true)
    setError(null)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('uploadType', uploadType)
      if (relatedId) formData.append('relatedId', relatedId.toString())
      if (altText) formData.append('altText', altText)
      if (caption) formData.append('caption', caption)

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 100)

      const response = await fetch('/api/admin/files', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      const result = await response.json()

      if (result.success) {
        const newFile = {
          ...result.file,
          sizeFormatted: formatFileSize(result.file.fileSize)
        }
        
        setUploadedFiles(prev => [...prev, newFile])
        setAltText('')
        setCaption('')
        
        if (onUploadComplete) {
          onUploadComplete(newFile)
        }
      } else {
        setError(result.error || 'Upload failed')
      }
    } catch (error) {
      setError('Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0] // For now, handle single file
    uploadFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const removeFile = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          File Upload
        </CardTitle>
        <CardDescription>
          Upload files up to {formatFileSize(maxSize)}. Supported formats: PDF, DOC, DOCX, XLS, XLSX, CSV, JPG, PNG, GIF, WebP
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image-specific fields */}
        {uploadType === 'image' || uploadType === 'insight_image' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="altText">Alt Text</Label>
              <Input
                id="altText"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Describe the image"
              />
            </div>
            <div>
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Optional caption"
              />
            </div>
          </div>
        ) : null}

        {/* Upload area */}
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-primary/50'
            }
            ${uploading ? 'pointer-events-none opacity-50' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={acceptedTypes.join(',')}
            multiple={multiple}
            onChange={(e) => handleFileSelect(e.target.files)}
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="space-y-2">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-sm text-gray-600">Uploading...</p>
              <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-8 w-8 mx-auto text-gray-400" />
              <p className="text-sm text-gray-600">
                <span className="font-medium text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                Maximum file size: {formatFileSize(maxSize)}
              </p>
            </div>
          )}
        </div>

        {/* Error display */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Uploaded files list */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <Label>Uploaded Files</Label>
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.mimeType)}
                    <div>
                      <p className="text-sm font-medium">{file.originalName}</p>
                      <p className="text-xs text-gray-500">
                        {file.fileType.toUpperCase()} • {file.sizeFormatted}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Uploaded
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}