"use client"

import type React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends ButtonProps {
  ripple?: boolean
  glow?: boolean
}

export function EnhancedButton({ children, className, ripple = false, glow = false, ...props }: EnhancedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const button = e.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      const rippleElement = document.createElement("span")
      rippleElement.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `

      button.style.position = "relative"
      button.style.overflow = "hidden"
      button.appendChild(rippleElement)

      setTimeout(() => {
        rippleElement.remove()
      }, 600)
    }

    props.onClick?.(e)
  }

  return (
    <Button
      {...props}
      onClick={handleClick}
      className={cn("transition-all duration-300 hover-lift focus-ring", glow && "hover:animate-glow", className)}
    >
      {children}
    </Button>
  )
}
