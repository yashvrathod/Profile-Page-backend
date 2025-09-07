"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface InvitedTalksFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function InvitedTalksForm({ initialData, onSubmit, onCancel }: InvitedTalksFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    event: initialData?.event || "",
    location: initialData?.location || "",
    date: initialData?.date ? new Date(initialData.date).toISOString().split("T")[0] : "",
    audience: initialData?.audience || "",
    description: initialData?.description || "",
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
        <Label htmlFor="title">Talk Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Title of your presentation"
          required
        />
      </div>

      <div>
        <Label htmlFor="event">Event/Conference</Label>
        <Input
          id="event"
          value={formData.event}
          onChange={(e) => setFormData({ ...formData, event: e.target.value })}
          placeholder="Name of the event or conference"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="City, Country or Virtual"
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
      </div>

      <div>
        <Label htmlFor="audience">Audience</Label>
        <Input
          id="audience"
          value={formData.audience}
          onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
          placeholder="e.g., Industry professionals, Students, Researchers"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of the talk content and impact"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="url">Reference URL</Label>
        <Input
          id="url"
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://link-to-your-talk.com"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update" : "Add"} Invited Talk</Button>
      </div>
    </form>
  )
}
