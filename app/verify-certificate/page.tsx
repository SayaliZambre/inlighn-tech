"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Award, Calendar, User, CheckCircle, AlertCircle, Download, Share2 } from "lucide-react"

interface Certificate {
  id: string
  studentName: string
  program: string
  issueDate: string
  completionDate: string
  grade: string
  instructor: string
  skills: string[]
  verified: boolean
}

const sampleCertificate: Certificate = {
  id: "INLT-2024-FS-001234",
  studentName: "John Doe",
  program: "Full Stack Development",
  issueDate: "2024-03-15",
  completionDate: "2024-03-10",
  grade: "A+",
  instructor: "David Kim",
  skills: ["React.js", "Node.js", "MongoDB", "AWS", "Docker"],
  verified: true,
}

export default function VerifyCertificatePage() {
  const [certificateId, setCertificateId] = useState("")
  const [searchResult, setSearchResult] = useState<Certificate | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchAttempted, setSearchAttempted] = useState(false)

  const handleSearch = async () => {
    setIsSearching(true)
    setSearchAttempted(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (certificateId.toLowerCase().includes("inlt") || certificateId === "demo") {
      setSearchResult(sampleCertificate)
    } else {
      setSearchResult(null)
    }

    setIsSearching(false)
  }

  const handleDownload = () => {
    // Simulate certificate download
    console.log("Downloading certificate...")
  }

  const handleShare = () => {
    // Simulate certificate sharing
    console.log("Sharing certificate...")
  }

  return (
    <div className="pt-16">
      {" "}
      {/* Add padding-top for fixed navbar */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                Certificate Verification
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Verify Your
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  Certificate
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Enter your certificate ID to verify its authenticity and view detailed information about your
                achievement.
              </p>

              {/* Search Section */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter Certificate ID (e.g., INLT-2024-FS-001234)"
                        value={certificateId}
                        onChange={(e) => setCertificateId(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
                      />
                    </div>
                    <Button
                      onClick={handleSearch}
                      disabled={isSearching || !certificateId.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 px-8"
                    >
                      {isSearching ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Search className="h-4 w-4 mr-2" />
                      )}
                      {isSearching ? "Verifying..." : "Verify"}
                    </Button>
                  </div>

                  <p className="text-gray-400 text-sm mt-4 text-center">
                    Try "demo" or any ID containing "INLT" for a sample result
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Search Results */}
        {searchAttempted && (
          <section className="pb-20 px-4">
            <div className="max-w-4xl mx-auto">
              {searchResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Verification Status */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center mb-4">
                        {searchResult.verified ? (
                          <div className="flex items-center text-green-400">
                            <CheckCircle className="h-8 w-8 mr-3" />
                            <span className="text-2xl font-bold">Certificate Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-400">
                            <AlertCircle className="h-8 w-8 mr-3" />
                            <span className="text-2xl font-bold">Certificate Not Verified</span>
                          </div>
                        )}
                      </div>
                      <p className="text-center text-gray-300">
                        This certificate has been verified as authentic and issued by Inlighn Tech.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Certificate Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Certificate Preview */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Award className="h-5 w-5 mr-2 text-yellow-400" />
                          Certificate Preview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gradient-to-br from-blue-900 to-purple-900 p-8 rounded-lg border border-white/20 text-center">
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Inlighn Tech</h3>
                            <p className="text-blue-300">Certificate of Completion</p>
                          </div>

                          <div className="mb-6">
                            <p className="text-gray-300 mb-2">This is to certify that</p>
                            <h4 className="text-3xl font-bold text-white mb-2">{searchResult.studentName}</h4>
                            <p className="text-gray-300 mb-2">has successfully completed</p>
                            <h5 className="text-xl font-semibold text-blue-300">{searchResult.program}</h5>
                          </div>

                          <div className="flex justify-between items-center text-sm text-gray-400">
                            <span>ID: {searchResult.id}</span>
                            <span>Grade: {searchResult.grade}</span>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                          <Button
                            onClick={handleDownload}
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            onClick={handleShare}
                            variant="outline"
                            className="flex-1 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Certificate Information */}
                    <div className="space-y-6">
                      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <User className="h-5 w-5 mr-2 text-blue-400" />
                            Student Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-gray-400 text-sm">Full Name</label>
                            <p className="text-white font-medium">{searchResult.studentName}</p>
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">Program</label>
                            <p className="text-white font-medium">{searchResult.program}</p>
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">Final Grade</label>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              {searchResult.grade}
                            </Badge>
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">Instructor</label>
                            <p className="text-white font-medium">{searchResult.instructor}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-purple-400" />
                            Program Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-gray-400 text-sm">Completion Date</label>
                            <p className="text-white font-medium">
                              {new Date(searchResult.completionDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">Issue Date</label>
                            <p className="text-white font-medium">
                              {new Date(searchResult.issueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">Certificate ID</label>
                            <p className="text-white font-mono text-sm bg-white/10 p-2 rounded">{searchResult.id}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-white">Skills Acquired</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {searchResult.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-white/10 text-white border-white/20">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
                    <CardContent className="p-12">
                      <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4">Certificate Not Found</h3>
                      <p className="text-gray-300 mb-6">
                        The certificate ID you entered could not be found in our database. Please check the ID and try
                        again.
                      </p>
                      <Button
                        onClick={() => {
                          setCertificateId("")
                          setSearchResult(null)
                          setSearchAttempted(false)
                        }}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                      >
                        Try Again
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* How to Find Your Certificate ID */}
        <section className="py-20 px-4 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                How to Find Your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Certificate ID
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Check Your Email</h3>
                  <p className="text-gray-300 text-sm">
                    Your certificate ID was sent to your registered email address upon program completion.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Student Portal</h3>
                  <p className="text-gray-300 text-sm">
                    Log into your student portal to access all your certificates and their IDs.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Contact Support</h3>
                  <p className="text-gray-300 text-sm">
                    Can't find your ID? Contact our support team with your full name and program details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
