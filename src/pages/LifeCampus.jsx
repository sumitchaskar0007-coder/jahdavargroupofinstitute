import React from "react"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
  Users,
  BookOpen,
  Trophy,
  Heart,
  Sparkles,
  Music,
  Users2,
  Target,
  Globe,
  Code,
  Lightbulb,
  Award,
  Zap,
} from "lucide-react"

export default function LifeCampus() {
  // Gallery images array
  const galleryImages = [
    "/assets/life/1.jpeg",
    "/assets/life/2.jpeg",
    "/assets/life/3.jpeg",
    "/assets/life/4.jpeg",
    "/assets/life/5.jpeg",
    "/assets/life/6.jpeg",
    "/assets/life/7.jpeg",
    "/assets/life/8.jpeg",
  ]

  const [currentImage, setCurrentImage] = useState(0)

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % galleryImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [galleryImages.length])

  return (
    <>
      <Helmet>
        <title>Life @ Jadhavar College of Law | Transformative Experience</title>
        <meta
          name="description"
          content="Experience exceptional student life at Jadhavar College of Law. Moot courts, legal aid, cultural programs, sports, seminars, and professional networking. Be part of Jadhavar's legacy."
        />
      </Helmet>

      {/* ================= HERO SECTION ================= */}

      <section className="relative min-h-screen bg-gradient-to-br from-[#0F2F5F] via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Sparkles className="w-full h-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Life @ Jadhavar College of Law
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed mb-4">
              Where Excellence Meets Opportunity. Experience a transformative journey at one of India's premier law institutions under the visionary Jadhavar Group.
            </p>
            
            <p className="text-lg text-blue-200 mb-8">
              Part of a 50+ year legacy of educational excellence spanning law, nursing, management, and academics across multiple campuses in Pune.
            </p>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:shadow-lg transition hover:scale-105 transform">
                Join Our Community
              </button>
              <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition">
                Explore More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= STUDENT ENGAGEMENT ================= */}

      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Development at Jadhavar
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We believe in holistic education that balances academic rigor with practical skills, character building, and professional excellence. Our students don't just learn law; they live it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition border-l-4 border-blue-600"
          >
            <Trophy className="h-12 w-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-bold mb-3">Moot Court Excellence</h3>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start"><span className="text-blue-600 mr-2">✓</span>India's premier moot court arena</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">✓</span>National & international court simulations</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">✓</span>Expert advocacy training</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">✓</span>Regular inter-college competitions</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">✓</span>Professional legal argumentation skills</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-indigo-50 p-8 rounded-xl shadow hover:shadow-lg transition border-l-4 border-indigo-600"
          >
            <Heart className="h-12 w-12 text-indigo-700 mb-4" />
            <h3 className="text-xl font-bold mb-3">Legal Aid & Community Service</h3>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start"><span className="text-indigo-600 mr-2">✓</span>Active legal aid cell helping underprivileged</li>
              <li className="flex items-start"><span className="text-indigo-600 mr-2">✓</span>Legal awareness drives across communities</li>
              <li className="flex items-start"><span className="text-indigo-600 mr-2">✓</span>Government liaison programs</li>
              <li className="flex items-start"><span className="text-indigo-600 mr-2">✓</span>Corporate social responsibility projects</li>
              <li className="flex items-start"><span className="text-indigo-600 mr-2">✓</span>Real-world case study exposure</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-purple-50 p-8 rounded-xl shadow hover:shadow-lg transition border-l-4 border-purple-600"
          >
            <Award className="h-12 w-12 text-purple-700 mb-4" />
            <h3 className="text-xl font-bold mb-3">Industry Partnerships</h3>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start"><span className="text-purple-600 mr-2">✓</span>Guest lectures from top legal professionals</li>
              <li className="flex items-start"><span className="text-purple-600 mr-2">✓</span>Internship opportunities with leading firms</li>
              <li className="flex items-start"><span className="text-purple-600 mr-2">✓</span>Career mentorship programs</li>
              <li className="flex items-start"><span className="text-purple-600 mr-2">✓</span>Placement support & interview coaching</li>
              <li className="flex items-start"><span className="text-purple-600 mr-2">✓</span>Professional networking events</li>
            </ul>
          </motion.div>

        </div>
      </section>

      {/* ================= CAMPUS GALLERY AUTO SLIDER ================= */}

      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Campus Life in Action
          </h2>
          <p className="text-gray-600 text-lg">
            Snapshots of vibrant campus life - from moot courts to cultural festivals, seminars with renowned legal minds to celebration of diverse traditions.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          {/* Gallery Image */}
          <img
            src={galleryImages[currentImage]}
            alt={`Campus Gallery ${currentImage + 1}`}
            className="w-full h-[500px] object-cover transition-opacity duration-700 ease-in-out"
          />
          
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentImage === index 
                    ? "bg-yellow-400 w-6" 
                    : "bg-white/70 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CAMPUS CULTURE ================= */}

      <section className="py-20 bg-gradient-to-b from-blue-50 to-white px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Jadhavar Advantage: Beyond the Classroom
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Being part of the Jadhavar Group connects you to a vast network spanning education, healthcare, and management sectors with 50+ years of excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-blue-200 rounded-xl p-8 shadow hover:shadow-lg transition"
          >
            <Music className="h-12 w-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-bold mb-3">Annual Celebrations</h3>
            <p className="text-gray-700 mb-3 font-semibold">Our campus celebrates diversity and talent through:</p>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex items-start"><span className="mr-2">•</span>Annual Founder's Day celebrations</li>
              <li className="flex items-start"><span className="mr-2">•</span>Inter-college cultural festivals</li>
              <li className="flex items-start"><span className="mr-2">•</span>Graduation ceremonies & award nights</li>
              <li className="flex items-start"><span className="mr-2">•</span>Sports day & athletics championship</li>
              <li className="flex items-start"><span className="mr-2">•</span>Traditional & modern art exhibitions</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white border-2 border-red-200 rounded-xl p-8 shadow hover:shadow-lg transition"
          >
            <Heart className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Social Impact</h3>
            <p className="text-gray-700 mb-3 font-semibold">Our commitment to nation-building includes:</p>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex items-start"><span className="mr-2">•</span>NSS projects & community volunteering</li>
              <li className="flex items-start"><span className="mr-2">•</span>Legal rights awareness drives</li>
              <li className="flex items-start"><span className="mr-2">•</span>Blood donation & health camps</li>
              <li className="flex items-start"><span className="mr-2">•</span>Environmental sustainability initiatives</li>
              <li className="flex items-start"><span className="mr-2">•</span>Women empowerment programs</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border-2 border-green-200 rounded-xl p-8 shadow hover:shadow-lg transition"
          >
            <Zap className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Career Pathways</h3>
            <p className="text-gray-700 mb-3 font-semibold">Your future is secured through:</p>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex items-start"><span className="mr-2">•</span>95%+ placement success rate</li>
              <li className="flex items-start"><span className="mr-2">•</span>Internships at top law firms</li>
              <li className="flex items-start"><span className="mr-2">•</span>Judicial clerkship opportunities</li>
              <li className="flex items-start"><span className="mr-2">•</span>Corporate legal roles</li>
              <li className="flex items-start"><span className="mr-2">•</span>Entrepreneurship support</li>
            </ul>
          </motion.div>

        </div>

        {/* Additional Features Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-8 border border-blue-300"
          >
            <Lightbulb className="h-12 w-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900">Research & Innovation</h3>
            <p className="text-gray-700">
              Our law school promotes original research through publication opportunities, law reviews, and collaborative research projects with national and international institutions. Students engage in cutting-edge legal scholarship.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-8 border border-purple-300"
          >
            <Globe className="h-12 w-12 text-purple-700 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900">International Exposure</h3>
            <p className="text-gray-700">
              Exchange programs, international moot participations, and partnerships with global universities enrich our students' perspectives on international law and global legal practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}

      <section className="py-20 bg-[#0F2F5F] text-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Experience Excellence at Jadhavar College of Law
          </h2>
          <p className="text-lg text-blue-200 mb-8">
            Join a disciplined, inspiring, and growth-oriented academic environment
            designed to shape future legal professionals.
          </p>

          <button className="px-8 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:shadow-lg transition">
            Apply for Admission
          </button>
        </div>
      </section>
    </>
  )
}