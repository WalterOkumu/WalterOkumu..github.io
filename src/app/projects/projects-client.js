'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { TrendingUp, Award, Users, ExternalLink, X } from 'lucide-react';

export default function ProjectsClient({ projects, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Focus management for modal
  useEffect(() => {
    if (selectedProject) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement;

      // Focus the modal when it opens
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 100);

      // Trap focus within modal
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setSelectedProject(null);
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    } else if (previousFocusRef.current) {
      // Return focus to the previously focused element when modal closes
      previousFocusRef.current.focus();
    }
  }, [selectedProject]);

  const filteredProjects = selectedCategory === 'All Projects'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  // If no featured projects are explicitly marked, show first 3 projects
  const displayedFeatured = featuredProjects.length > 0
    ? featuredProjects
    : projects.slice(0, 3).map(p => ({ ...p, featured: true }));

  return (
    <>
      {/* Featured Projects */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Featured Case Studies
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Detailed analysis of high-impact projects demonstrating technical leadership and customer success management
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayedFeatured.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                tabIndex="0"
                role="button"
                aria-label={`View case study for ${project.title}`}
              >
                <div className="aspect-video bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl font-bold mb-2">
                      {project.metrics[0]?.value || '100%'}
                    </div>
                    <div className="text-sm opacity-90">
                      {project.metrics[0]?.label || 'Success Rate'}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <Badge size="sm" className="mb-3">{project.category}</Badge>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} size="sm" variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge size="sm" variant="outline">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="text-center text-sm text-primary-600 dark:text-primary-400 font-medium">
                    View Case Study →
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects with Filtering */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="success" className="mb-4">
              <Users className="w-4 h-4 mr-2" />
              Complete Portfolio
            </Badge>
            <h2 className="heading-primary mb-4">
              International Digital Properties
            </h2>
            <p className="text-executive max-w-3xl mx-auto mb-8">
              Browse 15+ projects by category to explore technical leadership, customer success management,
                              and technical transformation across 7 countries.
            </p>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'executive' : 'glass'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-200"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid-leadership">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="card-glass cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-color-primary-500 focus:ring-offset-2"
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                tabIndex="0"
                role="button"
                aria-label={`View project details for ${project.title}`}
              >
                <div className="aspect-video bg-gradient-to-br from-color-neutral-100 to-color-neutral-200 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-color-primary-500/10 to-transparent"></div>
                  <div className="text-center relative z-10">
                    <div className="text-2xl font-bold text-color-neutral-700 mb-1">
                      {project.metrics?.[0]?.value || project.impact || 'Success'}
                    </div>
                    <div className="text-xs text-color-neutral-500">
                      {project.metrics?.[0]?.label || 'Impact'}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">{project.category}</Badge>
                    <span className="text-xs text-color-neutral-500">{project.timeline || project.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-color-neutral-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-color-neutral-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 2).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 2}
                      </Badge>
                    )}
                  </div>
                  {project.technicalImpact && (
                    <div className="pt-2 border-t border-color-neutral-200">
                      <Badge variant="success" className="text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Technically Enhanced
                      </Badge>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-xl max-w-5xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            tabIndex="-1"
            role="document"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-color-neutral-200 bg-gradient-to-r from-color-primary-50 to-color-success-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge variant="executive">{selectedProject.category}</Badge>
                  {selectedProject.featured && (
                    <Badge variant="success">
                      <Award className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <h2
                id="modal-title"
                className="heading-primary mb-2"
              >
                {selectedProject.title}
              </h2>
              <p className="text-color-neutral-600">
                {selectedProject.description}
              </p>
              {selectedProject.url && (
                <div className="mt-4">
                  <Button variant="glass" size="sm" href={selectedProject.url}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Live Project
                  </Button>
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Key Metrics */}
              {selectedProject.metrics && (
                <div className="mb-8">
                  <h3 className="heading-card mb-4">Key Performance Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProject.metrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-color-neutral-50 rounded-lg">
                        <div className="text-xl font-bold text-color-primary-600">{metric.value}</div>
                        <div className="text-xs text-color-neutral-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="heading-card mb-3">Executive Challenge</h3>
                  <p className="text-sm text-color-neutral-600 leading-relaxed">
                    {selectedProject.challenge || 'Transform business operations through strategic technology implementation and team leadership.'}
                  </p>
                </div>
                <div>
                  <h3 className="heading-card mb-3">Strategic Solution</h3>
                  <p className="text-sm text-color-neutral-600 leading-relaxed">
                    {selectedProject.solution || 'Implemented comprehensive technical architecture with international team coordination and measurable business impact.'}
                  </p>
                </div>
              </div>

              {/* Key Results */}
              <div className="mb-8">
                <h3 className="heading-card mb-4">Measurable Business Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(selectedProject.results || [
                    'Successfully delivered project objectives',
                    'Achieved measurable business impact',
                    'Enhanced customer satisfaction',
                    'Improved operational efficiency'
                  ]).map((result, index) => (
                    <div key={index} className="flex items-start p-3 bg-color-success-50 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-color-success-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-color-success-700">{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Impact */}
              {selectedProject.technicalImpact && (
                <div className="mb-8 p-6 bg-gradient-to-r from-color-primary-50 to-color-success-50 rounded-lg">
                  <h3 className="heading-card mb-3">Technical Leadership Impact</h3>
                  <p className="text-sm text-color-primary-700 leading-relaxed">
                    {selectedProject.technicalImpact}
                  </p>
                </div>
              )}

              {/* Technologies & Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="heading-card mb-3">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="heading-card mb-3">Leadership Role</h3>
                  <p className="text-sm text-color-neutral-600">
                    {selectedProject.role}
                  </p>
                  <p className="text-sm text-color-success-600 mt-2 font-medium">
                    Timeline: {selectedProject.timeline || selectedProject.year}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}