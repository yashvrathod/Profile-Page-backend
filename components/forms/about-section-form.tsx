"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type ID = string

const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`

// helper
const getDefaultIcon = (type = "") => {
  switch (type.toLowerCase()) {
    case "github":
      return "github"
    case "linkedin":
      return "linkedin"
    case "twitter":
      return "twitter"
    case "email":
      return "mail"
    default:
      return "link"
  }
}

interface AboutSectionFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function AboutSectionForm({ initialData, onSubmit, onCancel }: AboutSectionFormProps) {
  // Ensure initial data has the expected structure with defaults so .label/.title won't be undefined
  const defaultData = {
    heading: initialData?.heading ?? "About Me",
    description: initialData?.description ?? "",
    skills: (initialData?.skills ?? []).map((s: any) => ({ id: makeId(), label: s.label ?? "" })),
    cards: (initialData?.cards ?? []).map((c: any) => ({ id: makeId(), title: c.title ?? "", content: c.content ?? "", bgColor: c.bgColor ?? "" })),
    achievements: (initialData?.achievements ?? []).map((a: any) => ({ id: makeId(), count: a.count ?? "", label: a.label ?? "" })),
    contacts: (initialData?.contacts ?? []).map((c: any) => ({ id: makeId(), type: c.type ?? "", link: c.link ?? "", icon: c.icon ?? "" })),
  }

  const [heading, setHeading] = useState<string>(defaultData.heading)
  const [description, setDescription] = useState<string>(defaultData.description)
  const [skills, setSkills] = useState<Array<{ id: ID; label: string }>>(defaultData.skills)
  const [cards, setCards] = useState<Array<{ id: ID; title: string; content: string; bgColor?: string }>>(defaultData.cards)
  const [achievements, setAchievements] = useState<Array<{ id: ID; count: string; label: string }>>(defaultData.achievements)
  const [contacts, setContacts] = useState<Array<{ id: ID; type: string; link: string; icon?: string }>>(defaultData.contacts)

  // validation/touch state to show errors only after submit attempt
  const [touched, setTouched] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = () => {
    // Check required fields for each section
    // Skills: label required if skill exists
    // Cards: title & content required
    // Achievements: count & label required
    // Contacts: type & link required
    if (!heading.trim()) {
      setSubmitError("Heading is required.")
      return false
    }

    for (const s of skills) {
      if (!s.label.trim()) {
        setSubmitError("Please fill or remove empty skills.")
        return false
      }
    }

    for (const c of cards) {
      if (!c.title.trim() || !c.content.trim()) {
        setSubmitError("Please fill title & content for all feature cards or remove them.")
        return false
      }
    }

    for (const a of achievements) {
      if (!a.count.trim() || !a.label.trim()) {
        setSubmitError("Please fill count & label for all achievements or remove them.")
        return false
      }
    }

    for (const ct of contacts) {
      if (!ct.type.trim() || !ct.link.trim()) {
        setSubmitError("Please fill type & link for all contacts or remove them.")
        return false
      }
    }

    setSubmitError(null)
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!validate()) return

    // sanitize payload: ensure icons exist (generated in code)
    const contactsWithIcons = contacts.map((c) => ({
      type: c.type.trim(),
      link: c.link.trim(),
      icon: c.icon?.trim() || getDefaultIcon(c.type),
    }))

    const payload = {
      heading: heading.trim(),
      description: description.trim(),
      skills: skills.map((s) => ({ label: s.label.trim() })),
      cards: cards.map((c) => ({ title: c.title.trim(), content: c.content.trim(), bgColor: c.bgColor?.trim() || null })),
      achievements: achievements.map((a) => ({ count: a.count.trim(), label: a.label.trim() })),
      contacts: contactsWithIcons,
    }

    onSubmit(payload)
  }

  /* --- helpers to mutate lists --- */
  const addSkill = () => setSkills((s) => [...s, { id: makeId(), label: "" }])
  const removeSkill = (id: ID) => setSkills((s) => s.filter((x) => x.id !== id))
  const updateSkill = (id: ID, label: string) => setSkills((s) => s.map((x) => (x.id === id ? { ...x, label } : x)))

  const addCard = () => setCards((c) => [...c, { id: makeId(), title: "", content: "" }])
  const removeCard = (id: ID) => setCards((c) => c.filter((x) => x.id !== id))
  const updateCard = (id: ID, data: Partial<{ title: string; content: string; bgColor?: string }>) =>
    setCards((c) => c.map((x) => (x.id === id ? { ...x, ...data } : x)))

  const addAchievement = () => setAchievements((a) => [...a, { id: makeId(), count: "", label: "" }])
  const removeAchievement = (id: ID) => setAchievements((a) => a.filter((x) => x.id !== id))
  const updateAchievement = (id: ID, data: Partial<{ count: string; label: string }>) =>
    setAchievements((a) => a.map((x) => (x.id === id ? { ...x, ...data } : x)))

  const addContact = () => setContacts((c) => [...c, { id: makeId(), type: "", link: "", icon: "" }])
  const removeContact = (id: ID) => setContacts((c) => c.filter((x) => x.id !== id))
  const updateContact = (id: ID, data: Partial<{ type: string; link: string; icon?: string }>) =>
    setContacts((c) => c.map((x) => (x.id === id ? { ...x, ...data } : x)))

  const invalidClass = (value: string | undefined) => (touched && (!value || !value.trim()) ? "border-red-500 ring-red-50" : "")

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Heading */}
        <div>
          <Label>Heading</Label>
          <Input
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className={invalidClass(heading)}
          />
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className={invalidClass(description)} />
        </div>

        {/* Skills */}
        <div>
          <Label className="mb-2">Skills</Label>
          <div className="space-y-2">
            {skills.map((s, i) => (
              <div key={s.id} className="flex gap-2 items-center">
                <Input
                  placeholder="Skill (e.g. Next.js)"
                  value={s.label}
                  onChange={(e) => updateSkill(s.id, e.target.value)}
                  className={invalidClass(s.label)}
                />
                <Button type="button" variant="destructive" onClick={() => removeSkill(s.id)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSkill}>
              + Add Skill
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div>
          <Label className="mb-2">Feature Cards</Label>
          <div className="space-y-3">
            {cards.map((c) => (
              <div key={c.id} className="p-3 border rounded space-y-2">
                <Input
                  placeholder="Title"
                  value={c.title}
                  onChange={(e) => updateCard(c.id, { title: e.target.value })}
                  className={invalidClass(c.title)}
                />
                <Textarea
                  placeholder="Content"
                  value={c.content}
                  onChange={(e) => updateCard(c.id, { content: e.target.value })}
                  className={invalidClass(c.content)}
                />
                <Input placeholder="bgColor (optional tailwind class)" value={c.bgColor ?? ""} onChange={(e) => updateCard(c.id, { bgColor: e.target.value })} />
                <div className="flex gap-2">
                  <Button type="button" variant="destructive" onClick={() => removeCard(c.id)}>
                    Remove Card
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addCard}>
              + Add Card
            </Button>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <Label className="mb-2">Achievements</Label>
          <div className="space-y-2">
            {achievements.map((a) => (
              <div key={a.id} className="flex gap-2 items-center">
                <Input placeholder="Count (e.g. 80+)" value={a.count} onChange={(e) => updateAchievement(a.id, { count: e.target.value })} className={invalidClass(a.count)} />
                <Input placeholder="Label (e.g. Publications)" value={a.label} onChange={(e) => updateAchievement(a.id, { label: e.target.value })} className={invalidClass(a.label)} />
                <Button type="button" variant="destructive" onClick={() => removeAchievement(a.id)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addAchievement}>
              + Add Achievement
            </Button>
          </div>
        </div>

        {/* Contacts */}
        <div>
          <Label className="mb-2">Contacts</Label>
          <div className="space-y-2">
            {contacts.map((c) => (
              <div key={c.id} className="p-3 border rounded space-y-2">
                <Input placeholder="Type (github, linkedin, email...)" value={c.type} onChange={(e) => updateContact(c.id, { type: e.target.value })} className={invalidClass(c.type)} />
                <Input placeholder="Link (url or mailto:)" value={c.link} onChange={(e) => updateContact(c.id, { link: e.target.value })} className={invalidClass(c.link)} />
                <Input placeholder="Icon (optional)" value={c.icon} onChange={(e) => updateContact(c.id, { icon: e.target.value })} />
                <div className="flex gap-2">
                  <Button type="button" variant="destructive" onClick={() => removeContact(c.id)}>
                    Remove Contact
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addContact}>
              + Add Contact
            </Button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>

        {submitError && <p className="text-sm text-red-600 mt-2">{submitError}</p>}
      </form>

      {/* Live Preview */}
      <Card className="p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">{heading}</h2>
        <p className="text-gray-600 mb-4">{description}</p>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((s) => (
              <span key={s.id} className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                {s.label || <em className="text-gray-400">(empty)</em>}
              </span>
            ))}
          </div>
        )}

        {cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {cards.map((c) => (
              <Card key={c.id} className="p-3">
                <h3 className="font-semibold">{c.title || <em className="text-gray-400">Untitled</em>}</h3>
                <p className="text-sm text-gray-500">{c.content || <em className="text-gray-400">No content</em>}</p>
              </Card>
            ))}
          </div>
        )}

        {achievements.length > 0 && (
          <div className="flex gap-4 mb-4">
            {achievements.map((a) => (
              <div key={a.id} className="text-center">
                <h4 className="text-2xl font-bold">{a.count || "-"}</h4>
                <p className="text-sm">{a.label || "-"}</p>
              </div>
            ))}
          </div>
        )}

        {contacts.length > 0 && (
          <div className="flex flex-col gap-2">
            {contacts.map((c) => (
              <a key={c.id} href={c.link || "#"} className="text-blue-600 underline flex gap-2 items-center">
                <span className="font-medium">{c.type || "contact"}</span>
              </a>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
