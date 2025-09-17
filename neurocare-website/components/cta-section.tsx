import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-border/50 shadow-xl bg-card/80 backdrop-blur">
          <CardContent className="p-12 text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Ready to Start Your Mental Health Journey?
              </h2>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Join thousands of people who have found support, understanding, and healing with NeuroCare. Your mental
                wellness matters, and we're here to help every step of the way.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full group" asChild>
                <Link href="/register">
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full bg-transparent" asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>

            <div className="pt-8 border-t border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>100% Free to Start</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>24/7 Support Available</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
