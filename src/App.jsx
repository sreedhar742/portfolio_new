import { useEffect, useState } from 'react';
import chroma from 'chroma-js';
import { FastAverageColor } from 'fast-average-color';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' }
];

const roles = ['Backend Developer', 'FastAPI + Django Engineer', 'Microservices Builder'];

const moodProfiles = {
  soft: {
    bgScaleBoost: 0.12,
    imageOpacityBoost: 0.28,
    heroShadeStrength: 0.22,
    heroGlowStrength: 0.3
  },
  bold: {
    bgScaleBoost: 0.2,
    imageOpacityBoost: 0.42,
    heroShadeStrength: 0.34,
    heroGlowStrength: 0.44
  },
  glass: {
    bgScaleBoost: 0.16,
    imageOpacityBoost: 0.34,
    heroShadeStrength: 0.18,
    heroGlowStrength: 0.24
  }
};

const skillBlocks = [
  {
    title: 'Backend',
    items: ['FastAPI', 'Django', 'Django REST Framework', 'Django Channels', 'Celery', 'Redis']
  },
  {
    title: 'Cloud & Infra',
    items: ['AWS ECS/Fargate', 'ECR', 'EC2', 'ALB', 'DigitalOcean', 'Nginx', 'Docker', 'Linux']
  },
  {
    title: 'Architecture',
    items: ['Microservices', 'JWT/RBAC', 'WebSockets', 'Async I/O', 'API Versioning', 'Caching']
  },
  {
    title: 'Data & Tools',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'GitHub Actions', 'Git', 'React (integration)']
  }
];

const experienceHighlights = [
  {
    role: 'Backend Developer',
    period: 'Sep 2024 - Present',
    company: 'Orcalex Technologies LLP, Bangalore',
    points: [
      'Architected multi-tenant Django backend with JWT authentication and RBAC for School Admin, Teacher, and Student personas',
      'Built real-time notification delivery using Django Channels + Redis Pub/Sub with sub-second WebSocket updates',
      'Designed async FastAPI microservices with Pydantic validation and OpenAPI docs',
      'Implemented caching and background lazy-loading jobs improving API response performance by 35%',
      'Built Celery + Redis task queues for messaging, analytics processing, and scheduled automation jobs',
      'Decomposed platform into 6+ deployable services with versioned API contracts and inter-service JWT validation',
      'Containerized and deployed workloads on AWS ECR/ECS/Fargate with ALB, VPC and autoscaling',
      'Built GitHub Actions CI/CD pipelines for linting, testing, Docker builds, ECR pushes and deployments'
    ]
  }
];

