"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"
import { SkeletonWrapper } from "@/components/ui/skeleton-wrapper"
import { FooterSkeleton } from "@/components/skeletons/footer-skeleton"
import { useLoadingSimulation } from "@/hooks/use-loading-simulation"

const footerLinks = {
  programs: [
    { name: "Cybersecurity", href: "/programs#cybersecurity" },
    { name: "Full Stack Development", href: "/programs#fullstack" },
    { name: "Data Science", href: "/programs#datascience" },
    { name: "Data Analysis", href: "/programs#dataanalysis" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Verify Certificate", href: "/verify-certificate" },
    { name: "Student Portal", href: "/portal" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Refund Policy", href: "/refund" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

export default function Footer() {
  const { isLoading } = useLoadingSimulation({ duration: 1200, autoStart: false })

  return (
    <SkeletonWrapper loading={isLoading} skeleton={<FooterSkeleton />}>
      <footer className="bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <Link href="/" className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Inlighn Tech</span>
                </Link>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Empowering the next generation of tech professionals through immersive, hands-on internship programs
                  in cutting-edge technologies.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Mail className="h-4 w-4 mr-3 text-blue-400" />
                    <span>hello@inlighntech.com</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-4 w-4 mr-3 text-blue-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-3 text-blue-400" />
                    <span>123 Tech Street, Silicon Valley</span>
                  </div>
                </div>
              </div>

              {/* Programs */}
              <div>
                <h3 className="text-white font-semibold mb-4">Programs</h3>
                <ul className="space-y-3">
                  {footerLinks.programs.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-white font-semibold mb-4">Support</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="py-8 border-t border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                <p className="text-gray-300">
                  Get the latest news about our programs, industry insights, and career opportunities.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 flex-1"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="py-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Inlighn Tech. All rights reserved.</p>

              <div className="flex space-x-4 mt-4 md:mt-0">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </SkeletonWrapper>
  )
}
