import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MobileOptimizedCardProps {
  children: React.ReactNode
  title?: string
  className?: string
  interactive?: boolean
}

export function MobileOptimizedCard({ children, title, className, interactive = false }: MobileOptimizedCardProps) {
  return (
    <Card
      className={cn(
        "border-border/50 shadow-sm",
        "touch-target safe-area-padding",
        interactive && "hover-lift cursor-pointer active:scale-[0.98] transition-transform",
        className,
      )}
    >
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-responsive">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  )
}
