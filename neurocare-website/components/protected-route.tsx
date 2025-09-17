"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Lock } from "lucide-react"
import Link from "next/link"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("neurocare_user")
    setIsAuthenticated(!!user)
  }, [])

  if (isAuthenticated === null) {
    // Loading state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Not authenticated - show login prompt
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-border/50 shadow-xl">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <Lock className="h-12 w-12 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Authentication Required</h2>
              <p className="text-muted-foreground">
                Please sign in to access your mental health dashboard and continue your wellness journey.
              </p>
            </div>

            <div className="space-y-3">
              <Button className="w-full" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/register">Create Account</Link>
              </Button>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-primary" />
                <span>Your mental health journey awaits</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
