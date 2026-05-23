import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

// Components & Pages
import Navbar from './components/Navbar';
import ParticlesBg from './components/ParticlesBg';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Helper component to handle automatic anchor scrolling when returning from other routes
const RouteScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const targetId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
      // Clean state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return null;
};

// Layout wrapper for home page
const MainLayout = ({ isDarkMode, toggleTheme }) => {
  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // default to premium dark mode
  const [appLoading, setAppLoading] = useState(true);

  // Sync theme with DOM body classes
  useEffect(() => {
    const cachedTheme = localStorage.getItem('theme');
    if (cachedTheme === 'light') {
      setIsDarkMode(false);
      document.body.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }
    
    // Simulate premium loader mounting
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      localStorage.setItem('theme', 'light');
      document.body.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
      document.body.classList.add('dark');
    }
  };

  return (
    <Router>
      <RouteScrollHandler />
      
      <AnimatePresence mode="wait">
        {appLoading ? (
          <motion.div
            key="app-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[9999] bg-[#080c14] flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="relative flex items-center justify-center mb-6">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <Terminal className="w-6 h-6 text-blue-400 absolute animate-pulse-slow" />
              </div>
              <h1 className="text-xl font-extrabold tracking-widest bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                AKASH K. PORTFOLIO
              </h1>
              <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-widest animate-pulse">
                Assembling components...
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen relative"
          >
            {/* Constellation Particle Background */}
            <ParticlesBg isDarkMode={isDarkMode} />

            {/* Pages Routing */}
            <Routes>
              <Route path="/" element={<MainLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
};

export default App;
