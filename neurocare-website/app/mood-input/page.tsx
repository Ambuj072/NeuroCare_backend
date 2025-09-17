import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { MoodInputForm } from "@/components/mood-input-form"

export default function MoodInputPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-8 space-y-4">
              <h1 className="text-4xl font-bold text-foreground">How are you feeling today?</h1>
              <p className="text-lg text-muted-foreground">
                Share your thoughts and emotions. Our AI will help you understand and process your feelings.
              </p>
            </div>
            <MoodInputForm />
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
