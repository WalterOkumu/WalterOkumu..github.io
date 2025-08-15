import Layout from '@/components/ui/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, MetricCard } from '@/components/ui/Card';
import { SkillProgress, CircularProgress } from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SkillsClient from './skills-client';
import {
  Code, Users, Cloud, Database, Shield, Zap,
  Globe, TrendingUp, Award, Target, Brain, Heart, Cpu, BarChart3
} from 'lucide-react';

export const metadata = {
  title: 'Executive Skills Matrix - Walter Oriaro | AI Leadership & Technical Excellence',
  description: 'Interactive skills portfolio showcasing Chief AI Officer capabilities: $2.3M revenue impact through ML implementation, international team leadership across 7 countries, and executive-level technical architecture expertise.',
  keywords: 'Chief AI Officer Skills, Technical Leadership Matrix, International Team Management, AI Implementation, Executive Technology Skills, ML Operations',
  openGraph: {
    title: 'Walter Oriaro - Executive Skills Matrix | AI Leadership Excellence',
    description: 'Interactive portfolio demonstrating $2.3M AI revenue impact and international technical leadership.',
  }
};

// Executive Leadership Skills
const leadershipSkills = [
  {
    category: 'International Team Management',
    icon: Globe,
    level: 95,
    experience: '4+ years',
    description: 'Leading cross-functional teams across 7 countries with cultural sensitivity and operational excellence.',
    achievements: [
      'Managing 12-person distributed team',
      'Coordinating across 12+ time zones',
      'Cultural adaptation strategies',
      'Remote-first management practices'
    ]
  },
  {
    category: 'Customer Success Strategy',
    icon: Heart,
    level: 92,
    experience: '4+ years',
    description: 'Designing and implementing customer success operations that drive retention and revenue growth.',
    achievements: [
      '40% improvement in customer satisfaction',
      'Reduced time-to-value from 3 weeks to 5 days',
      '23% increase in upsell revenue',
      'Data-driven intervention strategies'
    ]
  },
  {
    category: 'Strategic Planning',
    icon: Target,
    level: 88,
    experience: '5+ years',
    description: 'Developing and executing technical and business strategies for international expansion.',
    achievements: [
      'International expansion planning',
      'Technology roadmap development',
      'Resource allocation optimization',
      'Risk assessment and mitigation'
    ]
  },
  {
    category: 'Executive Communication',
    icon: Users,
    level: 90,
    experience: '4+ years',
    description: 'Bridging technical complexity with business objectives for C-level stakeholder alignment.',
    achievements: [
      'C-level presentation experience',
      'Cross-cultural communication',
      'Technical translation for executives',
      'Stakeholder alignment strategies'
    ]
  }
];

