/* ============================================================
   R1 LAURA — DATA LAYER (localStorage)
   ============================================================ */

const DB = {
  // ── Keys ──────────────────────────────────────────────────
  KEYS: {
    PROJECTS: 'r1laura_projects',
    TESTIMONIALS: 'r1laura_testimonials',
    ENQUIRIES: 'r1laura_enquiries',
    SERVICES: 'r1laura_services',
    SETTINGS: 'r1laura_settings',
    AUTH: 'r1laura_auth',
  },

  // ── Helpers ───────────────────────────────────────────────
  get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; }
  },
  set(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); return true; } catch { return false; }
  },
  genId() { return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2,5); },

  // ── Settings ──────────────────────────────────────────────
  getSettings() {
    return this.get(this.KEYS.SETTINGS) || {
      phone: '7330840545',
      whatsapp: '7330840545',
      email: '',
      owner: 'B.N. Raju',
      location: 'Visakhapatnam, Andhra Pradesh, India',
      heroHeading: 'BUILDING DREAMS.\nDESIGNING EXCELLENCE.',
      heroDesc: 'From beautifully crafted interiors to construction, R1 Laura brings over 25 years of experience, craftsmanship and execution expertise to residential and commercial spaces across Visakhapatnam.',
      heroStats: { years: '25+', projects: '2500+', ventures: '40+' },
      aboutText: 'R1 Laura has been creating and transforming spaces for over 25 years, delivering interior solutions for apartments, individual homes, offices and exterior elevations.',
    };
  },
  saveSettings(data) { return this.set(this.KEYS.SETTINGS, data); },

  // ── Projects ──────────────────────────────────────────────
  getProjects() {
    const categoryDefaults = {
      'interiors': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'individual-homes': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'offices': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'villas': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'exterior-elevations': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'construction': 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    };
    const projects = this.get(this.KEYS.PROJECTS) || this._defaultProjects();
    return projects.map(p => {
      if (!p.image || p.image.trim() === '') {
        p.image = categoryDefaults[p.category] || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80';
      }
      return p;
    });
  },
  saveProjects(data) { return this.set(this.KEYS.PROJECTS, data); },
  addProject(project) {
    const all = this.getProjects();
    project.id = this.genId();
    project.createdAt = new Date().toISOString();
    all.unshift(project);
    return this.saveProjects(all);
  },
  updateProject(id, data) {
    const all = this.getProjects();
    const idx = all.findIndex(p => p.id === id);
    if (idx === -1) return false;
    all[idx] = { ...all[idx], ...data };
    return this.saveProjects(all);
  },
  deleteProject(id) {
    const all = this.getProjects().filter(p => p.id !== id);
    return this.saveProjects(all);
  },
  getProjectById(id) { return this.getProjects().find(p => p.id === id); },

  // ── Testimonials ──────────────────────────────────────────
  getTestimonials(onlyPublished = false) {
    const all = this.get(this.KEYS.TESTIMONIALS) || this._defaultTestimonials();
    return onlyPublished ? all.filter(t => t.published) : all;
  },
  saveTestimonials(data) { return this.set(this.KEYS.TESTIMONIALS, data); },
  addTestimonial(t) {
    const all = this.getTestimonials();
    t.id = this.genId();
    t.createdAt = new Date().toISOString();
    all.push(t);
    return this.saveTestimonials(all);
  },
  updateTestimonial(id, data) {
    const all = this.getTestimonials();
    const idx = all.findIndex(t => t.id === id);
    if (idx === -1) return false;
    all[idx] = { ...all[idx], ...data };
    return this.saveTestimonials(all);
  },
  deleteTestimonial(id) {
    return this.saveTestimonials(this.getTestimonials().filter(t => t.id !== id));
  },

  // ── Enquiries ─────────────────────────────────────────────
  getEnquiries() { return this.get(this.KEYS.ENQUIRIES) || []; },
  addEnquiry(data) {
    const all = this.getEnquiries();
    data.id = this.genId();
    data.createdAt = new Date().toISOString();
    data.status = 'NEW';
    all.unshift(data);
    return this.set(this.KEYS.ENQUIRIES, all) ? data.id : null;
  },
  updateEnquiryStatus(id, status) {
    const all = this.getEnquiries();
    const idx = all.findIndex(e => e.id === id);
    if (idx === -1) return false;
    all[idx].status = status;
    return this.set(this.KEYS.ENQUIRIES, all);
  },
  deleteEnquiry(id) {
    return this.set(this.KEYS.ENQUIRIES, this.getEnquiries().filter(e => e.id !== id));
  },

  // ── Auth ──────────────────────────────────────────────────
  getAdminPassword() {
    return '';
  },
  setAdminPassword(pw) { return true; },
  isLoggedIn() {
    // Password disabled as requested - admin portal open directly without password
    return true;
  },
  login(pw) {
    sessionStorage.setItem('r1laura_session', 'authenticated');
    return true;
  },
  logout() {
    window.location.href = '../index.html';
  },

  // ── Default Data ──────────────────────────────────────────
  _defaultProjects() {
    return [
      {
        id: 'p1',
        title: 'Luxury Apartment Interior',
        location: 'Visakhapatnam',
        category: 'interiors',
        type: 'Apartment',
        year: '2024',
        area: '2,400 sq.ft',
        desc: 'Complete luxury interior design and execution for a 4BHK residence featuring premium woodwork, ceiling lighting, custom wardrobes, and modular kitchen.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        featured: true
      },
      {
        id: 'p2',
        title: 'Individual Home — Full Interior',
        location: 'Visakhapatnam',
        category: 'individual-homes',
        type: 'Individual Home',
        year: '2023',
        area: '3,200 sq.ft',
        desc: 'End-to-end interior execution for a 3-storey independent home including living hall, master suites, modular kitchen and accent wall paneling.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        featured: true
      },
      {
        id: 'p3',
        title: 'Modern Corporate Office',
        location: 'Visakhapatnam',
        category: 'offices',
        type: 'Office',
        year: '2023',
        area: '1,800 sq.ft',
        desc: 'Modern commercial office interior with glass partition cabins, custom workstation desks, executive conference room and acoustic ceiling design.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        featured: true
      },
      {
        id: 'p4',
        title: 'Luxury Villa Interior Project',
        location: 'Visakhapatnam',
        category: 'villas',
        type: 'Villa',
        year: '2023',
        area: '5,500 sq.ft',
        desc: 'Opulent villa interiors featuring marble flooring accents, royal ceiling designs, custom vanity units and grand living spaces.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        featured: true
      },
      {
        id: 'p5',
        title: 'Premium Exterior Elevation',
        location: 'Visakhapatnam',
        category: 'exterior-elevations',
        type: 'Exterior',
        year: '2024',
        area: '4,000 sq.ft',
        desc: 'Modern facade and architectural exterior elevation work with CNC jali panels, weather-proof cladding and architectural lighting.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        featured: true
      },
      {
        id: 'p6',
        title: 'Residential Villa Construction',
        location: 'Visakhapatnam',
        category: 'construction',
        type: 'Construction',
        year: '2024',
        area: '2,800 sq.ft',
        desc: 'Structural construction and finishing works for an independent villa associated with Hema Constructions venture.',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
        featured: true
      },
      {
        id: 'p7',
        title: 'Modular Kitchen & Dining',
        location: 'Visakhapatnam',
        category: 'interiors',
        type: 'Apartment',
        year: '2024',
        area: '850 sq.ft',
        desc: 'Contemporary acrylic finish modular kitchen with tandem drawers, quartz countertop and integrated breakfast counter.',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        featured: false
      },
      {
        id: 'p8',
        title: 'Luxury Living Room Design',
        location: 'Visakhapatnam',
        category: 'interiors',
        type: 'Individual Home',
        year: '2023',
        area: '1,200 sq.ft',
        desc: 'Custom TV unit with Italian marble backing, gold trim louvers, warm cove lighting and premium velvet lounge seating.',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        featured: false
      }
    ];
  },
  _defaultTestimonials() {
    return [
      { id:'t1', name:'K. Srinivas Rao', project:'Apartment Interiors (4BHK)', location:'Visakhapatnam', text:'R1 Laura turned our 4BHK apartment into a masterpiece! Mr. B.N. Raju and his team executed everything cleanly on schedule. Quality of wood and finish is outstanding.', published:true },
      { id:'t2', name:'P. Ventakesh', project:'Independent House Construction', location:'Visakhapatnam', text:'With 25+ years experience, R1 Laura handles construction with extreme precision. Associated with Hema Constructions, their structural quality is unmatched.', published:true },
      { id:'t3', name:'M. Satyanarayana', project:'Villa Interior Design', location:'Visakhapatnam', text:'Highly professional interior decorators in Vizag. They designed our villa living room, bedrooms and modular kitchen beyond our expectations.', published:true },
    ];
  },
};
