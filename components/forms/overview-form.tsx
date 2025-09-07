"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface OverviewData {
  title?: string
  description?: string
  bio?: string
  location?: string
  website?: string
  linkedin?: string
  twitter?: string
  github?: string
  profileImage?: string
}

interface OverviewFormProps {
  initialData?: OverviewData
  onSubmit: (data: OverviewData) => void
  onCancel: () => void
}

export function OverviewForm({ initialData, onSubmit, onCancel }: OverviewFormProps) {
  const [formData, setFormData] = useState<OverviewData>(
    initialData || {
      title: "",
      description: "",
      bio: "",
      location: "",
      website: "",
      linkedin: "",
      twitter: "",
      github: "",
      profileImage: "",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const updateField = (field: keyof OverviewData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Overview Information</CardTitle>
        <CardDescription>Update your basic profile information and contact details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                placeholder="Professor of Computer Science"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="San Francisco, CA"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Input
              id="description"
              placeholder="AI researcher and educator"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell your professional story..."
              rows={4}
              value={formData.bio}
              onChange={(e) => updateField("bio", e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact & Social Links</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://yourwebsite.com"
                  value={formData.website}
                  onChange={(e) => updateField("website", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/username"
                  value={formData.twitter}
                  onChange={(e) => updateField("twitter", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  placeholder="https://github.com/username"
                  value={formData.github}
                  onChange={(e) => updateField("github", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel} className="bg-transparent">
              Cancel
            </Button>
            <Button type="submit">Save Overview</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
