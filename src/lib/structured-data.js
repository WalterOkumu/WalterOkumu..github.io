// Structured Data (JSON-LD) for SEO

export const generatePersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Walter Okumu Oriaro",
  "jobTitle": "Head of Customer Success & Technical Architecture",
  "description": "Dual-mandate technology executive leading customer success operations and web development architecture across 7 countries.",
  "url": process.env.NEXT_PUBLIC_SITE_URL || "https://walterokumu.github.io/walter-okumu-portfolio",
  "email": "okumu.oriaro@gmail.com",
  "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://walterokumu.github.io/walter-okumu-portfolio"}/walter-okumu.webp`,
  "sameAs": [
    process.env.NEXT_PUBLIC_LINKEDIN || "https://linkedin.com/in/walter-okumu",
    process.env.NEXT_PUBLIC_GITHUB || "https://github.com/walter-okumu",
  ].filter(Boolean),
  "worksFor": {
    "@type": "Organization",
    "name": "Yellow Pages Group"
  },
  "knowsAbout": [
    "Technical Architecture",
    "Customer Success",
    "Team Leadership",
    "Full-Stack Development",
    "DevOps",
    "International Team Management",
    "Web Development",
    "API Architecture",
    "Infrastructure Management"
  ],
  "nationality": "Kenyan",
  "homeLocation": {
    "@type": "Place",
    "name": "Kenya"
  }
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Walter Oriaro Portfolio",
  "description": "Executive portfolio of Walter Oriaro, Head of Customer Success & Technical Architecture",
  "url": "https://walterokumu.github.io/walter-okumu-portfolio",
  "author": {
    "@type": "Person",
    "name": "Walter Okumu Oriaro"
  },
  "inLanguage": "en-US",
  "copyrightHolder": {
    "@type": "Person",
    "name": "Walter Okumu Oriaro"
  },
  "copyrightYear": 2025,
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://walter-okumu-portfolio.vercel.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Walter Oriaro Consulting",
  "description": "Technical Architecture and Customer Success Consulting Services",
  "url": "https://walterokumu.github.io/walter-okumu-portfolio",
  "logo": "https://walter-okumu-portfolio.vercel.app/images/logo.png",
  "founder": {
    "@type": "Person",
    "name": "Walter Okumu Oriaro"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Professional Services",
    "email": "walter@walter-oriaro.com",
    "availableLanguage": ["English", "Swahili"]
  },
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  },
  "serviceType": [
    "Technical Architecture Consulting",
    "Customer Success Strategy",
    "Team Leadership Consulting",
    "DevOps Implementation",
    "Full-Stack Development"
  ]
});

export const generateBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": breadcrumb.name,
    "item": breadcrumb.url
  }))
});

export const generateProjectSchema = (project) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.title,
  "description": project.description,
  "creator": {
    "@type": "Person",
    "name": "Walter Okumu Oriaro"
  },
  "dateCreated": project.dateCreated,
  "keywords": project.technologies?.join(", "),
  "about": project.category,
  "url": `https://walter-okumu-portfolio.vercel.app/projects/${project.slug}`,
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": project.title,
    "applicationCategory": "Web Application",
    "operatingSystem": "Cross-Platform",
    "programmingLanguage": project.technologies
  }
});

export const generateServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Technical Architecture & Customer Success Consulting",
  "description": "Executive consulting services for technical architecture and customer success optimization",
  "provider": {
    "@type": "Person",
    "name": "Walter Okumu Oriaro"
  },
  "serviceType": "Professional Consulting",
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Consulting Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Technical Architecture Review",
          "description": "Comprehensive review and optimization of technical architecture"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Customer Success Strategy",
          "description": "Development and implementation of customer success strategies"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "International Team Leadership",
          "description": "Consulting on managing and leading international technical teams"
        }
      }
    ]
  }
});

export const generateContactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Walter Oriaro",
  "description": "Get in touch with Walter Oriaro for technical architecture and customer success consulting",
  "url": "https://walter-okumu-portfolio.vercel.app/contact",
  "mainEntity": {
    "@type": "Person",
    "name": "Walter Okumu Oriaro",
    "jobTitle": "Head of Customer Success & Technical Architecture",
    "email": "walter@walter-oriaro.com"
  }
});

// Helper function to inject JSON-LD into page head
export const injectStructuredData = (schema) => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
  }
};