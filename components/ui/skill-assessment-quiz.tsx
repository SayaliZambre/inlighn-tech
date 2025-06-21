"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Brain, Trophy } from "lucide-react"
import { LiquidProgress } from "@/components/ui/liquid-progress"
import { LiquidButton } from "@/components/ui/liquid-button"

const questions = [
  {
    id: 1,
    question: "What is your primary interest in technology?",
    options: [
      { text: "Building web applications", track: "fullstack", points: 3 },
      { text: "Protecting systems from threats", track: "cybersecurity", points: 3 },
      { text: "Analyzing data patterns", track: "datascience", points: 3 },
      { text: "Creating business insights", track: "dataanalysis", points: 3 },
    ],
  },
  {
    id: 2,
    question: "Which programming language interests you most?",
    options: [
      { text: "JavaScript/TypeScript", track: "fullstack", points: 2 },
      { text: "Python", track: "datascience", points: 2 },
      { text: "SQL", track: "dataanalysis", points: 2 },
      { text: "I prefer learning security tools", track: "cybersecurity", points: 2 },
    ],
  },
  {
    id: 3,
    question: "What type of problems do you enjoy solving?",
    options: [
      { text: "User interface challenges", track: "fullstack", points: 2 },
      { text: "Security vulnerabilities", track: "cybersecurity", points: 2 },
      { text: "Complex data puzzles", track: "datascience", points: 2 },
      { text: "Business optimization", track: "dataanalysis", points: 2 },
    ],
  },
]

const trackInfo = {
  fullstack: {
    name: "Full Stack Development",
    description: "Build modern web applications from front to back",
    color: "from-blue-500 to-cyan-500",
    icon: "💻",
  },
  cybersecurity: {
    name: "Cybersecurity",
    description: "Protect systems and data from digital threats",
    color: "from-red-500 to-pink-500",
    icon: "🛡️",
  },
  datascience: {
    name: "Data Science",
    description: "Extract insights from complex datasets using AI/ML",
    color: "from-green-500 to-emerald-500",
    icon: "🧠",
  },
  dataanalysis: {
    name: "Data Analysis",
    description: "Transform raw data into actionable business insights",
    color: "from-purple-500 to-violet-500",
    icon: "📊",
  },
}

export function SkillAssessmentQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Array<{ track: string; points: number }>>([])
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const handleAnswer = (option: { track: string; points: number }, optionIndex: number) => {
    setSelectedOption(optionIndex)

    setTimeout(() => {
      const newAnswers = [...answers, option]
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        calculateResult(newAnswers)
      }
    }, 1000)
  }

  const calculateResult = (allAnswers: Array<{ track: string; points: number }>) => {
    const scores = allAnswers.reduce(
      (acc, answer) => {
        acc[answer.track] = (acc[answer.track] || 0) + answer.points
        return acc
      },
      {} as Record<string, number>,
    )

    const recommendedTrack = Object.entries(scores).reduce((a, b) =>
      scores[a[0]] > scores[b[0]] ? a : b,
    )[0] as keyof typeof trackInfo

    setShowResult(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setSelectedOption(null)
  }

  const getRecommendedTrack = () => {
    const scores = answers.reduce(
      (acc, answer) => {
        acc[answer.track] = (acc[answer.track] || 0) + answer.points
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(scores).reduce((a, b) => (scores[a[0]] > scores[b[0]] ? a : b))[0] as keyof typeof trackInfo
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <Card className="bg-white/5 dark:bg-white/5 border-white/10 backdrop-blur-sm max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-white flex items-center justify-center gap-2">
          <Brain className="h-6 w-6 text-purple-400" />
          AI Career Path Assessment
        </CardTitle>
        <p className="text-gray-300">Discover your ideal tech specialization</p>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
                </div>
                <LiquidProgress value={progress} showWaves={true} color="purple" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-6">{questions[currentQuestion].question}</h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option, index)}
                    disabled={selectedOption !== null}
                    className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                      selectedOption === index
                        ? "bg-blue-500/20 border-blue-500 text-white"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                    }`}
                    whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.text}</span>
                      {selectedOption === index && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-6">
                <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Assessment Complete!</h3>
                <p className="text-gray-300">Based on your answers, we recommend:</p>
              </div>

              {(() => {
                const track = getRecommendedTrack()
                const info = trackInfo[track]
                return (
                  <div className="mb-8">
                    <div
                      className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center text-3xl`}
                    >
                      {info.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">{info.name}</h4>
                    <p className="text-gray-300 mb-4">{info.description}</p>
                    <Badge className={`bg-gradient-to-r ${info.color} text-white border-0`}>Perfect Match</Badge>
                  </div>
                )
              })()}

              <div className="flex flex-col sm:flex-row gap-4">
                <LiquidButton onClick={resetQuiz} variant="outline" className="flex-1">
                  Retake Assessment
                </LiquidButton>
                <LiquidButton className="flex-1">Explore Program</LiquidButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
