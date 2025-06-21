"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu, X } from "lucide-react"
import { SkeletonWrapper } from "@/components/ui/skeleton-wrapper"
import { NavbarSkeleton } from "@/components/skeletons/navbar-skeleton"
import { useLoadingSimulation } from "@/hooks/use-loading-simulation"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Features", href: "/verify-certificate" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { isLoading } = useLoadingSimulation({ duration: 800 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <SkeletonWrapper loading={isLoading} skeleton={<NavbarSkeleton />}>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 shadow-lg"
            : "bg-gradient-to-r from-purple-900/95 via-purple-800/95 to-purple-900/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  Inlighn Tech
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block flex-1">
              <div className="flex items-center justify-center space-x-4 xl:space-x-8">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-200 relative group ${
                        pathname === item.href ? "text-white" : "text-gray-200 hover:text-white"
                      }`}
                    >
                      {item.name}
                      {pathname === item.href && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop Theme Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/contact"
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
              >
                Get Started
              </Link>
              <div className="bg-purple-700/50 rounded-lg p-1 backdrop-blur-sm">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <div className="bg-purple-700/50 rounded-lg p-1 backdrop-blur-sm">
                <ThemeToggle />
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-200 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 border-t border-purple-700/50"
            >
              <div className="px-4 pt-2 pb-3 space-y-1 max-h-screen overflow-y-auto">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        pathname === item.href
                          ? "text-white bg-white/10 backdrop-blur-sm"
                          : "text-gray-200 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                  className="pt-4 border-t border-purple-700/50 mt-4"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </SkeletonWrapper>
  )
}
