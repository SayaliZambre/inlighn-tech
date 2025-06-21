"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm max-w-md w-full">
        <CardContent className="p-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="text-6xl font-bold text-white mb-4">404</div>
            <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
            <p className="text-gray-300 mb-8">The page you're looking for doesn't exist or has been moved.</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/10">
                <Link href="/programs">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Programs
                </Link>
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
