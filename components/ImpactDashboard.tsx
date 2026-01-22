
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AsnafApplication, Donation, AsnafCategory } from '../types';

interface ImpactDashboardProps {
  applications: AsnafApplication[];
  donations: Donation[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#71717a'];

const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ applications, donations }) => {
  const categoryData = useMemo(() => {
    const data = Object.values(AsnafCategory).map(cat => ({
      name: cat,
      value: donations.filter(d => d.category === cat).reduce((sum, d) => sum + d.amount, 0)
    }));
    return data;
  }, [donations]);

  const stats = useMemo(() => ({
    totalCollected: donations.reduce((sum, d) => sum + d.amount, 0),
    totalDonors: new Set(donations.map(d => d.donorName)).size,
    totalAsnafHelped: applications.filter(a => donations.some(d => d.targetAsnafId === a.id)).length,
  }), [donations, applications]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Impact Transparency</h1>
        <p className="text-slate-600 mt-2">Visualizing how your Zakat contributes to community wealth creation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Funds Distributed</p>
          <p className="text-3xl font-black text-emerald-600 mt-2">${stats.totalCollected.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Donors</p>
          <p className="text-3xl font-black text-blue-600 mt-2">{stats.totalDonors}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lives Impacted</p>
          <p className="text-3xl font-black text-amber-600 mt-2">{stats.totalAsnafHelped}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Distribution by Asnaf Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Allocation Mix</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData.filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categoryData.filter(d => d.value > 0).map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-xs text-slate-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Shariah-Compliant Wealth Creation</h3>
          <p className="text-emerald-100 max-w-2xl leading-relaxed">
            Coming Soon: Our AI matching engine will soon identify candidates in the Muallaf and Riqab categories who are ready for Shariah-compliant micro-financing (P2P), moving them from Zakat recipients to community wealth creators.
          </p>
          <button className="mt-6 px-6 py-2 bg-emerald-400 text-emerald-950 font-bold rounded-lg hover:bg-emerald-300 transition-colors">
            Learn More
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/50 rounded-full blur-3xl -mr-20 -mt-20"></div>
      </div>
    </div>
  );
};

export default ImpactDashboard;
