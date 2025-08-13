import Layout from '@/components/ui/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, MetricCard } from '@/components/ui/Card';
import { ProfessionalTimeline } from '@/components/ui/Timeline';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'About - Walter Okumu Oriaro',
  description: 'Executive background, leadership experience, and career progression of Walter Okumu Oriaro, Head of Customer Success & Technical Architecture.',
};

// Professional experience data
const professionalExperience = [
  {
    title: 'Head of Customer Success & Technical Architecture',
    company: 'Yellow Pages Group',
    period: 'June 2023 - Present',
    location: 'Nairobi, Kenya (Managing teams across 7 countries)',
    description: [
      'Leading dual responsibilities across customer success operations and technical infrastructure for Yellow Pages Group\'s digital portfolio spanning Kenya, Tanzania, Mozambique, São Tomé, East Timor, Cape Verde, and Angola',
      'Built and manage a 12-person cross-functional team across 7 countries including graphic designers, customer success team leads, web developers, copywriters, SEO experts, and IT assistants',
      'Coordinate daily operations across multiple time zones, implementing remote management best practices for distributed team effectiveness',
      'Serve as primary technical escalation point for complex customer and infrastructure issues across the entire group'
    ],
    achievements: [
      'Designed comprehensive customer fulfillment operations reducing time-to-value from 3 weeks to 5 days',
      'Achieved 40% improvement in customer satisfaction through personalized outreach and data-driven intervention strategies',
      'Reduced deployment errors by 78% through enterprise CI/CD pipeline implementation using GitHub Actions and Docker',
      'Increased upsell revenue by 23% through integrated financial reporting system and customer success metrics dashboard',
      'Led technical migration of all Drupal-based websites across 7 countries to React.js/Next.js while solving complex SEO challenges'
    ],
    technologies: ['React.js', 'Next.js', 'Node.js', 'AWS (EC2, S3, RDS)', 'Docker', 'PostgreSQL', 'GitHub Actions', 'CI/CD']
  },
  {
    title: 'Senior Web Developer',
    company: 'Yellow Pages Group',
    period: 'November 2022 - May 2023',
    location: 'Nairobi, Kenya',
    description: [
      'Spearheaded flagship platform migration from Drupal to ReactJS across multiple countries',
      'Architected scalable API backend using Node.js and PostgreSQL that unified data management processes',
      'Established CI/CD foundation that enabled the company\'s rapid international expansion',
      'Collaborated with international marketing teams to implement SEO best practices'
    ],
    achievements: [
      'Improved user experience and achieved 20% increase in page load speed through platform migration',
      'Unified data management processes across departments and countries through scalable API architecture',
      'Enabled rapid international expansion through robust CI/CD foundation',
      'Achieved 30% increase in organic traffic within three months through SEO optimization'
    ],
    technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Docker', 'GitHub Actions', 'SEO Optimization']
  },
  {
    title: 'Full Stack Developer',
    company: 'Rhodium Africa Limited',
    period: 'October 2020 - October 2022',
    location: 'Nairobi, Kenya',
    description: [
      'Led comprehensive technology infrastructure migration for digital tourism marketing across East Africa',
      'Developed and managed lead generation systems converting tourism inquiries into qualified sales opportunities',
      'Implemented integration solutions connecting booking platforms with enterprise CRM systems',
      'Collaborated with marketing teams to optimize conversion funnels and user experience flows'
    ],
    achievements: [
      'Increased sales lead generation by 35% through optimized conversion funnels and user experience enhancements',
      'Successfully migrated legacy systems with zero downtime across multiple business units',
      'Improved customer onboarding efficiency by 60% through automation and streamlined workflows',
      'Achieved 25% improvement in platform performance through infrastructure optimization'
    ],
    technologies: ['WordPress/WooCommerce', 'PHP', 'MySQL', 'JavaScript', 'Digital Marketing Tools']
  },
  {
    title: 'Junior Web Developer',
    company: 'Rhodium Africa Limited',
    period: 'January 2019 - September 2020',
    location: 'Nairobi, Kenya',
    description: [
      'Developed and maintained WordPress-based tourism and digital marketing websites',
      'Collaborated on digital marketing campaigns including social media and email marketing automation',
      'Supported customer acquisition initiatives through website optimization and conversion rate improvements',
      'Gained foundational experience in project management and client communication'
    ],
    achievements: [
      'Contributed to 15% increase in website traffic through SEO optimization and content management',
      'Successfully delivered 12+ website projects on time and within budget constraints',
      'Developed proficiency in multiple CMS platforms and digital marketing tools',
      'Built strong foundation in full-stack development principles and practices'
    ],
    technologies: ['WordPress', 'PHP', 'HTML/CSS', 'JavaScript', 'MySQL', 'SEO Tools']
  }
];

// Leadership and technical achievements
const leadershipMetrics = [
  {
    value: '12',
    label: 'Team Members',
    description: 'Cross-functional team across 7 countries',
    icon: '👥'
  },
  {
    value: '7',
    label: 'Countries',
    description: 'International operations management',
    icon: '🌍'
  },
  {
    value: '78%',
    label: 'Error Reduction',
    description: 'Through CI/CD implementation',
    icon: '🚀'
  },
  {
    value: '40%',
    label: 'Customer Satisfaction',
    description: 'Improvement in 18 months',
    icon: '⭐'
  }
];

