import { useState, useEffect } from "react";

function getWeekOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const y = time.getFullYear(), mo = time.getMonth(), d = time.getDate();
  const daysInMonth = getDaysInMonth(y, mo);
  const firstDay = new Date(y, mo, 1).getDay();
  const pct = Math.round((d / daysInMonth) * 100);

  const MONTHS = ["January","February","March","April","May","June",
    "July","August","September","October","November","December"];
  const DAYS_SHORT = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="relative z-10 select-none font-mono max-w-xl w-full">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">

        {/* Clock bar */}
        <div className="flex items-baseline justify-between px-8 pt-6 pb-5 border-b border-zinc-800">
          <div className="flex items-baseline tabular-nums">
            <span className="text-6xl font-bold text-zinc-100 tracking-tight">{pad(time.getHours())}</span>
            <span className="text-6xl font-bold text-emerald-500 mx-1 animate-pulse">:</span>
            <span className="text-6xl font-bold text-zinc-100 tracking-tight">{pad(time.getMinutes())}</span>
            <span className="text-2xl font-semibold text-zinc-600 ml-3 mb-1.5">{pad(time.getSeconds())}</span>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-zinc-500 tracking-widest uppercase">{MONTHS[mo]} {y}</p>
            <p className="text-xs text-zinc-400 tracking-wider mt-0.5">
              {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][time.getDay()]}
            </p>
          </div>
        </div>

        <div className="px-7 pb-6 pt-5">
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_SHORT.map(ds => (
              <div key={ds} className="text-center text-[10px] text-zinc-600 uppercase tracking-wider py-1">{ds}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((day, i) => {
              if (!day) return <div key={`e${i}`} />;
              const isToday = day === d;
              const isPast = day < d;
              const col = (i % 7);
              const isWeekend = col === 0 || col === 6;
              return (
                <div
                  key={day}
                  className={`text-center text-xs py-1.5 rounded-md tabular-nums transition-colors duration-150
                    ${isToday ? "bg-emerald-500 text-black font-semibold" :
                      isPast ? "text-zinc-700" :
                      isWeekend ? "text-zinc-500 hover:bg-zinc-900" :
                      "text-zinc-400 hover:bg-zinc-900 hover:border-zinc-800"}`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-5 pt-4 border-t border-zinc-800">
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-zinc-600 uppercase tracking-widest">Month progress</span>
              <span className="text-emerald-500">{d} / {daysInMonth} days</span>
            </div>
            <div className="h-0.75 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: "Day", value: `#${d}` },
              { label: "Week", value: `W${getWeekOfYear(time)}` },
              { label: "Left", value: `${daysInMonth - d}d` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5">
                <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-xl font-semibold text-zinc-100 tabular-nums">{value}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}