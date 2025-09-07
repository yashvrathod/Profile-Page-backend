"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TechnicalSkillData {
  name: string
  level?: string
  category?: string
  description?: string
}

interface TechnicalSkillsFormProps {
  initialData?: TechnicalSkillData
  onSubmit: (data: TechnicalSkillData) => void
  onCancel: () => void
}

export function TechnicalSkillsForm({ initialData, onSubmit, onCancel }: TechnicalSkillsFormProps) {
  const [formData, setFormData] = useState<TechnicalSkillData>(
    initialData || {
      name: "",
      level: "",
      category: "",
      description: "",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return
    onSubmit(formData)
  }

  const updateField = (field: keyof TechnicalSkillData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Technical Skill</CardTitle>
        <CardDescription>Add a technical skill or expertise area</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name *</Label>
            <Input
              id="name"
              placeholder="Python, React, Machine Learning, etc."
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Proficiency Level</Label>
              <Select value={formData.level} onValueChange={(value) => updateField("level", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => updateField("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming Languages</SelectItem>
                  <SelectItem value="frameworks">Frameworks & Libraries</SelectItem>
                  <SelectItem value="databases">Databases</SelectItem>
                  <SelectItem value="tools">Development Tools</SelectItem>
                  <SelectItem value="cloud">Cloud Platforms</SelectItem>
                  <SelectItem value="ai-ml">AI/Machine Learning</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your experience with this skill..."
              rows={3}
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel} className="bg-transparent">
              Cancel
            </Button>
            <Button type="submit">Save Skill</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
