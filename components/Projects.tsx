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
    liveUrl: 'https://quickmed-patient.vercel.app/',
    githubUrl: 'https://github.com/Vaishnavi-Raykar/Quickmed-New',
    color: '#6D28D9', // Purple
  },
  {
    id: 'gencodex',
    title: 'GenCodex',
    description: 'An online IDE with integrated AI features, supporting web development and C++. Includes code explanation, optimization, and UI redesign.',
    technologies: ['Gemini API', 'ReactJs', 'NodeJs', 'AI-Powered IDE'],
    imageUrl: '/projects/gencodex.png',
    liveUrl: 'https://gencodex.vercel.app/',
    githubUrl: 'https://github.com/sanketshinde3001/Generative-AI',
    color: '#EC4899', // Pink
  },
  {
    id: 'flagquiz',
    title: 'Multilingual Flag Quiz',
    description: 'An interactive flag quiz testing knowledge of world flags. Features multilingual support using Tolgee.',
    technologies: ['TypeScript', 'CSS', 'Tolgee'],
    imageUrl: '/projects/flag-quiz.png',
    liveUrl: 'https://flag-quiz-phi.vercel.app/fr-FR',
    githubUrl: 'https://github.com/Vaishnavi-Raykar/Flag-Quiz',
    color: '#06B6D4', // Cyan
  },
  // --- NEW SAMPLE PROJECTS ---
  {
    id: 'interviewAce',
    title: 'InterviewAce',
    description: 'Developed an interview prep portal with AI-generated practice questions, dynamic scheduling for DSA, HR, and system design modules, and integrated mock interviews with timers and scoring.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'WebRTC'],
    imageUrl: '/projects/interviewAce.png', // Use a generic placeholder image path
    liveUrl: 'https://interview-ace-rose.vercel.app/',
    githubUrl: 'https://github.com/sanketshinde3001/Nirmaan-3.0',
    color: '#F59E0B', // Amber
  },
  {
    id: 'multilingualPhrasebook',
    title: 'Multilingual Phrasebook',
    description: 'Digital flipbook app where users can explore and learn phrases in multiple languages.',
    technologies: ['React', 'TypeScript', 'JavaScript', 'CSS'],
    imageUrl: '/projects/phrasebook.png',
    liveUrl: 'https://multilingual-phrasebook.vercel.app/hi',
    githubUrl: 'https://github.com/Vaishnavi-Raykar/Multilingual-Phrasebook',
    color: '#10B981', // Emerald
  },
  {
    id: 'alumniConnect',
    title: 'Alumni Connect',
    description: 'Platform that bridges alumni and students from technical institutions, enabling mentorship, networking, career opportunities, events, and donations',
    technologies: ['Next.js', 'Node.js', 'MondoDB','ShadCN', 'TailwindCSS'],
    imageUrl: '/projects/alumni.png',
    liveUrl: 'https://alum-bond.vercel.app/',
    githubUrl: 'https://github.com/prathamesh424/AlumniAssciation',
    color: '#3B82F6', // Blue
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
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" style={{ color: project.color }}> {/* Adjusted text size */}
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-200 mb-3 line-clamp-2 sm:line-clamp-3"> {/* Adjusted text size & line-clamp */}
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
                  className="px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium" // Adjusted text size
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
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-white text-gray-900 font-semibold text-xs sm:text-sm hover:bg-gray-200 transition-colors duration-200 shadow-sm" // Adjusted padding & text size
                aria-label={`Live Demo of ${project.title}`}
              >
                <FiExternalLink className="w-3 h-3 sm:w-4 sm:h-4" /> Live Demo {/* Adjusted icon size */}
              </Link>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-black/50 text-white font-semibold text-xs sm:text-sm hover:bg-black/70 border border-white/30 transition-colors duration-200 shadow-sm" // Adjusted padding & text size
                aria-label={`GitHub Repository for ${project.title}`}
              >
                <FiGithub className="w-3 h-3 sm:w-4 sm:h-4" /> GitHub {/* Adjusted icon size */}
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
  const [showAll, setShowAll] = useState(false); // State to control visibility (show first 3 or all)
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Determine which projects to display based on the state
  const projectsToShow = showAll ? projects : projects.slice(0, 3);

  return (
    // Added pt-24 to push content below the fixed navbar
    <section id="projects" className="pt-24 py-16 sm:py-20 md:py-28 bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 md:mb-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400" // Adjusted text size & margin
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className='text-white'>Projects</p>
        </motion.h2>

        {/* Grid Container */}
         <motion.div
          ref={ref} // Attach ref here to detect when the grid comes into view
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10" // Adjusted gap
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          // Stagger children animation - removed as handled by whileInView on card
          // variants={containerVariants} // Staggering handled by individual cards
        >
          {projectsToShow.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* Show More Button */}
        {!showAll && projects.length > 3 && ( // Only show button if not all are shown and there are more than 3 projects
          <div className="text-center mt-10 sm:mt-12 md:mt-16">
            <motion.button
              onClick={() => setShowAll(true)} // Set state to show all projects
              className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show More Projects
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
