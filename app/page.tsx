'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { TypeAnimation } from 'react-type-animation';
import Navbar from '@/components/Navbar';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Animation Background */}
        <div className="absolute inset-0 w-full h-full opacity-50">
          <Canvas>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 2, 1]} />
            <Sphere args={[1, 100, 200]} scale={2.4}>
              <MeshDistortMaterial
                color="#3b82f6"
                attach="material"
                distort={0.5}
                speed={2}
              />
            </Sphere>
          </Canvas>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              <TypeAnimation
                sequence={[
                  'Hello, I\'m Vaishnavi Raykar',
                  1000,
                  'I\'m a Full Stack Developer',
                  1000,
                  'I Create Digital Experiences',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Crafting beautiful and functional web experiences with modern technologies
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
                View My Work
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full p-1">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </section>

      <Navbar />
      <Experience />
      <Projects />
      <Contact />
      <Skills />
    </main>
  );
}



