"use client"

import type React from "react"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { OverviewForm } from "./overview-form"
import { ResearchForm } from "./research-form"
import { TechnicalSkillsForm } from "./technical-skills-form"
import { JournalForm } from "./journal-form"
import { ConferenceForm } from "./conference-form"
import { CertificationForm } from "./certification-form"
import { InterestsForm } from "./interests-form"
import { TeachingForm } from "./teaching-form"
import { InvitedTalksForm } from "./invited-talks-form"
import { BooksForm } from "./books-form"
import { PatentsForm } from "./patents-form"
import { IndustryInteractionForm } from "./industry-interaction-form"

interface FormDialogProps {
  sectionKey: string
  initialData?: any
  onSubmit: (data: any) => void
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FormDialog({ sectionKey, initialData, onSubmit, children, open, onOpenChange }: FormDialogProps) {
  const handleSubmit = (data: any) => {
    onSubmit(data)
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  const renderForm = () => {
    switch (sectionKey) {
      case "overview":
        return <OverviewForm initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} />
      case "research":
        return <ResearchForm initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} />
      case "technicalSkills":
        return <TechnicalSkillsForm initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} />
      case "journals":
        return <JournalForm initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} />
      case "conferences":
        return <ConferenceForm initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} />
      case "certifications":
        return <CertificationForm initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} />
      case "interests":
        return <InterestsForm initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} />
      case "teaching":
        return <TeachingForm initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} />
      case "invitedTalks":
        return <InvitedTalksForm initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} />
      case "books":
        return <BooksForm initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} />
      case "patents":
        return <PatentsForm initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} />
      case "industryInteraction":
        return <IndustryInteractionForm initialData={initialData} onSubmit={handleSubmit} onCancel={handleCancel} />
      default:
        return (
          <div className="p-6 text-center">
            <p className="text-muted-foreground">Form for {sectionKey} is coming soon!</p>
          </div>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">{renderForm()}</DialogContent>
    </Dialog>
  )
}
