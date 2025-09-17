"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = () => {
      const loggedInUser = localStorage.getItem("neurocare_user")
      setUser(loggedInUser)
    }

    checkUser()

    // ✅ Listen to login/logout changes across tabs
    window.addEventListener("storage", checkUser)

    return () => {
      window.removeEventListener("storage", checkUser)
    }
  }, [])

  const handleLogout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem("neurocare_user")
    localStorage.removeItem("neurocare_moods")
    localStorage.removeItem("neurocare_streaks")
    localStorage.removeItem("neurocare_badges")
    localStorage.removeItem("token")
    
    setUser(null)
    router.push("/") // redirect to landing page
  }

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Image 
                src="/brain-logo.svg" 
                alt="NeuroCare Brain Logo" 
                width={24} 
                height={24}
                className="h-6 w-6"
              />
            </div>
            <span className="text-xl font-bold text-foreground">NeuroCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!user && (
              <Link href="/" className="text-foreground hover:text-primary transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            )}
            {user && (
              <>
                <Link
                  href="/mood-input"
                  className="text-foreground hover:text-primary transition-colors relative group"
                >
                  Track Mood
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
                <Link
                  href="/mood-history"
                  className="text-foreground hover:text-primary transition-colors relative group"
                >
                  History
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
                <Link href="/chatbot" className="text-foreground hover:text-primary transition-colors relative group">
                  Chat Support
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
                <Link href="https://v0-vapi-chatbot.vercel.app/" className="text-foreground hover:text-primary transition-colors relative group">
                  Talk to us
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </>
            )}
            <Link href="/about" className="text-foreground hover:text-primary transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Welcome, {user}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-3">
              {!user && (
                <Link href="/" className="text-foreground hover:text-primary transition-colors px-2 py-1">
                  Home
                </Link>
              )}
              {user && (
                <>
                  <Link href="/mood-input" className="text-foreground hover:text-primary transition-colors px-2 py-1">
                    Track Mood
                  </Link>
                  <Link href="/mood-history" className="text-foreground hover:text-primary transition-colors px-2 py-1">
                    History
                  </Link>
                  <Link href="/chatbot" className="text-foreground hover:text-primary transition-colors px-2 py-1">
                    Chat Support
                  </Link>
                  <Link href="https://v0-vapi-chatbot.vercel.app/" className="text-foreground hover:text-primary transition-colors px-2 py-1">
                    Talk to us
                  </Link>
                </>
              )}
              <Link href="/about" className="text-foreground hover:text-primary transition-colors px-2 py-1">
                About
              </Link>
              <div className="pt-3 border-t border-border">
                {user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground px-2">Welcome, {user}</div>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="w-full bg-transparent">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button size="sm" asChild className="w-full">
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
