// src/components/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { TypeAnimation } from 'react-type-animation';
import React from 'react'; // Import React

export function HeroSection() {
  // Smooth scroll handler for the button
  const handleViewWorkClick = () => {
    // Scrolls to the element with id="projects"
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home" // Add id="home" if Navbar links to it
      className="relative h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center overflow-hidden"
    >
      {/* 3D Animation Background */}
      <div className="absolute inset-0 w-full h-full opacity-30 z-0"> {/* Ensure z-0 */}
        <Canvas>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} /> {/* Added autoRotate */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 2, 1]} intensity={0.8} />
          <Sphere args={[1, 100, 200]} scale={2.4}>
            <MeshDistortMaterial
              color="#60a5fa" // blue-400
              attach="material"
              distort={0.5}
              speed={2}
              roughness={0.1} // Added for subtle texture
            />
          </Sphere>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }} // Added slight delay
          className="space-y-6"
        >
          <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }} // Staggered animation
             className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          >
            <TypeAnimation
              sequence={[
                "Hello, I'm Vaishnavi Raykar", 1000,
                "I'm a Full Stack Developer", 1000,
                "I Create Digital Experiences", 1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={true} // Added cursor
            />
          </motion.h1>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.5 }} // Staggered animation
            className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting beautiful and functional web experiences with modern technologies
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }} // Staggered animation
          >
            <button
                onClick={handleViewWorkClick} // Attach handler
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-lg hover:brightness-110 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-black" // Added hover/focus styles
            >
              View My Work
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }} // Delay after content animates
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10" // Ensure z-10
        title="Scroll down" // Added tooltip
      >
        <div className="w-6 h-10 border-2 border-blue-500/70 rounded-full p-1 cursor-pointer hover:border-blue-500 transition-colors"
             onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })} // Scroll to next section
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-2 h-2 bg-blue-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}