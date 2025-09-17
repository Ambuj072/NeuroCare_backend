"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { moodUtils, type MoodEntry } from "@/lib/mood-utils"
import { ArrowLeft, Calendar, Brain, Award, Trash2 } from "lucide-react"
import Link from "next/link"

interface MoodDetailProps {
  moodId: string
}

export function MoodDetail({ moodId }: MoodDetailProps) {
  const [mood, setMood] = useState<MoodEntry | null>(null)
  const [badges, setBadges] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const moodEntry = moodUtils.getMoodById(moodId)
    const userBadges = moodUtils.getBadges()
    setMood(moodEntry)
    setBadges(userBadges)
  }, [moodId])

  const handleDelete = () => {
    if (mood && confirm("Are you sure you want to delete this mood entry?")) {
      moodUtils.deleteMoodEntry(mood.id)
      router.push("/mood-history")
    }
  }

  if (!mood) {
    return (
      <div className="text-center space-y-4">
        <div className="text-6xl">😔</div>
        <h2 className="text-2xl font-semibold text-foreground">Mood Entry Not Found</h2>
        <p className="text-muted-foreground">The mood entry you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/mood-history">Back to History</Link>
        </Button>
      </div>
    )
  }

  const badgeIcons = {
    "First Step": "🌱",
    "Week Warrior": "⭐",
    "Consistency Star": "🌟",
    "Calm Mind": "🏅",
    "Mood Master": "🏆",
    "Wellness Champion": "👑",
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="hover:text-primary">
          <Link href="/mood-history">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to History
          </Link>
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Entry
        </Button>
      </div>

      {/* Main Mood Card */}
      <Card className="border-border/50 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="text-8xl animate-bounce">{mood.emoji}</div>
          <div className="space-y-2">
            <CardTitle className="text-3xl text-foreground">{mood.mood}</CardTitle>
            <div className="flex items-center justify-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(mood.timestamp).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Confidence: {mood.confidence}%
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-lg">Your Thoughts & Feelings:</h3>
              <div className="bg-muted/50 p-6 rounded-lg border border-border/50">
                <p className="text-foreground leading-relaxed text-lg">{mood.text}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3 text-lg flex items-center">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                AI Insights & Suggestions:
              </h3>
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-lg border border-border/50">
                <p className="text-foreground leading-relaxed text-lg">{mood.suggestion}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges Section */}
      {badges.length > 0 && (
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-6 w-6 mr-2 text-yellow-500" />
              Your Achievement Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50 hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl">{badgeIcons[badge as keyof typeof badgeIcons] || "🏅"}</div>
                  <div>
                    <div className="font-semibold text-foreground">{badge}</div>
                    <div className="text-sm text-muted-foreground">Achievement Unlocked</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex-1">
          <Link href="/mood-input">Track New Mood</Link>
        </Button>
        <Button variant="outline" asChild className="flex-1 bg-transparent">
          <Link href="/mood-history">View All Entries</Link>
        </Button>
      </div>
    </div>
  )
}
