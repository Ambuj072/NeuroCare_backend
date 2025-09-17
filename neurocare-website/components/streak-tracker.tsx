"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Award } from "lucide-react"

interface StreakTrackerProps {
  currentStreak: number
  longestStreak: number
  badges: string[]
}

const badgeIcons = {
  "First Step": "🌱",
  "Week Warrior": "⭐",
  "Consistency Star": "🌟",
  "Calm Mind": "🏅",
  "Mood Master": "🏆",
  "Wellness Champion": "👑",
}

export function StreakTracker({ currentStreak, longestStreak, badges }: StreakTrackerProps) {
  const nextMilestone = currentStreak < 7 ? 7 : currentStreak < 30 ? 30 : currentStreak < 100 ? 100 : 365
  const progressToNext = (currentStreak / nextMilestone) * 100

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Streak Stats */}
      <Card className="border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Flame className="h-6 w-6 mr-2 text-orange-500" />
            Mood Tracking Streaks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{currentStreak}</div>
              <div className="text-sm text-muted-foreground">Current Streak</div>
              <div className="text-xs text-muted-foreground">days in a row</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{longestStreak}</div>
              <div className="text-sm text-muted-foreground">Longest Streak</div>
              <div className="text-xs text-muted-foreground">personal best</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to {nextMilestone} days</span>
              <span className="text-primary font-medium">
                {currentStreak}/{nextMilestone}
              </span>
            </div>
            <Progress value={Math.min(progressToNext, 100)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-6 w-6 mr-2 text-yellow-500" />
            Achievement Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          {badges.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <div className="text-4xl">🎯</div>
              <p className="text-muted-foreground">Keep tracking your moods to earn badges!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-border/50"
                >
                  <div className="text-2xl">{badgeIcons[badge as keyof typeof badgeIcons] || "🏅"}</div>
                  <div>
                    <div className="font-medium text-sm text-foreground">{badge}</div>
                    <div className="text-xs text-muted-foreground">Earned</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
