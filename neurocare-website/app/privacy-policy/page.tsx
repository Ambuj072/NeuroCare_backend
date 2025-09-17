import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground">Effective date: {new Date().getFullYear()}</p>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>1. What We Collect</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/90 space-y-2">
              <p>Account data (name, email), authentication tokens, and optional mood tracking entries that you create.</p>
              <p>Basic device and usage data for improving the app experience.</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>2. How We Use Data</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/90 space-y-2">
              <p>To provide core features (login, dashboard, mood tracking) and personalize your experience.</p>
              <p>To maintain security, troubleshoot issues, and improve product performance.</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>3. Data Storage & Security</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/90 space-y-2">
              <p>We store certain items in your browser (e.g., tokens, preferences) and our backend stores account data.</p>
              <p>We apply reasonable safeguards; no method of transmission is 100% secure.</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>4. Sharing</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/90 space-y-2">
              <p>We do not sell your personal information. We may share minimal data with service providers to operate the app.</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>5. Your Choices</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/90 space-y-2">
              <p>You can access or delete your data, and log out to clear local app storage.</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>6. Contact</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/90 space-y-2">
              <p>For privacy questions, contact: support@neurocare.com</p>
            </CardContent>
          </Card>

          <div className="text-xs text-muted-foreground">
            This policy may be updated. If we make material changes, we will notify you within the app.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

