import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username.trim());
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center"
      >
        <Heart className="h-16 w-16 text-red-500 mx-auto" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Login to Premam CV
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Start Your Love Journey
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Enter any username to get started with your romantic adventure!
        </p>
      </motion.div>
    </div>
  );
};

export default Login;