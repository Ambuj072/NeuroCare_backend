"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUp } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const motivationalQuotes = [
  "Every small step forward is progress worth celebrating.",
  "Your mental health matters. You matter.",
  "Healing is not linear, and that's perfectly okay.",
  "You are stronger than you think, braver than you feel.",
  "Taking care of your mind is the greatest gift you can give yourself.",
]

export function Footer() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    // Rotate quotes every 5 seconds
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length)
    }, 5000)

    // Show scroll to top button when scrolled down
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-2"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}

      <footer className="bg-card border-t border-border mt-auto">
        {/* Motivational Quote Section */}
        <div className="bg-primary/5 py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-foreground font-medium animate-in fade-in duration-1000" key={currentQuote}>
                "{motivationalQuotes[currentQuote]}"
              </p>
              <div className="flex justify-center mt-4 space-x-2">
                {motivationalQuotes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentQuote ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Image 
                    src="/brain-logo.svg" 
                    alt="NeuroCare Brain Logo" 
                    width={24} 
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
                <span className="text-xl font-bold text-foreground">NeuroCare</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your trusted companion for mental wellness. AI-powered support for a healthier, happier you.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/mood-input"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Track Mood
                </Link>
                <Link
                  href="/mood-history"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Mood History
                </Link>
                <Link
                  href="/chatbot"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Chat Support
                </Link>
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Resources</h3>
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  About Us
                </Link>
                <Link href="/mental-health-tips" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Mental Health Tips
                </Link>
                <Link href="/crisis-resources" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Crisis Resources
                </Link>
                <Link href="/privacy-policy" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Support</h3>
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Need immediate help?</p>
                <p className="text-sm">
                  <span className="text-primary font-medium">Crisis Hotline:</span>
                  <br />
                  <span className="text-muted-foreground">1800-599-0019 (Available 24/7)</span>
                </p>
                <p className="text-sm">
                  <span className="text-primary font-medium">Support:</span>
                  <br />
                  <span className="text-muted-foreground">support@neurocare.com</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2024 NeuroCare. Made with care for your mental wellness.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <p className="text-muted-foreground text-sm">Remember: You are not alone in this journey.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
