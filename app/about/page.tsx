"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Lightbulb, Award, Heart, Zap } from "lucide-react"
import Image from "next/image"

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from curriculum design to student support.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace cutting-edge technologies and innovative teaching methodologies.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We are passionate about empowering the next generation of tech professionals.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We build a strong community of learners, mentors, and industry professionals.",
  },
  {
    icon: Award,
    title: "Quality",
    description: "We maintain the highest standards in our programs and student outcomes.",
  },
  {
    icon: Zap,
    title: "Impact",
    description: "We measure our success by the positive impact we create in students' careers.",
  },
]

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Former Google engineer with 15+ years in tech education",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Cybersecurity",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Ex-NSA cybersecurity expert and ethical hacking specialist",
  },
  {
    name: "Emily Johnson",
    role: "Lead Data Scientist",
    image: "/placeholder.svg?height=300&width=300",
    bio: "PhD in Machine Learning, former Tesla AI researcher",
  },
  {
    name: "David Kim",
    role: "Full Stack Architect",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Senior engineer at Meta, specializing in scalable web applications",
  },
]

export default function AboutPage() {
  return (
    <div className="pt-16">
      {" "}
      {/* Add padding-top for fixed navbar */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">About Inlighn Tech</Badge>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Empowering the
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  Next Generation
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                At Inlighn Tech, we're on a mission to bridge the gap between academic learning and industry
                requirements. We provide immersive, hands-on internship programs that prepare students for successful
                careers in technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    Founded in 2020 by a team of industry veterans and educators, Inlighn Tech was born from a simple
                    observation: there was a significant gap between what students learn in traditional education and
                    what the industry actually needs.
                  </p>
                  <p>
                    We set out to create a new kind of learning experience—one that combines theoretical knowledge with
                    practical, real-world application. Our programs are designed by industry experts and constantly
                    updated to reflect the latest trends and technologies.
                  </p>
                  <p>
                    Today, we're proud to have trained over 5,000 students across 25+ countries, with a 95% placement
                    rate and partnerships with leading tech companies worldwide.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=500&width=600"
                    alt="Inlighn Tech Office"
                    width={600}
                    height={500}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Values
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">The principles that guide everything we do</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Meet Our{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Industry experts and passionate educators dedicated to your success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-6">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          width={200}
                          height={200}
                          className="w-32 h-32 mx-auto rounded-full object-cover"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-900/30 to-transparent"></div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                      <p className="text-blue-400 mb-3 font-medium">{member.role}</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 bg-black/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Our{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Mission
                </span>
              </h2>
              <p className="text-2xl text-gray-300 leading-relaxed mb-8">
                "To democratize access to high-quality tech education and create a global community of skilled,
                confident, and career-ready technology professionals."
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
