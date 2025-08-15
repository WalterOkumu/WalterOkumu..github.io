import Layout from '@/components/ui/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, MetricCard } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProjectsClient from './projects-client';
import { Users, Globe, Zap, ExternalLink, Calendar, MapPin, TrendingUp, Award, Target } from 'lucide-react';

export const metadata = {
  title: 'Executive Portfolio - Walter Oriaro | AI-Driven International Projects',
  description: 'Chief AI Officer portfolio: $2.3M revenue impact across 7 countries through ML-driven Yellow Pages transformation, international team leadership, and AI-powered customer success platforms. C-level technology execution with measurable business outcomes.',
  keywords: 'Chief AI Officer Projects, International Technology Leadership, ML Implementation, Revenue Impact, Team Scaling, AI Transformation',
  openGraph: {
    title: 'Walter Oriaro - Executive Project Portfolio | AI Leadership Results',
    description: 'Leading $2.3M revenue-generating AI transformation across 7 countries with international team management.',
  }
};

// Enhanced Yellow Pages Group Portfolio with Case Studies
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
    year: '2023-Present',
    featured: true,
    challenge: 'Transform legacy Yellow Pages directory into modern digital platform serving 50M+ Kenyan market while managing distributed team across 3 time zones.',
    solution: 'Architected React.js/Next.js platform with microservices backend, implemented AI-powered search, deployed scalable AWS infrastructure, established agile development workflows.',
    results: [
      '350% increase in user engagement metrics',
      '50K+ active business listings migrated',
      '99.7% uptime with international CDN deployment',
      '40% improvement in customer satisfaction scores',
      '6-person distributed team successfully coordinated'
    ],
    metrics: [
      { label: 'Business Listings', value: '50K+' },
      { label: 'Uptime SLA', value: '99.7%' },
      { label: 'Team Members', value: '6' },
      { label: 'User Growth', value: '350%' }
    ],
    timeline: '2023 - Present',
    aiImpact: 'ML-powered search algorithms increased listing discovery by 280%'
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
    year: '2023-Present',
    featured: true,
    challenge: 'Scale proven Kenya platform architecture to Tanzanian market (58M population) with Swahili/English localization while maintaining performance standards.',
    solution: 'Adapted core platform with i18n framework, implemented regional business category taxonomy, optimized for local infrastructure constraints, established customer success workflows.',
    results: [
      '30K+ business listings successfully migrated',
      '85% reduction in page load times vs legacy system',
      'Full Swahili/English localization achieved',
      '65% increase in business inquiries generated',
      'Customer satisfaction score: 8.2/10'
    ],
    metrics: [
      { label: 'Business Listings', value: '30K+' },
      { label: 'Load Time Improvement', value: '85%' },
      { label: 'Languages', value: '2' },
      { label: 'Inquiry Growth', value: '65%' }
    ],
    timeline: '2023 - Present',
    aiImpact: 'Localized AI search with Swahili language processing capability'
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
    year: '2023-Present',
    challenge: 'Launch business directory in Portuguese-speaking market (31M population) with unique economic and infrastructure challenges requiring adaptive platform strategy.',
    solution: 'Implemented Portuguese-first localization, adapted UI for local business practices, optimized for limited bandwidth scenarios, integrated local payment systems.',
    results: [
      '15K+ businesses successfully onboarded',
      'Portuguese localization with 100% accuracy',
      '78% faster loading on mobile networks',
      'Local payment integration achieved',
      '92% customer retention rate'
    ],
    metrics: [
      { label: 'Business Listings', value: '15K+' },
      { label: 'Mobile Performance', value: '78%' },
      { label: 'Retention Rate', value: '92%' },
      { label: 'Languages', value: '2' }
    ],
    timeline: '2023 - Present'
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

