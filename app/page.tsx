"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Code, Database, BarChart3, Users, Award, Zap, Globe, Sparkles } from "lucide-react"
import { Suspense, useEffect } from "react"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { SkillAssessmentQuiz } from "@/components/ui/skill-assessment-quiz"
import { CodePlayground } from "@/components/ui/code-playground"
import { LiquidButton } from "@/components/ui/liquid-button"
import { LiquidCard } from "@/components/ui/liquid-card"
import { LiquidSectionDivider } from "@/components/ui/liquid-section-divider"
import { LiquidInkSplash } from "@/components/ui/liquid-ink-splash"
import { LiquidMorphingBlob } from "@/components/ui/liquid-morphing-blob"
import { LiquidTestimonialCard } from "@/components/ui/liquid-testimonial-card"
import { SkeletonWrapper } from "@/components/ui/skeleton-wrapper"
import { ProgramCardSkeleton } from "@/components/skeletons/program-card-skeleton"
import { TestimonialSkeleton } from "@/components/skeletons/testimonial-skeleton"
import { StatsSkeleton } from "@/components/skeletons/stats-skeleton"
import { QuizSkeleton } from "@/components/skeletons/quiz-skeleton"
import { CodePlaygroundSkeleton } from "@/components/skeletons/code-playground-skeleton"
import { HeroSkeleton } from "@/components/skeletons/hero-skeleton"
import { useLoadingSimulation } from "@/hooks/use-loading-simulation"
import { AIChatAssistant } from "@/components/ui/ai-chat-assistant"
import { Interactive3DSkillTree } from "@/components/ui/interactive-3d-skill-tree"
import { HolographicDisplay } from "@/components/ui/holographic-display"
import { GestureControlledInterface } from "@/components/ui/gesture-controlled-interface"
import { RealTimeCollaboration } from "@/components/ui/real-time-collaboration"
import { KineticTypography } from "@/components/ui/kinetic-typography"
import { SplitTextAnimation } from "@/components/ui/split-text-animation"
import { MorphingText } from "@/components/ui/morphing-text"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { FloatingText } from "@/components/ui/floating-text"
import { TextReveal } from "@/components/ui/text-reveal"

function AnimatedSphere() {
  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial color="#6366f1" attach="material" distort={0.3} speed={1.5} roughness={0} />
      </Sphere>
    </Float>
  )
}

function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  )
}

const programs = [
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Master ethical hacking, network security, and digital forensics",
    duration: "6 months",
    level: "Intermediate",
    color: "from-red-500 to-pink-500",
    students: "1200+",
  },
  {
    icon: Code,
    title: "Full Stack Development",
    description: "Build modern web applications with cutting-edge technologies",
    duration: "8 months",
    level: "Beginner to Advanced",
    color: "from-blue-500 to-cyan-500",
    students: "2500+",
  },
  {
    icon: Database,
    title: "Data Science",
    description: "Analyze complex data and build predictive models",
    duration: "7 months",
    level: "Intermediate",
    color: "from-green-500 to-emerald-500",
    students: "800+",
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    description: "Transform raw data into actionable business insights",
    duration: "5 months",
    level: "Beginner",
    color: "from-purple-500 to-violet-500",
    students: "1500+",
  },
]

const stats = [
  { icon: Users, value: 5000, suffix: "+", label: "Students Trained" },
  { icon: Award, value: 95, suffix: "%", label: "Placement Rate" },
  { icon: Zap, value: 50, suffix: "+", label: "Industry Partners" },
  { icon: Globe, value: 25, suffix: "+", label: "Countries Reached" },
]

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google",
    content:
      "The Full Stack program transformed my career. The hands-on approach and real-world projects prepared me perfectly for the industry.",
    rating: 5,
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Cybersecurity Analyst",
    company: "Microsoft",
    content:
      "Inlighn Tech's cybersecurity program is top-notch. The instructors are industry experts and the curriculum is cutting-edge.",
    rating: 5,
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Data Scientist",
    company: "Netflix",
    content: "The data science program exceeded my expectations. I landed my dream job within 2 months of graduation!",
    rating: 5,
    avatar: "/placeholder.svg?height=48&width=48",
  },
]

