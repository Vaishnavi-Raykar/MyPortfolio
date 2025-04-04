// components/sections/Experience.tsx
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  color: string;
  logo: string;
};

const experiences: Experience[] = [
  {
    id: 'siemens',
    role: 'Software Engineer Intern',
    company: 'Siemens Ltd',
    period: 'May 2024 - Aug 2024',
    description: [
      'Completed 2.5-month onsite internship at Siemens, Aurangabad with a focus on digitalization.',
      'Learned Swagger API and MicroSoft authentication and enhanced skill of MySQL with ORM.',
      'Explored basics of Mendix which is low code application development.',
      'Developed Andon Application Dashboard which fetches real time data from MQTT broker and publishes on React js UI.'
    ],
    skills: ['React.js', 'MySQL', 'Swagger API', 'MQTT', 'Mendix'],
    color: '#00ADEE',
    logo: '/logos/siemens.png'
  },
  {
    id: 'opensource',
    role: 'Open Source Contributor',
    company: 'Hactoberfest, DevfestAI',
    period: 'Oct 2024',
    description: [
      'Our team secured Global 6th Rank.',
      'Contributed actively to many open-source projects, focusing on Web Dev and GEN-AI.',
      'Contributed to repositories including Copilotkit, Tolgee, ToolJet, and Docsgpt.'
    ],
    skills: ['Open Source', 'Web Development', 'AI', 'Git'],
    color: '#FF7A59',
    logo: '/logos/opensource.png'
  },
  {
    id: 'flare',
    role: 'Developer Intern',
    company: 'Flare',
    period: 'Jan 2024 - Feb 2024',
    description: [
      'Frontend: Intermediate level (HTML, CSS, JavaScript, React.js, Next.js)',
      'Backend: Basic level (Node.js, Express.js, MongoDB)',
      'Developed a task management application implementing features for user authentication, task creation, and management.'
    ],
    skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB'],
    color: '#663399',
    logo: '/logos/flare.png'
  }
];

const ExperienceCard = ({ experience, index }: { experience: Experience, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [100, 0, -100]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );
  
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [20, 0, -20]
  );
  
  return (
    <motion.div
      ref={cardRef}
      style={{
        y,
        opacity,
        scale,
        rotateX,
        zIndex: experiences.length - index
      }}
      className="relative w-full max-w-3xl mx-auto mb-40 perspective-[1000px]"
    >
      <div 
        className="p-8 rounded-2xl shadow-xl bg-gray-900 border border-gray-800 backdrop-blur-lg"
        style={{ 
          boxShadow: `0 20px 80px -10px ${experience.color}40`
        }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{experience.role}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xl text-gray-300">{experience.company}</span>
              <span className="h-1 w-1 rounded-full bg-gray-500"></span>
              <span className="text-gray-400">{experience.period}</span>
            </div>
          </div>
          
          <div className="w-16 h-16 relative bg-white p-2 rounded-lg">
            <Image 
              src={experience.logo} 
              alt={experience.company} 
              layout="fill" 
              objectFit="contain" 
              className="p-2"
            />
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          {experience.description.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-white mt-2"></div>
              <p className="text-gray-300">{item}</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-6">
          {experience.skills.map((skill, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: `${experience.color}20`,
                color: experience.color 
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div 
        className="absolute -z-10 inset-0 rounded-2xl opacity-20 blur-xl" 
        style={{ backgroundColor: experience.color }}
      ></div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-32 bg-gray-950 min-h-[200vh] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.4),rgba(10,10,10,0.8))] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-5xl font-bold text-center mb-32 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Professional Experience
        </motion.h2>
        
        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;