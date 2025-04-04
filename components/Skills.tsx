// components/sections/Skills.tsx
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

type SkillCategory = {
  title: string;
  skills: Skill[];
};

type Skill = {
  name: string;
  icon: string;
  color: string;
};

const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "C", icon: "/skills/c.svg", color: "#5c6bc0" },
      { name: "C++", icon: "/skills/cpp.svg", color: "#00599c" },
      { name: "JavaScript", icon: "/skills/javascript.svg", color: "#f7df1e" },
      { name: "TypeScript", icon: "/skills/typescript.svg", color: "#3178c6" }
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: "/skills/html.svg", color: "#e34f26" },
      { name: "CSS", icon: "/skills/css.svg", color: "#1572b6" },
      { name: "React.js", icon: "/skills/react.svg", color: "#61dafb" },
      { name: "Next.js", icon: "/skills/nextjs.svg", color: "#ffffff" },
      { name: "Tailwind CSS", icon: "/skills/tailwind.svg", color: "#38b2ac" }
    ]
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "Node.js", icon: "/skills/nodejs.svg", color: "#339933" },
      { name: "Express.js", icon: "/skills/express.svg", color: "#ffffff" },
      { name: "MongoDB", icon: "/skills/mongodb.svg", color: "#47a248" },
      { name: "PostgreSQL", icon: "/skills/postgresql.svg", color: "#336791" },
      { name: "MySQL", icon: "/skills/mysql.svg", color: "#4479a1" }
    ]
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: "/skills/aws.svg", color: "#ff9900" },
      { name: "Docker", icon: "/skills/docker.svg", color: "#2496ed" },
      { name: "GitHub", icon: "/skills/github.svg", color: "#ffffff" }
    ]
  },
  {
    title: "Tools & Frameworks",
    skills: [
      { name: "Swagger", icon: "/skills/swagger.svg", color: "#85ea2d" },
      { name: "LangChain", icon: "/skills/langchain.svg", color: "#33bb33" },
      { name: "AstraDB", icon: "/skills/astradb.svg", color: "#7e56c2" }
    ]
  }
];

const Skills = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  return (
    <section 
      id="skills" 
      ref={targetRef}
      className="py-20 min-h-screen flex flex-col justify-center bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-5xl font-bold text-center mb-20 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Technical Skills
        </motion.h2>
        
        <div className="space-y-24">
          {skillsData.map((category, categoryIndex) => {
            // Alternate direction of scroll for each category
            const direction = categoryIndex % 2 === 0 ? 1 : -1;
            
            return (
              <div key={category.title} className="relative">
                <motion.h3 
                  className="text-2xl font-semibold mb-8 text-white/90"
                  initial={{ opacity: 0, x: direction * 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false, margin: "-100px" }}
                >
                  {category.title}
                </motion.h3>
                
                <SkillRow 
                  skills={category.skills} 
                  scrollYProgress={scrollYProgress} 
                  direction={direction}
                  categoryIndex={categoryIndex}
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
      </div>
    </section>
  );
};

interface SkillRowProps {
  skills: Skill[];
  scrollYProgress: any;
  direction: number;
  categoryIndex: number;
}

const SkillRow = ({ skills, scrollYProgress, direction, categoryIndex }: SkillRowProps) => {
  // Larger skill arrays for continuous scrolling effect
  const repeatedSkills = [...skills, ...skills, ...skills];
  
  // Calculate different scroll speeds for different categories
  const baseSpeed = 1000; // Base scroll amount in pixels
  const speed = baseSpeed + (categoryIndex * 200); // Different speeds for different rows
  
  // Transform scroll progress to horizontal movement
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, direction * -speed] // Moves in different directions
  );
  
  return (
    <div className="overflow-hidden py-8">
      <motion.div 
        className="flex gap-8"
        style={{ x }}
      >
        {repeatedSkills.map((skill, index) => (
          <motion.div
            key={`${skill.name}-${index}`}
            className="flex-shrink-0 w-32 h-32 rounded-xl bg-gray-800/50 flex flex-col items-center justify-center p-4 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 flex items-center justify-center">
              <Image
                src={skill.icon}
                alt={skill.name}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <p className="mt-2 text-white text-sm font-medium">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
