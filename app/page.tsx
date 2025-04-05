// // src/app/page.tsx
// 'use client';

// import React, { useState, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaChevronDown,
//   // Removed unused specific section icons for arrows
// } from 'react-icons/fa';

// // Import Components
// import Navbar from '@/components/Navbar';
// import { HeroSection } from '@/components/HeroSection';
// import Experience from '@/components/Experience';
// import Projects from '@/components/Projects';
// import Skills from '@/components/Skills';
// import Contact from '@/components/Contact';

// // --- Configuration ---

// type SectionId = 'hero' | 'skills' | 'experience' | 'projects' | 'contact';

// // Define the T-shaped layout relative to Hero (0,0)
// // Removed Icon from here as it's not used for arrows anymore
// const sectionLayout: { [key in SectionId]: { x: number; y: number; name: string } } = {
//   hero:       { x: 0, y: 0, name: 'Home' },
//   skills:     { x: -1, y: 0, name: 'Skills' },     // Left
//   experience: { x: 1, y: 0, name: 'Experience' }, // Right
//   projects:   { x: 0, y: 1, name: 'Projects' },   // Down 1
//   contact:    { x: 0, y: 2, name: 'Contact' },    // Down 2
// };

// // Framer Motion Variants (Keep as is from your code)
// const sectionVariants = {
//   hidden: (direction: 'up' | 'down' | 'left' | 'right' | 'center') => {
//     switch (direction) {
//       case 'up': return { y: '-100vh', x: 0, opacity: 0.8 };
//       case 'down': return { y: '100vh', x: 0, opacity: 0.8 };
//       case 'left': return { x: '-100vw', y: 0, opacity: 0.8 };
//       case 'right': return { x: '100vw', y: 0, opacity: 0.8 };
//       default: return { opacity: 0, scale: 0.95 };
//     }
//   },
//   visible: {
//     x: 0,
//     y: 0,
//     opacity: 1,
//     scale: 1,
//     transition: { type: 'spring', stiffness: 40, damping: 15 },
//   },
//   exit: (direction: 'up' | 'down' | 'left' | 'right' | 'center') => {
//     const duration = 0.3;
//      switch (direction) {
//       case 'up': return { y: '100vh', x: 0, opacity: 0, scale: 0.95, transition: { duration }};
//       case 'down': return { y: '-100vh', x: 0, opacity: 0, scale: 0.95, transition: { duration }};
//       case 'left': return { x: '100vw', y: 0, opacity: 0, scale: 0.95, transition: { duration }};
//       case 'right': return { x: '-100vw', y: 0, opacity: 0, scale: 0.95, transition: { duration }};
//       default: return { opacity: 0, scale: 0.9, transition: { duration } };
//     }
//   },
// };

// // --- Main Page Component ---

// export default function Home() {
//   const [activeSection, setActiveSection] = useState<SectionId>('hero');
//   const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'left' | 'right' | 'center'>('center');

//   // --- Navigation Logic (Keep as is from your code) ---
//   const navigateTo = useCallback((targetSectionId: SectionId | null) => {
//     if (!targetSectionId || targetSectionId === activeSection) return;

//     const currentPos = sectionLayout[activeSection];
//     const targetPos = sectionLayout[targetSectionId];

//     let direction: 'up' | 'down' | 'left' | 'right' | 'center' = 'center';
//     if (targetPos.y < currentPos.y) direction = 'up';
//     else if (targetPos.y > currentPos.y) direction = 'down';
//     else if (targetPos.x < currentPos.x) direction = 'left';
//     else if (targetPos.x > currentPos.x) direction = 'right';

//     setScrollDirection(direction);
//     setActiveSection(targetSectionId);
//   }, [activeSection]);

//    // Helper to find section (Keep as is from your code)
//    const getSectionInDirection = (direction: 'up' | 'down' | 'left' | 'right'): SectionId | null => {
//     const currentPos = sectionLayout[activeSection];
//     let targetX = currentPos.x;
//     let targetY = currentPos.y;

//     switch (direction) {
//       case 'up':    targetY -= 1; break;
//       case 'down':  targetY += 1; break;
//       case 'left':  targetX -= 1; break;
//       case 'right': targetX += 1; break;
//     }

