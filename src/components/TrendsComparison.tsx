import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { COMPARISON_MODES } from '../data/mockSupabaseData';
import { TimeframeComparison } from '../types';

export const TrendsComparison: React.FC = () => {
  const [activePreset, setActivePreset] = useState<TimeframeComparison>('before_launch_vs_after_launch');

  const selectedData = COMPARISON_MODES[activePreset];

  const presets = [
    { id: 'today_vs_yesterday', label: 'Today vs Yesterday' },
    { id: 'last_7d_vs_prev_7d', label: 'Last 7 Days vs Prev 7 Days' },
    { id: 'last_30d_vs_prev_30d', label: 'Last 30 Days vs Prev 30 Days' },
    { id: 'before_launch_vs_after_launch', label: 'Before Launch vs After Launch' },
  ];

  return (
    <section id="trends-comparison-section" className="space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Temporal Trends &amp; Feature Launch Comparison</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Macro-level impact assessment evaluating performance shifts before and after the automated substitution rollout.
          </p>
        </div>
      </div>

      {/* Preset Switcher Bento */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar bg-slate-900/50 border border-slate-800 p-1.5 rounded-2xl text-xs">
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePreset(p.id as TimeframeComparison)}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition ${
              activePreset === p.id
                ? 'bg-indigo-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Comparative Bento Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {selectedData.metrics.map((m) => (
          <div
            key={m.metric}
            className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                {m.metric}
              </span>
              <span
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold flex items-center space-x-0.5 ${
                  m.sentimentImpact === 'positive'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {m.sentimentImpact === 'positive' ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                <span>{m.delta}</span>
              </span>
            </div>

            {/* Before vs After comparison numbers */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-center bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono">
              <div>
                <span className="text-[9px] uppercase font-semibold text-slate-500 block mb-0.5">
                  Baseline / Before
                </span>
                <span className="text-sm font-bold text-slate-400">
                  {m.before}
                </span>
              </div>
              <div className="border-l border-slate-800">
                <span className="text-[9px] uppercase font-semibold text-indigo-400 block mb-0.5">
                  Current / After
                </span>
                <span className="text-sm font-bold text-white">
                  {m.after}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
