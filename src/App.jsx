import React, { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { Toaster } from '@/components/ui/toaster';
import Preloader from '@/components/Preloader';
import { TooltipProvider } from '@/components/ui/tooltip'; // Import TooltipProvider

const HomePage = React.lazy(() => import('@/pages/HomePage'));
const LoginPage = React.lazy(() => import('@/pages/LoginPage'));
const AdminPage = React.lazy(() => import('@/pages/AdminPage'));
const ProtectedRoute = React.lazy(() => import('@/components/ProtectedRoute'));

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <TooltipProvider> {/* Wrap the entire app with TooltipProvider */}
            <Suspense fallback={<Preloader />}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route 
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </TooltipProvider>
          <Toaster />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;