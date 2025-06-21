"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, Headphones } from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    contact: "hello@inlighntech.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team",
    contact: "+1 (555) 123-4567",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with support",
    contact: "Available 24/7",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our office location",
    contact: "123 Tech Street, Silicon Valley",
    color: "from-red-500 to-pink-500",
  },
]

const officeHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM PST" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM PST" },
  { day: "Sunday", hours: "Closed" },
]

const departments = [
  { value: "admissions", label: "Admissions" },
  { value: "support", label: "Technical Support" },
  { value: "careers", label: "Career Services" },
  { value: "partnerships", label: "Partnerships" },
  { value: "general", label: "General Inquiry" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <div className="pt-16">
      {" "}
      {/* Add padding-top for fixed navbar */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">Get in Touch</Badge>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Contact
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  Our Team
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Have questions about our programs? Need support? Want to partner with us? We're here to help and would
                love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full text-center">
                    <CardContent className="p-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} flex items-center justify-center mx-auto mb-6`}
                      >
                        <method.icon className="h-8 w-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
                      <p className="text-gray-300 mb-4">{method.description}</p>
                      <p className="text-blue-400 font-medium">{method.contact}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 px-4 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
                    <p className="text-gray-300">Fill out the form below and we'll get back to you within 24 hours.</p>
                  </CardHeader>
                  <CardContent>
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Send className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-gray-300">Thank you for contacting us. We'll get back to you soon.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-white text-sm font-medium mb-2 block">Full Name *</label>
                            <Input
                              required
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium mb-2 block">Email *</label>
                            <Input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-white text-sm font-medium mb-2 block">Phone Number</label>
                            <Input
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                          <div>
                            <label className="text-white text-sm font-medium mb-2 block">Department</label>
                            <Select
                              value={formData.department}
                              onValueChange={(value) => handleInputChange("department", value)}
                            >
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map((dept) => (
                                  <SelectItem key={dept.value} value={dept.value}>
                                    {dept.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <label className="text-white text-sm font-medium mb-2 block">Subject *</label>
                          <Input
                            required
                            value={formData.subject}
                            onChange={(e) => handleInputChange("subject", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="What's this about?"
                          />
                        </div>

                        <div>
                          <label className="text-white text-sm font-medium mb-2 block">Message *</label>
                          <Textarea
                            required
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
                            placeholder="Tell us more about your inquiry..."
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
                        >
                          {isSubmitting ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : (
                            <Send className="h-4 w-4 mr-2" />
                          )}
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Office Hours */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-400" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {officeHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-300">{schedule.day}</span>
                          <span className="text-white font-medium">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Support */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Headphones className="h-5 w-5 mr-2 text-green-400" />
                      Quick Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Need immediate assistance? Our support team is available to help you with:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        Technical issues
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        Program enrollment
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        Certificate verification
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        Career guidance
                      </li>
                    </ul>
                    <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start Live Chat
                    </Button>
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Users className="h-5 w-5 mr-2 text-purple-400" />
                      Frequently Asked
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">How long are the programs?</h4>
                        <p className="text-gray-300 text-sm">
                          Programs range from 5-8 months depending on the track you choose.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Do you offer job placement?</h4>
                        <p className="text-gray-300 text-sm">
                          Yes, we have a 95% placement rate and work with 50+ industry partners.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Are the programs online or in-person?</h4>
                        <p className="text-gray-300 text-sm">
                          We offer both online and hybrid options to fit your schedule.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-6 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                    >
                      View All FAQs
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Visit Our{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Campus
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Located in the heart of Silicon Valley, our modern campus is equipped with state-of-the-art facilities
              </p>
            </motion.div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="h-96 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-white mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Inlighn Tech Campus</h3>
                    <p className="text-gray-300">123 Tech Street, Silicon Valley, CA 94000</p>
                    <Button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