//     for (const sectionId in sectionLayout) {
//       if (sectionLayout[sectionId as SectionId].x === targetX && sectionLayout[sectionId as SectionId].y === targetY) {
//         return sectionId as SectionId;
//       }
//     }
//     return null;
//   };

//   // Map Section IDs to Components (Keep as is from your code)
//   const sectionComponents: { [key in SectionId]: React.ReactNode } = {
//     hero: <HeroSection onNavigate={(dir) => navigateTo(getSectionInDirection(dir))} />,
//     skills: <Skills />,
//     experience: <Experience />,
//     projects: <Projects />,
//     contact: <Contact />,
//   };


//   // --- Navigation Arrow Component (MODIFIED) ---
//   const DirectionalArrow = ({
//     direction,
//   }: {
//     direction: 'left' | 'right' | 'down' | 'up';
//   }) => {
//     const targetSectionId = getSectionInDirection(direction);
//     if (!targetSectionId) return null;

//     const targetSectionInfo = sectionLayout[targetSectionId];

//     // Determine the correct visual arrow icon and rotation
//     let ArrowIcon: React.ElementType;
//     let iconContainerClass = "p-2 bg-white/10 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors"; // Base style
//     let textMarginClass = ""; // Margin for text relative to icon

//     if (direction === 'up') {
//         ArrowIcon = FaChevronDown; // Use down chevron
//         iconContainerClass += " rotate-180"; // Rotate only the icon container
//         textMarginClass = "mt-1"; // Add margin below the (rotated) icon
//     } else if (direction === 'down') {
//         ArrowIcon = FaChevronDown;
//         textMarginClass = "mt-1";
//     } else if (direction === 'left') {
//         ArrowIcon = FaChevronLeft;
//         textMarginClass = "mr-2"; // Add margin right of text (left of icon)
//     } else { // right
//         ArrowIcon = FaChevronRight;
//         textMarginClass = "ml-2"; // Add margin left of text (right of icon)
//     }


//     const positionClasses = {
//       up:    'top-5 left-1/2 -translate-x-1/2', // Position at the top
//       down:  'bottom-5 left-1/2 -translate-x-1/2',
//       left:  'left-5 top-1/2 -translate-y-1/2',
//       right: 'right-5 top-1/2 -translate-y-1/2',
//     }[direction];

//      // Defines the layout flow (icon vs text)
//     const alignmentClasses = {
//         up:    'flex-col items-center', // Icon above Text
//         down:  'flex-col items-center', // Icon above Text
//         left:  'flex-row-reverse items-center', // Text before Icon
//         right: 'flex-row items-center', // Icon before Text
//       }[direction];


//     return (
//       <motion.button
//         key={`${direction}-${targetSectionId}`} // More specific key
//         onClick={() => navigateTo(targetSectionId)}
//         aria-label={`Navigate ${direction} to ${targetSectionInfo.name}`}
//         // Combined alignment and positioning classes
//         className={`fixed ${positionClasses} z-50 p-2 group flex ${alignmentClasses} gap-1 text-white transition-all duration-300 ease-in-out hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg`}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.8 }}
//         transition={{ duration: 0.3, delay: 0.5 }}
//       >
//         {/* The Arrow Icon Itself (Handles rotation for 'up') */}
//         <div className={iconContainerClass}>
//             <ArrowIcon className="w-4 h-4 md:w-5 md:h-5" />
//         </div>

//         {/* Text Label for Destination */}
//         <span className={`text-xs md:text-sm font-medium tracking-wide whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity ${textMarginClass}`}>
//           {targetSectionInfo.name}
//         </span>

//       </motion.button>
//     );
//   };

//   return (
//     <div className="relative h-screen w-screen overflow-hidden bg-black">
//       {/* Navbar remains outside */}
//       <Navbar />

//       {/* Animated Section Container (Keep as is from your code) */}
//       <AnimatePresence initial={false} custom={scrollDirection} mode="wait">
//          <motion.div
//             key={activeSection}
//             custom={scrollDirection}
//             variants={sectionVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="absolute inset-0 w-full h-full"
//          >
//             <div className="w-full h-full overflow-y-auto"> {/* Allow internal scroll */}
//               {sectionComponents[activeSection]}
//             </div>
//          </motion.div>
//       </AnimatePresence>

