import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import CaseStudies from './pages/CaseStudies';
import OurProcess from './pages/OurProcess';
import Industries from './pages/Industries';
import MetaOnboarding from './pages/MetaOnboarding';
import TikTokOnboarding from './pages/TikTokOnboarding';
import GoogleAdsOnboarding from './pages/GoogleAdsOnboarding';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="w-7 h-7 border-4 border-gray-100 border-t-[#4F46E5] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/our-process" element={<OurProcess />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/meta-onboarding" element={<MetaOnboarding />} />
        <Route path="/tiktok-onboarding" element={<TikTokOnboarding />} />
        <Route path="/google-ads-onboarding" element={<GoogleAdsOnboarding />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App