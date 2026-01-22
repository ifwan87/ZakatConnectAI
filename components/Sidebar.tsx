
import React from 'react';

interface SidebarProps {
  activeTab: 'asnaf' | 'admin' | 'donor' | 'impact' | 'chat';
  setActiveTab: (tab: 'asnaf' | 'admin' | 'donor' | 'impact' | 'chat') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'asnaf', label: 'Asnaf Portal', icon: '🤲' },
    { id: 'admin', label: 'Admin Panel', icon: '📋' },
    { id: 'donor', label: 'Donor Matching', icon: '💎' },
    { id: 'impact', label: 'Impact Tracker', icon: '📊' },
    { id: 'chat', label: 'Zakat AI Expert', icon: '🤖' },
  ] as const;

  return (
    <nav className="w-20 md:w-64 bg-emerald-900 text-white flex flex-col transition-all">
      <div className="p-6 flex items-center gap-3">
        <span className="text-2xl font-bold text-emerald-400 hidden md:block">ZakatConnect</span>
        <span className="text-2xl font-bold text-emerald-400 md:hidden">ZC</span>
      </div>
      
      <div className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-emerald-700 text-white shadow-lg' 
                : 'text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 mt-auto">
        <div className="bg-emerald-800 p-4 rounded-xl hidden md:block">
          <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold">Status</p>
          <p className="text-sm font-medium mt-1">Live MVP Beta</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
