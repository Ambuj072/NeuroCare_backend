"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Shield, Users, Award, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function AboutContent() {
  const [visibleSections, setVisibleSections] = useState<number[]>([])
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1 && !visibleSections.includes(index)) {
              setVisibleSections((prev) => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [visibleSections])

  const stats = [
    { number: "10,000+", label: "Users Supported" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Available Support" },
    { number: "50+", label: "Mental Health Resources" },
  ]

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced artificial intelligence analyzes your mood patterns and provides personalized insights.",
    },
    {
      icon: Users,
      title: "Compassionate Care",
      description: "Every interaction is designed with empathy and understanding at its core.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your mental health data is completely private and secure. We never share your personal information.",
    },
    {
      icon: Award,
      title: "Community Support",
      description: "Connect with a supportive community while maintaining your privacy and anonymity.",
    },
  ]

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div
            ref={(el) => (sectionRefs.current[0] = el)}
            className={`max-w-4xl mx-auto space-y-8 transition-all duration-1000 ${
              visibleSections.includes(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <Image 
                  src="/brain-logo.svg" 
                  alt="NeuroCare Brain Logo" 
                  width={64} 
                  height={64}
                  className="h-16 w-16"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              About <span className="text-primary">NeuroCare</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              We believe that mental health support should be accessible, compassionate, and available whenever you need
              it. Our AI-powered platform provides personalized care for your emotional wellness journey.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            ref={(el) => (sectionRefs.current[1] = el)}
            className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 delay-200 ${
              visibleSections.includes(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl font-bold text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Mental health challenges affect millions of people worldwide, yet access to quality care remains limited.
              NeuroCare was created to bridge this gap by providing immediate, personalized, and stigma-free mental
              health support through advanced AI technology. We're committed to making mental wellness accessible to
              everyone, regardless of location, time, or circumstances.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div
            ref={(el) => (sectionRefs.current[2] = el)}
            className={`transition-all duration-1000 delay-400 ${
              visibleSections.includes(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Making a Difference</h2>
              <p className="text-lg text-muted-foreground">
                See how NeuroCare is helping people improve their mental wellness
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="border-border/50 text-center">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            ref={(el) => (sectionRefs.current[3] = el)}
            className={`transition-all duration-1000 delay-600 ${
              visibleSections.includes(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">What Makes Us Different</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our approach combines cutting-edge AI technology with genuine care for your mental wellness
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-8 space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mental Health Awareness Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div
            ref={(el) => (sectionRefs.current[4] = el)}
            className={`max-w-4xl mx-auto space-y-8 transition-all duration-1000 delay-800 ${
              visibleSections.includes(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-foreground">Mental Health Awareness</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Understanding mental health is the first step toward wellness
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-border/50">
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Mental Health Facts</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 1 in 4 people will experience mental health issues in their lifetime</li>
                    <li>• Mental health conditions are treatable and recovery is possible</li>
                    <li>• Early intervention leads to better outcomes</li>
                    <li>• Mental health is just as important as physical health</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Breaking the Stigma</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We're committed to creating a world where seeking mental health support is seen as a sign of
                    strength, not weakness. Everyone deserves access to compassionate care without judgment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            ref={(el) => (sectionRefs.current[5] = el)}
            className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 delay-1000 ${
              visibleSections.includes(5) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="border-border/50 shadow-xl bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-12 space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Award className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-foreground">Ready to Start Your Journey?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Take the first step toward better mental health. Join thousands of people who have found support and
                  healing with NeuroCare.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg px-8 py-6 rounded-full" asChild>
                    <Link href="/register">Get Started Free</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full bg-transparent" asChild>
                    <Link href="/chatbot">Try AI Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
