// src/components/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { TypeAnimation } from 'react-type-animation';
import React from 'react'; // Keep React import

// Define props type including the navigation callback
interface HeroSectionProps {
  // Updated to include 'up' for type consistency, although Hero won't call it with 'up'
  onNavigate: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

// Update component signature to accept props
export function HeroSection({ onNavigate }: HeroSectionProps) {

  // Use the passed-in navigation function
  const handleViewWorkClick = () => {
    // Navigate 'down' (we'll map this to 'projects' in the parent)
    onNavigate('down');
  };

  return (
    // Add w-full h-full here to ensure it fills its motion container
    <section
      id="home" // Keep id if needed elsewhere, but navigation uses state now
      className="relative w-full h-full bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center overflow-hidden"
    >
      {/* 3D Animation Background */}
      <div className="absolute inset-0 w-full h-full opacity-30 z-0">
        <Canvas>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 2, 1]} intensity={0.8} />
          <Sphere args={[1, 100, 200]} scale={2.4}>
            <MeshDistortMaterial
              color="#60a5fa"
              attach="material"
              distort={0.5}
              speed={2}
              roughness={0.1}
            />
          </Sphere>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          // Removed initial/animate/transition here - parent motion.div handles entrance
          className="space-y-6"
        >
          <motion.h1
             initial={{ opacity: 0, y: 20 }} // Keep inner animations for elements
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]" // Adjusted text sizes
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
              cursor={true}
            />
          </motion.h1>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed" // Adjusted text sizes
          >
            Crafting beautiful and functional web experiences with modern technologies
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <button
                onClick={handleViewWorkClick} // Use updated handler
                className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-lg hover:brightness-110 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-black" // Adjusted padding
            >
              View My Work {/* This will now navigate down */}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* REMOVED Scroll Indicator - Navigation arrows will replace this */}

    </section>
  );
}
