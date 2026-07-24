export function getFormattedDateStr(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface StreakInfo {
  streak: number;
  isAtRisk: boolean;
  completedToday: boolean;
  lastActivityDate?: string;
}

export class StreakService {
  private static STORAGE_KEY = 'campus_os_user_streak';

  static getStreakData(): { streak: number; lastActivityDate?: string } {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error("Error reading streak data:", e);
    }
    return { streak: 0, lastActivityDate: undefined };
  }

  static saveStreakData(data: { streak: number; lastActivityDate?: string }) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving streak data:", e);
    }
  }

  static getStreakInfo(): StreakInfo {
    return this.evaluateStreak();
  }

  static evaluateStreak(): StreakInfo {
    const data = this.getStreakData();
    const today = getFormattedDateStr();

    if (!data.lastActivityDate || data.streak <= 0) {
      return { streak: 0, isAtRisk: false, completedToday: false, lastActivityDate: undefined };
    }

    const todayDate = new Date(today);
    const lastDate = new Date(data.lastActivityDate);
    
    // Difference in calendar days
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

    if (diffDays <= 0) {
      // Activity completed today
      return {
        streak: data.streak,
        isAtRisk: false,
        completedToday: true,
        lastActivityDate: data.lastActivityDate
      };
    } else if (diffDays === 1) {
      // Activity done yesterday, but none completed today -> STREAK IS AT RISK!
      return {
        streak: data.streak,
        isAtRisk: true,
        completedToday: false,
        lastActivityDate: data.lastActivityDate
      };
    } else {
      // Missed 1 full day or more -> Streak broken! Reset to 0
      const resetData = { streak: 0, lastActivityDate: undefined };
      this.saveStreakData(resetData);
      return {
        streak: 0,
        isAtRisk: false,
        completedToday: false,
        lastActivityDate: undefined
      };
    }
  }

  // Call this whenever user completes ANY qualifying task / activity
  static recordActivity(): StreakInfo {
    const currentInfo = this.evaluateStreak();
    const today = getFormattedDateStr();

    if (currentInfo.completedToday) {
      // Already completed an activity today, streak stays at current level
      return currentInfo;
    }

    let newStreak = 1;
    if (currentInfo.lastActivityDate) {
      const todayDate = new Date(today);
      const lastDate = new Date(currentInfo.lastActivityDate);
      const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        // Continuous daily streak!
        newStreak = currentInfo.streak + 1;
      } else {
        // Fresh start after streak break
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    const newData = {
      streak: newStreak,
      lastActivityDate: today
    };

    this.saveStreakData(newData);

    return {
      streak: newStreak,
      isAtRisk: false,
      completedToday: true,
      lastActivityDate: today
    };
  }

  // Helper for testing/dev: simulate missing a day to trigger risk state
  static setSimulatedLastActivity(daysAgo: number) {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const dateStr = getFormattedDateStr(d);
    const currentData = this.getStreakData();
    this.saveStreakData({
      streak: currentData.streak || 1,
      lastActivityDate: dateStr
    });
  }
}
