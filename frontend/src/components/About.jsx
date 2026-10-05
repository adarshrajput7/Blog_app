import { AiOutlineDiscord, AiOutlineHome } from "react-icons/ai"
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa"
import { FiGithub } from "react-icons/fi"
import { Link } from "react-router-dom"


const About = () => {
  return (
    <div className="">
      <section className="relative overflow-hidden py-16 lg:py-24 px-5">
        {/* Decorative background */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-60" />

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl rounded-3xl p-5 sm:p-10 lg:p-14">

            {/* Heading */}
            <div className="text-center mb-8 lg:mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
                ABOUT US
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                Ideas That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Inspire
                </span>
              </h1>

              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mt-5" />
            </div>

            {/* Content */}
            <div className="text-gray-600 text-base sm:text-lg lg:text-xl leading-8 lg:leading-9 space-y-6">

              <p className="text-gray-700 text-lg lg:text-2xl font-medium leading-relaxed">
                Welcome to our blog — a place where ideas, knowledge, and experiences
                come together.
              </p>

              <p>
                Our goal is to share useful, interesting, and easy-to-understand
                content that adds value to your everyday life. From informative
                articles and helpful tips to inspiring ideas and the latest trends,
                we aim to bring something valuable for every reader.
              </p>

              <p>
                We believe that great content should be simple, meaningful, and
                enjoyable to read. That's why we focus on creating articles that are
                not only informative but also practical and easy to understand.
              </p>

              <p>
                Whether you're here to learn something new, find useful information,
                or simply enjoy a good read, we're happy to have you here.
              </p>

            </div>

            {/* Bottom message */}
            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <p className="text-xl lg:text-2xl font-semibold text-gray-800">
                Keep reading.{" "}
                <span className="text-blue-600">Keep learning.</span>{" "}
                <span className="text-purple-600">Keep growing.</span>
              </p>
            </div>

            <div className="flex mt-15 gap-5 items-center justify-center">
              <Link
                to="/"
                className="group flex items-center justify-center w-10 h-10 rounded-full 
    bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
    transition-all duration-300 ease-out
    hover:scale-125 hover:-translate-y-1 hover:bg-purple-500 hover:text-white
    hover:shadow-lg hover:shadow-purple-500/40"
              >
                <AiOutlineHome
                  size={25}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </Link>

              {/* Instagram */}
              <Link
                to="http://instagram.com/theroyalrajput_7" target="_blank"
                className="group flex items-center justify-center w-10 h-10 rounded-full
    bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
    transition-all duration-300 hover:scale-125 hover:-translate-y-1
    hover:bg-pink-500 hover:text-white hover:shadow-lg hover:shadow-pink-500/40"
              >
                <FaInstagram
                  size={23}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </Link>

              {/* Github */}
              <Link
                to="https://github.com/adarshrajput7" target="_blank"
                className="group flex items-center justify-center w-10 h-10 rounded-full
    bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
    transition-all duration-300 hover:scale-125 hover:-translate-y-1
    hover:bg-gray-900 hover:text-white hover:shadow-lg hover:shadow-gray-500/40"
              >
                <FiGithub
                  size={23}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </Link>

              {/* Discord */}
              <Link
                to="https://discord.com/login" target="_blank"
                className="group flex items-center justify-center w-10 h-10 rounded-full
    bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
    transition-all duration-300 hover:scale-125 hover:-translate-y-1
    hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/40"
              >
                <AiOutlineDiscord
                  size={25}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </Link>

              {/* LinkedIn */}
              <Link
                to="https://www.linkedin.com/in/adarsh-%E2%80%8E-420353210/" target="_blank"
                className="group flex items-center justify-center w-10 h-10 rounded-full
    bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
    transition-all duration-300 hover:scale-125 hover:-translate-y-1
    hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/40"
              >
                <FaLinkedin
                  size={23}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </Link>

              {/* Facebook */}
              <Link
                to="https://facebook.com" target="_blank"
                className="group flex items-center justify-center w-10 h-10 rounded-full
    bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
    transition-all duration-300 hover:scale-125 hover:-translate-y-1
    hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40"
              >
                <FaFacebookSquare
                  size={23}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </Link>
            </div>

          </div>


        </div>


      </section>



    </div>
  )
}

export default About
