/* ============================================================
   R1 LAURA — MAIN JS
   Navigation · Scroll · Animations · Counters · WhatsApp
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initCounters();
  initWhatsApp();
  setActivePage();
});

// ── Navigation ────────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  if (!nav) return;

  // Scroll handler
  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
      nav.classList.remove('transparent');
    } else {
      nav.classList.remove('scrolled');
      nav.classList.add('transparent');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobile);
  }

  // Close on link click
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', closeMobile);
  });

  function closeMobile() {
    if (toggle) toggle.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ── Active page highlight ─────────────────────────────────────
function setActivePage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') ||
        (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── Scroll Reveal ────────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => obs.observe(el));
}

// ── Counter Animation ─────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 2000;
  const start = performance.now();

  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = prefix + target.toLocaleString() + suffix;
  };
  requestAnimationFrame(update);
}

// ── WhatsApp ──────────────────────────────────────────────────
function initWhatsApp() {
  const WA_NUM = '917330840545';
  const DEFAULT_MSG = 'Hello R1 Laura, I would like to enquire about your Interior / Construction services.';

  document.querySelectorAll('[data-wa]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = el.getAttribute('data-wa-msg') || DEFAULT_MSG;
      window.open(`https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });
}

// ── Utility ──────────────────────────────────────────────────
function openWhatsApp(msg) {
  const WA_NUM = '917330840545';
  const text = msg || 'Hello R1 Laura, I would like to enquire about your services.';
  window.open(`https://wa.me/${WA_NUM}?text=${encodeURIComponent(text)}`, '_blank');
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── Hero scroll indicator ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const scrollHint = document.getElementById('hero-scroll');
  if (scrollHint) {
    scrollHint.addEventListener('click', () => {
      const next = document.getElementById('stats-strip');
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
