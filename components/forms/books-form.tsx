"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface BooksFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function BooksForm({ initialData, onSubmit, onCancel }: BooksFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    authors: initialData?.authors || "",
    publisher: initialData?.publisher || "",
    publishDate: initialData?.publishDate || "",
    isbn: initialData?.isbn || "",
    pages: initialData?.pages || "",
    description: initialData?.description || "",
    url: initialData?.url || "",
  })
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  
  // Convert empty publishDate to null
  const submitData = {
    ...formData,
    publishDate: formData.publishDate ? new Date(formData.publishDate) : null,
    pages: formData.pages ? Number(formData.pages) : null, // convert pages to number
  }

  onSubmit(submitData)
}
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div>
        <Label htmlFor="title">Book Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Title of the book"
          required
        />
      </div>

      <div>
        <Label htmlFor="authors">Authors</Label>
        <Input
          id="authors"
          value={formData.authors}
          onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
          placeholder="All authors (comma-separated)"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="publisher">Publisher</Label>
          <Input
            id="publisher"
            value={formData.publisher}
            onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
            placeholder="Publishing house"
          />
        </div>
        <div>
          <Label htmlFor="publishDate">Publish Date</Label>
          <Input
            id="publishDate"
            type="date"
            value={formData.publishDate ? formData.publishDate.substring(0, 10) : ""}
            onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            placeholder="978-0-123456-78-9"
          />
        </div>
        <div>
          <Label htmlFor="pages">Pages</Label>
          <Input
            id="pages"
            type="number"
            value={formData.pages}
            onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
            placeholder="Number of pages"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="url">Book URL</Label>
        <Input
          id="url"
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="Link to book or publisher"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of the book content and significance"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update" : "Add"} Book</Button>
      </div>
    </form>
  )
}
