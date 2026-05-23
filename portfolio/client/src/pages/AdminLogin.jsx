import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, getCurrentUser } from '../services/authService';
import { ShieldCheck, ArrowLeft, Lock, User, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  // Redirect to Dashboard if already logged in
  useEffect(() => {
    if (getCurrentUser()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please complete all authentication fields.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || 
        'Invalid administration credentials. Please verify backend state.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* Back button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Website
      </Link>

      <div className="w-full max-w-md">
        <div className="glassmorphism p-8 rounded-2xl shadow-xl border border-gray-200/60 dark:border-dark-border text-center space-y-6">
          
          {/* Header */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-3">
              <Lock className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Administrative Portal
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Verify your security credentials to manage content.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Username */}
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-xs font-bold text-gray-600 dark:text-gray-400">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  placeholder="admin"
                  required
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold text-gray-600 dark:text-gray-400">
                Security Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  placeholder="••••••••"
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Default credentials note */}
            <div className="p-3 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100/50 dark:border-slate-800 rounded-lg text-[10px] text-blue-600 dark:text-blue-400 leading-normal">
              <strong>Quick Tip:</strong> Use the seeded credentials <code>admin</code> and <code>admin123</code> to access your dashboard initially.
            </div>

            {/* Error alerts */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-300 border border-red-200 dark:border-red-900/50 rounded-lg text-xs font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ShieldCheck className="w-4.5 h-4.5" />
              {loading ? 'Authenticating...' : 'Sign In Security'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
