// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

// Updated navLinks with section IDs instead of page routes
const navLinks = [
  { name: "Home", sectionId: "hero" },
  { name: "Skills", sectionId: "skills" },
  { name: "Experience", sectionId: "experience" },
  { name: "Projects", sectionId: "projects" },
  { name: "Contact", sectionId: "contact" },
];

// Framer Motion Variants (keep as is)
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1 
    } 
  }
};

const mobileMenuVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: { 
    opacity: 1, 
    scaleY: 1,
    transition: { 
      duration: 0.3,
      staggerChildren: 0.05 
    } 
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { 
      delay: i * 0.05,
      duration: 0.3 
    }
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
};

// Updated interface for props
interface NavbarProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Simplified scroll listener
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle section navigation
  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all bg-slate-950 duration-300 ease-in-out ${
        isScrolled || isMobileMenuOpen
          ? "bg-black/70 backdrop-blur-lg shadow-lg border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo / Name */}
          <button 
            onClick={() => navigateToSection("hero")} 
            className="flex items-center z-10"
          >
            <motion.span
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.03, textShadow: "0 0 8px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              Vaishnavi Raykar
            </motion.span>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <button
                  key={link.name}
                  onClick={() => navigateToSection(link.sectionId)}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <motion.span className="relative z-10 inline-block">
                    {link.name}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-link"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-md z-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition z-10"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md shadow-xl border-t border-white/10"
            style={{ originY: 0 }}
          >
            <div className="px-3 pt-3 pb-4 space-y-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <motion.div
                    key={link.name}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <button
                      onClick={() => navigateToSection(link.sectionId)}
                      className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}