//       {/* Navigation Arrows (Keep as is from your code) */}
//       <AnimatePresence>
//         {getSectionInDirection('left') && <DirectionalArrow direction="left" />}
//         {getSectionInDirection('right') && <DirectionalArrow direction="right" />}
//         {getSectionInDirection('down') && <DirectionalArrow direction="down" />}
//         {getSectionInDirection('up') && <DirectionalArrow direction="up" />}
//       </AnimatePresence>

//     </div>
//   );
// }




// src/app/page.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
} from 'react-icons/fa';

// Import Components
import Navbar from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

// --- Configuration ---

type SectionId = 'hero' | 'skills' | 'experience' | 'projects' | 'contact';

// Define the T-shaped layout relative to Hero (0,0)
const sectionLayout: { [key in SectionId]: { x: number; y: number; name: string } } = {
  hero:       { x: 0, y: 0, name: 'Home' },
  skills:     { x: -1, y: 0, name: 'Skills' },     // Left
  experience: { x: 1, y: 0, name: 'Experience' }, // Right
  projects:   { x: 0, y: 1, name: 'Projects' },   // Down 1
  contact:    { x: 0, y: 2, name: 'Contact' },    // Down 2
};

// Framer Motion Variants (Keep as is from your code)
const sectionVariants = {
  hidden: (direction: 'up' | 'down' | 'left' | 'right' | 'center') => {
    switch (direction) {
      case 'up': return { y: '-100vh', x: 0, opacity: 0.8 };
      case 'down': return { y: '100vh', x: 0, opacity: 0.8 };
      case 'left': return { x: '-100vw', y: 0, opacity: 0.8 };
      case 'right': return { x: '100vw', y: 0, opacity: 0.8 };
      default: return { opacity: 0, scale: 0.95 };
    }
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 40, damping: 15 },
  },
  exit: (direction: 'up' | 'down' | 'left' | 'right' | 'center') => {
    const duration = 0.3;
     switch (direction) {
      case 'up': return { y: '100vh', x: 0, opacity: 0, scale: 0.95, transition: { duration }};
      case 'down': return { y: '-100vh', x: 0, opacity: 0, scale: 0.95, transition: { duration }};
      case 'left': return { x: '100vw', y: 0, opacity: 0, scale: 0.95, transition: { duration }};
      case 'right': return { x: '-100vw', y: 0, opacity: 0, scale: 0.95, transition: { duration }};
      default: return { opacity: 0, scale: 0.9, transition: { duration } };
    }
  },
};

