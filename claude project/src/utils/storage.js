// ─── localStorage Utility Functions ───────────────────────────────────────────

const KEYS = {
  COMPANY: 'company',
  WORKERS: 'workers',
  TESTIMONIALS: 'testimonials',
  TERMS: 'terms',
  STATS: 'stats',
  CUSTOM_REQUIREMENTS: 'customRequirements',
  BRAND_COLOR: 'brandColor',
  AUTH: 'auth',
};

// Generic helpers
const get = (key) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch { return null; }
};

const set = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.error(e); }
};

// ─── Company ──────────────────────────────────────────────────────────────────
export const getCompany = () => get(KEYS.COMPANY) || {
  name: 'Zenixoft',
  tagline: 'Powering Brands. Building Technology.',
  about: 'Zenixoft is a premier Digital Marketing and Software Technology company dedicated to transforming businesses through cutting-edge solutions. We combine creative strategy with technical excellence to deliver measurable results.',
  logo: null,
  email: 'aathi.ztech@gmail.com',
  phone: '6381254305',
  address: 'Salem',
  socialLinks: { linkedin: '#', twitter: '#', instagram: '#', facebook: '#' },
  primaryColor: '#2563EB',
};
export const setCompany = (data) => {
  set(KEYS.COMPANY, data);
  if (data?.primaryColor) {
    setBrandColor(data.primaryColor);
  }
};

// ─── Workers ──────────────────────────────────────────────────────────────────
export const getWorkers = () => get(KEYS.WORKERS) || [];
export const setWorkers = (workers) => set(KEYS.WORKERS, workers);
export const addWorker = (worker) => {
  const workers = getWorkers();
  workers.push(worker);
  setWorkers(workers);
};
export const updateWorker = (id, data) => {
  const workers = getWorkers().map(w => w.id === id ? { ...w, ...data } : w);
  setWorkers(workers);
};
export const deleteWorker = (id) => {
  const workers = getWorkers().filter(w => w.id !== id);
  setWorkers(workers);
};
export const getWorkerById = (id) => getWorkers().find(w => w.id === id) || null;

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const getTestimonials = () => get(KEYS.TESTIMONIALS) || [
  { id: 't1', clientName: 'Ram', company: 'Tech Solutions', review: 'Zenixoft transformed our digital presence completely. Their team is exceptional and the results speak for themselves.', rating: 5, photo: null },
  { id: 't2', clientName: 'Guna', company: 'Innovative Brands', review: 'The software solution they built for us saved 40 hours per week in manual work. Absolutely outstanding delivery.', rating: 5, photo: null },
  { id: 't3', clientName: 'Lekha', company: 'Growth Partners', review: 'Professional, creative, and result-driven. Zenixoft is the agency partner every company needs.', rating: 4, photo: null },
];
export const setTestimonials = (list) => set(KEYS.TESTIMONIALS, list);
export const addTestimonial = (item) => {
  const list = getTestimonials();
  list.push(item);
  setTestimonials(list);
};
export const updateTestimonial = (id, data) => {
  const list = getTestimonials().map(t => t.id === id ? { ...t, ...data } : t);
  setTestimonials(list);
};
export const deleteTestimonial = (id) => {
  setTestimonials(getTestimonials().filter(t => t.id !== id));
};

// ─── Terms ────────────────────────────────────────────────────────────────────
export const getTerms = () => get(KEYS.TERMS) || {
  content: `# Terms & Conditions\n\n## 1. Usage Policy\nBy accessing and using Zenixoft services, you agree to these terms. Our services are intended for commercial and business use...\n\n## 2. Privacy Policy\nWe are committed to protecting your privacy. All data collected is handled in accordance with applicable data protection laws...\n\n## 3. Worker Agreement\nAll team members and contractors working with Zenixoft agree to maintain confidentiality and deliver work to the highest professional standards...\n\n## 4. Client Agreement\nClients engaging Zenixoft's services agree to provide timely feedback, necessary access, and payment as per agreed timelines...`,
  lastUpdated: new Date().toISOString(),
};
export const setTerms = (data) => set(KEYS.TERMS, data);

// ─── Stats ────────────────────────────────────────────────────────────────────
export const getStats = () => get(KEYS.STATS) || {
  clients: 5, projects: 8, years: 1, teamMembers: 10,
};
export const setStats = (data) => set(KEYS.STATS, data);

// ─── Custom Requirements ──────────────────────────────────────────────────────
export const getCustomRequirements = () => get(KEYS.CUSTOM_REQUIREMENTS) || [];
export const setCustomRequirements = (list) => set(KEYS.CUSTOM_REQUIREMENTS, list);

// ─── Brand Color ───────────────────────────────────────────────────────────────
export const getBrandColor = () => get(KEYS.BRAND_COLOR) || getCompany().primaryColor || '#2563EB';
export const setBrandColor = (color) => set(KEYS.BRAND_COLOR, color);

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const getAuth = () => get(KEYS.AUTH) || { isLoggedIn: false };
export const setAuth = (data) => set(KEYS.AUTH, data);
export const login = (username, password) => {
  if (username === 'admin' && password === '007') {
    setAuth({ isLoggedIn: true });
    return true;
  }
  return false;
};
export const logout = () => setAuth({ isLoggedIn: false });
export const isAuthenticated = () => getAuth().isLoggedIn;

// ─── FileReader helper ────────────────────────────────────────────────────────
export const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});
