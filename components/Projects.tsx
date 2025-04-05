// // components/sections/Projects.tsx
import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { FiGithub, FiExternalLink } from 'react-icons/fi'; // Using react-icons for cleaner links

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  color: string; // Main accent color for the card
};

// --- Project Data (Keep as is or update images/descriptions) ---
const projects: Project[] = [
  {
    id: 'quickmed',
    title: 'QuickMed',
    description: 'A healthcare platform featuring doctor recommendations, digital prescriptions, medical report analysis, and patient dashboards.',
    technologies: ['ReactJs', 'NodeJs', 'ExpressJs', 'MongoDB', 'Cloudinary', 'GEMINI API'],
    imageUrl: '/projects/quickmed.png', // Ensure these paths are correct in your public folder
    liveUrl: 'https://quickmed-eta.vercel.app/',
    githubUrl: 'https://github.com/Vaishnavi-Raykar/quickmed',
    color: '#6D28D9', // Purple
  },
  {
    id: 'gencodex',
    title: 'GenCodex',
    description: 'An online IDE with integrated AI features, supporting web development and C++. Includes code explanation, optimization, and UI redesign.',
    technologies: ['Gemini API', 'ReactJs', 'NodeJs', 'AI-Powered IDE'],
    imageUrl: '/projects/gencodex.png',
    liveUrl: 'https://gencodexplus.vercel.app/',
    githubUrl: 'https://github.com/Vaishnavi-Raykar/GenCodex',
    color: '#EC4899', // Pink
  },
  {
    id: 'flagquiz',
    title: 'Multilingual Flag Quiz',
    description: 'An interactive flag quiz testing knowledge of world flags. Features multilingual support using Tolgee.',
    technologies: ['TypeScript', 'CSS', 'Tolgee'],
    imageUrl: '/projects/flag-quiz.png',
    liveUrl: 'https://flag-quiz-phi.vercel.app/fr-FR',
    githubUrl: 'https://github.com/Vaishnavi-Raykar/FlagQuiz',
    color: '#06B6D4', // Cyan
  }
];

// --- Framer Motion Variants ---
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// --- Project Card Component ---
const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Convert hex color to rgba for the glow effect
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const glowColor = hexToRgba(project.color, 0.4); // Adjust alpha for glow intensity

  return (
    <motion.div
      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group" // aspect ratio keeps consistent shape
      style={{ perspective: '1000px' }} // Needed for 3D child rotation
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={cardVariants} // Use variants for staggered animation
      // Add a subtle initial shadow, enhance on hover
      initial="hidden"
      whileInView="visible" // Animate when card enters viewport
      viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% visible
      whileHover={{ scale: 1.03 }} // Overall card scale on hover
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* 3D Tilt Container */}
      <motion.div
        className="absolute inset-0 w-full h-full rounded-xl transition-shadow duration-300 ease-out"
        style={{
            transformStyle: 'preserve-3d', // Apply 3D transforms
            // Dynamic glow effect using box-shadow based on hover state
            boxShadow: isHovered
            ? `0 0 25px 5px ${glowColor}`
            : '0 4px 15px rgba(0, 0, 0, 0.2)',
        }}
        whileHover={{
            rotateY: 8, // Adjust rotation degree as needed
            rotateX: -5,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Background Image */}
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill // Use fill to cover the container
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
          className="object-cover w-full h-full rounded-xl transition-opacity duration-300 ease-in-out group-hover:opacity-20" // Fade image on hover
          priority={project.id === projects[0].id} // Prioritize loading the first image
        />

        {/* Content Overlay - Appears on Hover */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-between p-5 md:p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-xl" // Gradient for better text readability at bottom
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Top Section: Title and Description */}
          <div className="text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: project.color }}>
              {project.title}
            </h3>
            <p className="text-sm md:text-base text-gray-200 mb-3 line-clamp-3"> {/* Limit description lines */}
              {project.description}
            </p>
          </div>

          {/* Bottom Section: Tech Stack and Links */}
          <div>
             {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: hexToRgba(project.color, 0.2), color: project.color }} // Use project color theme
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 items-center">
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-white text-gray-900 font-semibold text-sm hover:bg-gray-200 transition-colors duration-200 shadow-sm"
                aria-label={`Live Demo of ${project.title}`}
              >
                <FiExternalLink /> Live Demo
              </Link>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-black/50 text-white font-semibold text-sm hover:bg-black/70 border border-white/30 transition-colors duration-200 shadow-sm"
                aria-label={`GitHub Repository for ${project.title}`}
              >
                <FiGithub /> GitHub
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Projects Section Component ---
const Projects = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Keep false to re-animate if scrolled out and back in? Or true for once.
    threshold: 0.1, // Trigger when 10% of the section is visible
  });

  return (
    <section id="projects" className="py-20 md:py-28 bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className='text-white'>Projects</p>
        </motion.h2>

        {/* Grid Container */}
        <motion.div
          ref={ref} // Attach ref here to detect when the grid comes into view
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          // Stagger children animation - removed as handled by whileInView on card
          // variants={containerVariants}
        >
          {projects.map((project, index) => (
             // We'll apply entrance animation directly on the card using whileInView
             // No need for a separate motion wrapper here if card handles its own animation
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;