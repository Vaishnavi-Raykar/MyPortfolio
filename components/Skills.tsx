// components/sections/Skills.tsx
import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent, // Changed from DragEndEvent for onDragOver
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  // arrayMove, // Not used as we're focusing on feedback, not reordering state
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

// --- Data Structure (keep as is) ---
type Skill = {
  name: string;
  color: string; // Used for accents
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

const skillsData: SkillCategory[] = [
    {
        title: 'Programming Languages',
        skills: [
            { name: 'C', color: '#A8B9CC' },
            { name: 'C++', color: '#00599C' },
            { name: 'JavaScript', color: '#F7DF1E' },
            { name: 'TypeScript', color: '#3178C6' },
        ],
    },
    {
        title: 'Frontend',
        skills: [
            { name: 'HTML', color: '#E34F26' },
            { name: 'CSS', color: '#1572B6' },
            { name: 'React.js', color: '#61DAFB' },
            { name: 'Next.js', color: '#FFFFFF' }, // White color needs careful handling
            { name: 'Tailwind CSS', color: '#38B2AC' },
            { name: 'Framer Motion', color: '#BB22CC'} // Example addition
        ],
    },
    {
        title: 'Backend & Databases',
        skills: [
            { name: 'Node.js', color: '#339933' },
            { name: 'Express.js', color: '#FFFFFF' },
            { name: 'MongoDB', color: '#47A248' },
            { name: 'PostgreSQL', color: '#336791' },
            { name: 'MySQL', color: '#4479A1' },
        ],
    },
    {
        title: 'Cloud & DevOps',
        skills: [
            { name: 'AWS', color: '#FF9900' },
            { name: 'Docker', color: '#2496ED' },
            { name: 'GitHub Actions', color: '#2088FF' }, // Example addition
            { name: 'Vercel', color: '#FFFFFF' }, // Example addition
        ],
    },
    {
        title: 'Tools', // Simplified category
        skills: [
            { name: 'Git & GitHub', color: '#FFFFFF' },
            { name: 'Swagger', color: '#85EA2D' },
            { name: 'Postman', color: '#FF6C37' }, // Example addition
            // { name: 'LangChain', color: '#33BB33' }, // Can add back if needed
            // { name: 'AstraDB', color: '#7E56C2' },
        ],
    },
];


// --- Helper Type ---
interface DndItemData {
  type: 'skill' | 'category';
  categoryTitle: string; // Use consistent naming
  skill?: Skill;
}

// --- Sortable Skill Item Component ---
interface SortableSkillItemProps {
  skill: Skill;
  categoryTitle: string;
  isDragging?: boolean; // Is this the original item being dragged?
  isOverlay?: boolean; // Is this the item rendered in the DragOverlay?
  isIncorrectDropTarget?: boolean; // Is the DragOverlay item over the wrong category?
}

const SortableSkillItem = React.forwardRef<HTMLDivElement, SortableSkillItemProps>(
  ({ skill, categoryTitle, isDragging, isOverlay, isIncorrectDropTarget, ...props }, ref) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging: isCurrentlySorting, // From useSortable hook
    } = useSortable({
      id: `${categoryTitle}-${skill.name}`, // Unique ID combining category and skill name
      data: {
        type: 'skill',
        categoryTitle: categoryTitle,
        skill: skill,
      } as DndItemData,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition: transition || 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      // Use isDragging prop if passed (from parent state), otherwise use hook's value
      opacity: (isDragging ?? isCurrentlySorting) ? 0.4 : 1,
      borderColor: skill.color || '#4A5568', // Use skill color for border, fallback
      perspective: '1000px', // For 3D hover effect
    };

    // Base classes
    let itemClasses = `
      px-4 py-2 rounded-lg cursor-grab active:cursor-grabbing
      text-sm font-medium transition-all duration-200 ease-in-out
      border-l-4 shadow-md hover:shadow-lg
      bg-gray-700/60 backdrop-blur-sm hover:bg-gray-600/80
      text-gray-100 hover:text-white
    `;

    // Overlay specific styles
    if (isOverlay) {
      itemClasses += ` shadow-xl scale-105 ring-2 ring-offset-2 ring-offset-black/50 ${
        isIncorrectDropTarget ? 'ring-red-500' : 'ring-indigo-500' // Ring color indicates drop validity
      }`;
    }

    // Incorrect drop target feedback (applied to overlay)
    const overlayMotionProps = isIncorrectDropTarget ? {
        x: [-2, 2, -2, 2, 0], // Subtle shake animation
        transition: { duration: 0.3, ease: "easeInOut" }
    } : {};

    return (
      <motion.div
        ref={ref} // Important: use the passed ref here
        style={style}
        className={itemClasses}
        {...attributes}
        {...listeners}
        {...props} // Pass down other props
        // Enhanced 3D hover effect
        whileHover={!isCurrentlySorting ? { // Only apply hover when not dragging
            scale: 1.08,
            z: 15,
            boxShadow: `0 10px 20px rgba(0,0,0,0.2), 0 0 15px ${skill.color || 'rgba(74, 85, 104, 0.5)'}40`, // Add colored glow
            rotateY: 8,
            rotateX: -4,
        } : {}}
        transition={{ type: 'spring', stiffness: 350, damping: 15 }}
     // Apply shake animation if it's the overlay over an incorrect target
         animate={isOverlay ? overlayMotionProps : {}}
      >
        <span className="text-xs sm:text-sm">{skill.name}</span> {/* Adjusted text size */}
      </motion.div>
    );
  }
);
SortableSkillItem.displayName = 'SortableSkillItem';

