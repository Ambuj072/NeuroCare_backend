import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { ChatbotInterface } from "@/components/chatbot-interface"

export default function ChatbotPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8 space-y-4">
              <h1 className="text-4xl font-bold text-foreground">AI Mental Health Support</h1>
              <p className="text-lg text-muted-foreground">
                Chat with our AI companion for immediate support, coping strategies, and a safe space to express your
                feelings.
              </p>
            </div>
            <ChatbotInterface />
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
