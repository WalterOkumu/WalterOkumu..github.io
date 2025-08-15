'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { SkillProgress, CircularProgress } from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import {
  TrendingUp, Users, Target, Award, Code, Database, Cloud, Brain,
  BarChart3, PieChart, Activity, Zap, Filter, Eye, ChevronDown
} from 'lucide-react';

export default function SkillsClient({ 
  leadershipSkills, 
  technicalSkills, 
  businessSkills, 
  certifications 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All Skills');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'chart', 'timeline'
  const [animatedValues, setAnimatedValues] = useState({});
  const [isVisible, setIsVisible] = useState({});
  
  const skillRefs = useRef([]);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.isIntersecting && !isVisible[index]) {
            setIsVisible(prev => ({ ...prev, [index]: true }));
            
            // Animate skill levels
            setTimeout(() => {
              const skillData = entry.target.dataset.level;
              if (skillData) {
                animateValue(index, parseInt(skillData));
              }
            }, 200);
          }
        });
      },
      { threshold: 0.2 }
    );

    skillRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [isVisible]);

  const animateValue = (index, targetValue) => {
    let current = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(timer);
      }
      setAnimatedValues(prev => ({ ...prev, [index]: Math.round(current) }));
    }, 20);
  };

  // Skill categories for filtering
  const categories = [
    'All Skills',
    'Executive Leadership', 
    'Technical Architecture',
    'Business Operations',
    'AI & Innovation'
  ];

  // Enhanced skill data with AI focus
  const allSkills = [
    ...leadershipSkills.map(skill => ({ 
      ...skill, 
      category: 'Executive Leadership',
      aiEnhanced: true,
      impact: 'International team coordination with AI-powered productivity tools'
    })),
    ...technicalSkills.map(skill => ({ 
      ...skill, 
      category: 'Technical Architecture',
      aiEnhanced: true,
      impact: 'ML-powered performance optimization and predictive scaling'
    })),
    ...businessSkills.map(skill => ({ 
      ...skill, 
      category: 'Business Operations',
      aiEnhanced: false,
      impact: skill.impact
    }))
  ];

  // AI Leadership Skills (new category)
  const aiSkills = [
    {
      category: 'AI Strategy & Implementation',
      icon: 'Brain',
      level: 88,
      experience: '3+ years',
      description: 'Developing and executing AI transformation strategies with measurable business impact.',
      achievements: [
        '$2.3M revenue impact from AI implementation',
        'ML-powered search algorithms (280% improvement)',
        'AI-driven customer success automation',
        'Predictive analytics for business optimization'
      ],
      aiEnhanced: true,
      impact: 'Chief AI Officer positioning with quantifiable business transformation'
    },
    {
      category: 'Machine Learning Operations',
      icon: 'Activity',
      level: 82,
      experience: '2+ years', 
      description: 'Implementing MLOps pipelines and AI model deployment for production systems.',
      achievements: [
        'ML model deployment automation',
        'AI performance monitoring systems',
        'Data pipeline optimization',
        'Model versioning and governance'
      ],
      aiEnhanced: true,
      impact: 'Scalable AI infrastructure supporting 5M+ monthly users'
    }
  ];

  const enhancedAllSkills = [...allSkills, ...aiSkills.map(skill => ({ 
    ...skill, 
    category: 'AI & Innovation' 
  }))];

  const filteredSkills = selectedCategory === 'All Skills' 
    ? enhancedAllSkills 
    : enhancedAllSkills.filter(skill => skill.category === selectedCategory);

  // Interactive skill matrix visualization
  const SkillMatrix = ({ skills }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill, index) => (
        <Card 
          key={index}
          ref={el => skillRefs.current[index] = el}
          data-level={skill.level}
          className={`card-executive cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-lg ${
            isVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          onClick={() => setSelectedSkill(skill)}
        >
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-executive flex items-center justify-center text-white transition-all duration-300 ${
                  skill.aiEnhanced ? 'ring-2 ring-color-primary-300' : ''
                }`}>
                  {(() => {
                    const IconComponent = iconMap[skill.icon] || Brain;
                    return <IconComponent className="w-6 h-6" />;
                  })()}
                </div>
                <div>
                  <CardTitle className="text-lg">{skill.category}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" className="text-xs">{skill.experience}</Badge>
                    {skill.aiEnhanced && (
                      <Badge variant="executive" className="text-xs">
                        <Brain className="w-3 h-3 mr-1" />
                        AI Enhanced
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <CircularProgress 
                  value={animatedValues[index] || 0} 
                  size="lg" 
                  animated={true}
                />
                <div className="text-xs text-color-neutral-600 mt-1">
                  {animatedValues[index] || 0}%
                </div>
              </div>
            </div>
            <CardDescription className="text-sm leading-relaxed">
              {skill.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-color-neutral-700">Key Achievements</p>
              <div className="space-y-1">
                {(skill.achievements || []).slice(0, 2).map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start">
                    <TrendingUp className="w-3 h-3 text-color-success-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-xs text-color-neutral-600">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {skill.impact && (
              <div className="pt-3 border-t border-color-neutral-200">
                <p className="text-xs text-color-primary-600 font-medium">
                  Impact: {skill.impact}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Skills comparison chart
  const SkillsChart = ({ skills }) => (
    <div className="space-y-8">
      {/* Overall proficiency chart */}
      <div className="card-executive p-8">
        <h3 className="heading-card mb-6">Executive Skills Proficiency Matrix</h3>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const IconComponent = iconMap[skill.icon] || Brain;
                    return <IconComponent className="w-5 h-5 text-color-primary-600" />;
                  })()}
                  <span className="text-sm font-medium">{skill.category}</span>
                  {skill.aiEnhanced && (
                    <Badge variant="executive" className="text-xs">AI</Badge>
                  )}
                </div>
                <span className="text-sm text-color-neutral-600">
                  {animatedValues[index] || skill.level}%
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-color-neutral-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                      skill.aiEnhanced 
                        ? 'bg-gradient-to-r from-color-primary-500 to-color-success-500' 
                        : 'bg-gradient-to-r from-color-neutral-400 to-color-primary-500'
                    }`}
                    style={{ 
                      width: `${animatedValues[index] || 0}%`,
                      transitionDelay: `${index * 100}ms`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-glass p-6">
          <h4 className="heading-card mb-4">Leadership Excellence</h4>
          <div className="space-y-3">
            {skills.filter(s => s.category === 'Executive Leadership').map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-color-success-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const IconComponent = iconMap[skill.icon] || Brain;
                    return <IconComponent className="w-4 h-4 text-color-success-600" />;
                  })()}
                  <span className="text-sm">{skill.category}</span>
                </div>
                <CircularProgress value={skill.level} size="sm" />
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass p-6">
          <h4 className="heading-card mb-4">Technical Mastery</h4>
          <div className="space-y-3">
            {skills.filter(s => s.category === 'Technical Architecture').map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-color-primary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const IconComponent = iconMap[skill.icon] || Brain;
                    return <IconComponent className="w-4 h-4 text-color-primary-600" />;
                  })()}
                  <span className="text-sm">{skill.category}</span>
                </div>
                <CircularProgress value={skill.level} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Skill detail modal
  const SkillDetailModal = ({ skill, onClose }) => (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-color-neutral-200 bg-gradient-to-r from-color-primary-50 to-color-success-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-executive flex items-center justify-center text-white">
                {(() => {
                  const IconComponent = iconMap[skill.icon] || Brain;
                  return <IconComponent className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <h2 className="heading-primary">{skill.category}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="success">{skill.experience}</Badge>
                  {skill.aiEnhanced && (
                    <Badge variant="executive">
                      <Brain className="w-3 h-3 mr-1" />
                      AI Enhanced
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
          <p className="text-color-neutral-600">{skill.description}</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="heading-card mb-4">Proficiency Level</h3>
              <div className="text-center">
                <CircularProgress value={skill.level} size="xl" animated={true} />
                <div className="mt-4">
                  <div className="text-3xl font-bold text-color-primary-600">{skill.level}%</div>
                  <div className="text-sm text-color-neutral-600">Expert Level</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="heading-card mb-4">Key Achievements</h3>
              <div className="space-y-3">
                {(skill.achievements || []).map((achievement, index) => (
                  <div key={index} className="flex items-start p-3 bg-color-success-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-color-success-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-color-success-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {skill.impact && (
            <div className="p-6 bg-gradient-to-r from-color-primary-50 to-color-success-50 rounded-lg">
              <h3 className="heading-card mb-3">Business Impact</h3>
              <p className="text-color-primary-700 leading-relaxed">{skill.impact}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Interactive Controls */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="card-executive p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h2 className="heading-primary mb-2">Interactive Skills Matrix</h2>
                <p className="text-executive">
                  Explore technical expertise and leadership capabilities with detailed insights
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-color-neutral-600" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-color-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-color-primary-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'executive' : 'glass'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'chart' ? 'executive' : 'glass'}
                    size="sm"
                    onClick={() => setViewMode('chart')}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Chart
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Content Based on View Mode */}
          {viewMode === 'grid' ? (
            <SkillMatrix skills={filteredSkills} />
          ) : (
            <SkillsChart skills={filteredSkills} />
          )}
        </div>
      </section>

      {/* AI Leadership Spotlight */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="card-executive p-12 text-center bg-gradient-to-r from-color-primary-50 to-color-success-50">
            <div className="max-w-3xl mx-auto">
              <Badge variant="executive" className="mb-4">
                <Brain className="w-4 h-4 mr-2" />
                Chief AI Officer Capabilities
              </Badge>
              <h2 className="heading-primary mb-4">AI-Driven Leadership Excellence</h2>
              <p className="text-executive mb-8">
                Combining executive leadership with AI expertise to drive $2.3M revenue impact 
                through intelligent automation, predictive analytics, and strategic technology transformation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-color-primary-600 mb-2">$2.3M</div>
                  <div className="text-sm text-color-neutral-600">AI Revenue Impact</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-color-success-600 mb-2">280%</div>
                  <div className="text-sm text-color-neutral-600">ML Performance Gain</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-color-warning-600 mb-2">12</div>
                  <div className="text-sm text-color-neutral-600">AI-Enhanced Teams</div>
                </div>
              </div>

              <Button variant="executive" size="lg" href="/contact">
                <Target className="w-5 h-5 mr-2" />
                Discuss AI Leadership Opportunity
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <SkillDetailModal 
          skill={selectedSkill} 
          onClose={() => setSelectedSkill(null)} 
        />
      )}
    </>
  );
}