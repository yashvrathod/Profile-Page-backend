"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

interface CertificationFormData {
  name: string
  issuer?: string
  issueDate?: string
  expiryDate?: string
  credentialId?: string
  url?: string
  description?: string
}

interface CertificationFormProps {
  initialData?: CertificationFormData
  onSubmit: (data: CertificationFormData) => void
  onCancel: () => void
}

export function CertificationForm({
  initialData,
  onSubmit,
  onCancel,
}: CertificationFormProps) {
  const [formData, setFormData] = useState({
  name: initialData?.name || "",
  issuer: initialData?.issuer || "",
  
    issueDate: initialData?.issueDate ? initialData.issueDate.split("T")[0] : "",
    expiryDate: initialData?.expiryDate ? initialData.expiryDate.split("T")[0] : "",
  credentialId: initialData?.credentialId || "",
  url: initialData?.url || "",
  description: initialData?.description || "",
})

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (!formData.name.trim()) return

  const payload: CertificationFormData = {
    ...formData,
    issueDate: formData.issueDate
      ? new Date(formData.issueDate).toISOString()
      : undefined,
    expiryDate: formData.expiryDate
      ? new Date(formData.expiryDate).toISOString()
      : undefined,
  }

  onSubmit(payload)
}


  const updateField = (field: keyof CertificationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Certification" : "Add Certification"}
        </CardTitle>
        <CardDescription>
          Provide details about your professional certification.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Certification Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Certification Name *</Label>
            <Input
              id="name"
              placeholder="AWS Certified Solutions Architect"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>

          {/* Issuer */}
          <div className="space-y-2">
            <Label htmlFor="issuer">Issuing Organization</Label>
            <Input
              id="issuer"
              placeholder="Amazon Web Services"
              value={formData.issuer}
              onChange={(e) => updateField("issuer", e.target.value)}
            />
          </div>

          {/* Issue / Expiry Date */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => updateField("issueDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => updateField("expiryDate", e.target.value)}
              />
            </div>
          </div>

          {/* Credential ID */}
          <div className="space-y-2">
            <Label htmlFor="credentialId">Credential ID</Label>
            <Input
              id="credentialId"
              placeholder="ABC123DEF456"
              value={formData.credentialId}
              onChange={(e) => updateField("credentialId", e.target.value)}
            />
          </div>

          {/* Verification URL */}
          <div className="space-y-2">
            <Label htmlFor="url">Verification URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://verify.certification.com"
              value={formData.url}
              onChange={(e) => updateField("url", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the certification..."
              rows={3}
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update Certification" : "Save Certification"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
