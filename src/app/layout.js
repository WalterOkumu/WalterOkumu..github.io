import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ENV, logEnvironmentStatus } from "@/lib/env";

// Inter font configuration as per design specification
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Walter Okumu Oriaro",
  "alternateName": "Walter Oriaro",
  "jobTitle": "Head of Customer Success & Technical Architecture",
  "worksFor": {
    "@type": "Organization",
    "name": "Yellow Pages Group"
  },
  "url": ENV.SITE_URL,
  "sameAs": [
    ENV.LINKEDIN_URL,
    ENV.GITHUB_URL
  ],
  "knowsAbout": [
    "Customer Success Operations",
    "Technical Architecture",
    "International Team Leadership",
    "Web Development",
    "API Infrastructure",
    "DevOps & CI/CD",
    "React.js & Next.js",
    "Node.js Development",
    "PostgreSQL & MongoDB",
    "AWS Cloud Infrastructure",
    "International Operations",
    "Cross-Border Team Management",
    "Customer Success Strategy",
    "Digital Transformation",
    "SEO & Performance Optimization",
    "Multi-Country Operations",
    "Team Development",
    "Process Optimization",
    "Revenue Growth Strategy",
    "Technical Infrastructure"
  ],
  "nationality": "Kenyan",
  "workLocation": {
    "@type": "Place",
    "name": "Nairobi, Kenya"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": ENV.EMAIL,
    "telephone": ENV.PHONE,
    "contactType": "professional"
  }
};

