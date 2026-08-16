import React from 'react';
import { Target } from 'lucide-react';
import { GOALS_DATA } from '../data/mockSupabaseData';

export const GoalsOKRTracking: React.FC = () => {
  return (
    <section id="goals-okr-tracking-section" className="space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Target className="w-4 h-4 text-indigo-400" />
            <span>Executive Goals &amp; OKR Target Tracker</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Quarterly performance milestones tracking migration from pre-launch baseline to current status and target benchmarks.
          </p>
        </div>
        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Q3 2026 CX Strategic Scorecard
        </span>
      </div>

      {/* 5 OKR Metric Bento Cards */}
      <div className="space-y-3">
        {GOALS_DATA.map((goal) => {
          const totalDistance = Math.abs(goal.target - goal.baseline);
          const achievedDistance = Math.abs(goal.current - goal.baseline);
          const progressPct = Math.min(100, Math.max(0, Math.round((achievedDistance / totalDistance) * 100)));

          return (
            <div
              key={goal.goal}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {goal.goal}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">{goal.category} OKR Objective</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      goal.status === 'On Track'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : goal.status === 'Near Goal'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {goal.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {progressPct}% Achieved
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden flex">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* 3 Value Markers: Baseline → Current → Target */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center bg-slate-950 p-3 rounded-xl text-xs border border-slate-800 font-mono">
                <div>
                  <span className="text-[9px] uppercase font-semibold text-slate-500 block mb-0.5 tracking-wider">
                    Pre-Launch Baseline
                  </span>
                  <span className="font-semibold text-slate-400">
                    {goal.baseline}
                    {goal.unit}
                  </span>
                </div>

                <div className="border-x border-slate-800">
                  <span className="text-[9px] uppercase font-semibold text-indigo-400 block mb-0.5 tracking-wider">
                    Current Live Status
                  </span>
                  <span className="text-sm font-bold text-white">
                    {goal.current}
                    {goal.unit}
                  </span>
                </div>

                <div>
                  <span className="text-[9px] uppercase font-semibold text-emerald-400 block mb-0.5 tracking-wider">
                    Target Benchmark
                  </span>
                  <span className="font-bold text-emerald-400">
                    {goal.target}
                    {goal.unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
