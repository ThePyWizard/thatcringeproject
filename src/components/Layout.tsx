import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, User, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const username = localStorage.getItem('username');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Heart className="h-8 w-8 text-red-500" />
                <span className="ml-2 text-xl font-bold text-gray-800">Premikoo</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {username ? (
                <>
                  <Link to="/profile" className="flex items-center text-gray-600 hover:text-red-500">
                    <User className="h-5 w-5 mr-1" />
                    {username}
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('username');
                      window.location.href = '/';
                    }}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;