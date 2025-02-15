import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Heart, Download } from 'lucide-react';
import type { LoveResume } from '../types';
import { generateLoveResume } from '../utils/openai';
import html2pdf from 'html2pdf.js';

const PremamCV = () => {
  const [formData, setFormData] = useState<Partial<LoveResume>>({
    name: '',
    age: 0,
    relationshipStatus: '',
    pastRelationships: 0,
    redFlags: ['', '', ''],
    greenFlags: ['', '', ''],
    expectations: '',
    idealDate: '',
  });
  const [resumes, setResumes] = useState<{ charming: string; roasting: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await generateLoveResume(formData);
      const [charming, roasting] = response.split('\n\n2.');
      setResumes({
        charming: charming.replace('1.', ''),
        roasting: '2.' + roasting
      });
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Failed to generate resume. Please try again.');
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!resumes) return;
    
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #e11d48; text-align: center;">Love Resume for ${formData.name}</h1>
        
        <h2 style="color: #4b5563;">Charming Version</h2>
        <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          ${resumes.charming}
        </div>
        
        <h2 style="color: #4b5563;">Roasting Version</h2>
        <div style="background: #fff5f5; padding: 20px; border-radius: 8px;">
          ${resumes.roasting}
        </div>
      </div>
    `;

    const opt = {
      margin: 1,
      filename: `love-resume-${formData.name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(content).save();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <FileText className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Love Resume Builder</h1>
          <p className="text-gray-600 mt-2">Create your romantic CV with a fun twist!</p>
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
              value={formData.age || ''}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
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
            <label className="block text-sm font-medium text-gray-700">Number of Past Relationships</label>
            <input
              type="number"
              value={formData.pastRelationships || ''}
              onChange={(e) => setFormData({ ...formData, pastRelationships: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Red Flags (3)</label>
            {formData.redFlags?.map((flag, index) => (
              <input
                key={index}
                type="text"
                value={flag}
                onChange={(e) => {
                  const newFlags = [...(formData.redFlags || [])];
                  newFlags[index] = e.target.value;
                  setFormData({ ...formData, redFlags: newFlags });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder={`Red Flag ${index + 1}`}
                required
              />
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Green Flags (3)</label>
            {formData.greenFlags?.map((flag, index) => (
              <input
                key={index}
                type="text"
                value={flag}
                onChange={(e) => {
                  const newFlags = [...(formData.greenFlags || [])];
                  newFlags[index] = e.target.value;
                  setFormData({ ...formData, greenFlags: newFlags });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder={`Green Flag ${index + 1}`}
                required
              />
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expectations from Partner</label>
            <textarea
              value={formData.expectations}
              onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ideal Date</label>
            <textarea
              value={formData.idealDate}
              onChange={(e) => setFormData({ ...formData, idealDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            >
              <Heart className="h-5 w-5 mr-2" />
              {loading ? 'Generating...' : 'Generate Resume'}
            </button>
            {resumes && (
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </button>
            )}
          </div>
        </form>

        {resumes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Charming Version</h2>
              <div className="bg-pink-50 p-6 rounded-lg">
                <p className="whitespace-pre-wrap">{resumes.charming}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Roasting Version</h2>
              <div className="bg-pink-50 p-6 rounded-lg">
                <p className="whitespace-pre-wrap">{resumes.roasting}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PremamCV;