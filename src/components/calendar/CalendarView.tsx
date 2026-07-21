import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Zap, Clock, Trash2, CheckCircle2 } from 'lucide-react';
import { ScheduleEvent } from '../../types';

interface CalendarViewProps {
  schedule: ScheduleEvent[];
  onAddEvent: (evt: ScheduleEvent) => void;
  onDeleteEvent: (id: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  schedule,
  onAddEvent,
  onDeleteEvent,
}) => {
  const [events, setEvents] = useState<ScheduleEvent[]>(schedule);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('09:00 AM');
  const [category, setCategory] = useState<'class' | 'study' | 'exam' | 'assignment'>('study');
  const [duration, setDuration] = useState('60');

  const todayStr = new Date().toISOString().split('T')[0];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvt: ScheduleEvent = {
      id: 'evt_' + Date.now(),
      userId: 'default',
      title,
      time,
      date: todayStr,
      category: category as any,
      durationMinutes: parseInt(duration) || 60,
      completed: false,
    };

    const updated = [...events, newEvt];
    setEvents(updated);
    onAddEvent(newEvt);
    setTitle('');
  };

  const handleAutoScheduleAI = () => {
    const aiGeneratedEvents: ScheduleEvent[] = [
      {
        id: 'ai_evt_1',
        userId: 'default',
        title: 'DSA Array & Pointer Revision',
        time: '14:00',
        date: todayStr,
        category: 'Study',
        durationMinutes: 45,
        completed: false,
      },
      {
        id: 'ai_evt_2',
        userId: 'default',
        title: 'OS Page Replacement Practice',
        time: '16:30',
        date: todayStr,
        category: 'Assignment',
        durationMinutes: 60,
        completed: false,
      },
      {
        id: 'ai_evt_3',
        userId: 'default',
        title: 'Mock Interview Voice Drills',
        time: '19:00',
        date: todayStr,
        category: 'Study',
        durationMinutes: 30,
        completed: false,
      },
    ];

    const updated = [...events, ...aiGeneratedEvents];
    setEvents(updated);
    aiGeneratedEvents.forEach((item) => onAddEvent(item));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-black text-slate-900">Smart AI Student Calendar</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Auto-schedule daily revision sessions, class timetables & assignment deadlines based on exam dates.
          </p>
        </div>

        <button
          onClick={handleAutoScheduleAI}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all"
        >
          <Zap className="w-4 h-4" />
          Auto-Schedule Study Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Event Form (1 Col) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="font-extrabold text-slate-900 text-sm">Add Event or Deadline</h2>

          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Event Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. DBMS Midterm Exam Revision"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Time</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
                >
                  <option value="study">Study Session</option>
                  <option value="class">Class</option>
                  <option value="exam">Exam</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1 mt-2"
            >
              <Plus className="w-4 h-4" /> Add To Calendar
            </button>
          </form>
        </div>

        {/* Schedule List (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" /> Planned Events for Today ({todayStr})
          </h2>

          <div className="space-y-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 font-bold text-xs flex flex-col items-center justify-center shadow-xs">
                    <span>{evt.time}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-white border text-blue-600">
                      {evt.category}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">{evt.title}</h3>
                    <p className="text-xs text-slate-500">{evt.durationMinutes} Minutes Planned</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const updated = events.filter((e) => e.id !== evt.id);
                    setEvents(updated);
                    onDeleteEvent(evt.id);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-slate-200/60 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
