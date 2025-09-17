"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import Link from "next/link"

const heroSlides = [
  {
    image: "/meditation.png",
    quote: "Your mental health journey starts with a single step forward.",
    subtext: "AI-powered support for your emotional wellness",
  },
  {
    image: "/serene-nature-landscape-with-calming-colors.jpg",
    quote: "Every emotion is valid, every feeling matters.",
    subtext: "Track, understand, and nurture your mental health",
  },
  {
    image: "/gentle-sunrise-over-calm-water.jpg",
    quote: "Healing happens one day at a time, one breath at a time.",
    subtext: "Your personal companion for mental wellness",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80 z-10" />
            <img
              src={slide.image || "/placeholder.svg"}
              alt={`Hero slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight text-balance">
              <span className="text-primary">NeuroCare</span>
              <br />
              AI-Powered Mental Health Support
            </h1>
            <div className="h-20 flex items-center justify-center">
              <p
                key={currentSlide}
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-700 text-pretty"
              >
                {heroSlides[currentSlide].quote}
              </p>
            </div>
            <p
              key={`sub-${currentSlide}`}
              className="text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200"
            >
              {heroSlides[currentSlide].subtext}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-2 duration-700 delay-400">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full" asChild>
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full bg-transparent" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="rounded-full bg-background/20 backdrop-blur hover:bg-background/40"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-primary scale-125" : "bg-background/40 hover:bg-background/60"
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="rounded-full bg-background/20 backdrop-blur hover:bg-background/40"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="rounded-full bg-background/20 backdrop-blur hover:bg-background/40"
          >
            <Play className={`h-4 w-4 transition-transform ${isAutoPlaying ? "rotate-90" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
