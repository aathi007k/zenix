export const services = [
  {
    slug: 'seo-optimization',
    title: 'SEO Optimization',
    shortDescription:
      'Dominate search rankings with data-driven SEO strategies tailored to your industry and audience.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Our SEO framework blends technical audits, intent-based content architecture, and authority building to deliver sustainable rankings and qualified traffic growth.',
    deliverables: [
      'Technical SEO audit and crawl optimization',
      'Keyword opportunity mapping and content clusters',
      'On-page optimization and metadata enhancement',
      'Backlink strategy and authority growth roadmap',
    ],
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    shortDescription:
      'Build engaged communities and drive brand awareness across all major social platforms.',
    image:
      'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80',
    overview:
      'We craft platform-specific growth campaigns with creative storytelling, audience testing, and performance optimization to turn attention into measurable business outcomes.',
    deliverables: [
      'Platform strategy and audience segmentation',
      'Creative calendar and campaign production',
      'Paid social optimization and retargeting setup',
      'Weekly analytics insights and content refinement',
    ],
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    shortDescription:
      'Stunning, performant websites and web applications built with modern technologies.',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    overview:
      'From high-conversion marketing sites to scalable product platforms, we build fast, secure, and maintainable web systems engineered for business growth.',
    deliverables: [
      'UI/UX implementation with responsive architecture',
      'Performance tuning and Core Web Vitals optimization',
      'API integrations and modular component systems',
      'Security hardening and deployment automation',
    ],
  },
  {
    slug: 'app-development',
    title: 'App Development',
    shortDescription:
      'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    image:
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80',
    overview:
      'We design and engineer mobile products that are fast, intuitive, and conversion-focused while ensuring long-term maintainability and scale readiness.',
    deliverables: [
      'Product discovery and app feature planning',
      'Cross-platform or native app development',
      'Push notifications, analytics, and user flows',
      'Store launch, QA, and iterative release cycles',
    ],
  },
  {
    slug: 'branding',
    title: 'Branding',
    shortDescription:
      'Craft a compelling brand identity that resonates with your target audience and stands out.',
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    overview:
      'We align positioning, voice, and visual identity into a cohesive brand system that strengthens trust, improves recall, and supports premium market perception.',
    deliverables: [
      'Brand strategy and competitive positioning',
      'Visual identity system and logo ecosystem',
      'Messaging framework and tone-of-voice guide',
      'Brand usage guidelines and launch toolkit',
    ],
  },
  {
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    shortDescription:
      'Scalable, secure cloud infrastructure and migration services for modern businesses.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Our cloud engineers design resilient architectures with automation, observability, and cost governance so your platform can scale without bottlenecks.',
    deliverables: [
      'Cloud architecture and environment design',
      'CI/CD and infrastructure-as-code setup',
      'Monitoring, logging, and alerting strategy',
      'Migration planning and performance optimization',
    ],
  },
];

export const getServiceBySlug = (slug) => services.find((service) => service.slug === slug);
