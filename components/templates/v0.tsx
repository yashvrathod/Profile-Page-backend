"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  FiExternalLink,
  FiCalendar,
  FiMapPin,
  FiMail,
  FiUser,
} from "react-icons/fi"

interface ProfileData {
  name: string
  title: string
  bio: string
  about: string
  contact: {
    email: string
    phone: string
    location: string
    website?: string
    linkedin?: string
  }
  sections: Record<string, any[]>
}

const sectionIcons = {
  about: FiUser,
  overview: FiList,
  interests: FiLayers,
  technicalSkills: FiCopy,
  teaching: FiBookOpen,
  certifications: FiAward,
  invitedTalks: FiUsers,
  research: FiCpu,
  journals: FiPenTool,
  conferences: FiZap,
  books: FiBook,
  patents: FiBriefcase,
  industryInteraction: FiGlobe,
}

// Sample data
const profileData: ProfileData = {
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

export default function AcademicProfile() {
  const [activeSection, setActiveSection] = useState("about")

  const renderContent = (sectionKey: string, items?: any[]) => {
    if (sectionKey === "about") {
      return (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">{profileData.about}</p>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Current Position</h3>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">{profileData.sections.overview[0].currentPosition}</p>
                    <p className="text-muted-foreground">{profileData.sections.overview[0].department}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Education</h3>
                  <p className="text-muted-foreground">{profileData.sections.overview[0].education}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Experience</h3>
                  <p className="text-muted-foreground">{profileData.sections.overview[0].experience}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Research Focus</h3>
                  <p className="text-muted-foreground">
                    Flow-based pattern matching to mitigate denial-of-service attacks on communication networks
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    if (!items || items.length === 0) {
      return (
        <Card className="border-dashed border-2">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground italic">
              No {sectionKey.replace(/([A-Z])/g, " $1").toLowerCase()} added yet.
            </p>
          </CardContent>
        </Card>
      )
    }

    switch (sectionKey) {
      case "journals":
      case "research":
        return (
          <div className="grid gap-6">
            {items.map((item, index) => (
              <Card key={index} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <h4 className="text-xl font-semibold text-foreground">{item.title}</h4>
                  {item.journal && <p className="text-primary font-medium">{item.journal}</p>}
                  {item.type && <p className="text-primary font-medium">{item.type}</p>}
                  {item.authors && (
                    <p className="text-muted-foreground">
                      <span className="font-medium">Authors:</span> {item.authors}
                    </p>
                  )}
                  {item.description && <p className="text-muted-foreground leading-relaxed">{item.description}</p>}
                  {item.abstract && <p className="text-sm italic text-muted-foreground">{item.abstract}</p>}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {item.publishDate && (
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" />
                        {new Date(item.publishDate).getFullYear()}
                      </span>
                    )}
                    {item.volume && <span>Vol {item.volume}</span>}
                    {item.issue && <span>Issue {item.issue}</span>}
                  </div>
                  {item.url && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <FiExternalLink className="w-4 h-4 mr-2" /> View Publication
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )

      default:
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <Card key={index} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <h4 className="text-lg font-semibold text-foreground">{item.title || item.name}</h4>
                  {item.institution && <p className="text-primary font-medium">{item.institution}</p>}
                  {item.department && <p className="text-primary font-medium">{item.department}</p>}
                  {item.description && <p className="text-muted-foreground">{item.description}</p>}
                  <div className="flex flex-wrap gap-2">
                    {item.category && <Badge variant="outline">{item.category}</Badge>}
                    {item.level && <Badge variant="secondary">{item.level}</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
    }
  }

  const getSectionName = (key: string) => {
    const names: Record<string, string> = {
      about: "About",
      overview: "Overview",
      interests: "Interests",
      technicalSkills: "Technical Skills",
      teaching: "Teaching",
      certifications: "Certifications",
      invitedTalks: "Invited Talks",
      research: "Research",
      journals: "Journals",
      conferences: "Conferences",
      books: "Books",
      patents: "Patents",
      industryInteraction: "Industry Interaction",
    }
    return names[key] || key
  }

  const availableSections = ["about", ...Object.keys(profileData.sections)]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-slate-900">{profileData.name}</h1>
              <p className="text-xl text-slate-600">{profileData.title}</p>
              <p className="text-slate-500 max-w-2xl">{profileData.bio}</p>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2 text-slate-600">
                <FiMapPin className="w-4 h-4" />
                <span>{profileData.contact.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <FiMail className="w-4 h-4" />
                <span>{profileData.contact.email}</span>
              </div>
              <div className="flex gap-2">
                {profileData.contact.website && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={profileData.contact.website} target="_blank" rel="noreferrer">
                      <FiExternalLink className="w-4 h-4 mr-1" /> Website
                    </a>
                  </Button>
                )}
                {profileData.contact.linkedin && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={profileData.contact.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Pills */}
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {availableSections.map((sectionKey) => {
              const IconComponent = sectionIcons[sectionKey as keyof typeof sectionIcons]
              const isActive = activeSection === sectionKey

              return (
                <button
                  key={sectionKey}
                  onClick={() => setActiveSection(sectionKey)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  {getSectionName(sectionKey)}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-8">
            {sectionIcons[activeSection as keyof typeof sectionIcons] && (
              <div className="p-2 bg-primary/10 rounded-lg">
                {(() => {
                  const IconComponent = sectionIcons[activeSection as keyof typeof sectionIcons]
                  return <IconComponent className="w-6 h-6 text-primary" />
                })()}
              </div>
            )}
            <h2 className="text-3xl font-bold text-slate-900">{getSectionName(activeSection)}</h2>
          </div>

          {renderContent(activeSection, profileData.sections[activeSection])}
        </div>
      </main>
    </div>
  )
}
