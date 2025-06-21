"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { KineticTypography } from "@/components/ui/kinetic-typography"
import { SplitTextAnimation } from "@/components/ui/split-text-animation"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { LiquidCard } from "@/components/ui/liquid-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { FloatingElements } from "@/components/ui/floating-elements"
import { InteractiveCursor } from "@/components/ui/interactive-cursor"
import { SkeletonWrapper } from "@/components/ui/skeleton-wrapper"
import { ProgramCardSkeleton } from "@/components/skeletons/program-card-skeleton"
import { useLoadingSimulation } from "@/hooks/use-loading-simulation"
import {
  Code2,
  Palette,
  Smartphone,
  Globe,
  Database,
  Brain,
  Zap,
  Trophy,
  Clock,
  Users,
  Star,
  Search,
  BookOpen,
  Award,
  Target,
  Rocket,
  Play,
  Download,
  Heart,
  Share2,
} from "lucide-react"

const programs = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description:
      "Master modern web development with React, Node.js, and cloud technologies. Build scalable applications from frontend to backend.",
    icon: Code2,
    category: "Development",
    level: "Beginner to Advanced",
    duration: "6 months",
    students: 2847,
    rating: 4.9,
    price: 15999,
    originalPrice: 25999,
    features: ["React & Next.js", "Node.js & Express", "MongoDB & PostgreSQL", "AWS Deployment", "Real Projects"],
    color: "from-blue-500 to-purple-600",
    popular: true,
    new: false,
  },
  {
    id: 2,
    title: "UI/UX Design Mastery",
    description:
      "Create stunning user experiences with Figma, Adobe XD, and modern design principles. Portfolio-ready projects included.",
    icon: Palette,
    category: "Design",
    level: "Beginner",
    duration: "4 months",
    students: 1923,
    rating: 4.8,
    price: 12999,
    originalPrice: 19999,
    features: ["Figma & Adobe XD", "Design Systems", "User Research", "Prototyping", "Portfolio Building"],
    color: "from-pink-500 to-rose-600",
    popular: false,
    new: true,
  },
  {
    id: 3,
    title: "Mobile App Development",
    description:
      "Build native and cross-platform mobile apps with React Native and Flutter. Deploy to App Store and Play Store.",
    icon: Smartphone,
    category: "Mobile",
    level: "Intermediate",
    duration: "5 months",
    students: 1654,
    rating: 4.7,
    price: 17999,
    originalPrice: 27999,
    features: ["React Native", "Flutter & Dart", "Firebase Integration", "App Store Deployment", "Push Notifications"],
    color: "from-green-500 to-teal-600",
    popular: false,
    new: false,
  },
  {
    id: 4,
    title: "Digital Marketing & SEO",
    description:
      "Master digital marketing strategies, SEO optimization, and social media marketing to grow businesses online.",
    icon: Globe,
    category: "Marketing",
    level: "Beginner",
    duration: "3 months",
    students: 3241,
    rating: 4.6,
    price: 9999,
    originalPrice: 15999,
    features: ["SEO Optimization", "Google Ads", "Social Media Marketing", "Content Strategy", "Analytics"],
    color: "from-orange-500 to-red-600",
    popular: true,
    new: false,
  },
  {
    id: 5,
    title: "Data Science & Analytics",
    description:
      "Dive into data science with Python, machine learning, and AI. Work with real datasets and build predictive models.",
    icon: Database,
    category: "Data Science",
    level: "Intermediate",
    duration: "7 months",
    students: 1876,
    rating: 4.8,
    price: 21999,
    originalPrice: 32999,
    features: ["Python & R", "Machine Learning", "Data Visualization", "SQL & NoSQL", "AI Projects"],
    color: "from-indigo-500 to-blue-600",
    popular: false,
    new: true,
  },
  {
    id: 6,
    title: "Artificial Intelligence",
    description: "Explore the future of AI with deep learning, neural networks, and cutting-edge AI technologies.",
    icon: Brain,
    category: "AI/ML",
    level: "Advanced",
    duration: "8 months",
    students: 987,
    rating: 4.9,
    price: 29999,
    originalPrice: 45999,
    features: ["Deep Learning", "Neural Networks", "Computer Vision", "NLP", "AI Ethics"],
    color: "from-purple-500 to-pink-600",
    popular: false,
    new: true,
  },
]

const categories = ["All", "Development", "Design", "Mobile", "Marketing", "Data Science", "AI/ML"]
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]
const durations = ["All Durations", "1-3 months", "4-6 months", "7+ months"]

