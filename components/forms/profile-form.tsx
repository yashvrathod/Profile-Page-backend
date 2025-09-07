"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProfileFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ProfileForm({ initialData, onSubmit, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    headline: initialData?.headline || "",
    bio: initialData?.bio || "",
    profileImage: initialData?.profileImage || "",
    primaryButtonLabel: initialData?.primaryButtonLabel || "View My Work",
    primaryButtonLink: initialData?.primaryButtonLink || "#projects",
    secondaryButtonLabel: initialData?.secondaryButtonLabel || "Contact Me",
    secondaryButtonLink: initialData?.secondaryButtonLink || "#contact",
    gradientFrom: initialData?.gradientFrom || "pink-500",
    gradientVia: initialData?.gradientVia || "purple-500",
    gradientTo: initialData?.gradientTo || "yellow-500",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
        </div>
        <div>
          <Label>Headline</Label>
          <Input value={formData.headline} onChange={(e) => handleChange("headline", e.target.value)} />
        </div>
        <div>
          <Label>Bio</Label>
          <Textarea
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <div>
          <Label>Profile Image URL</Label>
          <Input value={formData.profileImage} onChange={(e) => handleChange("profileImage", e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Primary Button Label</Label>
            <Input value={formData.primaryButtonLabel} onChange={(e) => handleChange("primaryButtonLabel", e.target.value)} />
          </div>
          <div>
            <Label>Primary Button Link</Label>
            <Input value={formData.primaryButtonLink} onChange={(e) => handleChange("primaryButtonLink", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Secondary Button Label</Label>
            <Input value={formData.secondaryButtonLabel} onChange={(e) => handleChange("secondaryButtonLabel", e.target.value)} />
          </div>
          <div>
            <Label>Secondary Button Link</Label>
            <Input value={formData.secondaryButtonLink} onChange={(e) => handleChange("secondaryButtonLink", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>Gradient From</Label>
            <Input value={formData.gradientFrom} onChange={(e) => handleChange("gradientFrom", e.target.value)} />
          </div>
          <div>
            <Label>Gradient Via</Label>
            <Input value={formData.gradientVia} onChange={(e) => handleChange("gradientVia", e.target.value)} />
          </div>
          <div>
            <Label>Gradient To</Label>
            <Input value={formData.gradientTo} onChange={(e) => handleChange("gradientTo", e.target.value)} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>

      {/* Live Preview Section */}
      <div className="relative bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50 rounded-2xl shadow-md flex flex-col items-center justify-center p-6">
        {formData.profileImage && (
          <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-xl">
            <Image src={formData.profileImage} alt="Preview" fill className="object-cover" />
          </div>
        )}
        <h1 className="text-3xl font-bold mt-4">
          Hi, I'm <span className={`text-${formData.gradientFrom}`}>{formData.name || "Your Name"}</span>
        </h1>
        <p className="text-center text-gray-600 mt-2">{formData.headline || "Your headline here..."}</p>
        <p className="text-center text-gray-500 text-sm mt-2">{formData.bio}</p>
        <div className="flex gap-3 mt-4">
          <Button className={`bg-gradient-to-r from-${formData.gradientFrom} via-${formData.gradientVia} to-${formData.gradientTo}`}>
            {formData.primaryButtonLabel}
          </Button>
          <Button variant="outline">{formData.secondaryButtonLabel}</Button>
        </div>
      </div>
    </div>
  )
}
