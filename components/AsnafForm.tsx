
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AsnafApplication, ApplicationStatus } from '../types';
import { classifyAsnaf } from '../geminiService';

interface AsnafFormProps {
  onComplete: (app: AsnafApplication) => void;
}

const AsnafForm: React.FC<AsnafFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    householdSize: 1,
    monthlyIncome: 0,
    hardshipDescription: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step 1: Get AI Recommendation
      const aiResult = await classifyAsnaf(
        formData.fullName,
        formData.householdSize,
        formData.monthlyIncome,
        formData.hardshipDescription
      );

      // Step 2: Create application object
      const newApp: AsnafApplication = {
        id: uuidv4(),
        ...formData,
        status: ApplicationStatus.PENDING_REVIEW,
        aiRecommendation: {
          predictedCategory: aiResult.predictedCategory,
          confidence: aiResult.confidence,
          keyFactors: aiResult.keyFactors
        },
        submittedAt: new Date().toISOString()
      };

      onComplete(newApp);
      setSuccess(true);
      setFormData({
        fullName: '',
        householdSize: 1,
        monthlyIncome: 0,
        hardshipDescription: '',
        location: ''
      });
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center bg-white p-12 rounded-3xl shadow-xl text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mb-6">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Application Received</h2>
        <p className="text-slate-600 mb-8 max-w-md">
          Your application has been submitted to the Zakat board. Our AI system has categorized your request, and an administrator (Amil) will review it shortly.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Apply for Zakat Assistance</h1>
        <p className="text-slate-600 mt-2">Please provide accurate information to help our AI system verify your eligibility.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name (per NRIC/ID)</label>
            <input
              required
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              placeholder="Ahmad Bin Abdullah"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Location / City</label>
            <input
              required
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              placeholder="Kuala Lumpur"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Household Size</label>
            <input
              required
              type="number"
              min="1"
              value={formData.householdSize}
              onChange={(e) => setFormData({ ...formData, householdSize: parseInt(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Total Monthly Income ($)</label>
            <input
              required
              type="number"
              value={formData.monthlyIncome}
              onChange={(e) => setFormData({ ...formData, monthlyIncome: parseFloat(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Reason for Application</label>
          <textarea
            required
            rows={4}
            value={formData.hardshipDescription}
            onChange={(e) => setFormData({ ...formData, hardshipDescription: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            placeholder="Please describe your current financial situation, debts, or any specific hardships you are facing..."
          />
        </div>

        <div className="bg-emerald-50 p-4 rounded-xl flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <p className="text-sm text-emerald-800">
            Our AI system will analyze your description to recommend the most appropriate Asnaf category. This is for decision-support and will be verified by a human officer.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
            isSubmitting ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-200'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              AI Processing...
            </span>
          ) : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default AsnafForm;
