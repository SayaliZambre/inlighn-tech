import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { FloatingElements } from "@/components/ui/floating-elements"
import { InteractiveCursor } from "@/components/ui/interactive-cursor"
import { LiquidScrollIndicator } from "@/components/ui/liquid-scroll-indicator"
import { LiquidFloatingAction } from "@/components/ui/liquid-floating-action"
import { LiquidCursorTrail } from "@/components/ui/liquid-cursor-trail"
import { PreloaderWrapper } from "@/components/ui/preloader-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Inlighn Tech - Shape Your Tech Future",
  description:
    "Immersive internship programs in Cybersecurity, Full Stack Development, Data Science, and Data Analysis designed for the next generation of tech professionals.",
  keywords:
    "tech education, internship programs, cybersecurity, full stack development, data science, data analysis, coding bootcamp",
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <PreloaderWrapper>
            <FloatingElements />
            <InteractiveCursor />
            <LiquidCursorTrail />
            <LiquidScrollIndicator />
            <Navbar />
            <main>{children}</main>
            <LiquidFloatingAction />
            <Footer />
          </PreloaderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
