// ============================================================================
// script.js — APPLICATION LOGIC
// ============================================================================
//
// Rendering pipeline: each render* function reads from `window.siteData`
// and injects HTML into its container. Content changes = data.js only.
//
// ============================================================================

(function () {
  'use strict';

  const data = window.siteData;

  // --------------------------------------------------------------------------
  // SVG ICONS — reusable across renderers
  // --------------------------------------------------------------------------
  const ICONS = {
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,

    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,

    email: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,

    scholar: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>`,

    external: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,

    paper: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,

    trophy: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,

    phone: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,

    demo: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,

    slides: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
  };

  // Map link type to display label
  const LINK_LABELS = {
    github: 'GitHub',
    paper: 'Paper',
    demo: 'Demo',
    slides: 'Slides',
    docs: 'Docs'
  };

  // --------------------------------------------------------------------------
  // THEME SYSTEM
  // --------------------------------------------------------------------------
  function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const stored = localStorage.getItem('theme');

    // Set initial state (inline script in HTML already handles the class)
    if (!stored) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark-mode');
      }
    }

    toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');
      const isDark = document.documentElement.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }


  // --------------------------------------------------------------------------
  // RENDER: Hero
  // --------------------------------------------------------------------------
  function renderHero() {
    const { hero, meta } = data;
    const container = document.getElementById('hero');

    const socialsHtml = hero.socialLinks.map(link => `
      <a href="${link.url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${link.platform}" title="${link.platform}">
        ${ICONS[link.icon] || ICONS.external}
      </a>
    `).join('');

    container.innerHTML = `
      <div class="hero-inner">
        <div class="hero-text">
          <p class="hero-greeting hero-animate">${hero.greeting}</p>
          <h1 class="hero-name hero-animate">${hero.name}</h1>
          <p class="hero-tagline hero-animate">${hero.tagline}</p>
          <p class="hero-summary hero-animate">${hero.summary}</p>
          <div class="hero-socials hero-animate">${socialsHtml}</div>
        </div>
        <div class="hero-image-container hero-image-float hero-animate">
          <div class="hero-image-ring">
            <div class="hero-image-ring-inner"></div>
          </div>
          <img
            class="hero-image"
            src="${hero.profileImage}"
            alt="Portrait of ${hero.name}"
            loading="eager"
            onerror="this.style.display='none'"
          />
        </div>
      </div>
    `;

    // Set CV download link from data
    const cvBtn = document.getElementById('cvDownload');
    if (cvBtn) cvBtn.href = meta.cvPath;
  }


  // --------------------------------------------------------------------------
  // RENDER: About (Education + Research Interests)
  // --------------------------------------------------------------------------
  function renderAbout() {
    const container = document.getElementById('aboutContent');
    const edu = data.education[0]; // primary degree

    const courseworkHtml = edu.coursework.map(c => `
      <span class="course-pill${c.graduate ? ' graduate' : ''}" title="${c.graduate ? 'Graduate Level' : 'Undergraduate'}">${c.name}${c.graduate ? '*' : ''}</span>
    `).join('');

    container.innerHTML = `
      <div class="section-header animate-on-scroll">
        <h2 class="section-title"><span class="accent-dot"></span>About</h2>
        <p class="section-subtitle">Education & Research Focus</p>
      </div>

      <div class="about-grid">
        <div class="about-card animate-on-scroll">
          <h3 class="about-card-title">🎓 ${edu.institution}</h3>
          <p class="about-card-subtitle">${edu.degree}</p>
          <p class="about-card-meta">GPA: ${edu.gpa}  ·  ${edu.dates}  ·  ${edu.location}</p>
          <div class="coursework-list">
            ${courseworkHtml}
          </div>
          <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.75rem; font-style: italic;">* Graduate Level</p>
        </div>

        <div class="about-card animate-on-scroll">
          <h3 class="about-card-title">🔬 Research Interests</h3>
          <p class="research-text">${data.researchInterests}</p>
        </div>
      </div>
    `;
  }


  // --------------------------------------------------------------------------
  // RENDER: Experience (Timeline)
  // --------------------------------------------------------------------------
  function renderExperience() {
    const container = document.getElementById('experienceContent');

    const itemsHtml = data.experience.map(exp => {
      const isTeaching = exp.type === 'teaching';
      const typeBadge = exp.type.charAt(0).toUpperCase() + exp.type.slice(1);

      let bodyHtml = '';

      // TA courses
      if (exp.courses && exp.courses.length > 0) {
        bodyHtml += `<div class="ta-courses">
          ${exp.courses.map(c => `
            <div class="ta-course">
              <span class="ta-course-code">${c.code}</span>
              <span>${c.name} — ${c.instructor}</span>
              <span class="ta-course-semester">${c.semester}</span>
            </div>
          `).join('')}
        </div>`;
      }

      // Bullet points
      if (exp.bullets && exp.bullets.length > 0) {
        bodyHtml += `<ul class="timeline-bullets">
          ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>`;
      }

      const metaParts = [];
      if (exp.advisor) metaParts.push(`<span>${exp.advisor}</span>`);
      metaParts.push(`<span>${exp.organization}</span>`);
      metaParts.push(`<span>${exp.dates}</span>`);

      return `
        <div class="timeline-item animate-on-scroll">
          <div class="timeline-dot${isTeaching ? ' teaching' : ''}"></div>
          <div class="timeline-card">
            <div class="timeline-header">
              <h3 class="timeline-title">${exp.title}</h3>
              <span class="timeline-type-badge">${typeBadge}</span>
            </div>
            <div class="timeline-meta">
              ${metaParts.join('')}
            </div>
            ${bodyHtml}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="section-header animate-on-scroll">
        <h2 class="section-title"><span class="accent-dot"></span>Experience</h2>
        <p class="section-subtitle">Research & Teaching</p>
      </div>
      <div class="timeline">
        ${itemsHtml}
      </div>
    `;
  }


  // --------------------------------------------------------------------------
  // RENDER: Projects (Filterable Cards)
  // --------------------------------------------------------------------------
  function renderProjects() {
    const container = document.getElementById('projectsContent');

    // Extract unique categories from ALL projects
    const allCategories = new Set();
    data.projects.forEach(p => p.categories.forEach(c => allCategories.add(c)));
    const categories = ['All', ...Array.from(allCategories).sort()];

    // Filter pills
    const pillsHtml = categories.map(cat => `
      <button class="filter-pill${cat === 'All' ? ' active' : ''}" data-category="${cat}">
        ${cat}
      </button>
    `).join('');

    // Project cards
    const cardsHtml = data.projects.map((p, i) => {
      const tagsHtml = p.tags.map(t => `<span class="project-tag">${t}</span>`).join('');

      const linkEntries = Object.entries(p.links || {});
      const linksHtml = linkEntries.length > 0
        ? `<div class="project-links">
            ${linkEntries.map(([type, url]) => `
              <a href="${url}" class="project-link" target="_blank" rel="noopener noreferrer">
                ${ICONS[type] || ICONS.external}
                <span>${LINK_LABELS[type] || type}</span>
              </a>
            `).join('')}
          </div>`
        : '';

      return `
        <div class="project-card animate-on-scroll" data-categories='${JSON.stringify(p.categories)}' style="--delay: ${i * 0.05}s">
          <div class="project-card-header">
            <h3 class="project-title">${p.title}</h3>
            <span class="project-date">${p.date}</span>
          </div>
          <p class="project-course">${p.course}</p>
          <p class="project-summary">${p.summary}</p>
          <div class="project-tags">${tagsHtml}</div>
          ${linksHtml}
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="section-header animate-on-scroll">
        <h2 class="section-title"><span class="accent-dot"></span>Projects</h2>
        <p class="section-subtitle">Academic & Research Work</p>
      </div>
      <div class="filter-bar" id="filterBar">
        ${pillsHtml}
      </div>
      <div class="projects-grid" id="projectsGrid">
        ${cardsHtml}
      </div>
    `;

    // Wire up filter logic
    initFilters();
  }


  // --------------------------------------------------------------------------
  // PROJECT FILTERING — optional, click-to-toggle
  // --------------------------------------------------------------------------
  function initFilters() {
    const filterBar = document.getElementById('filterBar');
    const cards = document.querySelectorAll('.project-card');

    if (!filterBar) return;

    filterBar.addEventListener('click', e => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;

      const category = pill.dataset.category;
      const wasActive = pill.classList.contains('active');

      // Remove active from all pills
      filterBar.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));

      // If clicking the already-active pill (deselect), or clicking "All", show all
      if (wasActive || category === 'All') {
        filterBar.querySelector('[data-category="All"]').classList.add('active');
        cards.forEach(card => card.classList.remove('hidden'));
        return;
      }

      // Otherwise, activate this pill and filter
      pill.classList.add('active');

      cards.forEach(card => {
        const cardCategories = JSON.parse(card.dataset.categories || '[]');
        if (cardCategories.includes(category)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  }


  // --------------------------------------------------------------------------
  // RENDER: Skills
  // --------------------------------------------------------------------------
  function renderSkills() {
    const container = document.getElementById('skillsContent');

    const cardsHtml = Object.entries(data.skills).map(([category, skills], i) => `
      <div class="skill-card animate-on-scroll" style="--delay: ${i * 0.1}s">
        <h3 class="skill-card-title">${category}</h3>
        <div class="skill-chips">
          ${skills.map(s => `<span class="skill-chip">${s}</span>`).join('')}
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="section-header animate-on-scroll">
        <h2 class="section-title"><span class="accent-dot"></span>Skills</h2>
        <p class="section-subtitle">Technical Proficiencies</p>
      </div>
      <div class="skills-grid">
        ${cardsHtml}
      </div>
    `;
  }


  // --------------------------------------------------------------------------
  // RENDER: Awards
  // --------------------------------------------------------------------------
  function renderAwards() {
    const container = document.getElementById('awardsContent');

    const listHtml = data.awards.map((a, i) => `
      <div class="award-item animate-on-scroll" style="--delay: ${i * 0.1}s">
        <div class="award-icon">${ICONS.trophy}</div>
        <div class="award-content">
          <h3 class="award-title">${a.title}</h3>
          <p class="award-detail">${a.detail}</p>
          <p class="award-years">${a.years}</p>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="section-header animate-on-scroll">
        <h2 class="section-title"><span class="accent-dot"></span>Awards</h2>
        <p class="section-subtitle">Honors & Recognition</p>
      </div>
      <div class="awards-list">
        ${listHtml}
      </div>
    `;
  }


  // --------------------------------------------------------------------------
  // RENDER: Footer
  // --------------------------------------------------------------------------
  function renderFooter() {
    const footer = document.getElementById('contact');
    const { meta, hero } = data;

    const socialsHtml = hero.socialLinks.map(link => `
      <a href="${link.url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${link.platform}">
        ${ICONS[link.icon] || ICONS.external}
      </a>
    `).join('');

    footer.innerHTML = `
      <div class="footer-inner">
        <h2 class="footer-title animate-on-scroll">Get in Touch</h2>
        <p class="footer-subtitle animate-on-scroll">
          Open to research collaborations, graduate opportunities, and interesting conversations.
        </p>

        <div class="footer-contact animate-on-scroll">
          <a href="mailto:${meta.email}" class="footer-contact-item">
            ${ICONS.email} ${meta.email}
          </a>
          <span class="footer-contact-item">
            ${ICONS.phone} ${meta.phone}
          </span>
        </div>

        <div class="footer-socials animate-on-scroll">
          ${socialsHtml}
        </div>

        <div class="footer-divider"></div>
        <p class="footer-copy">© ${new Date().getFullYear()} ${meta.name}. All rights reserved.</p>
      </div>
    `;
  }


  // --------------------------------------------------------------------------
  // SCROLL ANIMATIONS — IntersectionObserver
  // --------------------------------------------------------------------------
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach(el => observer.observe(el));
  }


  // --------------------------------------------------------------------------
  // ACTIVE NAV TRACKING
  // --------------------------------------------------------------------------
  function initActiveNavTracking() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72}px 0px -40% 0px`
      }
    );

    sections.forEach(s => observer.observe(s));
  }


  // --------------------------------------------------------------------------
  // SMOOTH SCROLLING
  // --------------------------------------------------------------------------
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }


  // --------------------------------------------------------------------------
  // MOBILE MENU
  // --------------------------------------------------------------------------
  function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on nav link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  // --------------------------------------------------------------------------
  // NAVBAR SCROLL SHADOW
  // --------------------------------------------------------------------------
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 10) {
            navbar.style.boxShadow = 'var(--shadow-sm)';
          } else {
            navbar.style.boxShadow = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }


  // --------------------------------------------------------------------------
  // INIT — runs when DOM is ready
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    // Render all sections from data
    renderHero();
    renderAbout();
    renderExperience();
    renderProjects();
    renderSkills();
    renderAwards();
    renderFooter();

    // Initialize interactions
    initScrollAnimations();
    initSmoothScrolling();
    initActiveNavTracking();
    initMobileMenu();
    initNavbarScroll();
  });

})();