export default function ProgramsPage() {
  const [filteredPrograms, setFilteredPrograms] = useState(programs)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedDuration, setSelectedDuration] = useState("All Durations")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [favorites, setFavorites] = useState<number[]>([])
  const { isLoading } = useLoadingSimulation(1500)

  useEffect(() => {
    let filtered = programs

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((program) => program.category === selectedCategory)
    }

    // Filter by level
    if (selectedLevel !== "All Levels") {
      filtered = filtered.filter((program) => program.level.includes(selectedLevel))
    }

    // Filter by duration
    if (selectedDuration !== "All Durations") {
      if (selectedDuration === "1-3 months") {
        filtered = filtered.filter((program) => {
          const months = Number.parseInt(program.duration)
          return months >= 1 && months <= 3
        })
      } else if (selectedDuration === "4-6 months") {
        filtered = filtered.filter((program) => {
          const months = Number.parseInt(program.duration)
          return months >= 4 && months <= 6
        })
      } else if (selectedDuration === "7+ months") {
        filtered = filtered.filter((program) => {
          const months = Number.parseInt(program.duration)
          return months >= 7
        })
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (program) =>
          program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          program.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort programs
    if (sortBy === "popular") {
      filtered = filtered.sort((a, b) => b.students - a.students)
    } else if (sortBy === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "price-low") {
      filtered = filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered = filtered.sort((a, b) => b.price - a.price)
    }

    setFilteredPrograms(filtered)
  }, [selectedCategory, selectedLevel, selectedDuration, searchQuery, sortBy])

  const toggleFavorite = (programId: number) => {
    setFavorites((prev) => (prev.includes(programId) ? prev.filter((id) => id !== programId) : [...prev, programId]))
  }

  const ProgramCard = ({ program }: { program: (typeof programs)[0] }) => {
    const IconComponent = program.icon
    const isFavorite = favorites.includes(program.id)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="h-full"
      >
        <LiquidCard className="h-full group relative overflow-hidden">
          <CardContent className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-r ${program.color} text-white`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div className="flex gap-2">
                {program.popular && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                    <Trophy className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
                {program.new && (
                  <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0">
                    <Zap className="w-3 h-3 mr-1" />
                    New
                  </Badge>
                )}
              </div>
            </div>

            {/* Title */}
            <SplitTextAnimation
              text={program.title}
              variant="fadeUp"
              className="text-xl font-bold mb-3 text-gray-900 dark:text-white"
              trigger="hover"
            />

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-sm leading-relaxed">
              {program.description}
            </p>

            {/* Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {program.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {program.features.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{program.features.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {program.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {program.students.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {program.rating}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{program.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  ₹{program.originalPrice.toLocaleString()}
                </span>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {Math.round((1 - program.price / program.originalPrice) * 100)}% OFF
              </Badge>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <LiquidButton
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                size="sm"
              >
                <Play className="w-4 h-4 mr-2" />
                Enroll Now
              </LiquidButton>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleFavorite(program.id)}
                className={`${isFavorite ? "text-red-500 border-red-200" : ""}`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </LiquidCard>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <InteractiveCursor />
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <KineticTypography
              text="Transform Your Career"
              variant="elastic"
              trigger="load"
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
            />
            <TypewriterEffect
              text="Discover world-class programs designed to make you industry-ready with hands-on projects and expert mentorship."
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
              speed={50}
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12"
          >
            {[
              { label: "Active Students", value: "10,000+", icon: Users },
              { label: "Expert Mentors", value: "500+", icon: Award },
              { label: "Success Rate", value: "95%", icon: Target },
              { label: "Job Placements", value: "8,500+", icon: Rocket },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white mb-2">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("All")}>
                {selectedCategory} ×
              </Badge>
            )}
            {selectedLevel !== "All Levels" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedLevel("All Levels")}>
                {selectedLevel} ×
              </Badge>
            )}
            {selectedDuration !== "All Durations" && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setSelectedDuration("All Durations")}
              >
                {selectedDuration} ×
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                "{searchQuery}" ×
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <SplitTextAnimation
              text={`${filteredPrograms.length} Programs Found`}
              variant="slideIn"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            />
            {filteredPrograms.length > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Showing {filteredPrograms.length} of {programs.length} programs
              </div>
            )}
          </div>

          <SkeletonWrapper
            isLoading={isLoading}
            skeleton={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProgramCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            {filteredPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No programs found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Try adjusting your filters or search terms</p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All")
                    setSelectedLevel("All Levels")
                    setSelectedDuration("All Durations")
                    setSearchQuery("")
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </SkeletonWrapper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <KineticTypography
            text="Ready to Start Your Journey?"
            variant="bounce"
            trigger="scroll"
            className="text-4xl md:text-5xl font-bold mb-6"
          />
          <TypewriterEffect
            text="Join thousands of students who have transformed their careers with our industry-leading programs."
            className="text-xl mb-8 opacity-90"
            speed={40}
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LiquidButton size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Download className="w-5 h-5 mr-2" />
              Download Brochure
            </LiquidButton>
            <LiquidButton
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Users className="w-5 h-5 mr-2" />
              Talk to Counselor
            </LiquidButton>
          </div>
        </div>
      </section>
    </div>
  )
}
