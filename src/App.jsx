import { useEffect, useState } from 'react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' }
];

const roles = ['Full Stack Developer', 'Django + FastAPI Engineer', 'React + TypeScript Frontends'];

const skillBlocks = [
  {
    title: 'Backend',
    items: ['Django', 'Django REST Framework', 'FastAPI', 'Django Channels', 'Celery', 'SQLAlchemy']
  },
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Bun']
  },
  {
    title: 'Data & Caching',
    items: ['PostgreSQL', 'MySQL', 'Redis', 'PgBouncer', 'Django ORM']
  },
  {
    title: 'Infra & CI/CD',
    items: ['Docker', 'Kubernetes', 'Nginx', 'AWS (EC2, S3, Lambda, RDS, DynamoDB)', 'DigitalOcean', 'GitHub Actions']
  }
];

const experienceHighlights = [
  {
    role: 'Full Stack Developer',
    period: 'Nov 2024 - Present',
    company: 'Orcalex Technologies LLP, Hyderabad, India',
    points: [
      'Engineer SmartLearners.ai / AiEducator, a multi-school EdTech platform serving 10k+ students across schools (B2B) and individual learners (B2C), on Django/DRF, FastAPI and React',
      'Built the auth layer for admin, school-admin, teacher and student roles: header JWT for mobile clients, cookie auth for web, OAuth/OIDC sign-in, and JWT-authenticated WebSockets',
      'Developed the live classroom module where homework and scheduled exams persist to the database, push to online students over WebSockets, and replay as unread notifications when offline students reconnect',
      'Fixed a cache stampede on that path - one expiring Redis key sent ~500 reconnecting students to the database - with double-checked locking, collapsing the burst into a single query',
      'Shipped the question bank, worksheet and scheduled-assignment workflows, owning the REST APIs and the React state behind them',
      'Grew AI evaluation from a single autoscore service to four - autoscore, homework, classwork and exam correction - dispatching uploads over Celery and persisting scores, gap analysis and class analytics as domain state',
      'Cut API response times ~30% with EXPLAIN ANALYZE profiling, composite indexes, and Redis caching over optimized ORM queries',
      'Wrote unit and integration tests that gate every PR, with main deploying to staging and tags promoting to production',
      'Operate production on DigitalOcean Kubernetes (HTTP, WebSocket, Celery worker and beat deployments, plus FastAPI exam-correction workers) and on Linux VMs behind Nginx, with PgBouncer pooling Postgres connections'
    ]
  }
];

