import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { PageTransition } from "@/components/page-transition"
import { LoadingSpinner } from "@/components/loading-spinner"
import "./globals.css"

// ✅ Metadata (no viewport, no themeColor here)
export const metadata: Metadata = {
  title: "NeuroCare - AI Powered Mental Health Support",
  description:
    "Your trusted companion for mental wellness. Track your mood, get AI-powered support, and build healthy habits with NeuroCare.",
  generator: "v0.app",
  keywords: ["mental health", "mood tracking", "AI support", "wellness", "therapy", "mindfulness"],
}

// ✅ Separate viewport config
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

// ✅ Separate themeColor config
export const themeColor = [
  { media: "(prefers-color-scheme: light)", color: "#89CFF0" },
  { media: "(prefers-color-scheme: dark)", color: "#70A8C7" },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          }
        >
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <FloatingChatbot />
        <Analytics />
      </body>
    </html>
  )
}
