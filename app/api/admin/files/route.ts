import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Allowed file types
const ALLOWED_FILE_TYPES = {
  // Documents
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'text/csv': 'csv',
  
  // Images
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const uploadType = formData.get('uploadType') as string || 'general'
    const relatedId = formData.get('relatedId') as string
    const altText = formData.get('altText') as string || ''
    const caption = formData.get('caption') as string || ''

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES]) {
      return NextResponse.json(
        { success: false, error: `File type ${file.type} is not allowed` },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    // Create upload directories
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    const typeDir = path.join(uploadDir, uploadType)
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }
    
    if (!existsSync(typeDir)) {
      await mkdir(typeDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const fileExtension = ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES]
    const fileName = `${timestamp}_${randomStr}.${fileExtension}`
    const filePath = path.join(typeDir, fileName)
    const relativePath = `/uploads/${uploadType}/${fileName}`

    // Write file to disk
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Save file metadata to database
    const fileRecord = await sql`
      INSERT INTO file_uploads (
        original_name, file_name, file_path, file_type, mime_type, 
        file_size, upload_type, related_id, alt_text, caption, uploaded_by
      ) VALUES (
        ${file.name}, ${fileName}, ${relativePath}, ${fileExtension}, 
        ${file.type}, ${file.size}, ${uploadType}, ${relatedId ? parseInt(relatedId) : null}, 
        ${altText}, ${caption}, 'admin'
      ) RETURNING *
    `

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: fileRecord[0].id,
        originalName: fileRecord[0].original_name,
        fileName: fileRecord[0].file_name,
        filePath: fileRecord[0].file_path,
        fileType: fileRecord[0].file_type,
        mimeType: fileRecord[0].mime_type,
        fileSize: fileRecord[0].file_size,
        uploadType: fileRecord[0].upload_type,
        url: relativePath
      }
    })

  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const uploadType = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = sql`
      SELECT 
        id, original_name, file_name, file_path, file_type, 
        mime_type, file_size, upload_type, related_id, alt_text, 
        caption, created_at
      FROM file_uploads 
      WHERE is_active = true
    `

    if (uploadType) {
      query = sql`
        SELECT 
          id, original_name, file_name, file_path, file_type, 
          mime_type, file_size, upload_type, related_id, alt_text, 
          caption, created_at
        FROM file_uploads 
        WHERE is_active = true AND upload_type = ${uploadType}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else {
      query = sql`
        SELECT 
          id, original_name, file_name, file_path, file_type, 
          mime_type, file_size, upload_type, related_id, alt_text, 
          caption, created_at
        FROM file_uploads 
        WHERE is_active = true
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    }

    const files = await query

    return NextResponse.json({
      success: true,
      files: files.map(file => ({
        ...file,
        url: file.file_path,
        sizeFormatted: formatFileSize(file.file_size)
      }))
    })

  } catch (error) {
    console.error('Error fetching files:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch files' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fileId = searchParams.get('id')

    if (!fileId) {
      return NextResponse.json(
        { success: false, error: 'File ID is required' },
        { status: 400 }
      )
    }

    // Mark file as inactive (soft delete)
    const result = await sql`
      UPDATE file_uploads 
      SET is_active = false 
      WHERE id = ${parseInt(fileId)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}