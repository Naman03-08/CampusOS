import React from 'react';
import { Bell, Check, Trash2, X, AlertCircle, Info, Calendar, Flame } from 'lucide-react';
import { AppNotification } from '../../types';

interface NotificationsDrawerProps {
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  notifications,
  onMarkRead,
  onClearAll,
}) => {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <h2 className="font-extrabold text-slate-900 text-sm">Notifications & Reminders</h2>
        </div>

        <button
          onClick={onClearAll}
          className="text-xs font-bold text-slate-400 hover:text-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => onMarkRead(n.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
              n.read ? 'bg-slate-50 border-slate-200/80 opacity-70' : 'bg-blue-50/70 border-blue-200 font-semibold'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                {n.type === 'streak' && <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />}
                {n.type === 'alert' && <AlertCircle className="w-4 h-4 text-red-500" />}
                {n.type === 'schedule' && <Calendar className="w-4 h-4 text-blue-600" />}
                {n.type === 'study' && <Bell className="w-4 h-4 text-indigo-600" />}
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900">{n.title}</p>
                <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
              </div>
            </div>

            {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></span>}
          </div>
        ))}
      </div>
    </div>
  );
};
