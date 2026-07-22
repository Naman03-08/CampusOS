import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, AlertTriangle, ShieldCheck, Calculator } from 'lucide-react';
import { AttendanceSubject } from '../../types';
import { SectionUsageBanner } from '../common/SectionUsageBanner';

interface AttendanceViewProps {
  attendance: AttendanceSubject[];
  onUpdateAttendance: (subjects: AttendanceSubject[]) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  attendance,
  onUpdateAttendance,
}) => {
  const [subjects, setSubjects] = useState<AttendanceSubject[]>(attendance);

  const [newName, setNewName] = useState('');
  const [newAttended, setNewAttended] = useState('28');
  const [newTotal, setNewTotal] = useState('32');
  const [newTarget, setNewTarget] = useState('80');

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newSub: AttendanceSubject = {
      id: 'sub_' + Date.now(),
      userId: 'default',
      code: 'CS' + Math.floor(Math.random() * 800 + 100),
      name: newName,
      attendedClasses: Math.max(0, parseInt(newAttended) || 0),
      totalClasses: Math.max(0, parseInt(newTotal) || 0),
      targetPercentage: Math.max(1, Math.min(100, parseInt(newTarget) || 75)),
      scheduleDays: ['Mon', 'Wed', 'Fri'],
    };

    const updated = [...subjects, newSub];
    setSubjects(updated);
    onUpdateAttendance(updated);
    setNewName('');
  };

  const handleIncrement = (id: string, type: 'attended' | 'missed') => {
    const updated = subjects.map((sub) => {
      if (sub.id === id) {
        return {
          ...sub,
          attendedClasses: type === 'attended' ? sub.attendedClasses + 1 : sub.attendedClasses,
          totalClasses: sub.totalClasses + 1,
        };
      }
      return sub;
    });
    setSubjects(updated);
    onUpdateAttendance(updated);
  };

  const handleDelete = (id: string) => {
    const updated = subjects.filter((s) => s.id !== id);
    setSubjects(updated);
    onUpdateAttendance(updated);
  };

  // Overall Statistics
  const totalClasses = subjects.reduce((acc, s) => acc + s.totalClasses, 0);
  const totalAttended = subjects.reduce((acc, s) => acc + s.attendedClasses, 0);
  const overallPct = totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Usage Banner */}
      <SectionUsageBanner
        title="Smart Attendance Manager & Threshold Predictor"
        subtitle="Track subject attendance, calculate class skip buffers, and avoid debarment"
        purpose="This section is used to manage your course attendance across all enrolled subjects. It automatically computes whether you meet minimum attendance requirements (e.g. 75% or 80%), predicts how many classes you can safely skip, or how many mandatory lectures you must attend to recover."
        keyFeatures={[
          'Subject-wise Class Attendance Logging',
          'Automated 75%/80% Debarment Safeguard Warnings',
          'Safe Class Bunk & Recovery Calculator',
          'Real-time Firestore Attendance Sync'
        ]}
        icon={<CheckSquare className="w-6 h-6 text-white" />}
        badge="Attendance Manager Purpose"
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-black text-slate-900">Smart Attendance Manager & Predictor</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Calculate exact class skipping buffer thresholds to clear target attendance criteria effortlessly.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2.5 rounded-2xl border border-blue-100">
          <Calculator className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-blue-900">
            Overall Attendance: <span className="text-blue-600 font-extrabold">{overallPct}%</span>
          </span>
        </div>
      </div>

      {/* Add Subject Form */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-extrabold text-slate-900">Add New Subject / Course</h2>
          <p className="text-xs text-slate-500 mt-0.5">Fill in subject name, classes attended, and total lectures conducted to compute safe bunk limits.</p>
        </div>

        <form onSubmit={handleAddSubject} className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end">
          <div className="sm:col-span-4 space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Subject Name
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Database Systems"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Classes Attended (28)
            </label>
            <input
              type="number"
              min="0"
              required
              value={newAttended}
              onChange={(e) => setNewAttended(e.target.value)}
              placeholder="Attended count (e.g. 28)"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
            />
          </div>

          <div className="sm:col-span-3 space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Total Conducted (32)
            </label>
            <input
              type="number"
              min="0"
              required
              value={newTotal}
              onChange={(e) => setNewTotal(e.target.value)}
              placeholder="Total conducted (e.g. 32)"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Subject
            </button>
          </div>
        </form>
      </div>

      {/* Subjects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((sub) => {
          const total = sub.totalClasses || 0;
          const attended = sub.attendedClasses || 0;
          const pct = total > 0 ? Math.round((attended / total) * 100) : 0;
          const target = sub.targetPercentage || 75;

          // Mathematical prediction:
          const maxSkipsPossible = total > 0 ? Math.max(0, Math.floor((100 * attended - target * total) / target)) : 0;
          const classesNeeded = total > 0 && pct < target 
            ? Math.ceil((target * total - 100 * attended) / Math.max(1, 100 - target)) 
            : 0;

          return (
            <div key={sub.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 relative">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{sub.name}</h3>
                  <p className="text-xs text-slate-500">Target threshold: {target}%</p>
                </div>

                <button
                  onClick={() => handleDelete(sub.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors"
                  title="Delete subject"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar & Big % */}
              <div className="flex items-baseline justify-between">
                <span className={`text-3xl font-black ${total === 0 ? 'text-slate-400' : pct >= target ? 'text-emerald-600' : 'text-red-600'}`}>
                  {pct}%
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {attended} / {total} Classes
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    total === 0 ? 'bg-slate-300' : pct >= target ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, pct)}%` }}
                ></div>
              </div>

              {/* AI Prediction Box */}
              {total === 0 ? (
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    No classes logged yet. Use the buttons below to log attended or missed lectures.
                  </span>
                </div>
              ) : pct >= target ? (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Safe Zone! You can safely <strong>skip {maxSkipsPossible} classes</strong> and still remain above {target}%.
                  </span>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>
                    Attendance Low! You MUST attend <strong>{classesNeeded} consecutive classes</strong> to reach {target}%.
                  </span>
                </div>
              )}

              {/* Increment Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleIncrement(sub.id, 'attended')}
                  className="flex-1 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors"
                >
                  + Attended Class
                </button>
                <button
                  onClick={() => handleIncrement(sub.id, 'missed')}
                  className="flex-1 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-colors"
                >
                  + Missed Class
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