const workItems = [
  {
    category: 'Current Product',
    title: 'AidEducator.com',
    tech: 'FastAPI, Django, Channels, PostgreSQL, Redis, Celery, React',
    summary:
      'Enterprise education platform for 10+ institutions (B2B) and individual learners (B2C) with microservice architecture across auth, CRM, exams, payments and notifications.',
    metric: '60% less manual effort',
    link: 'https://aideducator.com',
    tone: 'ivory',
    details: [
      'Built and maintained backend services across auth, CRM, exams, payments, and notifications.',
      'Supported enterprise + individual learner flows (B2B/B2C) in a production environment.',
      'Integrated async processing and automation for exam correction and engagement workflows.',
      'Worked on scalable service integrations and real-time capabilities with modern backend tooling.'
    ]
  },
  {
    category: 'Current Product',
    title: 'SmartLearners.ai',
    tech: 'FastAPI, Django REST Framework, MySQL, Redis, React',
    summary:
      'Scalable learning management platform with async processing, caching layers, and automation pipelines for analytics reporting and student progress tracking.',
    metric: 'Async + caching driven',
    link: 'https://smartlearners.ai',
    tone: 'ocean',
    details: [
      'Designed backend APIs and async workflows for analytics and student progress tracking.',
      'Implemented caching-focused patterns to improve responsiveness under repeated access.',
      'Supported automation pipelines for reporting and platform operations.',
      'Worked with Django/FastAPI ecosystem components and frontend API integrations.'
    ]
  },
  {
    category: 'Portfolio',
    title: 'React + Vite Portfolio',
    tech: 'React, Vite, Static Deployment',
    summary:
      'Personal portfolio redesigned into a clean card-based UI for static deployment pipelines (Cloudflare Pages ready).',
    metric: 'Cloudflare-ready build',
    link: 'https://github.com/sreedhar742/portfolio',
    tone: 'gold',
    details: [
      'Migrated an older Django template-based portfolio into a React + Vite static application.',
      'Designed a card-first UI with responsive layout, smooth sections, and clean information grouping.',
      'Configured Vite build output for Cloudflare Pages deployment workflows.',
      'Integrated updated resume content and improved work presentation structure.'
    ]
  },
  {
    category: 'Previous Work',
    title: 'Feedback System (Django)',
    tech: 'Django, JavaScript, MySQL',
    summary:
      'User feedback collection system built during earlier Django work, focused on form flows, ORM-driven persistence, and basic reporting workflows.',
    metric: 'ORM + forms',
    link: 'https://github.com/sreedhar742/feedback_system_using_django_framework',
    tone: 'glacier',
    details: [
      'Built feedback submission and collection workflows with Django forms and models.',
      'Used Django ORM for database operations and retrieval patterns.',
      'Implemented UI flows for user input and feedback management.',
      'Helped strengthen backend fundamentals in CRUD and form handling.'
    ]
  },
  {
    category: 'Previous Work',
    title: 'Railway Reservation System',
    tech: 'Django, HTML, JavaScript, MySQL',
    summary:
      'Django-based reservation workflow project with booking-oriented UI interactions and backend data handling for train reservation scenarios.',
    metric: 'End-to-end CRUD',
    link: 'https://github.com/sreedhar742/railway_reservation_system',
    tone: 'lagoon',
    details: [
      'Created booking-oriented backend flows with Django for reservation management scenarios.',
      'Handled CRUD operations and model relations for core reservation data.',
      'Built frontend interactions for selection and form-based booking steps.',
      'Practiced end-to-end web app structure with Django templates and JS.'
    ]
  },
  {
    category: 'Previous Work',
    title: 'Django IT Blogs',
    tech: 'Django, React, REST APIs',
    summary:
      'Blog platform integrating Django backend and React frontend, with API-based content flow and frontend rendering patterns.',
    metric: 'Django + React',
    link: 'https://github.com/sreedhar742/Django_IT_Blogs',
    tone: 'ember',
    details: [
      'Combined Django backend and React frontend for a content/blog platform.',
      'Used REST APIs for content delivery and frontend rendering.',
      'Implemented frontend-backend integration patterns for dynamic views.',
      'Strengthened experience in full-stack API-driven architecture.'
    ]
  }
];

function useTyped(words) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let delay = deleting ? 45 : 85;

    if (!deleting && text === word) delay = 1200;
    if (deleting && text === '') delay = 220;

    const timer = window.setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
        return;
      }
      if (deleting && text === '') {
        setDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
      setText((prev) => (deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1)));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, text, wordIndex, words]);

  return text;
}

