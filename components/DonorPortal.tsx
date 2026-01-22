
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AsnafApplication, AsnafCategory, Donation, ApplicationStatus } from '../types';

interface DonorPortalProps {
  applications: AsnafApplication[];
  onDonate: (donation: Donation) => void;
}

const DonorPortal: React.FC<DonorPortalProps> = ({ applications, onDonate }) => {
  const [amount, setAmount] = useState<number>(50);
  const [selectedCategory, setSelectedCategory] = useState<AsnafCategory>(AsnafCategory.FAKIR);
  const [step, setStep] = useState<'selection' | 'success'>('selection');

  const approvedApps = applications.filter(a => 
    a.status === ApplicationStatus.APPROVED && 
    (a.adminAssignedCategory === selectedCategory || a.aiRecommendation?.predictedCategory === selectedCategory)
  );

  const handleDonate = () => {
    // Match with top candidate if exists
    const match = approvedApps[0];
    
    const donation: Donation = {
      id: uuidv4(),
      donorName: "Generous Donor",
      amount,
      category: selectedCategory,
      timestamp: new Date().toISOString(),
      targetAsnafId: match?.id
    };

    onDonate(donation);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center bg-white p-12 rounded-3xl shadow-xl text-center">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-4xl mb-6">
          ✨
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">JazakAllah Khair!</h2>
        <p className="text-slate-600 mb-8 max-w-md">
          Your donation of ${amount} has been processed. It has been matched to help {approvedApps[0]?.fullName || 'vetted Asnaf members'} in the {selectedCategory} category.
        </p>
        <button 
          onClick={() => setStep('selection')}
          className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Donate Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Donor Matching Engine</h1>
        <p className="text-slate-600 mt-2">Fund specific causes with transparency backed by AI verification.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">1. Choose Category</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(AsnafCategory).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-3 text-sm rounded-xl border font-medium transition-all ${
                    selectedCategory === cat 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">2. Enter Amount</h3>
            <div className="flex gap-4 mb-4">
              {[10, 50, 100, 500].map(val => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`flex-1 py-2 rounded-lg border font-bold ${
                    amount === val ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Custom Amount"
            />
          </div>

          <button
            onClick={handleDonate}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-emerald-700 hover:shadow-emerald-200 transition-all"
          >
            Proceed to Secure Payment
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
              <span>🎯</span> High-Impact Matches
            </h3>
            <p className="text-sm text-emerald-100 mb-6">These vetted applicants are currently waiting for support in your chosen category.</p>
            
            <div className="space-y-3">
              {approvedApps.length > 0 ? approvedApps.slice(0, 3).map(app => (
                <div key={app.id} className="bg-emerald-800 p-4 rounded-xl border border-emerald-700">
                  <p className="font-bold">{app.fullName}</p>
                  <p className="text-xs text-emerald-300">{app.location} • Confirmed by Amil</p>
                  <div className="mt-2 bg-emerald-700/50 p-2 rounded text-[10px] italic text-emerald-200">
                    "{app.hardshipDescription.substring(0, 80)}..."
                  </div>
                </div>
              )) : (
                <div className="py-8 text-center text-emerald-400/50 border border-dashed border-emerald-700 rounded-xl">
                  No pending matches in this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorPortal;