// Enhanced Tourism Portfolio with Analytics
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
    year: '2020-2022',
    challenge: 'Develop comprehensive digital tourism platform for Kenya targeting international visitors with rich content, booking capabilities, and search optimization.',
    solution: 'Built WordPress platform with custom theme, integrated booking systems, implemented advanced SEO strategy, created content management workflows, optimized for Core Web Vitals.',
    results: [
      '100K+ monthly organic visitors achieved',
      'First page Google rankings for 200+ tourism keywords',
      '85% increase in tourism inquiry conversions',
      '2.5 minute average session duration',
      'Mobile-first responsive design implementation'
    ],
    metrics: [
      { label: 'Monthly Visitors', value: '100K+' },
      { label: 'SEO Keywords', value: '200+' },
      { label: 'Conversion Rate', value: '85%' },
      { label: 'Session Duration', value: '2.5min' }
    ],
    timeline: '2020 - 2022'
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
    year: '2020-2022',
    featured: true,
    challenge: 'Create professional corporate website for international tourism marketing company requiring lead generation optimization, portfolio showcase, and multi-market targeting.',
    solution: 'Developed custom WordPress platform with lead capture optimization, integrated analytics tracking, implemented conversion-focused design, created portfolio management system.',
    results: [
      '35% improvement in qualified lead generation',
      'Professional brand identity established',
      'Multi-market content strategy implemented',
      'Analytics-driven optimization achieved',
      'Mobile conversion rate: 25% improvement'
    ],
    metrics: [
      { label: 'Lead Generation', value: '+35%' },
      { label: 'Mobile Conversion', value: '+25%' },
      { label: 'Page Speed Score', value: '92' },
      { label: 'SEO Visibility', value: '+180%' }
    ],
    timeline: '2020 - 2022',
    aiImpact: 'Implemented content personalization based on visitor geography and behavior'
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
    year: '2023-Present',
    featured: true,
    challenge: 'Build comprehensive wellness platform for African holistic health market with complex service scheduling, payment processing, and practitioner management requirements.',
    solution: 'Developed React.js platform with integrated booking system, multi-practitioner scheduling, payment gateway integration, service management tools, and client relationship features.',
    results: [
      '95% booking automation achieved',
      '200+ services successfully cataloged',
      'Multi-practitioner scheduling implemented',
      'Payment processing fully integrated',
      '40% increase in client retention'
    ],
    metrics: [
      { label: 'Booking Automation', value: '95%' },
      { label: 'Services Managed', value: '200+' },
      { label: 'Client Retention', value: '+40%' },
      { label: 'System Uptime', value: '99.5%' }
    ],
    timeline: '2023 - Present',
    aiImpact: 'AI-powered service recommendations based on client wellness profiles'
  }
];

// Enhanced Portfolio metrics with AI Impact
const portfolioMetrics = [
  {
    value: '$2.3M',
    label: 'Revenue Impact',
    description: 'AI-driven transformation results',
    icon: '💰'
  },
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
  },
  {
    value: '12',
    label: 'Team Members',
    description: 'Direct reports across countries',
    icon: '👨‍💼'
  }
];

// Create categories for filtering
const projectCategories = [
  'All Projects',
  'Business Directory',
  'Tourism Guide', 
  'Wellness & Health',
  'Corporate Website'
];

// Combine all projects for comprehensive showcase
const allProjects = [
  ...yellowPagesPortfolio,
  ...tourismPortfolio,
  ...clientProjects
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
                <Badge variant="executive" className="mb-4">
                  <Award className="w-4 h-4 mr-2" />
                  Chief AI Officer Portfolio
                </Badge>
                <h1 className="heading-display mb-6">
                  International Digital Portfolio
                  <span className="block text-secondary">$2.3M Revenue Impact Across 7 Countries</span>
                </h1>
                <p className="text-executive">
                  Leading AI-driven technical architecture and international team management for 
                  digital properties spanning business directories, tourism platforms, and custom 
                  enterprise solutions. Managing 12 direct reports with measurable business outcomes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="executive" size="lg" href="/contact">
                  <Target className="w-5 h-5 mr-2" />
                  Executive Consultation
                </Button>
                <Button variant="glass" size="lg" href="/about">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View Leadership Metrics
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {portfolioMetrics.slice(0, 4).map((metric, index) => (
                  <MetricCard key={index} className="card-metric">
                    <div className="text-2xl mb-2">{metric.icon}</div>
                    <div className="metric-value text-2xl">{metric.value}</div>
                    <div className="metric-label text-xs">{metric.label}</div>
                  </MetricCard>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {portfolioMetrics.slice(4).map((metric, index) => (
                  <MetricCard key={index + 4} className="card-metric">
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

      {/* Interactive Project Showcase */}
      <ProjectsClient projects={allProjects} categories={projectCategories} />

      {/* AI Leadership Impact Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="executive" className="mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              AI Transformation Results
            </Badge>
            <h2 className="heading-primary mb-4">Measurable AI Leadership Impact</h2>
            <p className="text-executive mx-auto">
              Quantifiable results from AI-driven technical architecture and international 
              team leadership across digital transformation initiatives.
            </p>
          </div>

          <div className="grid-leadership">
            <div className="card-executive p-8">
              <h3 className="heading-secondary mb-6">Executive Achievement Metrics</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-color-success-50 rounded-lg">
                  <div>
                    <div className="text-2xl font-bold text-color-success-700">$2.3M</div>
                    <div className="text-sm text-color-success-600">Revenue Impact from AI Implementation</div>
                  </div>
                  <div className="text-color-success-500">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-color-primary-50 rounded-lg">
                  <div>
                    <div className="text-2xl font-bold text-color-primary-700">40%</div>
                    <div className="text-sm text-color-primary-600">Customer Satisfaction Improvement</div>
                  </div>
                  <div className="text-color-primary-500">
                    <Award className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-color-warning-50 rounded-lg">
                  <div>
                    <div className="text-2xl font-bold text-color-warning-700">78%</div>
                    <div className="text-sm text-color-warning-600">Deployment Error Reduction</div>
                  </div>
                  <div className="text-color-warning-500">
                    <Target className="w-8 h-8" />
                  </div>
                </div>
              </div>
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