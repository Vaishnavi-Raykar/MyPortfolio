// components/sections/Skills.tsx
import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
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
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

// Keep your original data structure
type Skill = {
  name: string;
  // icon and color are no longer needed for display but keep color for potential future use?
  // icon: string;
  color: string; // We can use this for subtle borders or effects
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

// Your existing skillsData
const skillsData: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'C', color: '#A8B9CC' }, // Using more subtle colors based on original svgs
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
      { name: 'Next.js', color: '#FFFFFF' }, // White might be hard to see, adjust as needed
      { name: 'Tailwind CSS', color: '#38B2AC' },
    ],
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Node.js', color: '#339933' },
      { name: 'Express.js', color: '#FFFFFF' }, // White might be hard to see
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
      { name: 'GitHub', color: '#FFFFFF' }, // White might be hard to see
    ],
  },
  {
    title: 'Tools & Frameworks',
    skills: [
      { name: 'Swagger', color: '#85EA2D' },
      { name: 'LangChain', color: '#33BB33' },
      { name: 'AstraDB', color: '#7E56C2' },
    ],
  },
];

// --- Helper Type for Item Data ---
interface DndItemData {
  type: 'skill' | 'category';
  category: string; // Store the original category title
  skill?: Skill;
}

// --- Sortable Skill Item Component ---
interface SortableSkillItemProps {
  skill: Skill;
  categoryTitle: string;
  isDragging?: boolean; // Optional flag if we need specific styles while dragging original item
  isOverlay?: boolean; // Optional flag for the drag overlay version
  isIncorrectDrop?: boolean; // Flag for incorrect drop target feedback
}

const SortableSkillItem = React.forwardRef<
  HTMLDivElement,
  SortableSkillItemProps
