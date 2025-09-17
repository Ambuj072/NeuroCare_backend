"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  User, 
  Mail, 
  Calendar, 
  TrendingUp, 
  Target, 
  MessageCircle,
  BarChart3,
  Award,
  Clock
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { authUtils, type User } from "@/lib/auth"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [moodStats, setMoodStats] = useState({
    totalEntries: 0,
    currentStreak: 0,
    averageMood: 0,
    lastEntry: null as string | null
  })

  useEffect(() => {
    // Try to fetch current user from backend using JWT token
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const res = await fetch("http://localhost:8080/api/auth/current-user", {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })

          if (res.status === 401 || res.status === 403) {
            // Unauthorized: clear storage and block access
            localStorage.removeItem("token")
            localStorage.removeItem("neurocare_user")
            localStorage.removeItem("neurocare_moods")
            localStorage.removeItem("neurocare_streaks")
            localStorage.removeItem("neurocare_badges")
            setUser(null)
          } else if (res.ok) {
            const data = await res.json()
            const name = data.name || data.username || data.email?.split("@")[0] || "User"
            const email = data.email || `${name}@example.com`
            const registeredAt = data.registeredAt || new Date().toISOString()

            // Persist a friendly identifier for navbar and guards
            localStorage.setItem("neurocare_user", name)
            setUser({ name, email, registeredAt })
            return
          }
        }
      } catch (e) {
        // Network or server issue; we'll fall back to localStorage below
        console.error("Failed to fetch current user:", e)
      }

      // Fallback to localStorage profile if API is unavailable/no token
      const currentUser = authUtils.getCurrentUser()
      const userProfile = authUtils.getUserProfile()
      if (currentUser && userProfile) {
        setUser(userProfile)
      } else if (currentUser) {
        setUser({
          name: currentUser,
          email: `${currentUser}@example.com`,
          registeredAt: new Date().toISOString()
        })
      }
    }

    void fetchCurrentUser()

    // Get mood statistics
    const moods = JSON.parse(localStorage.getItem("neurocare_moods") || "[]")
    const streaks = JSON.parse(localStorage.getItem("neurocare_streaks") || "{}")
    
    if (moods.length > 0) {
      const totalEntries = moods.length
      const moodValues = moods.map((mood: any) => mood.mood)
      const averageMood = moodValues.reduce((a: number, b: number) => a + b, 0) / moodValues.length
      const lastEntry = moods[moods.length - 1]?.date || null
      
      setMoodStats({
        totalEntries,
        currentStreak: streaks.current || 0,
        averageMood: Math.round(averageMood * 10) / 10,
        lastEntry
      })
    }
  }, [])

  const getMoodEmoji = (mood: number) => {
    if (mood >= 4) return "😊"
    if (mood >= 3) return "😐"
    if (mood >= 2) return "😔"
    return "😢"
  }

  const getMoodLabel = (mood: number) => {
    if (mood >= 4) return "Great"
    if (mood >= 3) return "Good"
    if (mood >= 2) return "Okay"
    return "Poor"
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Image 
                  src="/brain-logo.svg" 
                  alt="NeuroCare Brain Logo" 
                  width={24} 
                  height={24}
                  className="h-6 w-6"
                />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.name || "User"}!
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Here's your mental wellness overview and quick access to your tools.
            </p>
          </div>

          {/* User Info Card */}
          <Card className="mb-8 border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Your Profile</span>
              </CardTitle>
              <CardDescription>
                Your account information and registration details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : "Recently"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Entries */}
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Entries</p>
                    <p className="text-2xl font-bold">{moodStats.totalEntries}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            {/* Current Streak */}
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold">{moodStats.currentStreak} days</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            {/* Average Mood */}
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Mood</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">{moodStats.averageMood}</span>
                      <span className="text-lg">{getMoodEmoji(moodStats.averageMood)}</span>
                    </div>
                  </div>
                  <Image 
                    src="/brain-logo.svg" 
                    alt="NeuroCare Brain Logo" 
                    width={32} 
                    height={32}
                    className="h-8 w-8"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Last Entry */}
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Entry</p>
                    <p className="text-sm font-bold">
                      {moodStats.lastEntry 
                        ? new Date(moodStats.lastEntry).toLocaleDateString()
                        : "No entries yet"
                      }
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Track Mood */}
            <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Track Your Mood</span>
                </CardTitle>
                <CardDescription>
                  Log how you're feeling today and track your emotional patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/mood-input">
                    Start Tracking
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* View History */}
            <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>View History</span>
                </CardTitle>
                <CardDescription>
                  Review your mood patterns and see your progress over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/mood-history">
                    View History
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Chat Support */}
            <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <span>Chat Support</span>
                </CardTitle>
                <CardDescription>
                  Get instant support and guidance from our AI assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/chatbot">
                    Start Chat
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          {moodStats.totalEntries > 0 && (
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Your Progress</span>
                </CardTitle>
                <CardDescription>
                  Keep up the great work! Your consistency is building healthy habits.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Mood Trend</span>
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <span>{getMoodEmoji(moodStats.averageMood)}</span>
                    <span>{getMoodLabel(moodStats.averageMood)}</span>
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mood Level</span>
                    <span>{moodStats.averageMood}/5</span>
                  </div>
                  <Progress 
                    value={(moodStats.averageMood / 5) * 100} 
                    className="h-2"
                  />
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    You've logged {moodStats.totalEntries} mood entries with a {moodStats.currentStreak}-day streak. 
                    {moodStats.averageMood >= 3.5 
                      ? " Great job maintaining positive mental health!" 
                      : " Consider tracking more regularly to build better habits."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Getting Started */}
          {moodStats.totalEntries === 0 && (
            <Card className="border-border/50 shadow-lg bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Image 
                    src="/brain-logo.svg" 
                    alt="NeuroCare Brain Logo" 
                    width={20} 
                    height={20}
                    className="h-5 w-5"
                  />
                  <span>Ready to Start Your Journey?</span>
                </CardTitle>
                <CardDescription>
                  Begin tracking your mood to unlock insights about your mental wellness patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Tracking your mood regularly helps you:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Identify patterns in your emotional well-being</li>
                    <li>• Build awareness of your mental health</li>
                    <li>• Track progress over time</li>
                    <li>• Make informed decisions about self-care</li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="/mood-input">
                      Log Your First Mood Entry
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
