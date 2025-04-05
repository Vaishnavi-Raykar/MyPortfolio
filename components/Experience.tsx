// components/Experience.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  color: string;
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
        color: '#00ADEE' // Siemens Blue
    },
    {
        id: 'opensource',
        role: 'Open Source Contributor',
        company: 'Hacktoberfest, DevfestAI', 
        period: 'Oct 2023',
        description: [
        'Participated in Hacktoberfest 2023 and Google DevFest AI Hackathon.',
        'Contributed actively to multiple open-source projects, focusing on Web Dev and GEN-AI.',
        'Contributed to repositories including Copilotkit, Tolgee, ToolJet, and Docsgpt.',
        'Our team secured Global 6th Rank in the DevFest AI Hackathon.'
        ],
        skills: ['Open Source', 'Web Development', 'GenAI', 'Git', 'Teamwork'],
        color: '#FF7A59' // Hacktoberfest Orange/Pink
    },
    {
        id: 'flare',
        role: 'Developer Intern',
        company: 'Flare',
        period: 'Jan 2024 - Feb 2024',
        description: [
        'Gained experience across the MERN stack.',
        'Developed a task management application implementing features for user authentication, task creation, and management.'
        ],
        skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'MERN'],
        color: '#663399' // Rebeccapurple (example)
    }
];

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-3xl mx-auto mb-16"
    >
      {/* Card Content */}
      <div
        className="p-6 md:p-8 rounded-2xl shadow-xl bg-gray-900/80 border border-gray-700/50 backdrop-blur-lg"
        style={{
          boxShadow: `0 15px 60px -15px ${experience.color}30`
        }}
      >
        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 md:mb-6 gap-2">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{experience.role}</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-lg md:text-xl text-gray-300">{experience.company}</span>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-gray-500"></span>
              <span className="text-sm md:text-base text-gray-400">{experience.period}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4 mb-5 md:mb-6">
          {experience.description.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full mt-[7px]" style={{backgroundColor: experience.color}}></div>
              <p className="text-gray-300 text-sm md:text-base">{item}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
          {experience.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-xs md:text-sm font-medium"
              style={{
                backgroundColor: `${experience.color}20`,
                color: experience.color,
                border: `1px solid ${experience.color}40`
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Glow */}
      <div
        className="absolute -z-10 inset-[-5px] rounded-[18px] opacity-15 blur-xl"
        style={{ backgroundColor: experience.color }}
      ></div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 bg-gray-950 relative min-h-screen">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,40,45,0.5),rgba(10,10,15,0.9))] z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-20 text-white"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Professional Experience
        </motion.h2>

        {/* Cards Container - Static positioning instead of animation-based positioning */}
        <div className="space-y-16">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;