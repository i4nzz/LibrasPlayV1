import { Comic_Neue, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic-neue",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata = {
  title: "LibrasPlay - Aprenda Libras Brincando!",
  description: "Aplicativo educativo para crianças aprenderem Libras de forma divertida",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${comicNeue.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="font-sans min-h-screen">{children}</body>
    </html>
  )
}