const workItems = [
  {
    category: 'Current Product',
    title: 'SmartLearners.ai / AiEducator',
    tech: 'Django REST Framework, Celery, Redis, PostgreSQL, React',
    summary:
      'Multi-school EdTech platform serving 10k+ students across institutions (B2B) and individual learners (B2C), migrated from a single-school system into a multi-tenant one without downtime.',
    metric: '10k+ students',
    link: 'https://smartlearners.ai',
    tone: 'ivory',
    details: [
      'Migrated the platform from single-school with boolean role flags to multi-school, multi-section, role-scoped access.',
      'Ran those schema changes with zero downtime: nullable columns first, dual-write from the application, batched backfill, then NOT NULL.',
      'Resolved every request to an authorized school set - platform admin, school admin, or multi-school manager - before any read or write.',
      'Made every bulk and destructive operation dry-run first, with per-row validation and structured errors before commit.',
      'Cached school reads under role-aware versioned keys, so one version bump invalidates a whole tenant cache without scanning keys.',
      'Moved question and answer images from database rows into object storage with Django-generated presigned uploads.',
      'Integrated PhonePe payments end to end: order creation, webhook verification, status polling, retry, refund and activation.'
    ]
  },
  {
    category: 'Current Product',
    title: 'Exam Correction Service',
    tech: 'FastAPI, SQLAlchemy, Django, Celery, Redis, PostgreSQL',
    summary:
      'Standalone FastAPI evaluation service orchestrated by Django over Celery, correcting subjective and objective answer sheets in group and single-student modes.',
    metric: '50 students / run',
    link: '',
    tone: 'ocean',
    details: [
      'Built the runtime and data-persistence layer for group (up to 50 students) and single-student correction runs.',
      'Kept all identity in Django: the service holds no auth, uploads results to object storage, and posts to a webhook that persists them for the owning teacher only.',
      'Designed the lifecycle around one idempotency key shared by Django, Celery and FastAPI, with teachers seeing live phase and percent complete.',
      'Defined the bi-directional webhook contracts and a batch-recovery API that restores in-flight corrections after logout or refresh.',
      'Normalized and matched roll numbers so only verified students persist, keeping token usage, cost and unmatched rolls in an admin-only audit model.'
    ]
  },
  {
    category: 'Current Product',
    title: 'Coordinator Admin Dashboard',
    tech: 'React, TypeScript, Vite, Tailwind, Bun',
    summary:
      'School-admin dashboard built solo in TypeScript, covering school data, student and teacher management, class-section access, reassignment, archival and record merging.',
    metric: '9 admin panels',
    link: '',
    tone: 'gold',
    details: [
      'Sole developer of a nine-panel dashboard in React and TypeScript, built with Bun and Vite.',
      'Gated every destructive action behind a dry-run preview whose approval signature must match before the commit is allowed.',
      'Implemented dual JWT/cookie auth with single-flight token refresh and mode-aware session storage.',
      'Wrote the CSV parser and serializer by hand for bulk import and credential export.',
      'Built the GitHub Actions pipeline: config validation, lint, build, then rsync deploy to the VM with an Nginx validate-and-reload step.'
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
    tone: 'glacier',
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
    tone: 'lagoon',
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
    tone: 'ember',
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
    tone: 'ivory',
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

  const onContactSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'Portfolio Contact');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:psridhar742@gmail.com?subject=${subject}&body=${body}`;
  };

  const activeWorkItem = workItems[selectedWork];
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
      className="portfolio-shell"
      style={
        {
          '--scroll-progress': scrollProgress,
          '--glow-size': `${32 + scrollProgress * 24}%`,
          '--glow-shift': `${58 - scrollProgress * 20}%`,
          '--top-glow': `${12 + scrollProgress * 10}%`
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
          <a className="resume-pill" href="/assets/resume/update_sreedhar_resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </nav>
      </header>

      <main className="page-content">
        <section id="home" className="hero-grid">
          <div className="hero-main card ivory-card">
            <div className="hero-copy">
              <h1>Pedda Pullannagari Sreedhar</h1>
              <p className="hero-summary">
                Full stack developer building platforms end to end &mdash; database design, Django and FastAPI APIs,
                React and TypeScript interfaces, and production deployment.
              </p>
              <p className="hero-location">
                Hyderabad, India · Open to full stack and backend engineering roles
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
          </div>

          <div className="hero-side-stack">
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
            <h2>Full stack engineer focused on multi-tenant backends, real-time delivery, and safe schema change.</h2>
            <p>
              I build production systems end to end - Django and FastAPI services, the React and TypeScript
              interfaces on top of them, and the pipelines that ship both. Most of my work is about keeping a
              multi-tenant platform correct while it changes: idempotent workflows, cached read paths, role-scoped
              access, and schema migrations that run without downtime.
            </p>
          </div>

        </section>

        <section id="experience" className="content-section">
          <div className="section-header">
            <p className="eyebrow">Experience</p>
            <h2>Full stack engineering at Orcalex Technologies</h2>
            <p>
              Django and FastAPI services, React frontends, real-time delivery, AI service integration, zero-downtime
              migrations, and the CI/CD that promotes them to production.
            </p>
          </div>

          <div className="experience-layout">
            <div className="stacked-panels">
              <div className="card panel panel-glacier">
                <h3>Professional Summary</h3>
                <p>
                  Full Stack Developer focused on backend systems that stay correct under load, with React and
                  TypeScript on the frontend.
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
              Current production work on a multi-school EdTech platform, plus earlier Django projects that show the
              path from full-stack fundamentals to platform engineering.
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

              {activeWorkItem.link ? (
                <a href={activeWorkItem.link} target="_blank" rel="noreferrer" className="project-link">
                  Open link <i className="bi bi-arrow-up-right" />
                </a>
              ) : null}
            </article>
          </div>
        </section>

        <section id="contact" className="content-section">
          <div className="contact-card card">
            <div className="contact-left">
              <p className="eyebrow">Contact</p>
              <h2>Let’s build systems that stay correct under load.</h2>
              <p>
                Reach out for full stack or backend engineering, API and platform work, or deployment
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
