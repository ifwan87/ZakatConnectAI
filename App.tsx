
import React, { useState, useEffect } from 'react';
import { AsnafApplication, ApplicationStatus, AsnafCategory, Donation } from './types';
import Sidebar from './components/Sidebar';
import AsnafForm from './components/AsnafForm';
import AdminDashboard from './components/AdminDashboard';
import DonorPortal from './components/DonorPortal';
import ImpactDashboard from './components/ImpactDashboard';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'asnaf' | 'admin' | 'donor' | 'impact' | 'chat'>('asnaf');
  const [applications, setApplications] = useState<AsnafApplication[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);

  // Load mock data or initial state
  useEffect(() => {
    const savedApps = localStorage.getItem('zakat_apps');
    const savedDonations = localStorage.getItem('zakat_donations');
    if (savedApps) setApplications(JSON.parse(savedApps));
    if (savedDonations) setDonations(JSON.parse(savedDonations));
  }, []);

  useEffect(() => {
    localStorage.setItem('zakat_apps', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('zakat_donations', JSON.stringify(donations));
  }, [donations]);

  const addApplication = (app: AsnafApplication) => {
    setApplications(prev => [app, ...prev]);
  };

  const updateApplication = (id: string, updates: Partial<AsnafApplication>) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, ...updates } : app));
  };

  const addDonation = (donation: Donation) => {
    setDonations(prev => [donation, ...prev]);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto h-full">
          {activeTab === 'asnaf' && <AsnafForm onComplete={addApplication} />}
          {activeTab === 'admin' && (
            <AdminDashboard 
              applications={applications} 
              onUpdate={updateApplication} 
            />
          )}
          {activeTab === 'donor' && (
            <DonorPortal 
              applications={applications} 
              onDonate={addDonation} 
            />
          )}
          {activeTab === 'impact' && (
            <ImpactDashboard 
              applications={applications} 
              donations={donations} 
            />
          )}
          {activeTab === 'chat' && <Chatbot />}
        </div>
      </main>
    </div>
  );
};

export default App;
