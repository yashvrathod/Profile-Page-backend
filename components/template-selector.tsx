"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TemplateMinimalist } from "./templates/template-minimalist"
import  TemplateAcademic  from "./templates/template-academic"
import { TemplateVibrant } from "./templates/template-vibrant"

const sampleData = {
  name: "Dr. Sarah Johnson",
  title: "Professor of Computer Science",
  bio: "Passionate researcher in artificial intelligence and machine learning with over 10 years of experience in academia and industry collaboration.",
  sections: {
    research: [
      {
        title: "AI-Powered Healthcare Diagnostics",
        description: "Developing machine learning models for early disease detection using medical imaging data.",
        category: "Machine Learning",
      },
    ],
    technicalSkills: [
      {
        name: "Python",
        level: "Expert",
        category: "Programming",
      },
      {
        name: "TensorFlow",
        level: "Advanced",
        category: "Frameworks",
      },
    ],
    journals: [
      {
        title: "Deep Learning Approaches in Medical Image Analysis",
        journal: "Nature Machine Intelligence",
        description: "A comprehensive review of current deep learning techniques in medical imaging.",
      },
    ],
  },
}

export function TemplateSelector() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const templates = [
    {
      id: "minimalist",
      name: "Modern Minimalist",
      description: "Clean, simple design with focus on content",
      component: TemplateMinimalist,
      preview: "template-minimalist",
    },
    {
      id: "academic",
      name: "Professional Academic",
      description: "Structured layout perfect for academic profiles",
      component: TemplateAcademic,
      preview: "template-academic",
    },
    {
      id: "vibrant",
      name: "Creative Vibrant",
      description: "Colorful and dynamic design with personality",
      component: TemplateVibrant,
      preview: "template-vibrant",
    },
  ]

  if (selectedTemplate) {
    const template = templates.find((t) => t.id === selectedTemplate)
    if (template) {
      const TemplateComponent = template.component
      return (
        <div>
          <div className="fixed top-4 left-4 z-50">
            <Button
              variant="outline"
              onClick={() => setSelectedTemplate(null)}
              className="bg-background/80 backdrop-blur-sm"
            >
              ← Back to Templates
            </Button>
          </div>
          <TemplateComponent data={sampleData} />
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Choose Your Profile Template</h1>
          <p className="text-xl text-muted-foreground">Select a design that best represents your professional style</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card key={template.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className={`${template.preview} h-48 rounded-lg border-2 border-border overflow-hidden relative`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary rounded-full mx-auto flex items-center justify-center">
                        <span className="text-white font-bold">SJ</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-primary/60 rounded w-20 mx-auto"></div>
                        <div className="h-1 bg-muted rounded w-16 mx-auto"></div>
                        <div className="h-1 bg-muted rounded w-12 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{template.name}</h3>
                  <p className="text-muted-foreground">{template.description}</p>
                </div>

                <Button
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  variant="outline"
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  Preview Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
