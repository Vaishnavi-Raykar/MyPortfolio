// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi"; // Using react-icons
// import ThemeSwitch from "./ThemeSwitch"; // Keep your ThemeSwitch import

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  // { name: "Experience", href: "#experience" }, // Uncomment if you have this section
  { name: "Contact", href: "#contact" },
];

// Framer Motion Variants
const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ // Accept index 'i'
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.05, // Stagger effect
            duration: 0.2,
            ease: "easeOut",
        },
    }),
    exit: { opacity: 0, x: -20, transition: { duration: 0.1 } } // Faster exit
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home"); // Optional: State for active link

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50); // Trigger change slightly lower down

      // Optional: Active link highlighting based on scroll position
      // Find the section currently in view (this is a basic example)
      let currentBest = "#home";
      navLinks.forEach(link => {
        const element = document.getElementById(link.href.substring(1));
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the top of the section is near the top of the viewport
          if (rect.top <= 100 && rect.bottom >= 100) { // Adjust offset (100px) as needed
              currentBest = link.href;
          }
        }
      });
      setActiveLink(currentBest);
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true }); // Use passive listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-black/60 backdrop-blur-lg shadow-lg border-b border-white/10 py-3" // Glassmorphism active state
          : "bg-transparent py-5" // Initial transparent state
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12"> {/* Fixed height for consistency */}
          {/* Logo / Name */}
          <Link href="#home" className="flex items-center z-10" onClick={closeMobileMenu}>
            <motion.span
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.03, textShadow: "0 0 8px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              Vaishnavi Raykar
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1"> {/* Reduced space for potentially adding ThemeSwitch */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeLink === link.href
                      ? 'text-white' // Active link style
                      : 'text-gray-300 hover:text-white' // Non-active link style
                }`}
                onClick={() => setActiveLink(link.href)} // Set active link on click immediately
              >
                <motion.span
                  whileHover={{ y: -1 }}
                  className="relative z-10 inline-block" // Ensure text is above hover effect
                >
                  {link.name}
                </motion.span>
                {/* Animated underline/background */}
                {activeLink === link.href && (
                  <motion.div
                    layoutId="active-nav-link" // Animate layout changes between active links
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                 {/* Subtle hover background */}
                 <motion.div
                    className="absolute inset-0 bg-white/10 rounded-md z-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                />
              </Link>
            ))}
             {/* Add ThemeSwitch here if needed */}
             {/* <div className="ml-4">
                <ThemeSwitch theme="light" toggleTheme={() => console.log("Toggle theme")} />
             </div> */}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             {/* ThemeSwitch for mobile can go here */}
             {/* <div className="mr-2">
                <ThemeSwitch theme="light" toggleTheme={() => console.log("Toggle theme")} />
             </div> */}
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
            className="md:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-md shadow-xl border-t border-white/10"
            style={{ originY: 0 }} // Animate from the top
          >
            <div className="px-3 pt-3 pb-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i} // Pass index to variants for staggering
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                      activeLink === link.href
                        ? 'bg-white/20 text-white' // Active mobile link
                        : 'text-gray-300 hover:bg-white/10 hover:text-white' // Non-active mobile link
                    }`}
                    onClick={() => {
                      setActiveLink(link.href);
                      closeMobileMenu(); // Close menu on click
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}