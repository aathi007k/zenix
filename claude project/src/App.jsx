import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';

// Public pages
import HomePage from './pages/HomePage';
import TermsPage from './pages/TermsPage';
import TeamPage from './pages/TeamPage';
import WorkerDetailPage from './pages/WorkerDetailPage';
import ServiceDetailPage from './pages/ServiceDetailPage';

// Admin
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCompany from './pages/admin/AdminCompany';
import AdminBranding from './pages/admin/AdminBranding';
import AdminWorkers from './pages/admin/AdminWorkers';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminStats from './pages/admin/AdminStats';
import AdminTerms from './pages/admin/AdminTerms';
import AdminRequirements from './pages/admin/AdminRequirements';

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:id" element={<WorkerDetailPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />

          {/* Admin Login */}
          <Route path="/admin" element={<AdminLoginPage />} />

          {/* Admin Protected */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="company" element={<AdminCompany />} />
            <Route path="branding" element={<AdminBranding />} />
            <Route path="workers" element={<AdminWorkers />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="stats" element={<AdminStats />} />
            <Route path="terms" element={<AdminTerms />} />
            <Route path="requirements" element={<AdminRequirements />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}