// --- Skill Category Container ---
interface SkillCategoryContainerProps {
  category: SkillCategory;
  isOver?: boolean; // Is a draggable item currently hovering over this category?
  isIncorrectDropTarget?: boolean; // Is the item from *another* category hovering?
}

const SkillCategoryContainer: React.FC<SkillCategoryContainerProps> = ({ category, isOver, isIncorrectDropTarget }) => {
  const { setNodeRef } = useSortable({
    id: category.title, // Use category title as the droppable ID
    data: { type: 'category', categoryTitle: category.title } as DndItemData,
    disabled: true, // Categories themselves are not draggable
  });

  const skillIds = category.skills.map(skill => `${category.title}-${skill.name}`);

   // Dynamic classes for drop target feedback
  const containerClasses = `
    p-4 sm:p-5 md:p-6 rounded-xl shadow-lg flex flex-col space-y-4
    transition-all duration-300 ease-in-out relative overflow-hidden
    border border-white/10
    bg-white/5 backdrop-blur-lg hover:bg-white/10
    ${isOver && isIncorrectDropTarget ? 'border-red-500/50 bg-red-900/10' : ''}
    ${isOver && !isIncorrectDropTarget ? 'border-indigo-500/50 bg-indigo-900/10' : ''}
  `;

  return (
    <motion.div
      ref={setNodeRef} // Register as a droppable node
      className={containerClasses}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.random() * 0.3 }} // Staggered entry
    >
        {/* Optional: Subtle pattern or glow effect inside */}
       <div className="absolute inset-0 opacity-5 -z-10" style={{backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.5px)', backgroundSize: '10px 10px'}}></div>

      <h3 className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-4 border-b border-gray-600/50 pb-3"> {/* Adjusted text size */}
        {category.title}
      </h3>
      {/* Context for sortable skills */}
      <SortableContext items={skillIds} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-3 min-h-[50px]"> {/* Ensure minimum height for empty drop zone feedback */}
          {category.skills.map((skill) => (
            <SortableSkillItem
              key={`${category.title}-${skill.name}`} // Ensure unique key
              skill={skill}
              categoryTitle={category.title}
            />
          ))}
        </div>
      </SortableContext>
    </motion.div>
  );
};

// --- Main Skills Component ---
const Skills = () => {
  // We don't need state to manage skill data if we only show feedback
  // const [currentSkillsData, setCurrentSkillsData] = useState(skillsData);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeItemData, setActiveItemData] = useState<DndItemData | null>(null);
  const [overContainerId, setOverContainerId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), // Require slight move before drag starts
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current as DndItemData | undefined;
    if (data?.type === 'skill') {
      setActiveId(active.id);
      setActiveItemData(data);
      setOverContainerId(data.categoryTitle); // Initially over its own container
    } else {
      // Reset if trying to drag something other than a skill (shouldn't happen with current setup)
      setActiveId(null);
      setActiveItemData(null);
      setOverContainerId(null);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) {
        setOverContainerId(null);
        return;
    }

    // Determine if hovering over a category container or a skill within one
    const overData = over.data.current as DndItemData | undefined;
    if (overData) {
        setOverContainerId(overData.categoryTitle); // Store the title of the category being hovered over
    } else {
        // If `over` doesn't have data (e.g., hovering outside drop zones), reset
        setOverContainerId(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // Reset all drag-related states
    setActiveId(null);
    setActiveItemData(null);
    setOverContainerId(null);

    // Here you *would* put the logic to update state if actual reordering was enabled.
    // Example (commented out):
    // const { active, over } = event;
    // if (over && active.id !== over.id) {
    //   const activeData = active.data.current as DndItemData;
    //   const overData = over.data.current as DndItemData;
    //   if (activeData?.categoryTitle === overData?.categoryTitle && activeData?.type === 'skill' && overData?.type === 'skill') {
    //       // Implement arrayMove logic here using setCurrentSkillsData
    //   }
    // }
  };

  // Derived state: is the active item (if any) over an incorrect category?
  const isOverIncorrectContainer = activeItemData?.categoryTitle !== overContainerId && overContainerId !== null;

  // Find the active skill for the DragOverlay
  const activeSkill = activeItemData?.type === 'skill' ? activeItemData.skill : null;

   return (
    <section
      id="skills"
      className="py-16 sm:py-20 md:py-28 min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-950 via-black to-indigo-900/80 relative overflow-hidden" // Adjusted padding
    >
      {/* Background elements */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
         <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] animate-pulse"></div>
         <div className="absolute -bottom-1/4 -right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
         {/* Grid pattern overlay */}
         <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      </div>

     <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 md:mb-20 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-indigo-300" // Adjusted text size & margin
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          My Tech Stack
        </motion.h2>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver} // Track hovering
           onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"> {/* Adjusted gap */}
            {skillsData.map((category) => (
               <SkillCategoryContainer
                    key={category.title}
                    category={category}
                    // Pass feedback state down to the container
                    isOver={overContainerId === category.title}
                    isIncorrectDropTarget={overContainerId === category.title && isOverIncorrectContainer}
               />
            ))}
          </div>

          <DragOverlay dropAnimation={null}>
            {activeId && activeSkill && activeItemData ? (
              // Render the dragged item clone in the overlay
              <SortableSkillItem
                  // Crucially, pass a stable key for the overlay instance if needed, but props handle identity
                  skill={activeSkill}
                  categoryTitle={activeItemData.categoryTitle}
                  isOverlay={true} // Style it as the overlay
                  isIncorrectDropTarget={isOverIncorrectContainer} // Apply incorrect styling/animation
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </section>
  );
};

export default Skills;
