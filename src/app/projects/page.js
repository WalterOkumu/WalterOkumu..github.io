import Layout from '@/components/ui/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, MetricCard } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Users, Globe, Zap, ExternalLink, Calendar, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Executive Portfolio - Walter Oriaro | AI-Driven International Projects',
  description: 'Chief AI Officer portfolio: $2.3M revenue impact across 7 countries through ML-driven Yellow Pages transformation, international team leadership, and AI-powered customer success platforms. C-level technology execution with measurable business outcomes.',
  keywords: 'Chief AI Officer Projects, International Technology Leadership, ML Implementation, Revenue Impact, Team Scaling, AI Transformation',
  openGraph: {
    title: 'Walter Oriaro - Executive Project Portfolio | AI Leadership Results',
    description: 'Leading $2.3M revenue-generating AI transformation across 7 countries with international team management.',
  }
};

// Yellow Pages Group Portfolio
const yellowPagesPortfolio = [
  {
    id: 'yellowpages-kenya',
    title: 'Yellow Pages Kenya',
    description: 'Leading business directory platform in Kenya with comprehensive listing management and enhanced search capabilities.',
    url: 'https://yellowpages.co.ke',
    country: 'Kenya',
    category: 'Business Directory',
    technologies: ['React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    role: 'Technical Architecture & Team Leadership',
    impact: '50K+ active business listings',
    year: '2023-Present'
  },
  {
    id: 'yellowpages-tanzania',
    title: 'Yellow Pages Tanzania',
    description: 'Comprehensive business directory serving the Tanzanian market with localized features and multi-language support.',
    url: 'https://yellowpages.co.tz',
    country: 'Tanzania',
    category: 'Business Directory',
    technologies: ['React.js', 'Next.js', 'Node.js', 'PostgreSQL'],
    role: 'Technical Migration & Optimization',
    impact: '30K+ business listings',
    year: '2023-Present'
  },
  {
    id: 'yellowpages-mozambique',
    title: 'Yellow Pages Mozambique',
    description: 'Business directory platform for Mozambique market with Portuguese localization and local business integration.',
    url: 'https://yellowpages.co.mz',
    country: 'Mozambique',
    category: 'Business Directory',
    technologies: ['React.js', 'Next.js', 'Localization', 'SEO'],
    role: 'International Deployment',
    impact: '15K+ business listings',
    year: '2023-Present'
  },
  {
    id: 'yellowpages-saotome',
    title: 'Yellow Pages São Tomé',
    description: 'Island nation business directory with tourism integration and local business promotion capabilities.',
    url: 'https://yellowpages.st',
    country: 'São Tomé',
    category: 'Business Directory',
    technologies: ['React.js', 'Tourism Integration', 'Mobile-First'],
    role: 'Platform Development',
    impact: '2K+ business listings',
    year: '2023-Present'
  },
  {
    id: 'yellowpages-easttimor',
    title: 'Yellow Pages East Timor',
    description: 'Business directory platform serving East Timor with multi-language support and local business features.',
    url: 'https://yellowpages.tl',
    country: 'East Timor',
    category: 'Business Directory',
    technologies: ['React.js', 'Multi-language', 'Local Integration'],
    role: 'Technical Implementation',
    impact: '1.5K+ business listings',
    year: '2023-Present'
  },
  {
    id: 'yellowpages-capeverde',
    title: 'Yellow Pages Cape Verde',
    description: 'Island archipelago business directory with tourism and local business integration for Cape Verde market.',
    url: 'https://yellowpages.cv',
    country: 'Cape Verde',
    category: 'Business Directory',
    technologies: ['React.js', 'Island Platform', 'Tourism'],
    role: 'Platform Adaptation',
    impact: '3K+ business listings',
    year: '2023-Present'
  },
  {
    id: 'yellowpages-angola',
    title: 'Yellow Pages Angola',
    description: 'Business directory platform for Angola with Portuguese localization and enterprise business features.',
    url: 'https://yellowpages.ao',
    country: 'Angola',
    category: 'Business Directory',
    technologies: ['React.js', 'Enterprise Features', 'Portuguese'],
    role: 'Market Expansion',
    impact: '20K+ business listings',
    year: '2023-Present'
  }
];

// Tourism Portfolio
const tourismPortfolio = [
  {
    id: 'kenya-guide',
    title: 'Visit Kenya Guide',
    description: 'Comprehensive tourism guide showcasing Kenya\'s attractions, accommodations, and travel planning resources.',
    url: 'https://visitkenyaguide.com',
    category: 'Tourism Guide',
    technologies: ['WordPress', 'SEO Optimization', 'Content Management'],
    role: 'Full-Stack Development & SEO',
    impact: '100K+ monthly visitors',
    year: '2020-2022'
  },
  {
    id: 'tanzania-guide',
    title: 'Visit Tanzania Guide',
    description: 'Tourism platform promoting Tanzania\'s national parks, cultural sites, and adventure tourism opportunities.',
    url: 'https://visittanzaniaguide.com',
    category: 'Tourism Guide',
    technologies: ['WordPress', 'Tourism Integration', 'Mobile Optimization'],
    role: 'Platform Development',
    impact: '80K+ monthly visitors',
    year: '2020-2022'
  },
  {
    id: 'uganda-guide',
    title: 'Visit Uganda Guide',
    description: 'Comprehensive travel guide featuring Uganda\'s wildlife, cultural experiences, and tourism infrastructure.',
    url: 'https://visitugandaguide.com',
    category: 'Tourism Guide',
    technologies: ['WordPress', 'Wildlife Integration', 'Cultural Content'],
    role: 'Content & Technical Development',
    impact: '60K+ monthly visitors',
    year: '2020-2022'
  },
  {
    id: 'rwanda-guide',
    title: 'Visit Rwanda Guide',
    description: 'Tourism platform highlighting Rwanda\'s gorilla trekking, cultural heritage, and sustainable tourism initiatives.',
    url: 'https://visitrwandaguide.com',
    category: 'Tourism Guide',
    technologies: ['WordPress', 'Sustainability Features', 'Booking Integration'],
    role: 'Sustainable Tourism Platform',
    impact: '45K+ monthly visitors',
    year: '2020-2022'
  }
];

// Client Projects
const clientProjects = [
  {
    id: 'rhodium-digital',
    title: 'Rhodium Digital',
    description: 'Corporate website and digital marketing platform for international tourism marketing company specializing in East African destinations.',
    url: 'https://rhodiumdigital.com',
    category: 'Corporate Website',
    technologies: ['WordPress', 'Digital Marketing', 'SEO', 'Analytics'],
    role: 'Full-Stack Development & Digital Marketing',
    impact: 'Improved lead generation by 35%',
    year: '2020-2022'
  },
  {
    id: 'kua-wellness',
    title: 'Kua Wellness Africa',
    description: 'Wellness and sound healing services platform with booking system and comprehensive service management for holistic health.',
    url: 'https://www.kuawellness.africa',
    category: 'Wellness & Health',
    technologies: ['React.js', 'Booking System', 'Service Management', 'Payment Integration'],
    role: 'Platform Development & Integration',
    impact: 'Streamlined wellness bookings',
    year: '2023-Present'
  }
];

// Portfolio metrics
const portfolioMetrics = [
  {
    value: '15+',
    label: 'Active Websites',
    description: 'International platforms under management',
    icon: '🌐'
  },
  {
    value: '7',
    label: 'Countries',
    description: 'Across Africa and globally',
    icon: '🌍'
  },
  {
    value: '100K+',
    label: 'Business Listings',
    description: 'Managed across all platforms',
    icon: '📊'
  },
  {
    value: '5M+',
    label: 'Monthly Visitors',
    description: 'Combined platform traffic',
    icon: '👥'
  }
];

export default function Projects() {
  return (
    <Layout padding={false} showNavigation={true} showFooter={true}>
      {/* Executive Hero Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="hero-asymmetric">
            <div className="space-y-8">
              <div>
                <h1 className="heading-display mb-6">
                  Digital Portfolio
                  <span className="block text-secondary">Across 7 Countries</span>
                </h1>
                <p className="text-executive">
                  Leading technical architecture and team management for international digital
                  properties spanning business directories, tourism platforms, and custom enterprise solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="executive" size="lg" href="/contact">
                  Discuss Your Project
                </Button>
                <Button variant="glass" size="lg" href="/about">
                  View Leadership Experience
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {portfolioMetrics.map((metric, index) => (
                  <MetricCard key={index} className="card-metric">
                    <div className="text-2xl mb-2">{metric.icon}</div>
                    <div className="metric-value text-2xl">{metric.value}</div>
                    <div className="metric-label text-xs">{metric.label}</div>
                  </MetricCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yellow Pages Group Portfolio */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="executive" className="mb-4">
              <Users className="w-4 h-4 mr-2" />
              Yellow Pages Group Network
            </Badge>
            <h2 className="heading-primary mb-4">International Business Directory Network</h2>
            <p className="text-executive mx-auto">
              Leading technical architecture and customer success operations for Yellow Pages Group&apos;s
              digital portfolio spanning Kenya, Tanzania, Mozambique, São Tomé, East Timor, Cape Verde, and Angola.
            </p>
          </div>

          <div className="grid-executive">
            {yellowPagesPortfolio.map((project) => (
              <Card key={project.id} className="card-executive">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {project.country}
                      </Badge>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                    </div>
                    <Badge variant="success" className="text-xs">{project.year}</Badge>
                  </div>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-color-neutral-700 mb-2">Role & Impact</p>
                    <p className="text-xs text-color-neutral-600 mb-1">{project.role}</p>
                    <p className="text-xs text-color-success-600 font-medium">{project.impact}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-color-neutral-700 mb-2">Technologies</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="glass" size="sm" href={project.url} className="w-full">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Visit Platform
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tourism Portfolio */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-4">
              <Globe className="w-4 h-4 mr-2" />
              Tourism & Travel Platforms
            </Badge>
            <h2 className="heading-primary mb-4">East African Tourism Guides</h2>
            <p className="text-executive mx-auto">
              Full-stack development and SEO optimization for tourism platforms promoting destinations
              and facilitating travel planning across multiple East African countries.
            </p>
          </div>

          <div className="grid-leadership">
            {tourismPortfolio.map((project) => (
              <Card key={project.id} className="card-glass">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{project.category}</Badge>
                    <Badge variant="warning" className="text-xs">{project.year}</Badge>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-color-neutral-700 mb-2">Technical Focus</p>
                    <p className="text-xs text-color-neutral-600 mb-2">{project.role}</p>
                    <p className="text-xs text-color-success-600 font-medium">{project.impact}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-color-neutral-700 mb-2">Technologies</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3">
                    <Button variant="executive" size="sm" href={project.url} className="w-full">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Explore Platform
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Projects */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="warning" className="mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Client Solutions
            </Badge>
            <h2 className="heading-primary mb-4">Custom Enterprise Solutions</h2>
            <p className="text-executive mx-auto">
              Tailored web development solutions for international clients across healthcare,
              corporate communications, wellness, and professional services sectors.
            </p>
          </div>

          <div className="content-asymmetric-left">
            <div className="space-y-8">
              <div className="card-executive p-8">
                <h3 className="heading-secondary mb-6">Client Development Approach</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-color-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-semibold text-primary">Discovery & Strategy</h4>
                      <p className="text-sm text-color-neutral-600">Comprehensive requirements analysis and technical architecture planning</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-color-success-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-semibold text-primary">Agile Development</h4>
                      <p className="text-sm text-color-neutral-600">Iterative development with regular client feedback and testing cycles</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-color-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-semibold text-primary">Performance & SEO</h4>
                      <p className="text-sm text-color-neutral-600">Optimization for speed, search visibility, and user experience</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-color-success-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-semibold text-primary">Ongoing Support</h4>
                      <p className="text-sm text-color-neutral-600">Maintenance, updates, and strategic enhancement recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {clientProjects.map((project) => (
                <Card key={project.id} className="card-glass">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="executive" className="text-xs">{project.category}</Badge>
                      <Badge variant="outline" className="text-xs">{project.year}</Badge>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-color-neutral-700 mb-2">Responsibilities</p>
                      <p className="text-sm text-color-neutral-600 mb-2">{project.role}</p>
                      <p className="text-sm text-color-success-600 font-medium">{project.impact}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-color-neutral-700 mb-2">Technology Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button variant="executive" href={project.url} className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
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
              <h2 className="heading-primary mb-4">Ready to Build Something Exceptional?</h2>
              <p className="text-executive mx-auto">
                Let&apos;s discuss how my experience in international team leadership, technical architecture,
                and full-stack development can accelerate your digital transformation initiatives.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="executive" size="lg" href="/contact">
                Start Executive Consultation
              </Button>
              <Button variant="glass" size="lg" href="/about">
                Explore Leadership Experience
              </Button>
            </div>

            <div className="pt-6 border-t border-color-neutral-200">
              <p className="text-sm text-color-neutral-600">
                Available for executive technology roles, strategic consulting, and complex international projects
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}