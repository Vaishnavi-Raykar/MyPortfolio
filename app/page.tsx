// src/app/page.tsx
'use client';

// Keep necessary imports for this file
import Navbar from '@/components/Navbar';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
// import About from '@/components/About'; // Uncomment if needed

// Import the new HeroSection component
import { HeroSection } from '@/components/HeroSection'; // Adjust path if necessary

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white"> {/* Adjusted background */}
      <Navbar />

      {/* Render the Hero Section component */}
      <HeroSection />

      {/* Render the rest of your sections */}
      {/* <About /> */}
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}