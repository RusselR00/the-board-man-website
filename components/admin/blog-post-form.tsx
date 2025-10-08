"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, X, Save, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(500, "Title must be less than 500 characters"),
  slug: z.string().min(1, "Slug is required").max(255, "Slug must be less than 255 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featured_image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  author_name: z.string().min(1, "Author name is required").max(255, "Author name must be less than 255 characters"),
  author_role: z.string().max(255, "Author role must be less than 255 characters").optional(),
  category: z.string().min(1, "Category is required").max(100, "Category must be less than 100 characters"),
  tags: z.array(z.string()),
  is_published: z.boolean(),
  is_featured: z.boolean(),
  read_time: z.number().min(1).max(999).optional(),
  publish_date: z.date().optional(),
})

type BlogPostFormData = z.infer<typeof blogPostSchema>

interface BlogPost {
  id?: number
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  author_name: string
  author_role?: string
  category: string
  tags: string[]
  is_published: boolean
  is_featured: boolean
  read_time?: number
  views?: number
  publish_date?: string
  created_at?: string
  updated_at?: string
}

interface BlogPostFormProps {
  initialData?: BlogPost
  onSubmit: (data: BlogPostFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const categories = [
  "Accounting",
  "Audit & Assurance", 
  "Tax Services",
  "Business Setup",
  "Compliance",
  "Financial Planning",
  "Industry Insights",
  "Company News",
  "Tips & Guides"
]

export function BlogPostForm({ initialData, onSubmit, onCancel, isLoading = false }: BlogPostFormProps) {
  const [newTag, setNewTag] = useState("")
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false)

  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      featured_image: initialData?.featured_image || "",
      author_name: initialData?.author_name || "THE BOARD MAN Team",
      author_role: initialData?.author_role || "Accounting & Business Experts",
      category: initialData?.category || "",
      tags: initialData?.tags || [],
      is_published: initialData?.is_published || false,
      is_featured: initialData?.is_featured || false,
      read_time: initialData?.read_time || undefined,
      publish_date: initialData?.publish_date ? new Date(initialData.publish_date) : undefined,
    },
  })

  const { watch, setValue, getValues } = form

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
  }

  // Watch title changes and auto-generate slug
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title' && value.title && !initialData) {
        setIsGeneratingSlug(true)
        const slug = generateSlug(value.title)
        setValue('slug', slug)
        setTimeout(() => setIsGeneratingSlug(false), 300)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, setValue, initialData])

  // Estimate read time based on content
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'content' && value.content) {
        const wordCount = value.content.split(/\s+/).length
        const readTime = Math.max(1, Math.ceil(wordCount / 200)) // Average reading speed: 200 words/minute
        setValue('read_time', readTime)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, setValue])

  const addTag = () => {
    if (newTag.trim() && !getValues('tags').includes(newTag.trim())) {
      const currentTags = getValues('tags')
      setValue('tags', [...currentTags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const currentTags = getValues('tags')
    setValue('tags', currentTags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5" />
          {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
        </CardTitle>
        <CardDescription>
          {initialData ? 'Update your blog post details' : 'Fill in the details to create a new blog post'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title and Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter blog post title"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug" className="flex items-center gap-2">
                Slug * {isGeneratingSlug && <Loader2 className="h-3 w-3 animate-spin" />}
              </Label>
              <Input
                id="slug"
                placeholder="url-friendly-slug"
                {...form.register("slug")}
              />
              {form.formState.errors.slug && (
                <p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Brief description of the blog post (optional)"
              rows={3}
              {...form.register("excerpt")}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your blog post content here..."
              rows={12}
              {...form.register("content")}
            />
            {form.formState.errors.content && (
              <p className="text-sm text-red-500">{form.formState.errors.content.message}</p>
            )}
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <Label htmlFor="featured_image">Featured Image URL</Label>
            <Input
              id="featured_image"
              placeholder="https://example.com/image.jpg"
              {...form.register("featured_image")}
            />
            {form.formState.errors.featured_image && (
              <p className="text-sm text-red-500">{form.formState.errors.featured_image.message}</p>
            )}
          </div>

          {/* Author Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author_name">Author Name *</Label>
              <Input
                id="author_name"
                placeholder="Author name"
                {...form.register("author_name")}
              />
              {form.formState.errors.author_name && (
                <p className="text-sm text-red-500">{form.formState.errors.author_name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="author_role">Author Role</Label>
              <Input
                id="author_role"
                placeholder="Author role/title"
                {...form.register("author_role")}
              />
            </div>
          </div>

          {/* Category and Read Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select onValueChange={(value) => setValue("category", value)} defaultValue={getValues("category")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="read_time">Read Time (minutes)</Label>
              <Input
                id="read_time"
                type="number"
                min="1"
                max="999"
                placeholder="Auto-calculated"
                {...form.register("read_time", { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {watch("tags")?.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Publish Date */}
          <div className="space-y-2">
            <Label>Publish Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !watch("publish_date") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("publish_date") ? format(watch("publish_date")!, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watch("publish_date")}
                  onSelect={(date) => setValue("publish_date", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Publishing Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="is_published"
                checked={watch("is_published")}
                onCheckedChange={(checked) => setValue("is_published", checked)}
              />
              <Label htmlFor="is_published">Publish this post</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={watch("is_featured")}
                onCheckedChange={(checked) => setValue("is_featured", checked)}
              />
              <Label htmlFor="is_featured">Feature this post</Label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {initialData ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {initialData ? 'Update Post' : 'Create Post'}
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}