"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FiList,
  FiLayers,
  FiCopy,
  FiBookOpen,
  FiAward,
  FiUsers,
  FiCpu,
  FiPenTool,
  FiZap,
  FiBook,
  FiBriefcase,
  FiGlobe,
  FiPlus,
  FiEdit,
  FiEye,
  FiPlusCircle,
} from "react-icons/fi"
import Link from "next/link"
import { FormDialog } from "./forms/custom-section"

interface ProfileEditorProps {
  userData: any
}

export function ProfileEditor({ userData }: ProfileEditorProps) {
  const [activeSection, setActiveSection] = useState("overview")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [customSections, setCustomSections] = useState<any[]>([]) 
  const [customSectionDialogOpen, setCustomSectionDialogOpen] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState<"minimalist" | "academic" | "vibrant">("minimalist")

  // Fetch custom sections from DB
  useEffect(() => {
    const fetchCustomSections = async () => {
      try {
        const res = await fetch(`/api/users/${userData.username}/custom-sections`, {
          cache: "no-store",
        })
        if (!res.ok) throw new Error("Failed to fetch custom sections")
        const sections = await res.json() 
        setCustomSections(sections.map((s: any) => ({ ...s, items: s.items ?? [] })))
      } catch (err) {
        console.error(err)
      }
    }

    fetchCustomSections()
  }, [userData.username])

  const standardSections = [
    { key: "overview", name: "Overview", icon: FiList, description: "Basic information and bio" },
    { key: "interests", name: "Interests", icon: FiLayers, description: "Your areas of interest" },
    { key: "technicalSkills", name: "Technical Skills", icon: FiCopy, description: "Programming and technical skills" },
    { key: "teaching", name: "Teaching", icon: FiBookOpen, description: "Teaching experience and courses" },
    { key: "certifications", name: "Certifications", icon: FiAward, description: "Professional certifications" },
    { key: "invitedTalks", name: "Invited Talks", icon: FiUsers, description: "Speaking engagements" },
    { key: "research", name: "Research", icon: FiCpu, description: "Research projects and publications" },
    { key: "journals", name: "Journals", icon: FiPenTool, description: "Journal publications" },
    { key: "conferences", name: "Conferences", icon: FiZap, description: "Conference presentations" },
    { key: "books", name: "Books", icon: FiBook, description: "Published books and chapters" },
    { key: "patents", name: "Patents", icon: FiBriefcase, description: "Patents and intellectual property" },
    { key: "industryInteraction", name: "Industry Interaction", icon: FiGlobe, description: "Industry collaborations" },
  ]

  const allSections = [
    ...standardSections,
    ...customSections.map((section) => ({
      key: `custom-${section.key}`,
      name: section.name,
      icon: FiLayers,
      description: "User-created section",
      isCustom: true,
    })),
  ]

  const handleAddNew = () => {
    setEditingItem(null)
    setDialogOpen(true)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setDialogOpen(true)
  }

  const handleSubmit = async (data: any) => {
    try {
      const method = editingItem ? "PUT" : "POST"
      const endpoint = activeSection.startsWith("custom-")
        ? `/api/users/${userData.username}/custom-sections/${activeSection.replace("custom-", "")}/items`
        : `/api/users/${userData.username}/sections/${activeSection}`

        const payload = {
        ...data,
        name: data.name || data.title || "Untitled",
        title: data.title || data.name || "Untitled",
      }

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem ? { id: editingItem.id, ...payload } : payload),
      })

      if (!res.ok) throw new Error("Failed to save section item")
      const saved = await res.json()
      console.log("Saved:", saved)

      if (activeSection.startsWith("custom-")) {
        const sectionKey = activeSection.replace("custom-", "")
        setCustomSections((prev) =>
          prev.map((sec) =>
            sec.key === sectionKey ? { ...sec, items: [...sec.items, saved] } : sec
          )
        )
      }

      setDialogOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleTemplateChange = async (template: "minimalist" | "academic" | "vibrant") => {
    setActiveTemplate(template)
    try {
      await fetch(`/api/users/${userData.username}/template`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template }),
      })
    } catch (err) {
      console.error("Failed to save template:", err)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Profile</h1>
          <p className="text-muted-foreground">Manage your profile content and sections</p>
        </div>
        <div className="flex gap-3">
          <Link href={`/${userData.username}`}>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <FiEye className="w-4 h-4" /> View Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Template Selector */}
      <div className="flex gap-2 items-center mb-4">
        <span className="font-medium text-muted-foreground">Template:</span>
        <Button size="sm" variant={activeTemplate === "minimalist" ? "default" : "outline"} onClick={() => handleTemplateChange("minimalist")}>Minimalist</Button>
        <Button size="sm" variant={activeTemplate === "academic" ? "default" : "outline"} onClick={() => handleTemplateChange("academic")}>Academic</Button>
        <Button size="sm" variant={activeTemplate === "vibrant" ? "default" : "outline"} onClick={() => handleTemplateChange("vibrant")}>Vibrant</Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Sections</CardTitle>
              <CardDescription>Click on a section to edit its content</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {allSections.map((section) => {
                  const IconComponent = section.icon
                  const isActive = activeSection === section.key
                  const itemCount = section.isCustom
                    ? customSections.find((s) => `custom-${s.key}` === section.key)?.items?.length || 0
                    : userData[section.key]?.length || 0

                  return (
                    <button
                      key={section.key}
                      onClick={() => setActiveSection(section.key)}
                      className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-4 h-4" />
                        <span className="font-medium">{section.name}</span>
                      </div>
                      {itemCount > 0 && <Badge variant={isActive ? "secondary" : "outline"} className="text-xs">{itemCount}</Badge>}
                    </button>
                  )
                })}

                <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setCustomSectionDialogOpen(true)}>
                  <FiPlusCircle className="w-4 h-4 mr-2" /> Add Custom Section
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {allSections.find((s) => s.key === activeSection)?.name || "Section"}
                  </CardTitle>
                  <CardDescription>
                    {allSections.find((s) => s.key === activeSection)?.description || ""}
                  </CardDescription>
                </div>
                <FormDialog
                  sectionKey={activeSection}
                  initialData={editingItem}
                  onSubmit={handleSubmit}
                  open={dialogOpen}
                  onOpenChange={setDialogOpen}
                >
                  <Button onClick={handleAddNew} className="flex items-center gap-2">
                    <FiPlus className="w-4 h-4" /> Add New
                  </Button>
                </FormDialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(activeSection.startsWith("custom-")
                  ? customSections.find((s) => `custom-${s.key}` === activeSection)?.items
                  : userData[activeSection]
                )?.length > 0 ? (
                  (activeSection.startsWith("custom-")
                    ? customSections.find((s) => `custom-${s.key}` === activeSection)?.items
                    : userData[activeSection]
                  ).map((item: any) => (
                    <Card key={item.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4 flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{item.title || item.name || "Untitled"}</h4>
                          {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                          {item.category && <Badge variant="outline">{item.category}</Badge>}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                          <FiEdit className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                    <div className="space-y-4">
                      <FiList className="w-12 h-12 text-muted-foreground mx-auto" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">No items yet</h3>
                        <p className="text-muted-foreground">Add your first item to get started</p>
                      </div>
                      <Button onClick={handleAddNew} className="flex items-center gap-2">
                        <FiPlus className="w-4 h-4" /> Add Item
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog for adding new custom section */}
      <FormDialog
        sectionKey="customSection"
        open={customSectionDialogOpen}
        onOpenChange={setCustomSectionDialogOpen}
        initialData={null}
        onSubmit={async (data: any) => {
          try {
            const name = data.name ?? data.title ?? "untitled"
            const key = data.key ?? name.toLowerCase().replace(/\s+/g, "-")
            const payload = { name, key }

            const res = await fetch(`/api/users/${userData.username}/custom-sections`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error("Failed to create custom section")
            const saved = await res.json()

            setCustomSections((prev) => [...prev, { ...saved, items: saved.items ?? [] }])
            setCustomSectionDialogOpen(false)
          } catch (err) {
            console.error(err)
          }
        }}
      />
    </div>
  )
}
