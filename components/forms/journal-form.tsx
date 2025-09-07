"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface JournalFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function JournalForm({ initialData, onSubmit, onCancel }: JournalFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    journal: initialData?.journal || "",
    authors: initialData?.authors || "",
    publishDate: initialData?.publishDate ? new Date(initialData.publishDate).toISOString().split("T")[0] : "",
    volume: initialData?.volume || "",
    issue: initialData?.issue || "",
    pages: initialData?.pages || "",
    doi: initialData?.doi || "",
    url: initialData?.url || "",
    abstract: initialData?.abstract || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      ...formData,
      publishDate: formData.publishDate ? new Date(formData.publishDate).toISOString() : null,
    }

    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div>
        <Label htmlFor="title">Article Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter article title"
          required
        />
      </div>

      <div>
        <Label htmlFor="journal">Journal Name</Label>
        <Input
          id="journal"
          value={formData.journal}
          onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
          placeholder="e.g., Nature, IEEE Transactions"
        />
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
        <Label htmlFor="publishDate">Publish Date</Label>
        <Input
          id="publishDate"
          type="date"
          value={formData.publishDate}
          onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="volume">Volume</Label>
          <Input
            id="volume"
            value={formData.volume}
            onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
            placeholder="e.g., 42"
          />
        </div>
        <div>
          <Label htmlFor="issue">Issue</Label>
          <Input
            id="issue"
            value={formData.issue}
            onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
            placeholder="e.g., 3"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="pages">Pages</Label>
        <Input
          id="pages"
          value={formData.pages}
          onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
          placeholder="e.g., 101–115"
        />
      </div>

      <div>
        <Label htmlFor="doi">DOI</Label>
        <Input
          id="doi"
          value={formData.doi}
          onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
          placeholder="e.g., 10.1109/5.771073"
        />
      </div>

      <div>
        <Label htmlFor="url">Article URL</Label>
        <Input
          id="url"
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://journal-link.com"
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

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update" : "Add"} Journal</Button>
      </div>
    </form>
  )
}
