"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PatentsFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function PatentsForm({ initialData, onSubmit, onCancel }: PatentsFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    patentNumber: initialData?.patentNumber || "",
    inventors: initialData?.inventors || "",
    assignee: initialData?.assignee || "",
    filingDate: initialData?.filingDate || "",
    grantDate: initialData?.grantDate || "",
    status: initialData?.status || "",
    description: initialData?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Convert empty strings to null
    const dataToSubmit = {
      ...formData,
      filingDate: formData.filingDate ? new Date(formData.filingDate).toISOString() : null,
      grantDate: formData.grantDate ? new Date(formData.grantDate).toISOString() : null,
    }

    onSubmit(dataToSubmit)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div>
        <Label htmlFor="title">Patent Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Title of the patent"
          required
        />
      </div>

      <div>
        <Label htmlFor="patentNumber">Patent Number</Label>
        <Input
          id="patentNumber"
          value={formData.patentNumber}
          onChange={(e) => setFormData({ ...formData, patentNumber: e.target.value })}
          placeholder="US Patent No. 1234567"
        />
      </div>

      <div>
        <Label htmlFor="inventors">Inventors</Label>
        <Input
          id="inventors"
          value={formData.inventors}
          onChange={(e) => setFormData({ ...formData, inventors: e.target.value })}
          placeholder="All inventors (comma-separated)"
          required
        />
      </div>

      <div>
        <Label htmlFor="assignee">Assignee</Label>
        <Input
          id="assignee"
          value={formData.assignee}
          onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
          placeholder="Company or organization"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="filingDate">Filing Date</Label>
          <Input
            id="filingDate"
            type="date"
            value={formData.filingDate ? formData.filingDate.substring(0, 10) : ""}
            onChange={(e) => setFormData({ ...formData, filingDate: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="grantDate">Grant Date</Label>
          <Input
            id="grantDate"
            type="date"
            value={formData.grantDate ? formData.grantDate.substring(0, 10) : ""}
            onChange={(e) => setFormData({ ...formData, grantDate: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Input
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          placeholder="e.g., Granted, Pending, Filed"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of the invention and its applications"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update" : "Add"} Patent</Button>
      </div>
    </form>
  )
}
