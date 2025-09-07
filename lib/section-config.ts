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

const sectionConfig = [
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

export default sectionConfig