// Core competencies
const coreCompetencies = [
  {
    area: 'Executive Leadership',
    skills: ['International Team Management', 'Cross-functional Coordination', 'Strategic Planning', 'Performance Management'],
    description: 'Leading distributed teams across multiple countries and time zones with focus on results and collaboration.'
  },
  {
    area: 'Technical Architecture',
    skills: ['Full-Stack Development', 'Cloud Infrastructure', 'DevOps & CI/CD', 'System Design'],
    description: 'Architecting scalable solutions that support rapid international expansion and enterprise requirements.'
  },
  {
    area: 'Customer Success',
    skills: ['Customer Journey Design', 'Data-Driven Interventions', 'Retention Strategies', 'Revenue Growth'],
    description: 'Building comprehensive customer success operations that drive satisfaction, retention, and revenue growth.'
  },
  {
    area: 'Business Operations',
    skills: ['Process Optimization', 'Financial Reporting', 'Quality Assurance', 'Vendor Management'],
    description: 'Streamlining operations for efficiency while maintaining quality standards and regulatory compliance.'
  }
];

// Personal values and approach
const personalValues = [
  {
    value: 'Excellence',
    description: 'Commitment to delivering high-quality solutions that exceed expectations and drive meaningful business impact.'
  },
  {
    value: 'Collaboration',
    description: 'Building strong relationships across cultures and departments to achieve shared goals and foster innovation.'
  },
  {
    value: 'Continuous Learning',
    description: 'Staying current with technology trends and best practices while developing both technical and leadership capabilities.'
  },
  {
    value: 'Customer Focus',
    description: 'Putting customer success at the center of all decisions and maintaining a deep understanding of user needs.'
  }
];

export default function About() {
  return (
    <Layout padding={false} showNavigation={true} showFooter={true}>
      {/* Executive Hero Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="hero-asymmetric">
            <div className="space-y-8">
              <div>
                <h1 className="heading-display mb-6">
                  Executive Leadership
                  <span className="block text-secondary">Through Technology</span>
                </h1>
                <p className="text-executive">
                  Leading international teams and driving digital transformation across 7 countries.
                  Combining technical expertise with executive leadership to deliver measurable
                  business impact in complex, multi-cultural environments.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="executive" size="lg" href="/contact">
                  Schedule Executive Consultation
                </Button>
                <Button variant="glass" size="lg" href="/projects">
                  View Leadership Portfolio
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="card-glass p-8">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-executive flex items-center justify-center text-white text-2xl font-bold">
                    WO
                  </div>
                  <div>
                    <h3 className="heading-secondary text-primary">Walter Okumu Oriaro</h3>
                    <p className="text-leadership text-secondary">Head of Customer Success & Technical Architecture</p>
                  </div>
                  <div className="flex justify-center space-x-2">
                    <Badge variant="executive">International Leader</Badge>
                    <Badge variant="success">Tech Executive</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Metrics Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-primary mb-4">Leadership Impact</h2>
            <p className="text-executive mx-auto">
              Measurable results from executive leadership and technical innovation
            </p>
          </div>

          <div className="grid-executive">
            {leadershipMetrics.map((metric, index) => (
              <MetricCard key={index} className="card-metric">
                <div className="text-4xl mb-4">{metric.icon}</div>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
                <div className="metric-description">{metric.description}</div>
              </MetricCard>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Journey Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="content-asymmetric-left">
            <div>
              <h2 className="heading-primary mb-6">Executive Journey</h2>
              <p className="text-executive mb-8">
                From technical foundations to executive leadership, my career progression
                demonstrates continuous growth in both technical depth and leadership scope.
              </p>

              <div className="space-y-6">
                <div className="card-glass p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">Current Role Highlights</h3>
                  <ul className="space-y-2 text-secondary">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Managing 12-person cross-functional team across 7 countries
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-success-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Reduced customer time-to-value from 3 weeks to 5 days
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Led migration of all international websites to modern stack
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <ProfessionalTimeline experiences={professionalExperience} />
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-primary mb-4">Executive Competencies</h2>
            <p className="text-executive mx-auto">
              Four pillars of leadership that drive organizational success
            </p>
          </div>

          <div className="grid-executive">
            {coreCompetencies.map((competency, index) => (
              <Card key={index} className="card-executive">
                <CardHeader>
                  <CardTitle className="heading-secondary">{competency.area}</CardTitle>
                  <CardDescription className="text-executive">{competency.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {competency.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Approach Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="content-asymmetric-right">
            <div className="space-y-8">
              <div>
                <h2 className="heading-primary mb-4">Leadership Philosophy</h2>
                <p className="text-executive">
                  My approach to leadership is built on core values that guide decision-making
                  and team development in complex international environments.
                </p>
              </div>

              <div className="space-y-6">
                {personalValues.map((item, index) => (
                  <div key={index} className="card-glass p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">{item.value}</h3>
                    <p className="text-secondary">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="card-executive p-8 space-y-6">
                <h3 className="heading-secondary text-center">Ready to Connect?</h3>
                <p className="text-executive text-center">
                  Available for executive opportunities, strategic consulting,
                  and leadership discussions.
                </p>
                <div className="flex flex-col space-y-4">
                  <Button variant="executive" size="lg" href="/contact" className="w-full">
                    Schedule Executive Meeting
                  </Button>
                  <Button variant="glass" size="lg" href="/skills" className="w-full">
                    Explore Technical Expertise
                  </Button>
                </div>

                <div className="text-center pt-4 border-t border-neutral-200">
                  <p className="text-sm text-secondary">
                    Available for C-level positions and strategic consulting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}