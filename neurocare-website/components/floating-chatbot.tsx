"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const quickResponses = [
    "I need someone to talk to",
    "I'm feeling anxious",
    "I'm having a tough day",
    "I need motivation",
  ]

  const handleQuickResponse = (response: string) => {
    // In a real app, this would send the message to the chatbot
    setMessage(response)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would process the message
      setMessage("")
      setIsOpen(false)
      // Redirect to full chatbot page
      window.location.href = "/chatbot"
    }
  }

  return (
    <>
      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 animate-in slide-in-from-bottom-2 fade-in duration-300">
          <Card className="border-border/50 shadow-2xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                  Quick Support
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Hi! I'm here to help. What's on your mind today?</p>

              <div className="space-y-2">
                {quickResponses.map((response, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs bg-transparent hover:bg-primary/10"
                    onClick={() => handleQuickResponse(response)}
                  >
                    {response}
                  </Button>
                ))}
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="text-sm"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-3 w-3" />
                </Button>
              </div>

              <div className="text-center pt-2 border-t border-border/50">
                <Button variant="link" size="sm" asChild className="text-xs">
                  <Link href="/chatbot">Open Full Chat</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </>
  )
}
