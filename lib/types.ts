import type React from "react"
export interface ProfileSection {
  name: string
  icon: React.ReactNode
  key: string
}

export const PROFILE_SECTIONS: ProfileSection[] = [
  { name: "Overview", icon: null, key: "overview" },
  { name: "Interests", icon: null, key: "interests" },
  { name: "Technical Skills", icon: null, key: "technicalSkills" },
  { name: "Teaching", icon: null, key: "teaching" },
  { name: "Certifications", icon: null, key: "certifications" },
  { name: "Invited Talks", icon: null, key: "invitedTalks" },
  { name: "Research", icon: null, key: "research" },
  { name: "Journals", icon: null, key: "journals" },
  { name: "Conferences", icon: null, key: "conferences" },
  { name: "Books", icon: null, key: "books" },
  { name: "Patents", icon: null, key: "patents" },
  { name: "Industry Interaction", icon: null, key: "industryInteraction" },
]

export type TemplateType = "template1" | "template2" | "template3"
