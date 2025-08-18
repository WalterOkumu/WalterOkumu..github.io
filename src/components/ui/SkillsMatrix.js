'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { trackExecutiveEngagement } from '@/lib/executive-analytics';
import {
  Brain,
  Code,
  Users,
  Globe,
  Database,
  Cloud,
  Smartphone,
  BarChart,
  Shield,
  Zap,
  Target,
  Award,
  TrendingUp,
  Layers
} from 'lucide-react';

/**
 * Executive Skills Matrix Component
 * Interactive visualization of executive competencies and technical expertise
 */
const ExecutiveSkillsMatrix = ({
  className = '',
  variant = 'executive',
  interactive = true,
  showDetails = true
}) => {
  const [activeCategory, setActiveCategory] = useState('leadership');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.3 });

  // Executive skills data with proficiency levels and experience
  const skillsData = {
    leadership: {
      title: 'Executive Leadership',
      icon: Users,
      color: 'primary',
      description: 'C-level leadership across international teams and complex organizations',
      skills: [
        {
          name: 'International Team Management',
          level: 95,
          experience: '5+ years',
          description: 'Leading 12-person teams across 7 countries with multi-timezone coordination',
          achievements: ['Scaled team from 3 to 12 members', '40% improvement in team satisfaction', 'Zero critical deployment failures'],
          tools: ['Slack', 'Zoom', 'Asana', 'Microsoft Teams']
        },
        {
          name: 'Strategic Planning & Execution',
          level: 90,
          experience: '4+ years',
          description: 'Long-term strategy development and execution for multi-million dollar initiatives',
          achievements: ['40% customer satisfaction improvement', '7-country expansion strategy', 'Digital transformation roadmap'],
          tools: ['OKRs', 'Strategic Planning', 'Executive Reporting']
        },
        {
          name: 'Cross-functional Coordination',
          level: 92,
          experience: '5+ years',
          description: 'Coordination between technical, marketing, sales, and operations teams',
          achievements: ['Reduced inter-team conflicts by 60%', 'Streamlined project delivery', 'Improved communication protocols'],
          tools: ['Project Management', 'Stakeholder Management', 'Process Optimization']
        },
        {
          name: 'Performance Management',
          level: 88,
          experience: '3+ years',
          description: 'Executive-level performance coaching and team development',
          achievements: ['35% improvement in team performance', 'Leadership development program', '95% team retention rate'],
          tools: ['Performance Reviews', '360 Feedback', 'Career Development']
        }
      ]
    },
    ai_technology: {
              title: 'Technical Infrastructure & Operations',
      icon: Brain,
      color: 'accent',
              description: 'Head of Customer Success expertise with technical implementation and customer success strategy',
      skills: [
        {
          name: 'AI Strategy & Implementation',
          level: 88,
          experience: '3+ years',
          description: 'Head of Customer Success responsibilities with enterprise technical infrastructure deployment',
          achievements: ['78% deployment error reduction', 'Technical infrastructure automation', '99.8% system reliability'],
          tools: ['TensorFlow', 'PyTorch', 'MLOps', 'AI Ethics']
        },
        {
          name: 'Technical Operations & Infrastructure',
          level: 85,
          experience: '2+ years',
          description: 'MLOps pipelines and automated AI system deployment',
          achievements: ['Automated ML model deployment', 'Reduced ML training time by 70%', 'Production ML monitoring'],
          tools: ['Kubeflow', 'MLflow', 'Docker', 'Kubernetes']
        },
        {
          name: 'Data Analytics & Intelligence',
          level: 90,
          experience: '4+ years',
          description: 'Executive data science and business intelligence implementation',
          achievements: ['Customer behavior prediction models', 'Revenue forecasting accuracy 95%', 'Real-time analytics dashboards'],
          tools: ['Python', 'R', 'Tableau', 'Power BI']
        },
        {
          name: 'AI Ethics & Governance',
          level: 82,
          experience: '2+ years',
          description: 'Responsible AI implementation and international compliance',
          achievements: ['GDPR-compliant AI systems', 'AI ethics framework', 'Multi-country AI governance'],
          tools: ['AI Governance', 'Ethics Frameworks', 'Compliance Standards']
        }
      ]
    },
    technical: {
      title: 'Technical Architecture',
      icon: Code,
      color: 'secondary',
      description: 'Full-stack architecture and enterprise system design',
      skills: [
        {
          name: 'Full-Stack Development',
          level: 95,
          experience: '6+ years',
          description: 'End-to-end application development and architecture',
          achievements: ['15+ production applications', '99.9% uptime achievement', 'Zero security breaches'],
          tools: ['React.js', 'Next.js', 'Node.js', 'PostgreSQL']
        },
        {
          name: 'Cloud Architecture (AWS)',
          level: 90,
          experience: '4+ years',
          description: 'Scalable cloud infrastructure and serverless architectures',
          achievements: ['Multi-region deployment', '50% cost reduction', 'Auto-scaling implementation'],
          tools: ['AWS EC2', 'S3', 'RDS', 'Lambda', 'CloudFormation']
        },
        {
          name: 'DevOps & CI/CD',
          level: 92,
          experience: '4+ years',
          description: 'Automated deployment pipelines and infrastructure as code',
          achievements: ['78% reduction in deployment errors', '85% faster deployment cycles', 'Zero-downtime deployments'],
          tools: ['GitHub Actions', 'Docker', 'Kubernetes', 'Terraform']
        },
        {
          name: 'System Design & Scaling',
          level: 87,
          experience: '5+ years',
          description: 'Large-scale system architecture and performance optimization',
          achievements: ['5M+ monthly users support', 'Sub-second API response times', 'International CDN deployment'],
          tools: ['Microservices', 'Load Balancing', 'Caching', 'Database Optimization']
        }
      ]
    },
    business: {
      title: 'Business Operations',
      icon: BarChart,
      color: 'warning',
      description: 'Executive business operations and revenue optimization',
      skills: [
        {
          name: 'Customer Success Management',
          level: 93,
          experience: '4+ years',
          description: 'Enterprise customer success operations and retention strategies',
          achievements: ['40% satisfaction improvement', '98% customer retention', '23% upsell revenue increase'],
          tools: ['Customer Success Platforms', 'CRM Systems', 'Analytics']
        },
        {
          name: 'Revenue Operations',
          level: 85,
          experience: '3+ years',
          description: 'Revenue optimization and business intelligence systems',
          achievements: ['23% upsell revenue growth', 'Customer success metrics', 'Financial reporting automation'],
          tools: ['Revenue Analytics', 'Financial Modeling', 'Business Intelligence']
        },
        {
          name: 'Process Optimization',
          level: 88,
          experience: '5+ years',
          description: 'Business process improvement and operational efficiency',
          achievements: ['60% process efficiency improvement', 'Time-to-value reduced from 3 weeks to 5 days', 'Quality assurance frameworks'],
          tools: ['Process Mapping', 'Automation Tools', 'Quality Management']
        },
        {
          name: 'International Operations',
          level: 90,
          experience: '5+ years',
          description: 'Multi-country operations management and cultural adaptation',
          achievements: ['7-country operation coordination', 'Cultural adaptation strategies', 'International compliance'],
          tools: ['Global Operations', 'Cultural Intelligence', 'International Standards']
        }
      ]
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryKey) => {
    if (!interactive) return;

    setActiveCategory(categoryKey);
    setSelectedSkill(null);

    trackExecutiveEngagement.skillsExploration(
      categoryKey,
      'category_selection',
      'overview'
    );
  };

  // Handle skill interaction
  const handleSkillInteraction = (skill, action) => {
    if (!interactive) return;

    if (action === 'click') {
      setSelectedSkill(selectedSkill === skill.name ? null : skill.name);
    } else if (action === 'hover') {
      setHoveredSkill(skill.name);
    } else if (action === 'unhover') {
      setHoveredSkill(null);
    }

    trackExecutiveEngagement.skillsExploration(
      skill.name,
      activeCategory,
      action === 'click' ? 'detailed_view' : 'overview'
    );
  };

  const currentCategory = skillsData[activeCategory];
  const CategoryIcon = currentCategory.icon;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        delay: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'executive-skills-matrix',
        'py-16 px-6',
        className
      )}
    >
      {/* Skills Matrix Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="heading-hero mb-4 text-primary-900 dark:text-primary-100">
          Executive Competency Matrix
        </h2>
        <p className="text-executive text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto">
          Comprehensive skill assessment across leadership, AI strategy, technical architecture,
          and business operations with quantified expertise levels and measurable achievements.
        </p>
      </motion.div>

      {/* Category Navigation */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {Object.entries(skillsData).map(([key, category]) => {
          const Icon = category.icon;
          const isActive = activeCategory === key;

          return (
            <motion.button
              key={key}
              className={cn(
                'flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300',
                'border-2 font-medium',
                isActive
                  ? `bg-${category.color}-500 text-white border-${category.color}-500 shadow-lg shadow-${category.color}-500/20`
                  : `border-${category.color}-200 text-${category.color}-700 hover:bg-${category.color}-50`,
                interactive && 'cursor-pointer'
              )}
              onClick={() => handleCategorySelect(key)}
              whileHover={interactive ? { scale: 1.02, y: -2 } : {}}
              whileTap={interactive ? { scale: 0.98 } : {}}
            >
              <Icon className="w-5 h-5" />
              <span>{category.title}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Active Category Display */}
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Category Header */}
        <motion.div
          className="text-center mb-12"
          variants={skillVariants}
        >
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-${currentCategory.color}-100 text-${currentCategory.color}-700 mb-4`}>
            <CategoryIcon className="w-6 h-6" />
            <span className="font-semibold">{currentCategory.title}</span>
          </div>
          <p className="text-leadership text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {currentCategory.description}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {currentCategory.skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              category={currentCategory}
              index={index}
              isHovered={hoveredSkill === skill.name}
              isSelected={selectedSkill === skill.name}
              showDetails={showDetails}
              interactive={interactive}
              onInteraction={handleSkillInteraction}
              variants={skillVariants}
              progressVariants={progressVariants}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

/**
 * Individual Skill Card Component
 */
const SkillCard = ({
  skill,
  category,
  index,
  isHovered,
  isSelected,
  showDetails,
  interactive,
  onInteraction,
  variants,
  progressVariants
}) => {
  return (
    <motion.div
      className={cn(
        'card-executive p-6 cursor-pointer transition-all duration-300',
        'border rounded-xl shadow-lg',
        `hover:shadow-xl hover:border-${category.color}-300`,
        isHovered && 'shadow-2xl scale-[1.02]',
        isSelected && `ring-2 ring-${category.color}-500 ring-offset-2`
      )}
      variants={variants}
      onClick={() => onInteraction(skill, 'click')}
      onHoverStart={() => onInteraction(skill, 'hover')}
      onHoverEnd={() => onInteraction(skill, 'unhover')}
      whileHover={interactive ? { y: -4 } : {}}
      layout
    >
      {/* Skill Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="heading-leadership mb-2 text-neutral-900 dark:text-neutral-100">
            {skill.name}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
            {skill.description}
          </p>
        </div>
        <div className="text-right ml-4">
          <div className={`text-2xl font-bold text-${category.color}-600`}>
            {skill.level}%
          </div>
          <div className="text-xs text-neutral-500">
            {skill.experience}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 rounded-full`}
            variants={progressVariants}
            custom={skill.level}
          />
        </div>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {(isSelected || isHovered) && showDetails && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Key Achievements */}
            <div>
              <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Key Achievements
              </h4>
              <ul className="space-y-1">
                {skill.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
                    <TrendingUp className="w-3 h-3 mt-1 text-secondary-500 flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Technologies */}
            <div>
              <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Tools & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {skill.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 text-xs font-medium rounded-full bg-${category.color}-100 text-${category.color}-700 dark:bg-${category.color}-900 dark:text-${category.color}-300`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExecutiveSkillsMatrix;
export { ExecutiveSkillsMatrix };
