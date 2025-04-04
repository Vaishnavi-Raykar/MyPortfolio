// components/sections/Contact.tsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import confetti from 'canvas-confetti';

const Contact = () => {
  const [isCopied, setIsCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const email = "Vaishnaviraykar990@gmail.com";
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      
      // Create confetti explosion effect
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x, y },
          colors: ['#5e17eb', '#ff5c87', '#17c7eb', '#ffffff'],
          disableForReducedMotion: true
        });
      }
      
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl font-bold text-center mb-16 text-white">
            Do you want to start a project together?
          </h2>
          
          <div className="relative perspective-[1000px] w-full max-w-2xl mx-auto">
            <motion.div 
              className="bg-gradient-to-r from-purple-700 to-blue-700 rounded-2xl p-12 w-full flex flex-col items-center transform-style-preserve-3d"
              initial={{ rotateX: 10, rotateY: -10 }}
              whileHover={{ rotateX: 0, rotateY: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">Get In Touch</h3>
                <p className="text-white/80">Let's collaborate on something amazing!</p>
              </div>
              
              <div className="w-full max-w-md">
                <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-1 mb-6">
                  <button
                    ref={buttonRef}
                    onClick={copyToClipboard}
                    className="w-full py-4 px-6 rounded-lg flex items-center justify-center gap-2 text-white transition-all hover:bg-gray-800/50"
                  >
                    <MdContentCopy className="text-lg" />
                    <AnimatePresence mode="wait">
                      {isCopied ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          Email is Copied!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          Copy my email address
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href="https://linkedin.com/in/vaishnaviraykar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0077B5]/20 backdrop-blur-lg p-4 rounded-xl flex items-center justify-center gap-3 text-white hover:bg-[#0077B5]/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLinkedin className="text-2xl" />
                    <span>LinkedIn</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://github.com/Vaishnavi-Raykar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800/20 backdrop-blur-lg p-4 rounded-xl flex items-center justify-center gap-3 text-white hover:bg-gray-800/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="text-2xl" />
                    <span>GitHub</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
            
            {/* 3D decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;