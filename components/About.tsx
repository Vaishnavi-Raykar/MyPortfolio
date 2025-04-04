import React from 'react';
import { motion } from 'framer-motion'; // For potential animations

const About: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-gradient-to-br from-gray-900 to-black text-white"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side: Image or 3D element */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            {/* Replace this with your image or a 3D animated component */}
            <img
              src="/images/placeholder-about.jpg" // Replace with your image path
              alt="Your Profile"
              className="w-full h-auto object-cover rounded-lg"
            />
            {/* Or, if you have a 3D animation:
            <div className="w-full h-64 md:h-96 bg-gray-800 flex items-center justify-center">
              {/* Your 3D animated component here */}
            {/* </div> */}
          </div>

          {/* Right side: Text content */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-indigo-400">About Me</h2>
            <p className="text-lg text-gray-300 mb-4">
              👋 Hi, I'm **Your Name**, a passionate Full Stack Developer with [Number] years of experience in crafting beautiful and functional web applications. I specialize in using modern technologies like **TypeScript**, **React**, and **Next.js** to build scalable and user-friendly solutions.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              I'm driven by a desire to create innovative and impactful digital experiences. My expertise lies in [mention 2-3 key skills or areas of focus, e.g., front-end development with React, back-end development with Node.js, and building RESTful APIs]. I'm also keen on exploring the possibilities of 3D in web interfaces to create more engaging user experiences.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              In my free time, I enjoy [mention a hobby or interest]. I'm always eager to learn new technologies and collaborate on exciting projects.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
              View My Projects
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;