// --- Main Page Component ---

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'left' | 'right' | 'center'>('center');

  // --- Navigation Logic (Keep as is from your code) ---
  const navigateTo = useCallback((targetSectionId: SectionId | null) => {
    if (!targetSectionId || targetSectionId === activeSection) return;

    const currentPos = sectionLayout[activeSection];
    const targetPos = sectionLayout[targetSectionId];

    let direction: 'up' | 'down' | 'left' | 'right' | 'center' = 'center';
    if (targetPos.y < currentPos.y) direction = 'up';
    else if (targetPos.y > currentPos.y) direction = 'down';
    else if (targetPos.x < currentPos.x) direction = 'left';
    else if (targetPos.x > currentPos.x) direction = 'right';

    setScrollDirection(direction);
    setActiveSection(targetSectionId);
  }, [activeSection]);

   // Helper to find section (Keep as is from your code)
   const getSectionInDirection = (direction: 'up' | 'down' | 'left' | 'right'): SectionId | null => {
    const currentPos = sectionLayout[activeSection];
    let targetX = currentPos.x;
    let targetY = currentPos.y;

    switch (direction) {
      case 'up':    targetY -= 1; break;
      case 'down':  targetY += 1; break;
      case 'left':  targetX -= 1; break;
      case 'right': targetX += 1; break;
    }

    for (const sectionId in sectionLayout) {
      if (sectionLayout[sectionId as SectionId].x === targetX && sectionLayout[sectionId as SectionId].y === targetY) {
        return sectionId as SectionId;
      }
    }
    return null;
  };

  // Map Section IDs to Components (Keep as is from your code)
  const sectionComponents: { [key in SectionId]: React.ReactNode } = {
    hero: <HeroSection onNavigate={(dir) => navigateTo(getSectionInDirection(dir))} />,
    skills: <Skills />,
    experience: <Experience />,
    projects: <Projects />,
    contact: <Contact />,
  };


  // --- Navigation Arrow Component (MODIFIED) ---
  const DirectionalArrow = ({
    direction,
  }: {
    direction: 'left' | 'right' | 'down' | 'up';
  }) => {
    const targetSectionId = getSectionInDirection(direction);
    if (!targetSectionId) return null;

    const targetSectionInfo = sectionLayout[targetSectionId];

    // Determine the correct visual arrow icon and rotation
    let ArrowIcon: React.ElementType;
    let iconContainerClass = "p-2 bg-white/10 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors"; // Base style
    let textMarginClass = ""; // Margin for text relative to icon

    if (direction === 'up') {
        ArrowIcon = FaChevronDown; // Use down chevron
        iconContainerClass += " rotate-180"; // Rotate only the icon container
        textMarginClass = "mt-1"; // Add margin below the (rotated) icon
    } else if (direction === 'down') {
        ArrowIcon = FaChevronDown;
        textMarginClass = "mt-1";
    } else if (direction === 'left') {
        ArrowIcon = FaChevronLeft;
        textMarginClass = "mr-2"; // Add margin right of text (left of icon)
    } else { // right
        ArrowIcon = FaChevronRight;
        textMarginClass = "ml-2"; // Add margin left of text (right of icon)
    }


    const positionClasses = {
      up:    'top-5 left-1/2 -translate-x-1/2', // Position at the top
      down:  'bottom-5 left-1/2 -translate-x-1/2',
      left:  'left-5 top-1/2 -translate-y-1/2',
      right: 'right-5 top-1/2 -translate-y-1/2',
    }[direction];

     // Defines the layout flow (icon vs text)
    const alignmentClasses = {
        up:    'flex-col items-center', // Icon above Text
        down:  'flex-col items-center', // Icon above Text
        left:  'flex-row-reverse items-center', // Text before Icon
        right: 'flex-row items-center', // Icon before Text
      }[direction];


    return (
      <motion.button
        key={`${direction}-${targetSectionId}`} // More specific key
        onClick={() => navigateTo(targetSectionId)}
        aria-label={`Navigate ${direction} to ${targetSectionInfo.name}`}
        // Combined alignment and positioning classes
        className={`fixed ${positionClasses} z-50 p-2 group flex ${alignmentClasses} gap-1 text-white transition-all duration-300 ease-in-out hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        {/* The Arrow Icon Itself (Handles rotation for 'up') */}
        <div className={iconContainerClass}>
            <ArrowIcon className="w-4 h-4 md:w-5 md:h-5" />
        </div>

        {/* Text Label for Destination */}
        <span className={`text-xs md:text-sm font-medium tracking-wide whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity ${textMarginClass}`}>
          {targetSectionInfo.name}
        </span>

      </motion.button>
    );
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Pass state to Navbar */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={(sectionId) => navigateTo(sectionId as SectionId)} 
      />

      {/* Animated Section Container (Keep as is from your code) */}
      <AnimatePresence initial={false} custom={scrollDirection} mode="wait">
         <motion.div
            key={activeSection}
            custom={scrollDirection}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 w-full h-full"
         >
            <div className="w-full h-full overflow-y-auto"> {/* Allow internal scroll */}
              {sectionComponents[activeSection]}
            </div>
         </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Keep as is from your code) */}
      <AnimatePresence>
        {getSectionInDirection('left') && <DirectionalArrow direction="left" />}
        {getSectionInDirection('right') && <DirectionalArrow direction="right" />}
        {getSectionInDirection('down') && <DirectionalArrow direction="down" />}
        {getSectionInDirection('up') && <DirectionalArrow direction="up" />}
      </AnimatePresence>

    </div>
  );
}