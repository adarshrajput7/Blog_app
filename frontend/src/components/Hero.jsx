
import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* ✅ Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* ✅ Left Side - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              🚀 Now Available
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Build Amazing
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Websites Faster
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
              Create stunning, responsive websites with React and Tailwind CSS. 
              Modern components, beautiful design, and seamless animations.
            </p>

            {/* ✅ CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
              >
                <PlayCircle className="w-5 h-5" />
                Watch Demo
              </Link>
            </div>

            {/* ✅ Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">10K+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">500+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Components</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">4.9⭐</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
              </div>
            </div>
          </div>

          {/* ✅ Right Side - Image/Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Main Image */}
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Hero Illustration"
                className="rounded-2xl shadow-2xl border-4 border-white dark:border-gray-700"
              />
              
              {/* Floating Card 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center gap-3 animate-bounce">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Completed</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">12 Projects</p>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center gap-3 animate-pulse">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Fast Loading</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">0.8s average</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero