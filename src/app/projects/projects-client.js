'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

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

  return (
    <>
      {/* Featured Projects */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Featured Case Studies
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Detailed analysis of high-impact projects demonstrating technical leadership and customer success management
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Complete Portfolio
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
              Browse projects by category to explore different aspects of technical and customer success leadership
            </p>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
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
                aria-label={`View project details for ${project.title}`}
              >
                <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      {project.metrics[0]?.value || 'N/A'}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {project.metrics[0]?.label || 'Metric'}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge size="sm">{project.category}</Badge>
                    <span className="text-xs text-neutral-500">{project.timeline}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 2).map((tech, index) => (
                      <Badge key={index} size="sm" variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 2 && (
                      <Badge size="sm" variant="outline">
                        +{project.technologies.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
            className="bg-white dark:bg-neutral-900 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            tabIndex="-1"
            role="document"
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <h2 
                  id="modal-title"
                  className="text-2xl font-bold text-neutral-900 dark:text-neutral-100"
                >
                  {selectedProject.title}
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                {selectedProject.description}
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Challenge</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{selectedProject.challenge}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Solution</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{selectedProject.solution}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Key Results</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {selectedProject.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-success-DEFAULT mr-2">•</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <Badge key={index} size="sm" variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}