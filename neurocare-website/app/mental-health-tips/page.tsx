import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MentalHealthTipsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Mental Health Tips</h1>
            <p className="text-muted-foreground">Evidence-informed, practical tips to support your well-being.</p>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>1. Self-Care Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-sm text-foreground/90">
                <li>Prioritize sleep (7–9 hours for adults).</li>
                <li>Maintain a balanced diet; eat nutritious foods.</li>
                <li>Exercise regularly to boost mood and reduce stress.</li>
                <li>Take breaks and allow yourself downtime.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>2. Stress Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-sm text-foreground/90">
                <li>Practice deep breathing, meditation, or mindfulness.</li>
                <li>Try journaling to process emotions.</li>
                <li>Engage in hobbies or activities that bring joy.</li>
                <li>Set realistic goals and break tasks into smaller steps.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>3. Emotional Awareness</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-sm text-foreground/90">
                <li>Recognize and accept your feelings without judgment.</li>
                <li>Name your emotions (e.g., “I feel anxious”).</li>
                <li>Identify triggers and patterns of negative thinking.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>4. Social Support</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-sm text-foreground/90">
                <li>Connect with friends, family, or support groups.</li>
                <li>Share your feelings with someone you trust.</li>
                <li>Avoid isolating yourself; maintain healthy relationships.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>5. Coping Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-sm text-foreground/90">
                <li>Use positive self-talk instead of self-criticism.</li>
                <li>Learn relaxation techniques like progressive muscle relaxation.</li>
                <li>Focus on what you can control; let go of what you cannot.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>6. Professional Help</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-sm text-foreground/90">
                <li>Seek therapy or counseling when needed.</li>
                <li>Consult a doctor or psychiatrist for severe symptoms.</li>
                <li>Use mental health helplines and online resources.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>7. Lifestyle Adjustments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-sm text-foreground/90">
                <li>Limit alcohol, caffeine, and recreational drugs.</li>
                <li>Reduce screen time and social media stress.</li>
                <li>Establish a daily routine to maintain stability.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>8. Mindset &amp; Resilience</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-sm text-foreground/90">
                <li>Practice gratitude daily.</li>
                <li>Celebrate small achievements.</li>
                <li>Learn from setbacks rather than dwelling on them.</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-sm text-muted-foreground">
            These tips are supportive and informational, not a substitute for professional care. If you are in crisis, call your local emergency number or a crisis hotline (e.g., 988 in the US).
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

