"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: string
}

const quickSuggestions = [
  "I feel sad",
  "I feel stressed",
  "I'm feeling anxious",
  "I need motivation",
  "I'm having trouble sleeping",
  "I feel overwhelmed",
]

// Fetch response from backend chat API
async function fetchAiResponse(userText: string): Promise<string> {
  const tryFetch = async (url: string) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    })
    if (!response.ok) throw new Error(`API error: ${response.status}`)

    // First try parsing as text
    const raw = await response.text()
    try {
      // If backend returned JSON
      const data = JSON.parse(raw)
      const fromChoices = data?.choices?.[0]?.message?.content
      const generic = data.reply ?? data.message ?? data.response
      return (fromChoices || generic || "").toString()
    } catch {
      // If backend returned plain string (Spring Boot case)
      return raw
    }
  }

  try {
    const primary = await tryFetch("http://localhost:8080/api/chat")
    if (primary) return primary
  } catch (err) {
    console.error("Primary API call failed:", err)
  }

  try {
    // fallback if deployed frontend + backend together
    const fallback = await tryFetch("/api/chat")
    if (fallback) return fallback
  } catch (err) {
    console.error("Fallback API call failed:", err)
  }

  return "Sorry, I couldn't get a response from NeroCare."
}

export function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hello! I'm NeroCare, your AI mental health companion. How are you feeling today?",
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Always keep the input focused
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  useEffect(() => {
    inputRef.current?.focus()
  }, [isTyping])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)
    inputRef.current?.focus()

    // Call backend to get AI response
    const aiText = await fetchAiResponse(text)
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: aiText,
      sender: "bot",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, botResponse])
    setIsTyping(false)
    inputRef.current?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputText)
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
    inputRef.current?.focus()
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Chat Interface */}
      <Card className="border-border/50 shadow-xl">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="flex items-center">
            <MessageCircle className="h-6 w-6 mr-2 text-primary" />
            NeroCare - Mental Health Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="h-80 overflow-y-auto p-6 space-y-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 animate-in fade-in slide-in-from-bottom-2 duration-500 ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    message.sender === "bot" ? "bg-primary/10" : "bg-secondary/50"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <Bot className="h-5 w-5 text-primary" />
                  ) : (
                    <User className="h-5 w-5 text-secondary-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === "bot"
                      ? "bg-muted/50 text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="p-2 rounded-full bg-primary/10">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-muted/50 px-4 py-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 p-6 space-y-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1"
                autoFocus
              />
              <Button type="submit" disabled={!inputText.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </form>

            {/* Quick Suggestions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Quick suggestions:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                    disabled={isTyping}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
