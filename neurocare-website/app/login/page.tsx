import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <AuthForm type="login" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
