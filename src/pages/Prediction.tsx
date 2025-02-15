import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Heart } from 'lucide-react';
import { generatePrediction } from '../utils/openai';

const Prediction = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    relationshipStatus: '',
    pastRelationships: ''
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generatePrediction(formData);
      setPrediction(result);
    } catch (error) {
      console.error('Error generating prediction:', error);
      alert('Failed to generate prediction. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <Calculator className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Couple Prediction</h1>
          <p className="text-gray-600 mt-2">Discover your romantic future!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Relationship Status</label>
            <select
              value={formData.relationshipStatus}
              onChange={(e) => setFormData({ ...formData, relationshipStatus: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            >
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="complicated">It's Complicated</option>
              <option value="dating">Dating</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Past Relationships</label>
            <input
              type="number"
              value={formData.pastRelationships}
              onChange={(e) => setFormData({ ...formData, pastRelationships: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                loading ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            >
              <Heart className="h-5 w-5 mr-2" />
              {loading ? 'Predicting...' : 'Predict My Future'}
            </button>
          </div>
        </form>

        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="bg-pink-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Love Prediction</h2>
              <p className="whitespace-pre-wrap text-gray-700">{prediction}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Prediction;