import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CrisisResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Crisis Resources</h1>
            <p className="text-muted-foreground">
              If you are in immediate danger or thinking about harming yourself or others, call your local emergency number right away.
            </p>
          </div>

          

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>Suicide Prevention & Crisis Support (India)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-sm text-foreground/90">
                <li><span className="font-medium">Vandrevala Foundation Helpline:</span> 1860 266 2345</li>
                <li><span className="font-medium">Snehi:</span> +91-22-2772 6771</li>
                <li><span className="font-medium">iCall (TISS):</span> +91-22-2552 1111 / +91-9152987821</li>
                <li><span className="font-medium">AASRA:</span> +91-9820466726</li>
                <li><span className="font-medium">General Emergency (India):</span> 112 (Police / Ambulance / Fire)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>International Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/90">
                For international helplines, visit <a className="underline" href="https://www.opencounseling.com/suicide-hotlines" target="_blank" rel="noopener noreferrer">OpenCounseling Hotlines</a> or <a className="underline" href="https://findahelpline.com" target="_blank" rel="noopener noreferrer">Find A Helpline</a>.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>When to Seek Help</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-sm text-foreground/90">
                <li>Thoughts of self-harm or suicide</li>
                <li>Feeling unable to keep yourself safe</li>
                <li>Severe anxiety, panic, or distress</li>
                <li>Experiencing or witnessing violence or abuse</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-sm text-muted-foreground">
            This information is provided for support and is not a substitute for professional medical advice.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

