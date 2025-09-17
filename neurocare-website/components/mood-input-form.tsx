"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Heart, Brain } from "lucide-react"
import { moodUtils, type MoodEntry } from "@/lib/mood-utils"
import confetti from "canvas-confetti"

const moodSuggestions = [
  "I'm feeling anxious about work",
  "I had a great day today",
  "I'm feeling overwhelmed",
  "I'm grateful for my family",
  "I'm struggling with motivation",
  "I feel peaceful and calm",
]

export function MoodInputForm() {
  const [moodText, setMoodText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<MoodEntry | null>(null)
  const [showResult, setShowResult] = useState(false)
  const router = useRouter()

  const handleSuggestionClick = (suggestion: string) => {
    setMoodText(suggestion)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!moodText.trim()) return

    setIsAnalyzing(true)
    setShowResult(false)

    try {
      // Simulate AI analysis
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newMoodEntry = moodUtils.analyzeMood(moodText)
      moodUtils.saveMoodEntry(newMoodEntry)

      setAnalysis(newMoodEntry)
      setShowResult(true)

      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#89CFF0", "#B0E0E6", "#A3D8E6"],
      })

      // Update streaks and check for badges
      moodUtils.updateStreaks()
      moodUtils.checkAndAwardBadges()
    } catch (error) {
      console.error("Error analyzing mood:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleNewEntry = () => {
    setMoodText("")
    setAnalysis(null)
    setShowResult(false)
  }

  const handleViewHistory = () => {
    router.push("/mood-history")
  }

  if (showResult && analysis) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Card className="border-border/50 shadow-xl bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="text-6xl animate-bounce">{analysis.emoji}</div>
            </div>
            <CardTitle className="text-2xl text-foreground">Mood Analysis Complete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {analysis.mood}
              </Badge>
              <p className="text-muted-foreground">Confidence: {analysis.confidence}%</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Your Entry:</h3>
                <p className="text-muted-foreground bg-muted/50 p-4 rounded-lg">{analysis.text}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-primary" />
                  AI Suggestion:
                </h3>
                <div className="bg-card border border-border/50 p-4 rounded-lg">
                  <p className="text-foreground leading-relaxed">{analysis.suggestion}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={handleNewEntry} className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Track Another Mood
              </Button>
              <Button variant="outline" onClick={handleViewHistory} className="flex-1 bg-transparent">
                View History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Sparkles className="h-6 w-6 mr-2 text-primary" />
            Share Your Feelings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="mood-text" className="text-sm font-medium text-foreground">
                How are you feeling right now? What's on your mind?
              </label>
              <Textarea
                id="mood-text"
                placeholder="Express your thoughts and emotions freely. There's no judgment here, just support and understanding..."
                value={moodText}
                onChange={(e) => setMoodText(e.target.value)}
                className="min-h-32 resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                disabled={isAnalyzing}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={!moodText.trim() || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing your mood...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Analyze My Mood
                </>
              )}
            </Button>
          </form>

          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {moodSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                  disabled={isAnalyzing}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
