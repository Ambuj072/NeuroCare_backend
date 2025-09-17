"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, MessageCircle, TrendingUp, Award, Heart, Shield } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Mood Analysis",
    description:
      "Advanced AI understands your emotions and provides personalized insights to help you navigate your mental health journey.",
    color: "text-blue-500",
  },
  {
    icon: MessageCircle,
    title: "24/7 Chat Support",
    description:
      "Always-available AI chatbot provides immediate support, coping strategies, and a safe space to express your feelings.",
    color: "text-teal-500",
  },
  {
    icon: TrendingUp,
    title: "Mood Tracking",
    description:
      "Track your emotional patterns over time with beautiful visualizations and gain insights into your mental wellness trends.",
    color: "text-green-500",
  },
  {
    icon: Award,
    title: "Achievement System",
    description:
      "Celebrate your progress with meaningful badges and streaks that recognize your commitment to mental health.",
    color: "text-purple-500",
  },
  {
    icon: Heart,
    title: "Wellness Streaks",
    description:
      "Build healthy habits with streak tracking that motivates consistent self-care and emotional check-ins.",
    color: "text-pink-500",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your mental health data is completely private and secure. We prioritize your trust and confidentiality above all.",
    color: "text-indigo-500",
  },
]

export function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1 && !visibleCards.includes(index)) {
              setVisibleCards((prev) => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [visibleCards])

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Comprehensive Mental Health Support
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Our AI-powered platform provides everything you need to understand, track, and improve your mental wellness
            with personalized care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`transform transition-all duration-700 delay-${index * 100} ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <Card className="h-full group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-border/50">
                  <CardContent className="p-8 space-y-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-pretty">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">10,000+</div>
            <div className="text-muted-foreground">Users Supported</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">95%</div>
            <div className="text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">24/7</div>
            <div className="text-muted-foreground">Available Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}
