"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface ConferenceFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ConferenceForm({ initialData, onSubmit, onCancel }: ConferenceFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    conference: initialData?.conference || "",
    location: initialData?.location || "",
    date: initialData?.date ? new Date(initialData.date).toISOString().split("T")[0] : "",
    type: initialData?.type || "",
    authors: initialData?.authors || "",
    abstract: initialData?.abstract || "",
    url: initialData?.url || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      ...formData,
      date: formData.date ? new Date(formData.date).toISOString() : null,
    }

    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div>
        <Label htmlFor="title">Presentation Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter title of the work presented"
          required
        />
      </div>

      <div>
        <Label htmlFor="conference">Conference Name</Label>
        <Input
          id="conference"
          value={formData.conference}
          onChange={(e) => setFormData({ ...formData, conference: e.target.value })}
          placeholder="e.g., ICML 2025"
        />
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g., Paris, France"
        />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div>
        <Label>Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Presentation">Presentation</SelectItem>
            <SelectItem value="Poster">Poster</SelectItem>
            <SelectItem value="Workshop">Workshop</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="authors">Authors</Label>
        <Input
          id="authors"
          value={formData.authors}
          onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
          placeholder="List of authors"
        />
      </div>

      <div>
        <Label htmlFor="abstract">Abstract</Label>
        <Textarea
          id="abstract"
          value={formData.abstract}
          onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
          placeholder="Enter abstract or summary"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="url">Conference URL</Label>
        <Input
          id="url"
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://conference-website.com"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update" : "Add"} Conference</Button>
      </div>
    </form>
  )
}
