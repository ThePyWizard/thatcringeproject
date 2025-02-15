import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Share2 } from 'lucide-react';
import { calculateCompatibility } from '../utils/openai';

const questions = [
  "What's your ideal way to spend a weekend?",
  "How do you handle conflicts in a relationship?",
  "What's your love language?",
  "What's your biggest pet peeve in a relationship?",
  "How important is personal space to you?",
  "What's your approach to managing finances in a relationship?",
  "How do you prefer to show affection?",
  "What's your ideal pace for a relationship?",
  "How do you feel about public displays of affection?",
  "What role should social media play in a relationship?"
];

const LoveQuiz = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [partnerAnswers, setPartnerAnswers] = useState<Record<string, string>>({});
  const [showPartnerQuiz, setShowPartnerQuiz] = useState(false);
  const [compatibility, setCompatibility] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showPartnerQuiz) {
      setShowPartnerQuiz(true);
      return;
    }

    setLoading(true);
    try {
      const result = await calculateCompatibility(answers, partnerAnswers);
      setCompatibility(result);
    } catch (error) {
      console.error('Error calculating compatibility:', error);
      alert('Failed to calculate compatibility. Please try again.');
    }
    setLoading(false);
  };

  const handleShare = () => {
    // In a real app, this would generate a unique URL for the partner
    alert('Share feature coming soon! For now, have your partner fill out their answers here.');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <Users className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Love Meter</h1>
          <p className="text-gray-600 mt-2">Test your compatibility!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((question, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {question}
              </label>
              <textarea
                value={showPartnerQuiz ? partnerAnswers[index] || '' : answers[index] || ''}
                onChange={(e) => {
                  if (showPartnerQuiz) {
                    setPartnerAnswers({ ...partnerAnswers, [index]: e.target.value });
                  } else {
                    setAnswers({ ...answers, [index]: e.target.value });
                  }
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                rows={3}
                required
              />
            </div>
          ))}

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                loading ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            >
              <Heart className="h-5 w-5 mr-2" />
              {loading ? 'Calculating...' : showPartnerQuiz ? 'Calculate Compatibility' : 'Next: Partner\'s Turn'}
            </button>
            {!showPartnerQuiz && (
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share with Partner
              </button>
            )}
          </div>
        </form>

        {compatibility && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="bg-pink-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Compatibility Results</h2>
              <p className="whitespace-pre-wrap text-gray-700">{compatibility}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LoveQuiz;