>(({ skill, categoryTitle, isDragging, isOverlay, isIncorrectDrop, ...props }, ref) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging, // Renamed to avoid conflict
  } = useSortable({
    id: `${categoryTitle}-${skill.name}`,
    data: {
      type: 'skill',
      category: categoryTitle,
      skill: skill,
    } as DndItemData,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 0.2s ease',
    // Use isDragging from props if provided (for overlay), otherwise use hook's value
    opacity: (isDragging ?? isSortableDragging) ? 0.5 : 1,
    // Add perspective for 3D effect on hover/drag
    perspective: '1000px',
  };

  const itemClasses = `
    px-4 py-2 rounded-lg shadow-md cursor-grab active:cursor-grabbing
    text-sm font-medium transition-all duration-200 ease-in-out
    border-2 border-transparent
    ${isIncorrectDrop
      ? 'bg-red-500/30 border-red-500 text-red-100' // Error state
      : 'bg-gray-700/60 hover:bg-gray-600/80 text-gray-200 hover:text-white' // Normal state
    }
    ${isOverlay ? 'shadow-xl scale-105 ring-2 ring-indigo-500' : ''} // Style for the item being dragged
  `;

  return (
    <motion.div
      ref={ref} // Pass ref from forwardRef
      style={style}
      className={itemClasses}
      {...attributes}
      {...listeners}
      {...props} // Pass down other props if needed
      // Simple 3D tilt effect on hover
      whileHover={{ scale: 1.05, rotateY: 5, rotateX: -3, z: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {skill.name}
    </motion.div>
  );
});
SortableSkillItem.displayName = 'SortableSkillItem'; // Add display name

// --- Skill Category Container ---
interface SkillCategoryContainerProps {
  category: SkillCategory;
}

const SkillCategoryContainer: React.FC<SkillCategoryContainerProps> = ({ category }) => {
  const { setNodeRef } = useSortable({
    id: category.title,
    data: { type: 'category', category: category.title } as DndItemData, // Mark as a droppable category
    disabled: true, // Don't allow dragging the category itself
  });

  // Get skill IDs for SortableContext
  const skillIds = category.skills.map(skill => `${category.title}-${skill.name}`);

  return (
    <motion.div
      ref={setNodeRef}
      className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50 flex flex-col space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-white/90 mb-4 border-b border-gray-600 pb-2">
        {category.title}
      </h3>
      {/* Context for sortable skills within this category */}
      <SortableContext items={skillIds} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-3">
          {category.skills.map((skill) => (
            <SortableSkillItem key={skill.name} skill={skill} categoryTitle={category.title} />
          ))}
        </div>
      </SortableContext>
    </motion.div>
  );
};

// --- Main Skills Component ---
const Skills = () => {
  // State to manage skill data (if you want actual reordering, otherwise not needed for just visual feedback)
  // For now, we won't reorder, just show feedback.
  // const [currentSkillsData, setCurrentSkillsData] = useState(skillsData);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeItemData, setActiveItemData] = useState<DndItemData | null>(null);
  const [isOverIncorrectContainer, setIsOverIncorrectContainer] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    // Ensure we are dragging a skill item
    if (active.data.current?.type === 'skill') {
      setActiveId(active.id);
      setActiveItemData(active.data.current as DndItemData);
      setIsOverIncorrectContainer(false); // Reset error state on new drag
    } else {
      setActiveId(null);
      setActiveItemData(null);
    }
  };

  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !activeItemData || activeItemData.type !== 'skill') {
      setIsOverIncorrectContainer(false);
      return;
    }

    // Check if the 'over' target is a category container OR a skill within a category
    const overData = over.data.current as DndItemData;
    const overCategory = overData?.type === 'category' ? overData.category : overData?.category;

    // Is the skill being dragged over a *different* category than its original one?
    if (overCategory && activeItemData.category !== overCategory) {
      setIsOverIncorrectContainer(true);
    } else {
      setIsOverIncorrectContainer(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Reset states regardless of drop location
    setActiveId(null);
    setActiveItemData(null);
    setIsOverIncorrectContainer(false);

    // --- If you wanted to implement actual reordering: ---
    // if (over && active.id !== over.id) {
    //   const activeData = active.data.current as DndItemData;
    //   const overData = over.data.current as DndItemData;

    //   // Allow reordering only *within* the same category
    //   if (activeData?.category === overData?.category && activeData?.type === 'skill' && overData?.type === 'skill') {
    //     // Find indices and update state (example logic, needs refinement)
    //     setCurrentSkillsData(prevData => {
    //        // Logic to find categories and skills, then use arrayMove
    //        // This part is complex and depends heavily on how you want state managed
    //        // For now, we skip actual reordering based on the prompt focusing on visual feedback.
    //        return prevData; // Return unchanged data for now
    //     });
    //   }
    // }
     // --- End of reordering logic section ---
  };

  // Find the skill data for the currently dragged item (for the overlay)
  const activeSkill = activeItemData?.type === 'skill' ? activeItemData.skill : null;

  return (
    <section
      id="skills"
      className="py-20 min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-900 via-black to-indigo-900/50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Technical Skills
        </motion.h2>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter} // Simple collision detection
          onDragStart={handleDragStart}
          onDragOver={handleDragOver} // Use onDragOver for immediate feedback
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsData.map((category) => (
               // We need a SortableContext here if we were enabling category dragging/reordering
               // For now, just rendering the container is fine
               <SkillCategoryContainer key={category.title} category={category} />
            ))}
          </div>

          <DragOverlay dropAnimation={null}>
            {activeId && activeSkill ? (
              // Render the dragged item clone in the overlay
              <SortableSkillItem
                  skill={activeSkill}
                  categoryTitle={activeItemData?.category || ''}
                  isOverlay={true} // Style it differently as an overlay item
                  isIncorrectDrop={isOverIncorrectContainer} // Pass error state
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Optional: Subtle background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute -bottom-1/4 -right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
      </div>
    </section>
  );
};

export default Skills;

// Add this to your tailwind.config.js or a global CSS file if you want custom animation delay
/*
@layer utilities {
  .animation-delay-2000 {
    animation-delay: 2s;
  }
}
*/