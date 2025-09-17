import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { MoodDetail } from "@/components/mood-detail"

interface MoodDetailPageProps {
  params: {
    id: string
  }
}

export default function MoodDetailPage({ params }: MoodDetailPageProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <MoodDetail moodId={params.id} />
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
