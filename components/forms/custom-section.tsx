"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FormDialogProps {
  sectionKey: string
  initialData: any | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => Promise<void>
}

export function FormDialog({ sectionKey, initialData, open, onOpenChange, onSubmit }: FormDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || initialData.name || "")
      setDescription(initialData.description || "")
      setCategory(initialData.category || "")
    } else {
      setTitle("")
      setDescription("")
      setCategory("")
    }
  }, [initialData])

  const handleSubmit = async () => {
    await onSubmit({ title, description, category })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Item" : sectionKey === "customSection" ? "Add Custom Section" : "Add Item"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Only show title input for items or custom sections */}
          <Input
            placeholder={sectionKey === "customSection" ? "Custom Section Name" : "Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {sectionKey !== "customSection" && (
            <>
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                placeholder="Category (optional)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{initialData ? "Update" : "Create"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
