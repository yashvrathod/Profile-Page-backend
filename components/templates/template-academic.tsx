"use client"

import { useState, useEffect } from "react"
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
  FiUser,
  FiMail,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiMic,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi"
import Image from "next/image"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { ResearchCards } from "../section-design/research"
import { ProfileHero } from "../Profile-hero"
import { AboutSection } from "../about-hero"

interface ProfileData {
  id: string
  name: string
  headline?: string
  bio?: string
  profileImage?: string
  primaryButtonLabel?: string
  primaryButtonLink?: string
  secondaryButtonLabel?: string
  secondaryButtonLink?: string
  gradientFrom?: string
  gradientVia?: string
  gradientTo?: string
  sections: Record<string, any[]>
}
interface TemplateAcademicProps {
  data?: ProfileData
}

// Mock data for demonstration
const mockData: ProfileData = {
  name: "Dr. Sarah Chen",
  title: "Professor of Computer Science & AI Research Director",
  bio: "Leading researcher in machine learning and artificial intelligence with focus on ethical AI systems and neural network optimization. Published over 100 papers in top-tier conferences.",
  sections: {
    overview: [{
      currentPosition: "Professor of Computer Science, Stanford University",
      education: "Ph.D. Computer Science, MIT (2010)",
      experience: "15+ years in academia and industry",
    }],
    technicalSkills: [
      { category: "Machine Learning", skills: ["Deep Learning", "Neural Networks", "Computer Vision", "NLP"] },
      { category: "Programming", skills: ["Python", "TensorFlow", "PyTorch", "C++", "CUDA"] },
      { category: "Research", skills: ["Statistical Analysis", "Data Mining", "Algorithm Design"] }
    ],
    research: [
      {
        title: "Ethical Constraints in Large Language Models: A Framework for Responsible AI Development",
        journal: "Nature Machine Intelligence",
        authors: "S. Chen, M. Johnson, K. Liu, R. Patel",
        abstract: "This paper presents a comprehensive framework for incorporating ethical constraints directly into the training process of large language models, ensuring responsible AI behavior from the ground up.",
        keywords: ["AI Ethics", "Large Language Models", "Responsible AI"],
        publishDate: "2024-03-15",
        url: "#"
      },
      {
        title: "Quantum-Enhanced Neural Networks for Climate Modeling",
        journal: "Science Advances",
        authors: "S. Chen, A. Martinez, J. Kim",
        abstract: "We demonstrate how quantum computing principles can enhance neural network architectures for more accurate climate prediction models.",
        keywords: ["Quantum Computing", "Climate Science", "Neural Networks"],
        publishDate: "2023-11-20",
        url: "#"
      }
    ],
    teaching: [
      { title: "Introduction to Machine Learning", institution: "Stanford University", year: "2020-Present", description: "Undergraduate course covering fundamental ML concepts" },
      { title: "Advanced Deep Learning", institution: "Stanford University", year: "2019-Present", description: "Graduate-level course on cutting-edge deep learning techniques" }
    ],
    journals: [
      {
        title: "AI-Driven Healthcare: Transforming Medical Diagnosis",
        journal: "IEEE Transactions on Medical Imaging",
        authors: "S. Chen, D. Wang, L. Rodriguez",
        abstract: "Comprehensive study on implementing AI systems in healthcare diagnostics with emphasis on accuracy and ethical considerations.",
        keywords: ["Healthcare AI", "Medical Imaging", "Diagnostics"],
        publishDate: "2024-01-10",
        url: "#"
      }
    ],
    certifications: [
      { title: "AWS Machine Learning Specialty", institution: "Amazon Web Services", year: "2023", description: "Advanced certification in cloud-based ML solutions" },
      { title: "Google Cloud Professional ML Engineer", institution: "Google Cloud", year: "2022", description: "Professional-level ML engineering certification" }
    ]
  }
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

export default function TemplateAcademic({ data = mockData }: TemplateAcademicProps) {
  const [activeSection, setActiveSection] = useState("overview")
  const [isVisible, setIsVisible] = useState(false);
  const [modalSkill, setModalSkill] = useState<null | typeof items[0]>(null);
   const [selected, setSelected] = useState<Certification | null>(null)
    // const getRandomGradient = () => gradientClasses[Math.floor(Math.random() * gradientClasses.length)]


   const gradientClasses = [
  "bg-gradient-to-br from-pink-200 via-pink-100 to-pink-200 animate-gradient-x",
  "bg-gradient-to-br from-indigo-200 via-purple-200 to-indigo-200 animate-gradient-x",
  "bg-gradient-to-br from-green-200 via-lime-100 to-green-200 animate-gradient-x",
  "bg-gradient-to-br from-teal-200 via-cyan-100 to-teal-200 animate-gradient-x",
]

  const getRandomGradient = () => gradientColors[Math.floor(Math.random() * gradientColors.length)]
  
const gradientColors = [
  { from: "from-teal-400", via: "via-cyan-300/40", to: "to-cyan-50/40", text: "text-teal-800", icon: "from-teal-400 to-cyan-500", year: "bg-teal-400 text-teal-600" },
  { from: "from-pink-400", via: "via-rose-200/40", to: "to-pink-50/40", text: "text-pink-800", icon: "from-pink-400 to-rose-500", year: "bg-pink-400 text-pink-600" },
  { from: "from-indigo-400", via: "via-purple-200/40", to: "to-indigo-50/40", text: "text-indigo-800", icon: "from-indigo-400 to-purple-500", year: "bg-indigo-400 text-indigo-600" },
  { from: "from-green-400", via: "via-lime-200/40", to: "to-green-50/40", text: "text-green-800", icon: "from-green-400 to-lime-500", year: "bg-green-400 text-green-600" },
]


  useEffect(() => {
    setIsVisible(true)
  }, [])

  const renderContent = (sectionKey: string, items?: any[]) => {
    if (sectionKey === "about") {
      return (  
        <div>
          <Card className="border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40">
          <CardContent className="p-12">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Avatar with subtle gradient */}
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {data.name.charAt(0)}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                    {data.name}
                  </h2>
                  <p className="text-2xl text-blue-600 font-medium">{data.title}</p>
                  <p className="text-gray-700 max-w-3xl leading-relaxed text-lg">{data.bio}</p>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 justify-center lg:justify-start">
                  {[
                    { icon: FiMail, color: "hover:bg-red-50 text-red-600 border-red-200", href: "#" },
                    { icon: FiLinkedin, color: "hover:bg-blue-50 text-blue-600 border-blue-200", href: "#" },
                    { icon: FiTwitter, color: "hover:bg-sky-50 text-sky-600 border-sky-200", href: "#" },
                    { icon: FiGithub, color: "hover:bg-gray-50 text-gray-700 border-gray-300", href: "#" },
                  ].map(({ icon: Icon, color, href }, i) => (
                    <Button
                      key={i}
                      size="lg"
                      variant="outline"
                      asChild
                      className={"p-3 ${color} transition-all duration-300 hover:scale-110"}
                    >
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        <Icon className="w-6 h-6" />
                      </a>
                    </Button>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  {[
                    { label: "Publications", value: "120+" },
                    { label: "Citations", value: "2.5K+" },
                    { label: "H-Index", value: "32" },
                    { label: "Projects", value: "45+" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300">
                      <div className="text-2xl font-bold text-blue-700">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      )
    }

    if (!items || items.length === 0) {
      return (
        <Card className="border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 hover:border-gray-300 transition-all duration-300">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-100 to-slate-100 flex items-center justify-center">
              <FiLayers className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">
              No {sectionKey.replace(/([A-Z])/g, " $1").toLowerCase()} added yet.
            </p>
            <p className="text-gray-400 text-sm mt-2">Content will appear here when available</p>
          </CardContent>
        </Card>
      )
    }

    switch (sectionKey) {


case "technicalSkills":

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((skill, index) => (
          <div
            key={index}
            className="group relative border border-gray-200 rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            onClick={() => setModalSkill(skill)}
          >
            {/* Top bar with Level */}
            {skill.level && (
              <div className="absolute top-4 right-4">
                <Badge
                  variant="secondary"
                  className="text-xs px-3 py-1 font-medium bg-gradient-to-r from-indigo-400 to-purple-500 text-white shadow-sm"
                >
                  {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                </Badge>
              </div>
            )}

            {/* Skill Name */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-indigo-600 transition-colors duration-300">
              {skill.name}
            </h3>
<p className="text-gray-700 text-sm">
  {skill.description.length > 100
    ? skill.description.slice(0, 100) + "..."
    : skill.description}
</p>


            {/* Category Badge */}
            {skill.category && (
              <Badge
                variant="outline"
                className="text-xs self-start px-3 py-1 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white font-medium"
              >
                {skill.category
                  .split("-")
                  .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              </Badge>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative shadow-2xl">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-lg"
              onClick={() => setModalSkill(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{modalSkill.name}</h2>
            {modalSkill.level && (
              <Badge className="text-xs px-3 py-1 mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-medium">
                {modalSkill.level.charAt(0).toUpperCase() + modalSkill.level.slice(1)}
              </Badge>
            )}
            {modalSkill.category && (
              <Badge className="text-xs px-3 py-1 mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white font-medium">
                {modalSkill.category
                  .split("-")
                  .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              </Badge>
            )}
            <p className="text-gray-700 text-sm">{modalSkill.description}</p>
          </div>
        </div>
      )}
    </>
  );


      case "research":
        return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item, idx) => (
        <Card
          key={idx}
          className={`group relative overflow-hidden border-0 shadow-lg rounded-2xl ${getRandomGradient()} hover:shadow-2xl hover:scale-[1.03] transition-all duration-500`}
        >
          <CardContent className="p-6 space-y-4">
            {/* Header */}
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-gray-800 group-hover:text-gray-700 transition-colors">
                {item.title}
              </h4>
              <div className="flex flex-wrap gap-3 text-gray-700 text-sm">
                {item.type && <span className="font-medium">Type: {item.type}</span>}
                {item.status && <span className="font-medium">Status: {item.status}</span>}
              </div>
            </div>

            {/* Dates */}
            <div className="flex flex-wrap gap-4 text-gray-700 text-sm">
              {item.startDate && (
                <div className="flex items-center gap-1">
                  <FiCalendar className="w-4 h-4" />
                  <span>Start: {new Date(item.startDate).toLocaleDateString()}</span>
                </div>
              )}
              {item.endDate && (
                <div className="flex items-center gap-1">
                  <FiCalendar className="w-4 h-4" />
                  <span>End: {new Date(item.endDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Collaborators & Funding */}
            <div className="flex flex-wrap gap-4 text-gray-700 text-sm">
              {item.collaborators && (
                <div className="flex items-center gap-1">
                  <FiUsers className="w-4 h-4" />
                  <span>{item.collaborators}</span>
                </div>
              )}
              {item.funding && <span>Funding: {item.funding}</span>}
            </div>

            {/* URL */}
            {item.url && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <FiExternalLink className="w-4 h-4 mr-1" />
                  View Research
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

      case "journals":
        return (
          <div className="grid gap-8">
            {items.map((item, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden border border-amber-100 shadow-lg bg-gradient-to-br from-white via-amber-50/30 to-orange-50/40 hover:shadow-xl hover:border-amber-200 transition-all duration-500"
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 group-hover:w-2 transition-all duration-300"></div>
                
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md flex-shrink-0">
                      <FiPenTool className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <h4 className="text-2xl font-bold text-amber-800 group-hover:text-amber-700 transition-colors">
                        {item.title}
                      </h4>
                      {item.journal && (
                        <p className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                          {item.journal}
                        </p>
                      )}
                      {item.authors && (
                        <p className="text-gray-600">
                          <span className="font-semibold text-gray-700">Authors:</span> {item.authors}
                        </p>
                      )}
                    </div>
                  </div>

                  {item.abstract && (
                    <div className="relative p-6 rounded-xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border border-amber-100">
                      <p className="text-gray-700 italic leading-relaxed">{item.abstract}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    {item.keywords?.map((kw: string, idx: number) => (
                      <Badge 
                        key={idx} 
                        className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200 hover:from-amber-200 hover:to-orange-200 transition-all duration-300"
                      >
                        {kw}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                    <div className="flex items-center gap-3 text-gray-500">
                      <FiCalendar className="w-5 h-5" />
                      <span className="font-medium">
                        {item.publishDate && new Date(item.publishDate).getFullYear()}
                      </span>
                    </div>
                    {item.url && (
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                        asChild
                      >
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <FiExternalLink className="w-5 h-5 mr-2" /> 
                          Read Article
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
        case "teaching":
       
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {items.map((item, index) => {
        const gradient = getRandomGradient()
        return (
          <Card
            key={index}
            className={`group relative overflow-hidden border-0 rounded-2xl shadow-lg bg-gradient-to-br ${gradient.from} ${gradient.via} ${gradient.to} hover:shadow-2xl hover:scale-[1.03] transition-all duration-500`}
          >
            {/* Top ribbon for year */}
            {item.year && (
              <div className={`absolute top-0 left-0 px-3 py-1 rounded-br-xl ${gradient.year} font-semibold text-sm`}>
                {item.year}
              </div>
            )}

            <CardContent className="p-8 space-y-4">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient.icon} flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                  <FiBookOpen className="w-6 h-6 text-white" />
                </div>

                {/* Title + Institution */}
                <div className="flex-1">
                  <h4 className={`text-2xl font-bold ${gradient.text} group-hover:text-opacity-90 transition-colors`}>
                    {item.title || item.name}
                  </h4>
                  {item.institution && (
                    <p className="text-lg font-medium text-gray-700 mt-1">{item.institution}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
      case "certifications":

  return (  
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item, idx) => (
        <Card
          key={idx}
          className={`group relative overflow-hidden border-0 shadow-lg rounded-2xl ${getRandomGradient()} hover:shadow-2xl hover:scale-[1.03] transition-all duration-500`}
        >
          <CardContent className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                <FiAward className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
                {item.issuer && <p className="text-gray-600">{item.issuer}</p>}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              {item.issueDate && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Issue Date</p>
                  <p>{new Date(item.issueDate).toLocaleDateString()}</p>
                </div>
              )}
              {item.expiryDate && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                  <p>{new Date(item.expiryDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>

            {/* Credential ID */}
            {item.credentialId && (
              <div>
                <p className="text-sm font-medium text-gray-500">Credential ID</p>
                <p>{item.credentialId}</p>
              </div>
            )}

            {/* Verification URL */}
            {item.url && (
              <div>
                <p className="text-sm font-medium text-gray-500">Verification URL</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline break-all"
                >
                  {item.url}
                </a>
              </div>
            )}

            {/* Year */}
            {item.year && (
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 animate-pulse"></div>
                <span>Certified {item.year}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

      case "invitedTalks":
        return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item, idx) => (
        <Card
          key={idx}
          className={`group relative overflow-hidden border-0 shadow-lg rounded-2xl ${getRandomGradient()} hover:shadow-2xl hover:scale-[1.03] transition-all duration-500`}
        >
          <CardContent className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                <FiMic className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800">{item.title}</h4>
                {item.event && <p className="text-gray-600">{item.event}</p>}
              </div>
            </div>

            {/* Date & Location */}
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              {item.date && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{new Date(item.date).toLocaleDateString()}</p>
                </div>
              )}
              {item.location && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p>{item.location}</p>
                </div>
              )}
            </div>

            {/* Audience */}
            {item.audience && (
              <div>
                <p className="text-sm font-medium text-gray-500">Audience</p>
                <p>{item.audience}</p>
              </div>
            )}

            {/* Reference URL */}
            {item.url && (
              <div>
                <p className="text-sm font-medium text-gray-500">Reference URL</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline break-all"
                >
                  {item.url}
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
  case "conferences":
  return (
    <div className="flex flex-col gap-6">
      {items.map((item, index) => (
        <Card
          key={index}
          className="group border border-indigo-200 shadow-md hover:shadow-xl transition-all duration-300"
        >
          <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* LEFT SECTION */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-bold text-indigo-800">{item.title}</h4>
              {item.conference && <p className="text-indigo-600 font-medium">{item.conference}</p>}
              <div className="flex items-center gap-2 text-gray-500">
                {item.location && <><FiMapPin className="w-4 h-4" /> {item.location}</>}
              </div>
              {item.abstract && (
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{item.abstract}</p>
              )}
            </div>

            {/* RIGHT SECTION */}
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-3">
                {item.date && (
                  <span className="text-gray-700 font-medium">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                )}
                {item.type && (
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm">
                    {item.type}
                  </span>
                )}
              </div>
              {item.url && (
                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  asChild
                >
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink className="mr-2" /> View
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  case "patents":
  return (
    <div className="space-y-8 border-l-2 border-blue-200 pl-4">
      {items.map((item, index) => (
        <div key={index} className="relative pl-6">
          {/* Timeline Dot */}
          <div className="absolute left-[-13px] top-3 w-5 h-5 rounded-full bg-blue-500 shadow"></div>

          <Card className="border border-blue-200 shadow-md hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 space-y-4">
              {/* Title & Status */}
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-blue-800">{item.title}</h4>
                {item.status && (
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      item.status === "Granted"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Expired"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {item.status}
                  </span>
                )}
              </div>

              {/* Patent Info */}
              <div className="text-sm text-gray-600 space-y-1">
                {item.patentNumber && <p>Patent #: <span className="font-medium">{item.patentNumber}</span></p>}
                {item.inventors && <p>Inventors: {item.inventors}</p>}
                {item.assignee && <p>Assignee: {item.assignee}</p>}
              </div>

              {/* Dates */}
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                {item.filingDate && (
                  <div className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    Filed: {new Date(item.filingDate).toLocaleDateString()}
                  </div>
                )}
                {item.grantDate && (
                  <div className="flex items-center gap-1">
                    <FiCheckCircle className="w-4 h-4" />
                    Granted: {new Date(item.grantDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
              )}

              {/* URL */}
              {item.url && (
                <div className="text-right">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    asChild
                  >
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <FiExternalLink className="mr-2" /> View Patent
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )



 case "books":
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card
          key={index}
          className="group border border-emerald-200 hover:shadow-md transition-all duration-300"
        >
          <CardContent className="p-5 space-y-3">
            {/* TOP ROW */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-emerald-800">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.authors}</p>
              </div>
              <div className="text-right space-y-1">
                {item.publishDate && (
                  <span className="block text-gray-500 text-sm">
                    {new Date(item.publishDate).getFullYear()}
                  </span>
                )}
                {item.pages && (
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                    {item.pages} pages
                  </span>
                )}
              </div>
            </div>

            {/* SECOND ROW */}
            <div className="text-sm text-gray-500 flex flex-wrap gap-3">
              {item.publisher && <span>📚 {item.publisher}</span>}
              {item.isbn && <span>🔖 ISBN: {item.isbn}</span>}
            </div>

            {/* DESCRIPTION */}
            {item.description && (
              <details className="mt-2">
                <summary className="cursor-pointer text-emerald-600 text-sm">
                  Show Description
                </summary>
                <p className="text-gray-700 text-sm mt-1">{item.description}</p>
              </details>
            )}

            {/* FOOTER */}
            {item.url && (
              <div className="text-right">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    View Book
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )


  case "industryInteraction":
  return (
    <div className="grid gap-6">
      {items.map((item, index) => (
        <Card
          key={index}
          className="group border border-orange-200 shadow hover:shadow-lg transition-all duration-300"
        >
          <CardContent className="p-6 space-y-4">
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-lg font-semibold text-orange-800">{item.title}</h4>
                {item.company && (
                  <p className="text-gray-600 text-sm">
                    <FiBriefcase className="inline w-4 h-4 mr-1" />
                    {item.company}
                  </p>
                )}
                {item.role && (
                  <p className="text-gray-600 text-sm">{item.role}</p>
                )}
              </div>

              {/* Right side */}
              <div className="text-right space-y-1">
                {item.type && (
                  <span className="px-2 py-1 text-xs rounded bg-orange-100 text-orange-700">
                    {item.type}
                  </span>
                )}
                <p className="text-gray-500 text-xs">
                  {item.startDate && new Date(item.startDate).toLocaleDateString()}
                  {item.endDate && ` - ${new Date(item.endDate).toLocaleDateString()}`}
                </p>
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <details className="text-gray-700 text-sm">
                <summary className="cursor-pointer text-orange-600">Show Details</summary>
                <p className="mt-2">{item.description}</p>
              </details>
            )}

            {/* URL */}
            {item.url && (
              <div className="text-right">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white" asChild>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink className="mr-2" /> Learn More
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )


      default:
        return (
          <div className="grid md:grid-cols-2 gap-8">
            {items.map((item, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden border border-gray-100 shadow-md bg-gradient-to-br from-white via-gray-50/50 to-slate-50/50 hover:shadow-lg hover:border-gray-200 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-gray-400 to-slate-500 group-hover:w-2 transition-all duration-300"></div>
                
                <CardContent className="p-8 space-y-4">
                  <h4 className="text-xl font-bold text-gray-800 group-hover:text-gray-700 transition-colors">
                    {item.title || item.name}
                  </h4>
                  {item.institution && (
                    <p className="text-lg font-semibold text-gray-600">{item.institution}</p>
                  )}
                  {item.description && (
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  )}
                  {item.year && (
                    <p className="text-sm text-gray-500 font-medium">{item.year}</p>
                  )}
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

  const availableSections = [ ...Object.keys(data.sections)]

  return (
    <div className={"min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-slate-50/50 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}"}>
      {/* Clean Header */}
      <ProfileHero data={data}/>
    {/* <AboutSection data={data}/> */}
      {/* <section className="relative bg-gradient-to-b from-yellow-50 via-pink-70 to-yellow-80 py-24">
  <div className="container mx-auto px-6 lg:px-20 flex flex-col items-center gap-12">

    <div className="text-center max-w-3xl space-y-4">
      <h2 className="text-4xl font-bold text-gray-900">About Me</h2>
      <p className="text-gray-700 text-lg leading-relaxed">
        I am a passionate web developer and designer dedicated to crafting modern and efficient web experiences. 
        With expertise in Next.js, Tailwind CSS, TypeScript, and UI/UX design, I create applications that are both functional and visually appealing.
      </p>
    </div>

    <div className="flex flex-wrap justify-center gap-4">
      {[
        "Web Development",
        "UI/UX Design",
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "React.js",
        "API Integration",
        "Responsive Design"
      ].map((skill) => (
        <span 
          key={skill} 
          className="bg-white/60 backdrop-blur-md px-6 py-2 rounded-full text-gray-800 shadow-md hover:scale-105 transform transition duration-300"
        >
          {skill}
        </span>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
      
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="text-purple-500 text-3xl mb-4">
          🎓
        </div>
        <h3 className="font-semibold text-lg mb-2">Ph.D. in Web Technologies</h3>
        <p className="text-gray-600 text-sm">Awarded by Top University, specializing in modern web development and design.</p>
      </div>

      <div className="bg-pink-100 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="text-pink-500 text-3xl mb-4">
          💻
        </div>
        <h3 className="font-semibold text-lg mb-2">Full-Stack Developer</h3>
        <p className="text-gray-600 text-sm">Creating modern web apps with Next.js, Tailwind CSS, and TypeScript.</p>
      </div>

      <div className="bg-yellow-100 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="text-yellow-500 text-3xl mb-4">
          🌟
        </div>
        <h3 className="font-semibold text-lg mb-2">5+ Years Experience</h3>
        <p className="text-gray-600 text-sm">Building responsive and scalable web applications across diverse projects.</p>
      </div>

    </div>

  </div>
  <section className="bg-gradient-to-b from-green-50 via-white to-green-50 py-20">
  <div className="container mx-auto px-6 lg:px-20">

 
    <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
      Achievements & Impact
    </h2>

 
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
      
      <div className="bg-cyan-50 border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
        <h3 className="text-3xl font-bold text-cyan-600">80+</h3>
        <p className="text-gray-700 mt-2">Publications</p>
      </div>

      <div className="bg-amber-50 border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
        <h3 className="text-3xl font-bold text-amber-600">18+</h3>
        <p className="text-gray-700 mt-2">Years Experience</p>
      </div>

      <div className="bg-purple-50 border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
        <h3 className="text-3xl font-bold text-purple-600">200+</h3>
        <p className="text-gray-700 mt-2">Students Mentored</p>
      </div>

      <div className="bg-pink-50 border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
        <h3 className="text-3xl font-bold text-pink-600">50+</h3>
        <p className="text-gray-700 mt-2">Projects Guided</p>
      </div>

    </div>
  </div>
</section>

<section className="bg-gradient-to-b from-green-50 via-white to-green-50 py-20">
  <div className="container mx-auto px-6 lg:px-20 text-center">

   

   
    <div className="flex flex-wrap justify-center gap-6">
      
   
      <a
        href="mailto:yourname@email.com"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-medium shadow-md hover:bg-emerald-700 transition"
      >
        📧 Email
      </a>

 
      <a
        href="tel:+919876543210"
        className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-400 text-gray-700 font-medium shadow-sm hover:bg-gray-100 transition"
      >
        📞 Call
      </a>

 
      <a
        href="https://www.linkedin.com/in/yourprofile/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-200 text-gray-800 font-medium shadow-sm hover:bg-gray-300 transition"
      >
        💼 LinkedIn
      </a>

    </div>
  </div>
</section>

        
  <div className="absolute top-10 left-10 w-36 h-36 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
  <div className="absolute bottom-20 right-20 w-56 h-56 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
</section> */}


      {/* Clean Navigation */}
    <nav className=" top-0 z-50 backdrop-blur-xl bg-gradient-to-b from-purple-50 via-pink-70 to-yellow-50 dark:bg-gray-900/60 border-b border-gray-200/50 dark:border-gray-800/50 shadow-md">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex flex-wrap justify-center gap-4">
      {availableSections.map((sectionKey) => {
        const IconComponent =
          sectionIcons[sectionKey as keyof typeof sectionIcons]
        const isActive = activeSection === sectionKey

        return (
          <button
            key={sectionKey}
            onClick={() => setActiveSection(sectionKey)}
            className={`group relative flex items-center gap-2 px-6 py-2.5 rounded-full font-medium tracking-wide transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 text-white shadow-lg shadow-pink-500/40 scale-105"
                : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border border-gray-200/70 dark:border-gray-700/70 hover:scale-105 hover:shadow-md hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {/* Icon */}
            {IconComponent && (
              <IconComponent
                className={`w-5 h-5 transition-transform duration-300 ${
                  isActive
                    ? "rotate-12"
                    : "group-hover:rotate-12 text-gray-500 dark:text-gray-400"
                }`}
              />
            )}
            
            {/* Label */}
            <span>{getSectionName(sectionKey)}</span>

            {/* Animated underline when active */}
            {isActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-400 rounded-full animate-pulse"></span>
            )}
          </button>
        )
      })}
    </div>
  </div>
</nav>


      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-8 py-16">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="flex items-center gap-6 mb-12">
            {sectionIcons[activeSection as keyof typeof sectionIcons] && (
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
                {(() => {
                  const IconComponent = sectionIcons[activeSection as keyof typeof sectionIcons]
                  return <IconComponent className="w-8 h-8 text-white" />
                })()}
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {getSectionName(activeSection)}
            </h2>
          </div>

          {/* Content */}
          <div className="transform transition-all duration-500">
            {renderContent(activeSection, data.sections[activeSection])}
          </div>
        </div>
      </main>

      <section className="bg-gradient-to-b from-emerald-50 via-white to-emerald-50 py-20">
  <div className="container mx-auto px-6 lg:px-20">
    
    {/* Section Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900">
        Academic Inquiries & Collaboration
      </h2>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
        Reach out for research collaborations, student guidance, or academic discussions.
      </p>
    </div>

    {/* Grid Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

      {/* Contact Information */}
      <div className="bg-gradient-to-tr from-white via-emerald-50 to-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8">📌 Contact Information</h3>
        <ul className="space-y-6 text-gray-700">
          <li className="flex items-center gap-4">
            <span className="bg-emerald-100 text-emerald-600 p-3 rounded-full">👤</span>
            <span><strong>Name:</strong> Dr. Anup Ingle</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="bg-emerald-100 text-emerald-600 p-3 rounded-full">📞</span>
            <span><strong>Phone:</strong> +91-9325383604 (Primary)</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="bg-emerald-100 text-emerald-600 p-3 rounded-full">✉</span>
            <span><strong>Email:</strong> anup.ingle@viit.ac.in</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="bg-emerald-100 text-emerald-600 p-3 rounded-full">📍</span>
            <span>
              <strong>Office:</strong> Department of Electronics & Telecommunication, 
              VIIT, Pune, Maharashtra
            </span>
          </li>
          <li className="flex items-center gap-4">
            <span className="bg-emerald-100 text-emerald-600 p-3 rounded-full">⏰</span>
            <span>
              <strong>Availability:</strong> Mon–Fri: 10:00 AM - 5:00 PM <br /> By appointment only
            </span>
          </li>
        </ul>
      </div>

      {/* Contact Form */}
     
    </div>
  </div>
</section>


      {/* Clean Footer */}
       
    </div>
  )
}