function App() {
  const typed = useTyped(roles);
  const [activeSection, setActiveSection] = useState('home');
  const [showTop, setShowTop] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [selectedWork, setSelectedWork] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showAllHeroLinks, setShowAllHeroLinks] = useState(false);
  const [themeMood, setThemeMood] = useState('soft');
  const [dynamicGradient, setDynamicGradient] = useState({
    core: '#e6fff9',
    soft: '#b2f7ec',
    shadow: '#5c8e88',
    top: '#a6ece3',
    deep: '#02070b'
  });

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 240);
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(window.scrollY / maxScroll, 1));
      const offset = window.scrollY + 180;
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && offset >= el.offsetTop && offset < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let alive = true;
    const fac = new FastAverageColor();
    const imageSource = '/assets/img/premium-gradient-source.jpeg';

    fac
      .getColorAsync(imageSource, { algorithm: 'dominant' })
      .then((result) => {
        if (!alive) return;
        const base = chroma(result.hex).saturate(0.8);
        const bright = base.brighten(2.8);
        const soft = base.brighten(1.6);
        const shadow = base.darken(1.7);
        const deep = chroma.mix('#02070b', shadow, 0.72, 'lab');
        setDynamicGradient({
          core: bright.hex(),
          soft: soft.hex(),
          shadow: shadow.hex(),
          top: chroma.mix(soft, '#d9fff9', 0.52, 'lab').hex(),
          deep: deep.hex()
        });
      })
      .catch(() => {
        // Keep fallback tones if extraction fails.
      });

    return () => {
      alive = false;
      fac.destroy();
    };
  }, []);

  const onContactSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'Portfolio Contact');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:psridhar742@gmail.com?subject=${subject}&body=${body}`;
  };

  const profileImage = '/assets/img/profile-photo.jpg';
  const activeWorkItem = workItems[selectedWork];
  const activeMood = moodProfiles[themeMood];
  const heroLinks = [
    {
      href: 'https://www.linkedin.com/in/sreedhar742/',
      label: 'linkedin.com/in/sreedhar742',
      icon: 'bi-linkedin',
      external: true
    },
    {
      href: 'mailto:psridhar742@gmail.com',
      label: 'psridhar742@gmail.com',
      icon: 'bi-envelope-fill'
    },
    {
      href: 'https://github.com/sreedhar742',
      label: 'github.com/sreedhar742',
      icon: 'bi-github',
      external: true
    },
    {
      href: 'tel:+917569630144',
      label: '+91 7569630144',
      icon: 'bi-telephone-fill'
    }
  ];

  return (
    <div
      className={`portfolio-shell mood-${themeMood}`}
      style={
        {
          '--scroll-progress': scrollProgress,
          '--glow-size': `${30 + scrollProgress * 34}%`,
          '--glow-shift': `${62 - scrollProgress * 23}%`,
          '--top-glow': `${10 + scrollProgress * 18}%`,
          '--tone-core': dynamicGradient.core,
          '--tone-soft': dynamicGradient.soft,
          '--tone-shadow': dynamicGradient.shadow,
          '--tone-top': dynamicGradient.top,
          '--tone-deep': dynamicGradient.deep,
          '--bg-image-url': 'url("/assets/img/premium-gradient-source.jpeg")',
          '--mood-bg-scale-boost': activeMood.bgScaleBoost,
          '--mood-image-opacity-boost': activeMood.imageOpacityBoost,
          '--mood-hero-shade': activeMood.heroShadeStrength,
          '--mood-hero-glow': activeMood.heroGlowStrength
        }
      }
    >
      <header className="top-nav-wrap">
        <nav className="top-nav" aria-label="Primary">
          <a className="brand" href="#home">
            PS
          </a>
          <div className="nav-links">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'is-active' : ''}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="mood-switch" role="tablist" aria-label="Theme mood">
            {Object.keys(moodProfiles).map((mood) => (
              <button
                key={mood}
                type="button"
                className={themeMood === mood ? 'is-active' : ''}
                onClick={() => setThemeMood(mood)}
              >
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </button>
            ))}
          </div>
          <a className="resume-pill" href="/assets/resume/update_sreedhar_resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </nav>
      </header>

      <main className="page-content">
        <section id="home" className="hero-grid">
          <div className="hero-main card ivory-card">
            <div className="hero-copy">
              <p className="eyebrow">PEDDA PULLANNAGARI SREEDHAR</p>
              <h1>Backend systems, built for scale and production.</h1>
              <p className="hero-summary">
                Backend Developer with 1.5+ years of experience building scalable microservices and enterprise B2B/B2C
                systems using FastAPI and Django, with real-time systems, async processing, and cloud deployments.
              </p>
              <div className="typed-row">
                <span className="typed-label">Role</span>
                <span className="typed-value">{typed}</span>
                <span className="typed-caret">|</span>
              </div>
              <div className="hero-actions">
                <a href="#work" className="btn-primary-custom">
                  View Work
                </a>
                <a href="#contact" className="btn-secondary-custom">
                  Contact
                </a>
              </div>
            </div>
            <div className="hero-photo-card">
              <img
                src={profileImage}
                alt="Sreedhar portrait"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/img/slide.jpg';
                }}
              />
              <div className="photo-caption">
                <span>Sreedhar</span>
                <small>Backend Developer • FastAPI • Django • Cloud Deployments</small>
              </div>
            </div>
          </div>

          <div className="hero-side-stack">
            <div className="card accent-card accent-teal">
              <h3>Current Focus</h3>
              <p>FastAPI, Django, Celery, Redis, AWS ECS/Fargate, CI/CD pipelines.</p>
            </div>
            <div className="card accent-card accent-gold">
              <h3>Location</h3>
              <p>Hyderabad, Begumpet</p>
              <p className="tiny">Open to backend and platform engineering roles</p>
            </div>
            <div className="card accent-card accent-orange">
              <h3>Connect</h3>
              <div className="hero-contact-links">
                {heroLinks.map((link, idx) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className={!showAllHeroLinks && idx > 1 ? 'mobile-collapsed-link' : ''}
                  >
                    <i className={`bi ${link.icon}`} /> {link.label}
                  </a>
                ))}
                <button
                  type="button"
                  className="hero-links-toggle"
                  onClick={() => setShowAllHeroLinks((prev) => !prev)}
                  aria-expanded={showAllHeroLinks}
                >
                  {showAllHeroLinks ? 'Show Less' : 'More'}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="content-section">
          <div className="section-header">
            <p className="eyebrow">About Me</p>
            <h2>Backend engineer focused on reliable APIs, real-time systems, and cloud deployment.</h2>
            <p>
              I build backend systems with FastAPI and Django for production use-cases, including microservices,
              background processing, real-time notifications, and CI/CD-driven deployments. I enjoy designing systems
              that are maintainable, scalable, and practical for business teams.
            </p>
          </div>

        </section>

        <section id="experience" className="content-section">
          <div className="section-header">
            <p className="eyebrow">Experience</p>
            <h2>Production backend engineering at Orcalex Technologies</h2>
            <p>
              FastAPI and Django services, real-time notifications, task queues, cloud deployment, and CI/CD automation
              for enterprise products.
            </p>
          </div>

          <div className="experience-layout">
            <div className="stacked-panels">
              <div className="card panel panel-glacier">
                <h3>Professional Summary</h3>
                <p>
                  Backend Developer with 1.5+ years of experience building scalable microservices and enterprise
                  B2B/B2C systems using FastAPI and Django.
                </p>
                <ul className="meta-list">
                  <li>
                    <span>Phone</span>
                    <strong>+91 7569630144</strong>
                  </li>
                  <li>
                    <span>Email</span>
                    <strong>psridhar742@gmail.com</strong>
                  </li>
                  <li>
                    <span>Education</span>
                    <strong>B.Tech CSE, JNTUA College of Engineering</strong>
                  </li>
                </ul>
              </div>

              <div className="card panel panel-lagoon">
                <h3>Core Skills</h3>
                <div className="skill-grid">
                  {skillBlocks.map((block) => (
                    <div key={block.title} className="skill-block">
                      <h4>{block.title}</h4>
                      <div className="chip-wrap">
                        {block.items.map((item) => (
                          <span key={item} className="chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="experience-timeline">
              {experienceHighlights.map((exp) => (
                <article key={exp.role} className="card timeline-card">
                  <div className="timeline-top">
                    <div>
                      <p className="timeline-role">{exp.role}</p>
                      <p className="timeline-company">{exp.company}</p>
                    </div>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <ul>
                    {exp.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="content-section">
          <div className="section-header">
            <p className="eyebrow">Work</p>
            <h2>Enterprise product work and earlier projects</h2>
            <p>
              A mix of current production platforms and earlier Django-based projects that show my growth from full-stack
              fundamentals to backend and platform engineering.
            </p>
          </div>
          <div className="work-showcase">
            <div className="work-scroll-list" role="list" aria-label="Work items">
              {workItems.map((product, idx) => (
              <article
                key={product.title}
                role="button"
                tabIndex={0}
                aria-pressed={selectedWork === idx}
                className={`project-card card work-list-card project-${idx + 1} tone-${product.tone} ${
                  selectedWork === idx ? 'is-selected' : ''
                }`}
                onClick={() => setSelectedWork(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedWork(idx);
                  }
                }}
              >
                <div className="project-top">
                  <span className="project-category">{product.category}</span>
                  <span className="project-metric">{product.metric}</span>
                </div>
                <h3>{product.title}</h3>
                <p className="project-tech">{product.tech}</p>
                <p className="project-summary">{product.summary}</p>
                <span className="project-link">
                  View details <i className="bi bi-arrow-right" />
                </span>
              </article>
            ))}
          </div>

            <article className={`work-detail-card card tone-${activeWorkItem.tone}`}>
              <div className="work-detail-head">
                <div>
                  <p className="project-category">{activeWorkItem.category}</p>
                  <h3>{activeWorkItem.title}</h3>
                  <p className="project-tech">{activeWorkItem.tech}</p>
                </div>
                <span className="project-metric">{activeWorkItem.metric}</span>
              </div>

              <p className="project-summary">{activeWorkItem.summary}</p>

              <div className="work-detail-body">
                <h4>About this work</h4>
                <ul>
                  {activeWorkItem.details.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <a href={activeWorkItem.link} target="_blank" rel="noreferrer" className="project-link">
                Open link <i className="bi bi-arrow-up-right" />
              </a>
            </article>
          </div>
        </section>

        <section id="contact" className="content-section">
          <div className="contact-card card">
            <div className="contact-left">
              <p className="eyebrow">Contact</p>
              <h2>Let’s build reliable backend systems.</h2>
              <p>
                Reach out for backend engineering, API platform work, microservices architecture, or deployment
                automation.
              </p>
            </div>

            <form className="contact-form-clean" onSubmit={onContactSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData((s) => ({ ...s, email: e.target.value }))}
                required
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData((s) => ({ ...s, subject: e.target.value }))}
                required
              />
              <textarea
                rows="5"
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData((s) => ({ ...s, message: e.target.value }))}
                required
              />
              <button type="submit">Send via Email</button>
            </form>
          </div>
        </section>
      </main>

      <button
        type="button"
        className={`scroll-top-btn ${showTop ? 'show' : ''}`}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="bi bi-arrow-up" />
      </button>
    </div>
  );
}

export default App;
