import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  FiMapPin,
  FiCalendar,
} from "react-icons/fi"

interface ProfileData {
  name: string
  title: string
  bio: string
  sections: Record<string, any[]>
}

interface TemplateMinimalistProps {
  data: ProfileData
}

const sectionIcons = {
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

export function TemplateMinimalist({ data }: TemplateMinimalistProps) {
  const overviewData = data.sections.overview?.[0] || {}

  const renderSectionContent = (sectionKey: string, items: any[]) => {
    if (items.length === 0) {
      return (
        <p className="text-muted-foreground italic">
          No {sectionKey.replace(/([A-Z])/g, " $1").toLowerCase()} added yet.
        </p>
      )
    }

    switch (sectionKey) {
      case "overview":
        const overview = items[0]
        return (
          <div className="space-y-4">
            {overview.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <FiMapPin className="w-4 h-4" />
                <span>{overview.location}</span>
              </div>
            )}
            {overview.description && <p className="text-foreground">{overview.description}</p>}
            <div className="flex flex-wrap gap-3">
              {overview.website && (
                <Button variant="outline" size="sm" asChild className="bg-transparent">
                  <a href={overview.website} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink className="w-4 h-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
              {overview.linkedin && (
                <Button variant="outline" size="sm" asChild className="bg-transparent">
                  <a href={overview.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
              )}
              {overview.github && (
                <Button variant="outline" size="sm" asChild className="bg-transparent">
                  <a href={overview.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        )

      case "technicalSkills":
  return (
    <div>hey</div>
  )

      case "research":
        return (
          <div className="space-y-4">
            {items.map((project, index) => (
              <div key={index} className="border-l-2 border-primary/20 pl-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-foreground">{project.title}</h4>
                  {project.status && <Badge variant="outline">{project.status}</Badge>}
                </div>
                {project.type && <p className="text-sm font-medium text-primary">{project.type}</p>}
                {project.description && <p className="text-sm text-muted-foreground">{project.description}</p>}
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {project.startDate && (
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-3 h-3" />
                      {new Date(project.startDate).toLocaleDateString()}
                    </span>
                  )}
                  {project.collaborators && <span>Collaborators: {project.collaborators}</span>}
                </div>
                {project.url && (
                  <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      <FiExternalLink className="w-3 h-3" />
                      View Project
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        )

      case "journals":
        return (
          <div className="space-y-4">
            {items.map((publication, index) => (
              <div key={index} className="border-l-2 border-primary/20 pl-4 space-y-2">
                <h4 className="font-semibold text-foreground">{publication.title}</h4>
                {publication.journal && <p className="text-sm font-medium text-primary">{publication.journal}</p>}
                {publication.authors && <p className="text-sm text-muted-foreground">Authors: {publication.authors}</p>}
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {publication.publishDate && <span>{new Date(publication.publishDate).getFullYear()}</span>}
                  {publication.volume && <span>Vol. {publication.volume}</span>}
                  {publication.issue && <span>Issue {publication.issue}</span>}
                  {publication.pages && <span>pp. {publication.pages}</span>}
                </div>
                {publication.doi && <p className="text-xs text-muted-foreground">DOI: {publication.doi}</p>}
                {publication.url && (
                  <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <FiExternalLink className="w-3 h-3" />
                      View Publication
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="border-l-2 border-primary/20 pl-4 space-y-2">
                <h4 className="font-semibold text-foreground">{item.title || item.name || "Untitled"}</h4>
                {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                {item.category && (
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                )}
                {item.date && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <FiCalendar className="w-3 h-3" />
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="template-minimalist min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 py-12">
          <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">
              {data.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground">{data.name}</h1>
          <p className="text-xl text-muted-foreground">{data.title}</p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">{data.bio}</p>
        </div>

        {/* Sections Grid */}
        <div className="grid gap-6">
          {Object.entries(data.sections).map(([sectionKey, items]) => {
            const IconComponent = sectionIcons[sectionKey as keyof typeof sectionIcons]
            const sectionName = sectionKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())

            return (
              <Card key={sectionKey} className="border-border/50 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-primary">
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                    {sectionName}
                  </CardTitle>
                </CardHeader>
                <CardContent>{renderSectionContent(sectionKey, items)}</CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
