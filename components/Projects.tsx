// components/sections/Projects.tsx
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  color: string;
};

const projects: Project[] = [
  {
    id: 'quickmed',
    title: 'QuickMed',
    description: 'A healthcare platform featuring doctor recommendations based on disease symptoms, digital prescriptions, medical report analysis, and patient dashboards.',
    technologies: ['ReactJs', 'NodeJs', 'ExpressJs', 'MongoDB', 'Cloudinary', 'GEMINI API'],
    imageUrl: '/projects/quickmed.png',
    liveUrl: 'https://quickmed-eta.vercel.app/',
    githubUrl: 'https://github.com/Vaishnavi-Raykar/quickmed',
    color: '#5e17eb',
  },
  {
    id: 'gencodex',
    title: 'GenCodex',
    description: 'An online IDE with integrated AI features, supporting web development and C++. Features include code explanation, optimization suggestions, and UI redesign.',
    technologies: ['Gemini API', 'ReactJs', 'NodeJs', 'AI-Powered IDE'],
    imageUrl: '/projects/gencodex.png',
    liveUrl: 'https://gencodexplus.vercel.app/',
    githubUrl: 'https://github.com/Vaishnavi-Raykar/GenCodex',
    color: '#ff5c87',
  },
  {
    id: 'flagquiz',
    title: 'Multilingual Flag Quiz',
    description: 'An interactive flag quiz to help users test their knowledge of world flags. Integrated Tolgee for multilingual support.',
    technologies: ['TypeScript', 'CSS', 'Tolgee'],
    imageUrl: '/projects/flagquiz.png',
    liveUrl: 'https://flag-quiz-phi.vercel.app/fr-FR',
    githubUrl: 'https://github.com/Vaishnavi-Raykar/FlagQuiz',
    color: '#17c7eb',
  }
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [phase, setPhase] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseEnter = () => {
    setPhase(phase === 1 ? 2 : 3);
  };
  
  const handleMouseLeave = () => {
    setPhase(1);
  };
  
  return (
    <motion.div 
      ref={cardRef}
      className="relative w-full h-[500px] rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="absolute inset-0 rounded-2xl"
        style={{ backgroundColor: project.color }}
        animate={{ 
          scale: phase === 1 ? 0.85 : phase === 2 ? 0.95 : 1,
          borderRadius: phase === 1 ? '1rem' : phase === 2 ? '0.75rem' : '0.5rem'
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {phase === 1 && (
          <motion.div 
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-4xl font-bold text-white">{project.title}</h3>
          </motion.div>
        )}
        
        {phase === 2 && (
          <motion.div 
            className="flex flex-col items-center justify-center h-full p-8 text-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
            <p className="mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 rounded-full bg-white/20 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
        
        {phase === 3 && (
          <motion.div 
            className="flex flex-col items-center justify-between h-full p-8 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
              <p className="mb-4">{project.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center my-4">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 rounded-full bg-white/20 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4">
              <Link 
                href={project.liveUrl} 
                target="_blank" 
                className="px-6 py-3 rounded-lg bg-white text-gray-900 font-medium hover:bg-opacity-90 transition"
              >
                Live Demo
              </Link>
              <Link 
                href={project.githubUrl} 
                target="_blank" 
                className="px-6 py-3 rounded-lg bg-black/30 text-white font-medium hover:bg-black/40 transition border border-white/20"
              >
                GitHub
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-20 bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        
        <div 
          ref={ref} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;