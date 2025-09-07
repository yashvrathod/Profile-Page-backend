import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "react-icons/fi"

interface ProfileData {
  name: string
  title: string
  bio: string
  sections: Record<string, any[]>
}

interface TemplateVibrantProps {
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

const vibrantColors = [
  "bg-red-100 text-red-800 border-red-200",
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-green-100 text-green-800 border-green-200",
  "bg-purple-100 text-purple-800 border-purple-200",
  "bg-pink-100 text-pink-800 border-pink-200",
  "bg-indigo-100 text-indigo-800 border-indigo-200",
]

export function TemplateVibrant({ data }: TemplateVibrantProps) {
  return (
    <div className="template-vibrant min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center space-y-6 py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-3xl"></div>
          <div className="relative z-10">
            <div className="w-40 h-40 bg-gradient-to-br from-primary to-accent rounded-full mx-auto flex items-center justify-center shadow-lg">
              <span className="text-5xl font-bold text-white">
                {data.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mt-6">{data.name}</h1>
            <p className="text-2xl text-primary font-semibold">{data.title}</p>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-4">{data.bio}</p>
          </div>
        </div>

        {/* Sections Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {Object.entries(data.sections).map(([sectionKey, items], sectionIndex) => {
            const IconComponent = sectionIcons[sectionKey as keyof typeof sectionIcons]
            const sectionName = sectionKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
            const colorClass = vibrantColors[sectionIndex % vibrantColors.length]

            return (
              <Card
                key={sectionKey}
                className="break-inside-avoid mb-6 shadow-lg border-2 hover:shadow-xl transition-shadow"
              >
                <CardHeader className={`${colorClass} rounded-t-lg`}>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                    {sectionName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {items.length > 0 ? (
                    <div className="space-y-4">
                      {items.map((item, index) => (
                        <div key={index} className="space-y-3 p-4 bg-card/50 rounded-lg border">
                          <h4 className="font-bold text-foreground text-lg">{item.title || item.name || "Untitled"}</h4>
                          {item.description && (
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {item.category && (
                              <Badge className="bg-primary text-primary-foreground">{item.category}</Badge>
                            )}
                            {item.level && (
                              <Badge variant="outline" className="border-accent text-accent-foreground">
                                {item.level}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center mb-4">
                        {IconComponent && <IconComponent className="w-8 h-8 text-muted-foreground" />}
                      </div>
                      <p className="text-muted-foreground italic">Ready to add your {sectionName.toLowerCase()}!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
