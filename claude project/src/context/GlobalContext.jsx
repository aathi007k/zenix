/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getCompany, setCompany,
  getWorkers, setWorkers, addWorker, updateWorker, deleteWorker,
  getTestimonials, setTestimonials, addTestimonial, updateTestimonial, deleteTestimonial,
  getTerms, setTerms,
  getStats, setStats,
  getCustomRequirements, setCustomRequirements,
  getAuth, login as doLogin, logout as doLogout,
  getBrandColor, setBrandColor,
} from '../utils/storage';

import { hasSupabaseConfig } from '../lib/supabaseClient';
import { fetchTable } from '../data/supabaseService';

const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [company, setCompanyState] = useState(getCompany);
  const [workers, setWorkersState] = useState(getWorkers);
  const [testimonials, setTestimonialsState] = useState(getTestimonials);
  const [terms, setTermsState] = useState(getTerms);
  const [stats, setStatsState] = useState(getStats);
  const [customRequirements, setCustomReqState] = useState(getCustomRequirements);
  const [auth, setAuthState] = useState(getAuth);

  useEffect(() => {
    const activeColor = company?.primaryColor || getBrandColor();
    document.documentElement.style.setProperty('--brand-primary', activeColor);
  }, [company]);

  // If Supabase is configured, try to load remote data on mount and replace local state.
  useEffect(() => {
    if (!hasSupabaseConfig()) return;

    let mounted = true;
    (async () => {
      try {
        const [{ data: companyData }, { data: workersData }, { data: testimonialsData }] = await Promise.all([
          fetchTable('company'),
          fetchTable('workers'),
          fetchTable('testimonials'),
        ]);

        if (!mounted) return;

        if (companyData && companyData.length) {
          const c = companyData[0];
          setCompany(c);
          setCompanyState(c);
        }
        if (workersData) {
          setWorkers(workersData);
          setWorkersState(workersData);
        }
        if (testimonialsData) {
          setTestimonials(testimonialsData);
          setTestimonialsState(testimonialsData);
        }
      } catch (e) {
        // swallow errors — keep localStorage fallback
        // console.warn('Supabase load failed', e);
      }
    })();

    return () => { mounted = false; };
  }, []);

  // ── Company ──
  const saveCompany = useCallback((data) => {
    setCompany(data);
    if (data?.primaryColor) {
      setBrandColor(data.primaryColor);
    }
    setCompanyState(data);
  }, []);

  // ── Workers ──
  const saveWorkers = useCallback((list) => {
    setWorkers(list);
    setWorkersState([...list]);
  }, []);
  const createWorker = useCallback((worker) => {
    addWorker(worker);
    setWorkersState(getWorkers());
  }, []);
  const editWorker = useCallback((id, data) => {
    updateWorker(id, data);
    setWorkersState(getWorkers());
  }, []);
  const removeWorker = useCallback((id) => {
    deleteWorker(id);
    setWorkersState(getWorkers());
  }, []);

  // ── Testimonials ──
  const saveTestimonials = useCallback((list) => {
    setTestimonials(list);
    setTestimonialsState([...list]);
  }, []);
  const createTestimonial = useCallback((item) => {
    addTestimonial(item);
    setTestimonialsState(getTestimonials());
  }, []);
  const editTestimonial = useCallback((id, data) => {
    updateTestimonial(id, data);
    setTestimonialsState(getTestimonials());
  }, []);
  const removeTestimonial = useCallback((id) => {
    deleteTestimonial(id);
    setTestimonialsState(getTestimonials());
  }, []);

  // ── Terms ──
  const saveTerms = useCallback((data) => {
    setTerms(data);
    setTermsState(data);
  }, []);

  // ── Stats ──
  const saveStats = useCallback((data) => {
    setStats(data);
    setStatsState(data);
  }, []);

  // ── Custom Requirements ──
  const saveCustomRequirements = useCallback((list) => {
    setCustomRequirements(list);
    setCustomReqState([...list]);
  }, []);

  // ── Auth ──
  const login = useCallback((username, password) => {
    const ok = doLogin(username, password);
    if (ok) setAuthState({ isLoggedIn: true });
    return ok;
  }, []);
  const logout = useCallback(() => {
    doLogout();
    setAuthState({ isLoggedIn: false });
  }, []);

  const value = {
    company, saveCompany,
    workers, saveWorkers, createWorker, editWorker, removeWorker,
    testimonials, saveTestimonials, createTestimonial, editTestimonial, removeTestimonial,
    terms, saveTerms,
    stats, saveStats,
    customRequirements, saveCustomRequirements,
    auth, login, logout,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export const useGlobal = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error('useGlobal must be used within GlobalProvider');
  return ctx;
};
