"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { MoodEntry } from "@/lib/mood-utils"
import { Calendar, Eye } from "lucide-react"
import Link from "next/link"

interface MoodCardProps {
  mood: MoodEntry
}

const moodColors = {
  happy: "bg-green-100 border-green-200 text-green-800",
  sad: "bg-blue-100 border-blue-200 text-blue-800",
  anxious: "bg-orange-100 border-orange-200 text-orange-800",
  calm: "bg-teal-100 border-teal-200 text-teal-800",
  excited: "bg-yellow-100 border-yellow-200 text-yellow-800",
  stressed: "bg-red-100 border-red-200 text-red-800",
  neutral: "bg-gray-100 border-gray-200 text-gray-800",
}

export function MoodCard({ mood }: MoodCardProps) {
  const colorClass = moodColors[mood.mood.toLowerCase() as keyof typeof moodColors] || moodColors.neutral

  return (
    <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-border/50">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{mood.emoji}</div>
          <Badge className={`${colorClass} border`}>{mood.mood}</Badge>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-3">{mood.text}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(mood.timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="text-xs text-muted-foreground">Confidence: {mood.confidence}%</div>
          <Button variant="ghost" size="sm" asChild className="hover:text-primary">
            <Link href={`/mood-detail/${mood.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
