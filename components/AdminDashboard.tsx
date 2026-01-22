
import React, { useState } from 'react';
import { AsnafApplication, ApplicationStatus, AsnafCategory } from '../types';

interface AdminDashboardProps {
  applications: AsnafApplication[];
  onUpdate: (id: string, updates: Partial<AsnafApplication>) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ applications, onUpdate }) => {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const selectedApp = applications.find(a => a.id === selectedAppId);

  const handleReview = (id: string, status: ApplicationStatus, assignedCategory?: AsnafCategory) => {
    onUpdate(id, { 
      status, 
      adminAssignedCategory: assignedCategory || selectedApp?.aiRecommendation?.predictedCategory 
    });
    setSelectedAppId(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Command Center</h1>
          <p className="text-slate-600">Review AI-assisted asnaf classifications</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase">Pending</p>
            <p className="text-xl font-bold text-slate-800">{applications.filter(a => a.status === ApplicationStatus.PENDING_REVIEW).length}</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase">Approved</p>
            <p className="text-xl font-bold text-emerald-600">{applications.filter(a => a.status === ApplicationStatus.APPROVED).length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden">
        {/* List View */}
        <div className="lg:col-span-2 overflow-y-auto space-y-4 pr-2">
          {applications.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center border border-dashed border-slate-300 text-slate-500">
              No applications submitted yet.
            </div>
          ) : (
            applications.map(app => (
              <div 
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  selectedAppId === app.id 
                    ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200 shadow-md' 
                    : 'border-slate-200 bg-white hover:border-emerald-300'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{app.fullName}</h3>
                    <p className="text-sm text-slate-500">{app.location} • Income: ${app.monthlyIncome}/mo</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    app.status === ApplicationStatus.PENDING_REVIEW ? 'bg-amber-100 text-amber-700' :
                    app.status === ApplicationStatus.APPROVED ? 'bg-emerald-100 text-emerald-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {app.status.replace('_', ' ')}
                  </span>
                </div>
                
                {app.aiRecommendation && (
                  <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-emerald-100">
                    <span className="text-xl">🤖</span>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 font-semibold">AI Recommendation</p>
                      <p className="text-sm font-bold text-emerald-700">{app.aiRecommendation.predictedCategory} ({(app.aiRecommendation.confidence * 100).toFixed(0)}%)</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl overflow-y-auto">
          {selectedApp ? (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-4">Application Details</h2>
              
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Reason for Support</label>
                <p className="text-slate-700 mt-2 text-sm leading-relaxed italic">"{selectedApp.hardshipDescription}"</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span>🤖</span> AI Insights
                </h3>
                <ul className="space-y-2">
                  {selectedApp.aiRecommendation?.keyFactors.map((factor, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="text-emerald-500">•</span> {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-4">
                <label className="text-xs font-bold text-slate-400 uppercase">Action Center</label>
                <div className="flex flex-col gap-2">
                  {Object.values(AsnafCategory).map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleReview(selectedApp.id, ApplicationStatus.APPROVED, cat)}
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-all border ${
                        selectedApp.aiRecommendation?.predictedCategory === cat 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                        : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500'
                      }`}
                    >
                      Approve as {cat} {selectedApp.aiRecommendation?.predictedCategory === cat ? ' (Recommended)' : ''}
                    </button>
                  ))}
                  <button
                    onClick={() => handleReview(selectedApp.id, ApplicationStatus.REJECTED)}
                    className="mt-4 py-2 px-4 rounded-lg text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all"
                  >
                    Reject Application
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
              <span className="text-6xl mb-4">👈</span>
              <p>Select an application to see details and make a decision.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
