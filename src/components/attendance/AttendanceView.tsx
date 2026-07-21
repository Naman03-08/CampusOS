import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, AlertTriangle, ShieldCheck, Calculator } from 'lucide-react';
import { AttendanceSubject } from '../../types';

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
      attendedClasses: parseInt(newAttended) || 0,
      totalClasses: parseInt(newTotal) || 1,
      targetPercentage: parseInt(newTarget) || 75,
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
        <h2 className="text-sm font-extrabold text-slate-900">Add New Subject / Course</h2>
        <form onSubmit={handleAddSubject} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <input
            type="text"
            required
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Subject Name (e.g. Database Systems)"
            className="sm:col-span-2 px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
          />
          <input
            type="number"
            required
            value={newAttended}
            onChange={(e) => setNewAttended(e.target.value)}
            placeholder="Classes Attended"
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
          />
          <input
            type="number"
            required
            value={newTotal}
            onChange={(e) => setNewTotal(e.target.value)}
            placeholder="Total Conducted"
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
          />
          <button
            type="submit"
            className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Subject
          </button>
        </form>
      </div>

      {/* Subjects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((sub) => {
          const pct = Math.round((sub.attendedClasses / sub.totalClasses) * 100);
          const target = sub.targetPercentage || 75;

          // Mathematical prediction:
          // If pct >= target: how many classes can be skipped?
          // (Attended) / (Total + Skip) = target/100  =>  100*Attended = target*Total + target*Skip => Skip = (100*Attended - target*Total) / target
          const maxSkipsPossible = Math.max(0, Math.floor((100 * sub.attendedClasses - target * sub.totalClasses) / target));

          // If pct < target: how many MUST be attended consecutively?
          // (Attended + Need) / (Total + Need) = target/100 => 100*Attended + 100*Need = target*Total + target*Need => Need*(100-target) = target*Total - 100*Attended
          const classesNeeded = pct < target ? Math.ceil((target * sub.totalClasses - 100 * sub.attendedClasses) / (100 - target)) : 0;

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
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar & Big % */}
              <div className="flex items-baseline justify-between">
                <span className={`text-3xl font-black ${pct >= target ? 'text-emerald-600' : 'text-red-600'}`}>
                  {pct}%
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {sub.attendedClasses} / {sub.totalClasses} Classes
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    pct >= target ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, pct)}%` }}
                ></div>
              </div>

              {/* AI Prediction Box */}
              {pct >= target ? (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    You can safely <strong>skip {maxSkipsPossible} classes</strong> and still remain above {target}%.
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
