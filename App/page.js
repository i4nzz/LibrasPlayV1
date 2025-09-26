"use client"

import { useState, useEffect } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { MainMenu } from "@/components/main-menu"
import { LearnScreen } from "@/components/learn-screen"
import { PracticeScreen } from "@/components/practice-screen"
import { ProgressScreen } from "@/components/progress-screen"
import { SettingsScreen } from "@/components/settings-screen"

export default function LibrasPlayApp() {
  const [currentScreen, setCurrentScreen] = useState("splash")
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Mostra splash por 3 segundos
    const timer = setTimeout(() => {
      setShowSplash(false)
      setCurrentScreen("menu")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen)
  }

  if (showSplash) {
    return <SplashScreen onComplete={() => navigateToScreen("menu")} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-blue-200 to-yellow-200">
      {currentScreen === "menu" && <MainMenu onNavigate={navigateToScreen} />}
      {currentScreen === "learn" && <LearnScreen onNavigate={navigateToScreen} />}
      {currentScreen === "practice" && <PracticeScreen onNavigate={navigateToScreen} />}
      {currentScreen === "progress" && <ProgressScreen onNavigate={navigateToScreen} />}
      {currentScreen === "settings" && <SettingsScreen onNavigate={navigateToScreen} />}
    </div>
  )
}