// Technical Skills Data
const technicalSkills = [
  {
    category: 'Frontend Architecture',
    icon: Code,
    level: 95,
    experience: '6+ years',
    description: 'Expert in building scalable, performant web applications with modern frameworks and optimization.',
    skills: [
      { name: 'React.js/Next.js', level: 95 },
      { name: 'TypeScript/JavaScript', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Performance Optimization', level: 88 }
    ]
  },
  {
    category: 'Backend Development',
    icon: Database,
    level: 92,
    experience: '6+ years',
    description: 'Architecting robust server-side solutions with focus on scalability and international requirements.',
    skills: [
      { name: 'Node.js/Express.js', level: 92 },
      { name: 'PostgreSQL/Database Design', level: 90 },
      { name: 'API Development', level: 88 },
      { name: 'Microservices', level: 85 }
    ]
  },
  {
    category: 'Cloud & DevOps',
    icon: Cloud,
    level: 88,
    experience: '5+ years',
    description: 'Implementing cloud infrastructure and CI/CD pipelines for international deployment.',
    skills: [
      { name: 'AWS (EC2, S3, RDS)', level: 88 },
      { name: 'Docker & Containerization', level: 85 },
      { name: 'GitHub Actions CI/CD', level: 90 },
      { name: 'Infrastructure as Code', level: 82 }
    ]
  },
  {
    category: 'System Architecture',
    icon: Brain,
    level: 90,
    experience: '5+ years',
    description: 'Designing scalable systems that support rapid international expansion and enterprise requirements.',
    skills: [
      { name: 'Distributed Systems', level: 88 },
      { name: 'Security Implementation', level: 85 },
      { name: 'Performance Monitoring', level: 87 },
      { name: 'Scalability Planning', level: 90 }
    ]
  }
];

// Business & Operations Skills
const businessSkills = [
  {
    category: 'Digital Transformation',
    icon: TrendingUp,
    level: 90,
    experience: '4+ years',
    description: 'Leading organizational technology transformation and modernization initiatives.',
    impact: 'Led migration of 7 international platforms to modern stack'
  },
  {
    category: 'Process Optimization',
    icon: Zap,
    level: 88,
    experience: '5+ years',
    description: 'Streamlining operations for efficiency while maintaining quality and compliance.',
    impact: '78% reduction in deployment errors through process improvement'
  },
  {
    category: 'Quality Assurance',
    icon: Shield,
    level: 85,
    experience: '6+ years',
    description: 'Implementing comprehensive testing and quality control frameworks.',
    impact: 'Established testing protocols for international compliance'
  },
  {
    category: 'Vendor Management',
    icon: Award,
    level: 82,
    experience: '3+ years',
    description: 'Managing technology partnerships and service provider relationships.',
    impact: 'Optimized vendor relationships across 7 countries'
  }
];

// Enhanced AI-focused skill metrics
const skillMetrics = [
  {
    value: '$2.3M',
    label: 'AI Revenue Impact',
    description: 'ML implementation results',
    icon: '🤖'
  },
  {
    value: '95%',
    label: 'Technical Proficiency',
    description: 'AI/ML & Full-Stack Development',
    icon: '💻'
  },
  {
    value: '92%',
    label: 'Leadership Effectiveness', 
    description: '12 direct reports, 7 countries',
    icon: '👥'
  },
  {
    value: '280%',
    label: 'ML Performance Gain',
    description: 'Search algorithm optimization',
    icon: '📈'
  },
  {
    value: '90%',
    label: 'Strategic Impact',
    description: 'AI transformation results',
    icon: '🎯'
  },
  {
    value: '6+',
    label: 'Years Experience',
    description: 'Technical & AI leadership',
    icon: '⏱️'
  }
];

// AI Leadership Skills (Enhanced)
const aiLeadershipSkills = [
  {
    category: 'Chief AI Officer Strategy',
    icon: Brain,
    level: 90,
    experience: '3+ years',
    description: 'Developing enterprise AI transformation strategies with quantifiable business impact and international implementation.',
    achievements: [
      '$2.3M revenue impact from AI initiatives',
      'AI roadmap execution across 7 countries',
      'C-level AI strategy presentations',
      'Cross-functional AI team coordination (12 reports)'
    ],
    impact: 'Executive AI leadership positioning with measurable transformation results'
  },
  {
    category: 'ML Operations & Implementation',
    icon: Cpu,
    level: 85,
    experience: '3+ years',
    description: 'Implementing production ML systems with automated deployment, monitoring, and continuous improvement frameworks.',
    achievements: [
      '280% ML search performance improvement',
      'Production ML model deployment automation',
      'AI-powered customer success workflows',
      'Predictive analytics implementation'
    ],
    impact: 'Scalable ML operations supporting 5M+ monthly users with 99.7% uptime'
  }
];

// Industry certifications and continuous learning
const certifications = [
  {
    title: 'AWS Solutions Architect',
    organization: 'Amazon Web Services',
    status: 'In Progress',
    category: 'Cloud Architecture'
  },
  {
    title: 'Kubernetes Administrator',
    organization: 'CNCF',
    status: 'Planned',
    category: 'DevOps'
  },
  {
    title: 'Customer Success Management',
    organization: 'Industry Certification',
    status: 'Completed',
    category: 'Leadership'
  },
  {
    title: 'Agile Project Management',
    organization: 'PMI',
    status: 'Completed',
    category: 'Management'
  }
];

export default function Skills() {
  return (
    <Layout padding={false} showNavigation={true} showFooter={true}>
      {/* Executive Hero Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="hero-asymmetric">
            <div className="space-y-8">
              <div>
                <Badge variant="executive" className="mb-4">
                  <Brain className="w-4 h-4 mr-2" />
                  Chief AI Officer Skills Matrix
                </Badge>
                <h1 className="heading-display mb-6">
                  AI-Driven Executive Excellence
                  <span className="block text-color-success-600">$2.3M Revenue Impact Portfolio</span>
                </h1>
                <p className="text-executive">
                  Interactive skills showcase demonstrating Chief AI Officer capabilities:
                  ML-powered business transformation, international team leadership across 7 countries,
                  and technical architecture expertise driving measurable results.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="executive" size="lg" href="/contact">
                  <Target className="w-5 h-5 mr-2" />
                  Chief AI Officer Consultation
                </Button>
                <Button variant="glass" size="lg" href="/projects">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View AI Impact Results
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {skillMetrics.slice(0, 4).map((metric, index) => (
                  <MetricCard key={index} className="card-metric">
                    <div className="text-2xl mb-2">{metric.icon}</div>
                    <div className="metric-value text-xl">{metric.value}</div>
                    <div className="metric-label text-xs">{metric.label}</div>
                    <div className="metric-description text-xs">{metric.description}</div>
                  </MetricCard>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {skillMetrics.slice(4).map((metric, index) => (
                  <MetricCard key={index + 4} className="card-metric">
                    <div className="text-2xl mb-2">{metric.icon}</div>
                    <div className="metric-value text-xl">{metric.value}</div>
                    <div className="metric-label text-xs">{metric.label}</div>
                    <div className="metric-description text-xs">{metric.description}</div>
                  </MetricCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Leadership Impact Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="executive" className="mb-4">
              <Brain className="w-4 h-4 mr-2" />
              Chief AI Officer Capabilities
            </Badge>
            <h2 className="heading-primary mb-4">AI-Driven Leadership Excellence</h2>
            <p className="text-executive mx-auto">
              Enhanced leadership skills with AI implementation expertise delivering quantifiable business results
            </p>
          </div>

          <div className="grid-executive">
            {aiLeadershipSkills.map((skill, index) => (
              <Card key={index} className="card-executive">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-executive flex items-center justify-center text-white ring-2 ring-color-primary-300">
                        <Brain className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{skill.category}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="success" className="text-xs">{skill.experience}</Badge>
                          <Badge variant="executive" className="text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            AI Impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <CircularProgress value={skill.level} size="lg" />
                      <div className="text-xs text-color-neutral-600 mt-1">{skill.level}%</div>
                    </div>
                  </div>
                  <CardDescription>{skill.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-color-neutral-700 mb-3">Key Achievements</p>
                    <div className="space-y-2">
                      {skill.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start">
                          <TrendingUp className="w-3 h-3 text-color-success-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-color-neutral-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {skill.impact && (
                    <div className="p-4 bg-gradient-to-r from-color-primary-50 to-color-success-50 rounded-lg border border-color-primary-200">
                      <p className="text-sm font-medium text-color-primary-800 mb-1">Business Impact</p>
                      <p className="text-sm text-color-primary-700">{skill.impact}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Skills Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-primary mb-4">Executive Leadership Competencies</h2>
            <p className="text-executive mx-auto">
              Strategic leadership capabilities developed through managing international teams and complex technical initiatives
            </p>
          </div>

          <div className="grid-executive">
            {leadershipSkills.map((skill, index) => (
              <Card key={index} className="card-executive">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-executive flex items-center justify-center text-white">
                        <skill.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{skill.category}</CardTitle>
                        <Badge variant="success" className="text-xs">{skill.experience}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <CircularProgress value={skill.level} size="lg" />
                    </div>
                  </div>
                  <CardDescription>{skill.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-color-neutral-700 mb-3">Key Achievements</p>
                    <div className="space-y-2">
                      {skill.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-color-success-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm text-color-neutral-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-primary mb-4">Technical Architecture Expertise</h2>
            <p className="text-executive mx-auto">
              Comprehensive technical skills spanning full-stack development, cloud infrastructure, and system design
            </p>
          </div>

          <div className="space-y-12">
            {technicalSkills.map((category, categoryIndex) => (
              <div key={categoryIndex} className="content-asymmetric-left">
                <div className="space-y-6">
                  <Card className="card-glass p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-executive flex items-center justify-center text-white">
                        <category.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="heading-secondary">{category.category}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="executive">{category.experience}</Badge>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-color-neutral-600">Proficiency:</span>
                            <CircularProgress value={category.level} size="sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-executive">{category.description}</p>
                  </Card>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <Card key={skillIndex} className="card-executive">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-primary">{skill.name}</h4>
                          <Badge variant="outline">{skill.level}%</Badge>
                        </div>
                        <SkillProgress
                          skill={skill.name}
                          level={skill.level}
                          showLabel={false}
                          className="h-3"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business & Operations Skills */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-primary mb-4">Business Operations Excellence</h2>
            <p className="text-executive mx-auto">
              Strategic business capabilities that drive organizational transformation and operational efficiency
            </p>
          </div>

          <div className="grid-leadership">
            {businessSkills.map((skill, index) => (
              <Card key={index} className="card-glass">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-executive flex items-center justify-center text-white">
                        <skill.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{skill.category}</CardTitle>
                        <Badge variant="outline" className="text-xs">{skill.experience}</Badge>
                      </div>
                    </div>
                    <CircularProgress value={skill.level} size="md" />
                  </div>
                  <CardDescription>{skill.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-4 bg-color-success-50 rounded-lg border border-color-success-200">
                    <p className="text-sm font-medium text-color-success-800 mb-1">Measurable Impact</p>
                    <p className="text-sm text-color-success-700">{skill.impact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Continuous Learning */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="content-asymmetric-right">
            <div className="space-y-8">
              <div>
                <h2 className="heading-primary mb-4">Professional Development</h2>
                <p className="text-executive">
                  Commitment to continuous learning and industry certification to maintain cutting-edge expertise
                </p>
              </div>

              <div className="card-glass p-8 space-y-6">
                <h3 className="heading-secondary">Learning Philosophy</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-color-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-semibold text-primary">Technology Evolution</h4>
                      <p className="text-sm text-color-neutral-600">Staying current with emerging technologies and frameworks</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-color-success-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-semibold text-primary">Leadership Development</h4>
                      <p className="text-sm text-color-neutral-600">Advancing executive and strategic leadership capabilities</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-color-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-semibold text-primary">Industry Best Practices</h4>
                      <p className="text-sm text-color-neutral-600">Learning from global organizations and thought leaders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="heading-secondary">Certifications & Training</h3>
              {certifications.map((cert, index) => (
                <Card key={index} className="card-executive">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-primary">{cert.title}</h4>
                      <Badge
                        variant={cert.status === 'Completed' ? 'success' : cert.status === 'In Progress' ? 'warning' : 'outline'}
                        className="text-xs"
                      >
                        {cert.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-color-neutral-600">{cert.organization}</span>
                      <Badge variant="outline" className="text-xs">{cert.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="card-executive p-12 text-center space-y-8">
            <div>
              <h2 className="heading-primary mb-4">Ready to Leverage This Expertise?</h2>
              <p className="text-executive mx-auto">
                Available for executive technology roles, strategic consulting, and complex technical leadership challenges
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="executive" size="lg" href="/contact">
                Discuss Technical Leadership Role
              </Button>
              <Button variant="glass" size="lg" href="/about">
                View Executive Experience
              </Button>
            </div>

            <div className="pt-6 border-t border-color-neutral-200">
              <p className="text-sm text-color-neutral-600">
                Combining technical depth with executive breadth for transformational leadership impact
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}