export default function HomePage() {
  const heroLoading = useLoadingSimulation({ duration: 1500 })
  const programsLoading = useLoadingSimulation({ duration: 2000, autoStart: false })
  const statsLoading = useLoadingSimulation({ duration: 1800, autoStart: false })
  const testimonialsLoading = useLoadingSimulation({ duration: 2200, autoStart: false })
  const quizLoading = useLoadingSimulation({ duration: 2500, autoStart: false })
  const playgroundLoading = useLoadingSimulation({ duration: 3000, autoStart: false })

  useEffect(() => {
    // Stagger the loading of different sections
    const timers = [
      setTimeout(() => programsLoading.startLoading(), 1000),
      setTimeout(() => statsLoading.startLoading(), 1500),
      setTimeout(() => testimonialsLoading.startLoading(), 2000),
      setTimeout(() => quizLoading.startLoading(), 2500),
      setTimeout(() => playgroundLoading.startLoading(), 3000),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="pt-16 min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <SkeletonWrapper loading={heroLoading.isLoading} skeleton={<HeroSkeleton />} delay={200}>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          {/* Single floating morphing blob */}
          <div className="absolute top-20 right-20 opacity-30 dark:opacity-50">
            <LiquidMorphingBlob size={120} color="#3b82f6" intensity="low" />
          </div>

          <div className="absolute inset-0 w-full h-full opacity-60 dark:opacity-80">
            <Scene3D />
          </div>

          <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Badge className="mb-6 bg-white/80 dark:bg-white/10 text-gray-800 dark:text-white border-gray-300 dark:border-white/20 backdrop-blur-sm text-sm md:text-base px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Next-Gen Tech Education
                </Badge>
              </motion.div>

              {/* Kinetic Typography Hero Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8"
              >
                <KineticTypography
                  text="Shape Your Tech Future"
                  variant="elastic"
                  trigger="load"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-center"
                  speed={0.8}
                  delay={0.5}
                />
                <div className="text-center">
                  <MorphingText
                    texts={["Innovation", "Excellence", "Future", "Success"]}
                    className="text-2xl md:text-3xl font-semibold text-blue-600 dark:text-blue-400"
                    variant="glitch"
                    interval={2000}
                  />
                </div>
              </motion.div>

              <motion.div
                className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <TypewriterEffect
                  text="Immersive internship programs in Cybersecurity, Full Stack Development, Data Science, and Data Analysis designed for the next generation of tech professionals."
                  speed={30}
                  delay={1500}
                  showCursor={true}
                />
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <LiquidInkSplash inkColor="#3b82f6" splashSize="lg">
                  <LiquidButton size="lg" className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                    Explore Programs
                    <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                  </LiquidButton>
                </LiquidInkSplash>

                <LiquidInkSplash inkColor="#8b5cf6" splashSize="md">
                  <LiquidButton
                    variant="outline"
                    size="lg"
                    className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto border-gray-300 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                  >
                    Watch Demo
                  </LiquidButton>
                </LiquidInkSplash>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 md:w-2 md:h-2 bg-blue-500/20 dark:bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </section>
      </SkeletonWrapper>

      <LiquidSectionDivider />

      {/* Programs Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <SplitTextAnimation
              text="Our Programs"
              variant="wave"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              stagger={0.1}
            />
            <TextReveal
              text="Choose from our comprehensive internship programs designed to launch your tech career"
              variant="curtain"
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              delay={0.5}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {programs.map((program, index) => (
              <SkeletonWrapper
                key={program.title}
                loading={programsLoading.isLoading}
                skeleton={<ProgramCardSkeleton />}
                delay={index * 200}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="h-full"
                >
                  <LiquidInkSplash inkColor={program.color.includes("red") ? "#ef4444" : "#3b82f6"}>
                    <LiquidCard className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300 h-full">
                      <div className="p-4 md:p-6">
                        <div
                          className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r ${program.color} flex items-center justify-center mb-4 md:mb-6`}
                        >
                          <program.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          {program.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm md:text-base">
                          {program.description}
                        </p>

                        <div className="flex justify-between items-center mb-4 text-sm">
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200"
                          >
                            {program.duration}
                          </Badge>
                          <span className="text-gray-500 dark:text-gray-400">{program.students}</span>
                        </div>

                        <LiquidButton className="w-full">Learn More</LiquidButton>
                      </div>
                    </LiquidCard>
                  </LiquidInkSplash>
                </motion.div>
              </SkeletonWrapper>
            ))}
          </div>
        </div>
      </section>

      <LiquidSectionDivider color="purple" />

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <SkeletonWrapper
                key={stat.label}
                loading={statsLoading.isLoading}
                skeleton={<StatsSkeleton />}
                delay={index * 150}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <LiquidInkSplash inkColor="#3b82f6" splashSize="sm">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                  </LiquidInkSplash>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{stat.label}</div>
                </motion.div>
              </SkeletonWrapper>
            ))}
          </div>
        </div>
      </section>

      <LiquidSectionDivider />

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <KineticTypography
              text="Student Success Stories"
              variant="3d"
              trigger="scroll"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              speed={1.2}
            />
            <FloatingText
              text="Hear from our graduates who have transformed their careers"
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              intensity="low"
              direction="up"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <SkeletonWrapper
                key={testimonial.id}
                loading={testimonialsLoading.isLoading}
                skeleton={<TestimonialSkeleton />}
                delay={index * 300}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <LiquidTestimonialCard testimonial={testimonial} isActive={index === 1} />
                </motion.div>
              </SkeletonWrapper>
            ))}
          </div>
        </div>
      </section>

      <LiquidSectionDivider color="purple" />

      {/* Skill Assessment Quiz */}
      <section className="py-16 md:py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <SplitTextAnimation
              text="Find Your Perfect Path"
              variant="rotate"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              stagger={0.08}
            />
            <KineticTypography
              text="Take our AI-powered assessment to discover which tech specialization suits you best"
              variant="stretch"
              trigger="scroll"
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              delay={0.3}
            />
          </motion.div>

          <SkeletonWrapper loading={quizLoading.isLoading} skeleton={<QuizSkeleton />} delay={400}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SkillAssessmentQuiz />
            </motion.div>
          </SkeletonWrapper>
        </div>
      </section>

      <LiquidSectionDivider />

      {/* Code Playground */}
      <section className="py-16 md:py-20 px-4 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <TextReveal
              text="Try Before You Enroll"
              variant="wave"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              duration={1.2}
            />
            <TypewriterEffect
              text="Experience our teaching style with interactive code examples from our programs"
              speed={40}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              showCursor={false}
            />
          </motion.div>

          <SkeletonWrapper loading={playgroundLoading.isLoading} skeleton={<CodePlaygroundSkeleton />} delay={500}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CodePlayground />
            </motion.div>
          </SkeletonWrapper>
        </div>
      </section>

      <LiquidSectionDivider color="blue" />
      <LiquidSectionDivider color="cyan" />

      {/* Revolutionary Features Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <KineticTypography
              text="Revolutionary Learning Experience"
              variant="glitch"
              trigger="scroll"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
              speed={1.5}
            />
            <SplitTextAnimation
              text="Experience the future of education with cutting-edge technology that adapts to your learning style"
              variant="fadeUp"
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
              stagger={0.03}
            />
          </motion.div>

          <div className="space-y-16">
            {/* Holographic Display */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Holographic Learning Interface</h3>
              <HolographicDisplay />
            </motion.div>

            {/* 3D Skill Tree */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Interactive 3D Learning Path</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Navigate your learning journey in 3D space. Visualize skill dependencies and track your progress through
                an immersive experience.
              </p>
              <Interactive3DSkillTree />
            </motion.div>

            {/* Real-time Collaboration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <RealTimeCollaboration />
            </motion.div>

            {/* Gesture Control */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <GestureControlledInterface />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <KineticTypography
              text="Ready to Start Your Tech Journey?"
              variant="bounce"
              trigger="scroll"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              speed={1.2}
            />
            <FloatingText
              text="Join thousands of students who have transformed their careers with our immersive programs"
              className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
              intensity="medium"
              direction="random"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LiquidInkSplash inkColor="#3b82f6" splashSize="lg">
                <LiquidButton size="lg" className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                </LiquidButton>
              </LiquidInkSplash>

              <LiquidInkSplash inkColor="#8b5cf6" splashSize="md">
                <LiquidButton
                  variant="outline"
                  size="lg"
                  className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto border-gray-300 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  Schedule a Call
                </LiquidButton>
              </LiquidInkSplash>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Chat Assistant - Integrated at the bottom */}
      <AIChatAssistant />
    </div>
  )
}
