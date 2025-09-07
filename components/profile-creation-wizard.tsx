"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { FiArrowLeft, FiArrowRight, FiCheck, FiUser, FiEdit, FiEye } from "react-icons/fi"
import { TemplateMinimalist } from "./templates/template-minimalist"
import  TemplateAcademic from "./templates/template-academic"
import { TemplateVibrant } from "./templates/template-vibrant"
import { createUser } from "@/lib/user-service"

interface ProfileData {
  name: string
  username: string
  title: string
  bio: string
  email: string
  template: "minimalist" | "academic" | "vibrant"
}

const profileD = {
  name: "Dr. Anup Ingle",
  title: "Assistant Professor, Department of Electronics & Telecommunication Engineering",
  bio: "Passionate researcher and educator specializing in communication networks and security.",
  about:
    "Dr. Anup Ingle is a dedicated academic professional with over 17 years of teaching experience and 1+ year of industry experience. His research focuses on flow-based pattern matching to mitigate denial-of-service attacks on communication networks. He has published numerous papers in reputed journals and conferences, and actively contributes to the academic community through various roles and responsibilities.",
  contact: {
    email: "anup.ingle@university.edu",
    phone: "+91-9876543210",
    location: "Mumbai, Maharashtra, India",
    website: "https://anupingle.com",
    linkedin: "https://linkedin.com/in/anupingle",
  },
  sections: {
    overview: [
      {
        currentPosition: "Assistant Professor",
        department: "Electronics & Telecommunication Engineering",
        experience: "17+ years teaching experience, 1+ year industry experience",
        education: "Ph.D. in Electronics & Communication Engineering",
      },
    ],
    interests: [
      { name: "Communication Networks", category: "Research" },
      { name: "Network Security", category: "Research" },
      { name: "Pattern Matching", category: "Research" },
      { name: "Machine Learning", category: "Technology" },
    ],
    technicalSkills: [
      { name: "MATLAB", level: "Expert", category: "Software" },
      { name: "Python", level: "Advanced", category: "Programming" },
      { name: "Network Simulation", level: "Expert", category: "Tools" },
      { name: "Research Methodology", level: "Expert", category: "Academic" },
    ],
    research: [
      {
        title: "Flow-based Pattern Matching for DoS Attack Mitigation",
        type: "Ongoing Research",
        description:
          "Developing novel approaches to detect and mitigate denial-of-service attacks using flow-based pattern matching techniques.",
        publishDate: "2024-01-01",
      },
    ],
    journals: [
      {
        title: "Advanced Pattern Matching Techniques in Network Security",
        journal: "IEEE Transactions on Network Security",
        authors: "A. Ingle, et al.",
        publishDate: "2023-06-15",
        volume: "18",
        issue: "3",
        url: "https://example.com/paper1",
      },
    ],
    teaching: [
      {
        name: "Digital Communication",
        institution: "University",
        description: "Undergraduate course covering digital modulation techniques",
      },
      {
        name: "Network Security",
        institution: "University",
        description: "Graduate course on network security principles",
      },
    ],
    certifications: [
      { name: "Cisco Certified Network Professional", institution: "Cisco", category: "Networking" },
      { name: "Machine Learning Specialization", institution: "Coursera", category: "AI/ML" },
    ],
  },
}
const templates = [
  {
    id: "minimalist" as const,
    name: "Modern Minimalist",
    description: "Clean, simple design with focus on content",
    component: TemplateMinimalist,
    preview: "template-minimalist",
  },
  {
    id: "academic" as const,
    name: "Professional Academic",
    description: "Structured layout perfect for academic profiles",
    component: TemplateAcademic,
    preview: "template-academic",
  },
  {
    id: "vibrant" as const,
    name: "Creative Vibrant",
    description: "Colorful and dynamic design with personality",
    component: TemplateVibrant,
    preview: "template-vibrant",
  },
]

