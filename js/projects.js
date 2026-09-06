/* ============================================================
   R1 LAURA — PROJECTS GALLERY
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initProjectGallery();
  initLightbox();
});

const CATEGORY_IMAGES = {
  'interiors': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  'individual-homes': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  'offices': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  'villas': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  'exterior-elevations': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'construction': 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
};
const DEFAULT_PROJECT_IMG = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80';

function getProjectImage(p) {
  if (p.image && p.image.trim() !== '') return p.image;
  return CATEGORY_IMAGES[p.category] || DEFAULT_PROJECT_IMG;
}

function initProjectGallery() {
  const grid = document.getElementById('projects-grid');
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (!grid) return;

  const projects = typeof DB !== 'undefined' ? DB.getProjects() : [];
  let activeFilter = 'all';

  const render = (filter) => {
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    if (!filtered.length) {
      grid.innerHTML = `<div class="text-center" style="grid-column:1/-1;padding:60px 0;color:var(--text-grey);">
        <i class="fas fa-folder-open" style="font-size:2rem;color:var(--gold-border);margin-bottom:12px;display:block;"></i>
        No projects in this category yet.
      </div>`;
      return;
    }

    grid.innerHTML = filtered.map((p, i) => {
      const imgSrc = getProjectImage(p);
      return `
      <div class="project-card reveal reveal-delay-${(i % 3) + 1}" 
           data-id="${p.id}" onclick="openLightbox('${p.id}')">
        <img src="${imgSrc}" alt="${p.title} - ${p.type} in ${p.location}" class="project-card-img" loading="lazy" onerror="this.src='${DEFAULT_PROJECT_IMG}'">
        <div class="project-card-overlay"></div>
        <div class="project-card-info">
          <div class="project-card-label">${p.type} ${p.year ? '· ' + p.year : ''}</div>
          <div class="project-card-title">${p.title}</div>
          <div class="project-card-location"><i class="fas fa-map-marker-alt" style="color:var(--gold);margin-right:6px;font-size:0.7rem;"></i>${p.location}</div>
        </div>
      </div>
      `;
    }).join('');

    // Re-init reveal for newly added elements
    if (typeof initRevealNew === 'function') initRevealNew();
    else {
      document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
        setTimeout(() => el.classList.add('revealed'), 100);
      });
    }
  };

  // Filter tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.getAttribute('data-filter');

      grid.style.opacity = '0';
      grid.style.transform = 'translateY(10px)';
      setTimeout(() => {
        render(activeFilter);
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      }, 200);
    });
  });

  grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  render(activeFilter);
}

// ── Featured projects (homepage) ──────────────────────────────
function renderFeaturedProjects() {
  const grid = document.getElementById('featured-projects-grid');
  if (!grid || typeof DB === 'undefined') return;
  const featured = DB.getProjects().filter(p => p.featured).slice(0, 6);
  if (!featured.length) return;

  grid.innerHTML = featured.map((p, i) => {
    const imgSrc = getProjectImage(p);
    return `
    <div class="project-card reveal reveal-delay-${(i % 3) + 1}" onclick="window.location='projects.html'">
      <img src="${imgSrc}" alt="${p.title}" class="project-card-img" loading="lazy" onerror="this.src='${DEFAULT_PROJECT_IMG}'">
      <div class="project-card-overlay"></div>
      <div class="project-card-info">
        <div class="project-card-label">${p.type} ${p.year ? '· ' + p.year : ''}</div>
        <div class="project-card-title">${p.title}</div>
        <div class="project-card-location">
          <i class="fas fa-map-marker-alt" style="color:var(--gold);margin-right:6px;font-size:0.7rem;"></i>${p.location}
        </div>
      </div>
    </div>
    `;
  }).join('');
}

// ── Lightbox ──────────────────────────────────────────────────
let currentProjectId = null;

function openLightbox(id) {
  if (typeof DB === 'undefined') return;
  const project = DB.getProjectById(id);
  if (!project) return;
  currentProjectId = id;

  const lb = document.getElementById('lightbox');
  if (!lb) return;

  lb.querySelector('#lb-title').textContent = project.title;
  lb.querySelector('#lb-type').textContent = project.type;
  lb.querySelector('#lb-location').textContent = project.location;
  lb.querySelector('#lb-year').textContent = project.year || '';
  lb.querySelector('#lb-area').textContent = project.area ? project.area : '';
  lb.querySelector('#lb-desc').textContent = project.desc || '';

  const img = lb.querySelector('#lb-img');
  img.src = getProjectImage(project);
  img.alt = project.title;

  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}