export const metadata = {
  title: {
    default: "Walter Okumu Oriaro - Head of Customer Success & Technical Architecture | Leading 12 Teams Across 7 Countries",
    template: "%s | Walter Okumu Oriaro - Technology Executive"
  },
  description: "Head of Customer Success & Technical Architecture at Yellow Pages Group, leading 12-person international teams across 7 countries. Delivering 40% customer satisfaction improvement, 78% deployment error reduction, and managing technical infrastructure serving 5M+ users globally.",
  keywords: [
    // Executive Identity Keywords
    "Walter Okumu Oriaro",
    "Walter Oriaro",
    "Head of Customer Success",
    "Technical Architecture",
    "Technology Executive",
    "Customer Success Leadership",
    "Technical Infrastructure",
    "International Operations",
    "Team Leadership",
    "Yellow Pages Group",

    // Leadership & Management
    "International Team Management",
    "Cross-Border Operations",
    "12-Person Team Leadership",
    "7 Countries Management",
    "Remote Team Leadership",
    "Distributed Operations",
    "Customer Success Strategy",
    "Process Optimization",
    "Team Development",
    "Leadership Excellence",

    // Technical Expertise
    "Technical Architecture",
    "Web Development",
    "React.js Development",
    "Next.js Development",
    "Node.js Development",
    "API Infrastructure",
    "DevOps & CI/CD",
    "AWS Cloud Services",
    "PostgreSQL Database",
    "MongoDB Database",
    "Docker & Kubernetes",
    "Performance Optimization",

    // Customer Success & Operations
    "Customer Success Operations",
    "Customer Satisfaction",
    "Process Design",
    "Onboarding Optimization",
    "Customer Success Metrics",
    "Revenue Optimization",
    "Upsell Strategy",
    "Customer Relationship Management",
    "International Customer Support",
    "Customer Success Analytics",

    // Industry & Location
    "Kenya Technology Leader",
    "Nairobi Technology Executive",
    "East Africa Technology",
    "African Technology Leadership",
    "Yellow Pages Group",
    "International Business Directory",
    "Digital Marketing Technology",
    "E-commerce Technology",

    // Measurable Achievements
    "40% Customer Satisfaction Improvement",
    "78% Deployment Error Reduction",
    "23% Upsell Revenue Growth",
    "99.8% System Uptime",
    "5M+ Monthly Users",
    "International Operations",
    "Multi-Country Success",
    "Technical Excellence",

    // Technical Architecture
    "Full-Stack Web Development",
    "React.js & Next.js",
    "Node.js Development",
    "AWS Cloud Services",
    "Cloud Infrastructure",
    "Serverless Solutions",
    "Microservices Architecture",
    "Modern Tech Stack",
    "DevOps Pipeline",
    "CI/CD Deployment",

    // Executive Skills
    "Executive Presentation",
    "Board-Level Reporting",
    "Budget Management",
    "Vendor Management",
    "Risk Assessment",
    "Compliance Management",
    "Team Scaling",
    "Talent Acquisition",
    "Skills Development",
    "Executive Communication"
  ],
  authors: [{ name: "Walter Okumu Oriaro", url: ENV.SITE_URL }],
  creator: "Walter Okumu Oriaro",
  publisher: "Walter Okumu Oriaro",

  metadataBase: new URL(ENV.SITE_URL),

  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'en-GB': '/',
    }
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Walter Okumu Oriaro - Head of Customer Success & Technical Architecture',
    description: 'Leading 12-person international teams across 7 countries at Yellow Pages Group. Delivering 40% customer satisfaction improvement and 78% deployment error reduction through technical excellence.',
    siteName: 'Walter Okumu Oriaro - Technology Executive Portfolio',
    images: [
      {
        url: '/walter-okumu.webp',
        width: 1200,
        height: 630,
        alt: 'Walter Okumu Oriaro - Technology Executive Portfolio'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    site: '@walter_oriaro',
    creator: '@walter_oriaro',
    title: 'Walter Okumu Oriaro - Head of Customer Success & Technical Architecture',
    description: 'Leading international teams across 7 countries with 40% customer satisfaction improvement and technical excellence.',
    images: ['/walter-okumu.webp']
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: ENV.GOOGLE_SITE_VERIFICATION,
    yandex: ENV.YANDEX_VERIFICATION,
    bing: ENV.BING_VERIFICATION,
  },

  category: 'technology',
  classification: 'Executive Portfolio',

  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION,
    'yandex-verification': process.env.YANDEX_VERIFICATION,
    'msvalidate.01': process.env.BING_VERIFICATION,
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ]
};

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const YANDEX_METRICA_ID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://mc.yandex.ru" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//mc.yandex.ru" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />

        {/* Site Verification */}
        <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
        <meta name="yandex-verification" content={process.env.YANDEX_VERIFICATION} />
        <meta name="msvalidate.01" content={process.env.BING_VERIFICATION} />

        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Walter Oriaro" />

        {/* Canonical URL */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://walterokumu.github.io/walter-okumu-portfolio"} />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body className="font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Theme initialization script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        {children}

        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  custom_map: {
                    'custom_parameter_1': 'executive_portfolio',
                    'custom_parameter_2': 'technology_leader'
                  }
                });

                // Enhanced ecommerce for goal tracking
                gtag('config', '${GA_ID}', {
                  custom_map: {
                    'contact_form_submit': 'contact_conversion',
                    'document_download': 'document_conversion',
                    'project_view': 'engagement_metric'
                  }
                });
              `}
            </Script>
          </>
        )}

        {/* Yandex Metrica */}
        {YANDEX_METRICA_ID && (
          <Script id="yandex-metrica" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(${YANDEX_METRICA_ID}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                trackHash:true,
                ecommerce:"dataLayer"
              });
            `}
          </Script>
        )}

        {/* Yandex Metrica NoScript */}
        {YANDEX_METRICA_ID && (
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc.yandex.ru/watch/${YANDEX_METRICA_ID}`}
                style={{position:'absolute', left:'-9999px', width: '1px', height: '1px'}}
                alt=""
                aria-hidden="true"
              />
            </div>
          </noscript>
        )}

                {/* Performance and SEO optimizations */}
        <Script id="performance-optimizations" strategy="afterInteractive">
          {`
            // Critical Web Vitals tracking
            function sendToAnalytics(metric) {
              if (typeof gtag !== 'undefined') {
                gtag('event', metric.name, {
                  value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                  event_category: 'Web Vitals',
                  event_label: metric.id,
                  non_interaction: true,
                });
              }

              // Send to Yandex Metrica as well
              if (typeof ym !== 'undefined') {
                ym(${YANDEX_METRICA_ID || 'null'}, 'reachGoal', 'web_vitals', {
                  metric_name: metric.name,
                  metric_value: metric.value,
                  metric_id: metric.id
                });
              }
            }

            // Enhanced user engagement tracking
            let scrollTracked = {25: false, 50: false, 75: false, 90: false};
            window.addEventListener('scroll', function() {
              const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

              Object.keys(scrollTracked).forEach(threshold => {
                if (scrollPercent >= threshold && !scrollTracked[threshold]) {
                  scrollTracked[threshold] = true;
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll_depth', {
                      event_category: 'engagement',
                      event_label: threshold + '%',
                      value: threshold
                    });
                  }
                }
              });
            }, { passive: true });

            // Time on page tracking
            let pageStartTime = Date.now();
            let timeTracked = {30: false, 60: false, 180: false};

            setInterval(() => {
              const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
              Object.keys(timeTracked).forEach(threshold => {
                if (timeSpent >= threshold && !timeTracked[threshold]) {
                  timeTracked[threshold] = true;
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'time_on_page', {
                      event_category: 'engagement',
                      event_label: threshold + 's',
                      value: timeSpent
                    });
                  }
                }
              });
            }, 10000);
          `}
        </Script>

        {/* Web Vitals Integration */}
        <Script id="web-vitals" strategy="afterInteractive">
          {`
            // Import and initialize web-vitals
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB, getINP }) => {
              getCLS(sendToAnalytics);
              getFID(sendToAnalytics);
              getFCP(sendToAnalytics);
              getLCP(sendToAnalytics);
              getTTFB(sendToAnalytics);
              getINP(sendToAnalytics);
            }).catch(console.error);
          `}
        </Script>
      </body>
    </html>
  );
}