export function ProfileCreationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    username: "",
    title: "",
    bio: "",
    email: "",
    template: "minimalist",
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const updateProfileData = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return profileData.name && profileData.username && profileData.title
      case 2:
        return profileData.template
      case 3:
        return true
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    if (!isStepValid()) return

    setIsCreating(true)
    try {
      const user = await createUser({
        name: profileData.name,
        username: profileData.username,
        email: profileData.email,
        template: profileData.template,
        title: profileData.title,
        bio: profileData.bio,
      })

      // Redirect to the new profile page
      window.location.href = `/${profileData.username}`
    } catch (error) {
      console.error("Error creating profile:", error)
      alert("Error creating profile. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  const sampleData = {
    name: profileData.name || "Your Name",
    title: profileData.title || "Your Professional Title",
    bio:
      profileData.bio ||
      "Your professional bio will appear here. Tell the world about your expertise and achievements.",
    sections: {
      overview:
        profileData.title || profileData.bio
          ? [
              {
                title: profileData.title,
                bio: profileData.bio,
                description: "Sample description of your professional background",
              },
            ]
          : [],
      research: [],
      technicalSkills: [],
      journals: [],
      teaching: [],
      certifications: [],
      invitedTalks: [],
      conferences: [],
      books: [],
      patents: [],
      industryInteraction: [],
      interests: [],
    },
  }
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create Your Profile</h1>
        <p className="text-muted-foreground">Follow these steps to set up your professional profile</p>
        <Progress value={progress} className="w-full max-w-md mx-auto" />
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiUser className="w-5 h-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Tell us about yourself and choose your username</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Dr. Sarah Johnson"
                  value={profileData.name}
                  onChange={(e) => updateProfileData("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                    yoursite.com/
                  </span>
                  <Input
                    id="username"
                    placeholder="sarah-johnson"
                    className="rounded-l-none"
                    value={profileData.username}
                    onChange={(e) =>
                      updateProfileData("username", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title *</Label>
              <Input
                id="title"
                placeholder="Professor of Computer Science"
                value={profileData.title}
                onChange={(e) => updateProfileData("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="sarah@university.edu"
                value={profileData.email}
                onChange={(e) => updateProfileData("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell the world about your expertise, research interests, and professional background..."
                rows={4}
                value={profileData.bio}
                onChange={(e) => updateProfileData("bio", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Template Selection */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiEdit className="w-5 h-5" />
              Choose Your Template
            </CardTitle>
            <CardDescription>Select a design that best represents your professional style</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`cursor-pointer rounded-lg border-2 transition-all ${
                    profileData.template === template.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => updateProfileData("template", template.id)}
                >
                  <div className="p-4 space-y-4">
                    <div className={`${template.preview} h-32 rounded border overflow-hidden relative`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <div className="text-center space-y-1">
                          <div className="w-8 h-8 bg-primary rounded-full mx-auto flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {profileData.name
                                ? profileData.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                : "YN"}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="h-1 bg-primary/60 rounded w-12 mx-auto"></div>
                            <div className="h-1 bg-muted rounded w-8 mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    {profileData.template === template.id && (
                      <div className="flex items-center gap-2 text-primary">
                        <FiCheck className="w-4 h-4" />
                        <span className="text-sm font-medium">Selected</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Preview */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiEye className="w-5 h-5" />
              Preview Your Profile
            </CardTitle>
            <CardDescription>
              This is how your profile will look. You can add content to each section after creation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              {profileData.template === "minimalist" && <TemplateMinimalist data={sampleData} />}
              {profileData.template === "academic" && <TemplateAcademic data={sampleData}/>}
              {profileData.template === "vibrant" && <TemplateVibrant data={sampleData} />}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2 bg-transparent"
        >
          <FiArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button onClick={nextStep} disabled={!isStepValid()} className="flex items-center gap-2">
            Next
            <FiArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!isStepValid() || isCreating} className="flex items-center gap-2">
            <FiCheck className="w-4 h-4" />
            {isCreating ? "Creating..." : "Create Profile"}
          </Button>
        )}
      </div>
    </div>
  )
}
