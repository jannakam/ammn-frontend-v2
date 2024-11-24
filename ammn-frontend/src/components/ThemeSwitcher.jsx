"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center space-x-2 fixed top-5 left-5">
      <Switch
        id="dark-mode"
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <Label htmlFor="dark-mode" className="flex items-center space-x-2">
        {theme === "dark" ? (
            <Moon className="h-4 w-4" />
        ) : (
            <Sun className="h-4 w-4" />
        )}
      </Label>
    </div>
  )
}
