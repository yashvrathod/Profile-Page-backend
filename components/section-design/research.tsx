"use client"

import { FiCalendar, FiExternalLink, FiUsers } from "react-icons/fi"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ResearchItem {
  title: string
  type?: string
  status?: string
  startDate?: string
  endDate?: string
  collaborators?: string
  funding?: string
  url?: string
}

const gradientClasses = [
  "bg-gradient-to-br from-indigo-200 via-cyan-200 to-indigo-200 animate-gradient-x",
  "bg-gradient-to-br from-purple-200 via-pink-200 to-purple-200 animate-gradient-x",
  "bg-gradient-to-br from-green-200 via-lime-100 to-green-200 animate-gradient-x",
  "bg-gradient-to-br from-pink-200 via-rose-100 to-pink-200 animate-gradient-x",
]

export function ResearchCards({ items }: { items: ResearchItem[] }) {
  const getRandomGradient = () => gradientClasses[Math.floor(Math.random() * gradientClasses.length)]

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
}
