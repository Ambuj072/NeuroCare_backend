"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoodCard } from "@/components/mood-card"
import { StreakTracker } from "@/components/streak-tracker"
import { moodUtils, type MoodEntry } from "@/lib/mood-utils"
import { Calendar, Filter } from "lucide-react"
import Link from "next/link"

export function MoodHistory() {
  const [moods, setMoods] = useState<MoodEntry[]>([])
  const [filteredMoods, setFilteredMoods] = useState<MoodEntry[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [streaks, setStreaks] = useState({ current: 0, longest: 0 })
  const [badges, setBadges] = useState<string[]>([])

  useEffect(() => {
    const moodData = moodUtils.getAllMoods()
    const streakData = moodUtils.getStreaks()
    const badgeData = moodUtils.getBadges()

    setMoods(moodData)
    setFilteredMoods(moodData)
    setStreaks(streakData)
    setBadges(badgeData)
  }, [])

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
    if (filter === "all") {
      setFilteredMoods(moods)
    } else {
      setFilteredMoods(moods.filter((mood) => mood.mood.toLowerCase() === filter.toLowerCase()))
    }
  }

  const moodTypes = ["all", "happy", "sad", "anxious", "calm", "excited", "stressed"]
  const moodStats = moodUtils.getMoodStats(moods)

  if (moods.length === 0) {
    return (
      <div className="text-center space-y-6">
        <Card className="border-border/50 shadow-xl">
          <CardContent className="p-12">
            <div className="space-y-4">
              <div className="text-6xl">🌱</div>
              <h3 className="text-2xl font-semibold text-foreground">Start Your Mood Journey</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You haven't tracked any moods yet. Begin your mental wellness journey by sharing how you're feeling
                today.
              </p>
              <Button asChild className="mt-4">
                <Link href="/mood-input">Track Your First Mood</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Streak Tracker */}
      <StreakTracker currentStreak={streaks.current} longestStreak={streaks.longest} badges={badges} />

      {/* Mood Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">{moods.length}</div>
            <div className="text-sm text-muted-foreground">Total Entries</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">{moodStats.mostCommon}</div>
            <div className="text-sm text-muted-foreground">Most Common Mood</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">{moodStats.averageConfidence}%</div>
            <div className="text-sm text-muted-foreground">Avg Confidence</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter Moods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {moodTypes.map((type) => (
              <Button
                key={type}
                variant={selectedFilter === type ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mood Entries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground flex items-center">
            <Calendar className="h-6 w-6 mr-2" />
            Your Mood Entries
          </h2>
          <Badge variant="secondary">{filteredMoods.length} entries</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMoods.map((mood) => (
            <MoodCard key={mood.id} mood={mood} />
          ))}
        </div>
      </div>
    </div>
  )
}
