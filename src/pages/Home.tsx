import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, FileText, Calculator, Users } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Premam CV',
    description: 'Create your romantic CV with a fun twist - get both charming and roasting versions!',
    path: '/premam-cv',
    color: 'text-pink-500',
  },
  {
    icon: Calculator,
    title: 'Love Jyothishyan',
    description: 'Discover your romantic future with our AI-powered relationship predictions.',
    path: '/thatkudumbamkalaki',
    color: 'text-red-500',
  },
  {
    icon: Users,
    title: 'Premam Meter',
    description: 'Test your compatibility with your partner through our interactive quiz.',
    path: '/premam-meter',
    color: 'text-rose-500',
  },
];

const Home = () => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-block"
      >
        <Heart className="h-16 w-16 text-red-500 mx-auto" />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 text-4xl font-bold text-gray-900"
      >
        Welcome to Premikoo
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-xl text-gray-600"
      >
        Your fun and quirky love life companion
      </motion.p>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Link
              to={feature.path}
              className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <feature.icon className={`h-12 w-12 mx-auto ${feature.color}`} />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h2>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&auto=format&fit=crop&q=80"
        alt="Love"
        className="mt-16 rounded-lg shadow-xl max-w-3xl mx-auto"
      />
    </div>
  );
};

export default Home;