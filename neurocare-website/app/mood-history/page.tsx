import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { MoodHistory } from "@/components/mood-history"

export default function MoodHistoryPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8 space-y-4">
              <h1 className="text-4xl font-bold text-foreground">Your Mood Journey</h1>
              <p className="text-lg text-muted-foreground">
                Track your emotional patterns and celebrate your progress over time.
              </p>
            </div>
            <MoodHistory />
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
