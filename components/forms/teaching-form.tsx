  "use client"

  import { useState } from "react"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Textarea } from "@/components/ui/textarea"

  interface TeachingFormProps {
    initialData?: any
    onSubmit: (data: any) => void
    onCancel: () => void
  }

  export function TeachingForm({ initialData, onSubmit, onCancel }: TeachingFormProps) {
    const [formData, setFormData] = useState({
      title: initialData?.title || "",
      institution: initialData?.institution || "",
      course: initialData?.course || "",
      level: initialData?.level || "",
      startDate: initialData?.startDate ? initialData.startDate.split("T")[0] : "",
      endDate: initialData?.endDate ? initialData.endDate.split("T")[0] : "",
      description: initialData?.description || "",
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()

      // ✅ Normalize dates before sending to Prisma
      const cleanedData = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
      }

      onSubmit(cleanedData)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <Label htmlFor="title">Teaching Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Lecturer in Computer Science"
            required
          />
        </div>

        {/* Institution */}
        <div>
          <Label htmlFor="institution">Institution</Label>
          <Input
            id="institution"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            placeholder="University or organization name"
          />
        </div>

        {/* Course */}
        <div>
          <Label htmlFor="course">Course</Label>
          <Input
            id="course"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            placeholder="e.g., Introduction to Computer Science"
          />
        </div>

        {/* Level + Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="level">Level</Label>
            <Input
              id="level"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              placeholder="e.g., Undergraduate, Graduate"
            />
          </div>
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

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Course content, teaching methods, achievements"
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Update" : "Add"} Teaching Experience</Button>
        </div>
      </form>
    )
  }
