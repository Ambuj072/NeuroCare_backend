"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface AuthFormProps {
  type: "login" | "register"
}

export function AuthForm({ type }: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
    setSuccess("")
  }

  // Form validation
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields")
      return false
    }

    if (type === "register") {
      if (!formData.name) {
        setError("Please enter your name")
        return false
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long")
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return false
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }

    return true
  }

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      if (type === "register") {
        // Call Spring Boot signup API
        const res = await fetch("http://localhost:8080/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        })

        if (res.ok) {
          setSuccess("✅ Account created successfully! Redirecting to login...")
          setTimeout(() => {
            router.replace("/login")
          }, 1500)
        } else {
          const data = await res.text()
          setError(data || "❌ Signup failed")
        }
      } else {
        // Call Spring Boot login API
        const res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })

        const data = await res.json()
        if (res.ok) {
          localStorage.setItem("token", data.token) // Save JWT token
          localStorage.setItem("neurocare_user", data.user?.name || data.user?.email || "User") // Save user info
          setSuccess("✅ Login successful! Redirecting to dashboard...")
          setTimeout(() => {
            router.replace("/dashboard") // Redirect to dashboard
          }, 1000)
        } else {
          setError(data.message || "❌ Invalid email or password")
        }
      }
    } catch (err) {
      console.error(err)
      setError("⚠️ Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="border-border/50 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <Image 
                src="/brain-logo.svg" 
                alt="NeuroCare Brain Logo" 
                width={32} 
                height={32}
                className="h-8 w-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              {type === "login" ? "Welcome Back" : "Join NeuroCare"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {type === "login"
                ? "Sign in to continue your mental wellness journey"
                : "Start your journey to better mental health"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="h-12 pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {type === "register" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="h-12 pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50 text-green-800 animate-in fade-in slide-in-from-top-2">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full h-12 text-base font-medium rounded-lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {type === "login" ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                <>{type === "login" ? "Sign In" : "Create Account"}</>
              )}
            </Button>
          </form>

          <div className="text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {type === "login" ? "New to NeuroCare?" : "Already have an account?"}
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-12 bg-transparent" asChild>
              <Link href={type === "login" ? "/register" : "/login"}>
                {type === "login" ? "Create an Account" : "Sign In Instead"}
              </Link>
            </Button>
          </div>

          {type === "login" && (
            <div className="text-center">
              <Button variant="link" className="text-sm text-muted-foreground hover:text-primary">
                Forgot your password?
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="mt-8 text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {type === "register"
            ? "By creating an account, you agree to our Terms of Service and Privacy Policy."
            : "Your mental health data is always private and secure."}
        </p>
        {type === "register" && (
          <p className="text-xs text-muted-foreground">
            We're committed to protecting your privacy and supporting your mental wellness journey.
          </p>
        )}
      </div>
    </div>
  )
}
