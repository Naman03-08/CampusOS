import React from 'react';
import { ShieldAlert, Cpu, Database, Users, Activity, CheckCircle2, Server } from 'lucide-react';

export const AdminPanelView: React.FC = () => {
  const metrics = [
    { label: 'Registered Campus Students', value: '124,850', change: '+12% this week', color: 'text-blue-600' },
    { label: 'AI Study Suites Generated', value: '458,920', change: '+18% this week', color: 'text-indigo-600' },
    { label: 'Mock Interviews Evaluated', value: '89,410', change: '+24% this week', color: 'text-purple-600' },
    { label: 'Active Firestore Read/Writes', value: '1.2M reqs', change: 'Latency < 45ms', color: 'text-emerald-600' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-black text-slate-900">CampusOS Admin & System Telemetry</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time API metrics, AI token usage, and Firestore security status.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          System Status: 100% Healthy
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase">{m.label}</p>
            <p className={`text-3xl font-black ${m.color}`}>{m.value}</p>
            <p className="text-[11px] font-semibold text-slate-400">{m.change}</p>
          </div>
        ))}
      </div>

      {/* Infrastructure Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-600" /> AI Engine Configuration
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
              <span className="font-bold text-slate-700">Primary Fast Model</span>
              <span className="font-mono font-bold text-blue-600">ai-3.6-flash-core</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
              <span className="font-bold text-slate-700">Deep Reasoning Model</span>
              <span className="font-mono font-bold text-indigo-600">ai-3.1-pro-reasoner</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
              <span className="font-bold text-slate-700">Server Backend Proxy</span>
              <span className="font-bold text-emerald-600">Express Node CJS (Port 3000)</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-600" /> Firestore Security Rules
          </h2>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Master Gate Authentication Enforced
            </p>
            <p className="text-emerald-800">
              Users can only read and write documents where <code>request.auth.uid == userId</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
