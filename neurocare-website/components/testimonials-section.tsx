"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah M.",
    role: "College Student",
    content:
      "NeuroCare helped me understand my anxiety patterns and gave me tools to manage stress during finals. The AI insights are surprisingly accurate and helpful.",
    rating: 5,
    avatar: "/professional-woman-avatar.png",
  },
  {
    name: "Michael R.",
    role: "Working Professional",
    content:
      "The mood tracking feature opened my eyes to how work stress was affecting my mental health. The chatbot is like having a therapist available 24/7.",
    rating: 5,
    avatar: "/professional-man-avatar.png",
  },
  {
    name: "Emma L.",
    role: "New Parent",
    content:
      "Postpartum depression was overwhelming, but NeuroCare's gentle approach and consistent check-ins helped me through the darkest days. Truly life-changing.",
    rating: 5,
    avatar: "/young-mother-avatar.jpg",
  },
  {
    name: "David K.",
    role: "Retiree",
    content:
      "I was skeptical about AI therapy, but the personalized insights and achievement system motivated me to prioritize my mental health for the first time in years.",
    rating: 5,
    avatar: "/older-gentleman-avatar.jpg",
  },
]

const motivationalMessages = [
  "Your mental health is a priority, not a luxury.",
  "Small steps every day lead to big changes over time.",
  "It's okay to not be okay. What matters is taking care of yourself.",
  "You are worthy of love, care, and support.",
  "Healing is not linear, and that's perfectly normal.",
]

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % motivationalMessages.length)
    }, 4000)

    return () => {
      clearInterval(testimonialInterval)
      clearInterval(messageInterval)
    }
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Motivational Messages */}
        <div className="text-center mb-16">
          <div className="h-16 flex items-center justify-center">
            <p
              key={currentMessage}
              className="text-2xl md:text-3xl font-medium text-primary animate-in fade-in slide-in-from-bottom-2 duration-1000 text-balance"
            >
              {motivationalMessages[currentMessage]}
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Stories of Healing & Hope</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Real people sharing how NeuroCare has made a difference in their mental health journey.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative h-80 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentTestimonial
                    ? "opacity-100 translate-x-0"
                    : index < currentTestimonial
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                }`}
              >
                <Card className="h-full border-border/50 shadow-lg">
                  <CardContent className="p-8 h-full flex flex-col justify-center">
                    <div className="text-center space-y-6">
                      <Quote className="h-12 w-12 text-primary mx-auto opacity-50" />

                      <blockquote className="text-lg md:text-xl text-foreground leading-relaxed text-pretty">
                        "{testimonial.content}"
                      </blockquote>

                      <div className="flex justify-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <div className="flex items-center justify-center space-x-4">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="text-left">
                          <div className="font-semibold text-foreground">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
