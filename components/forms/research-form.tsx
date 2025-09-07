"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ResearchFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ResearchForm({ initialData, onSubmit, onCancel }: ResearchFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    type: initialData?.type || "",
    status: initialData?.status || "",
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : "",
    endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : "",
    collaborators: initialData?.collaborators || "",
    funding: initialData?.funding || "",
    description: initialData?.description || "",
    url: initialData?.url || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      ...formData,
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
    }

    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div>
        <Label htmlFor="title">Research Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter research project title"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            placeholder="e.g., Project, Publication, Grant"
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Input
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            placeholder="e.g., Ongoing, Completed, Published"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="collaborators">Collaborators</Label>
        <Input
          id="collaborators"
          value={formData.collaborators}
          onChange={(e) => setFormData({ ...formData, collaborators: e.target.value })}
          placeholder="Names of collaborators"
        />
      </div>

      <div>
        <Label htmlFor="funding">Funding</Label>
        <Input
          id="funding"
          value={formData.funding}
          onChange={(e) => setFormData({ ...formData, funding: e.target.value })}
          placeholder="Funding source or agency"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of the research"
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
          placeholder="https://research-link.com"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update" : "Add"} Research</Button>
      </div>
    </form>
  )
}
