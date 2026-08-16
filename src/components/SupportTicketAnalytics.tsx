import React from 'react';
import {
  Headphones,
  Tag,
} from 'lucide-react';
import { SupportTicketRecord } from '../types';

interface SupportTicketAnalyticsProps {
  tickets: SupportTicketRecord[];
}

export const SupportTicketAnalytics: React.FC<SupportTicketAnalyticsProps> = () => {
  const categories = [
    { name: 'Incorrect Billing', pct: 32, count: 2634, color: 'bg-rose-500' },
    { name: 'Unwanted Item', pct: 27, count: 2222, color: 'bg-amber-500' },
    { name: 'Wrong Substitute', pct: 19, count: 1564, color: 'bg-orange-500' },
    { name: 'Refund Issue', pct: 12, count: 988, color: 'bg-purple-500' },
    { name: 'Other Support Queries', pct: 10, count: 822, color: 'bg-slate-500' },
  ];

  return (
    <section id="support-ticket-analytics-section" className="space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Headphones className="w-4 h-4 text-indigo-400" />
            <span>Support Ticket &amp; SLA Analytics</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational service desk telemetry covering OOS dispute resolution, category distribution, and SLA adherence.
          </p>
        </div>
      </div>

      {/* KPI Bento Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
          <span className="text-[10px] font-mono font-semibold uppercase text-slate-400">Total Tickets</span>
          <div className="text-lg font-bold text-white mt-1 font-mono">8,230</div>
          <div className="text-[10px] text-slate-500 font-mono">100% Volume</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
          <span className="text-[10px] font-mono font-semibold uppercase text-slate-400">OOS Related</span>
          <div className="text-lg font-bold text-indigo-400 mt-1 font-mono">5,680</div>
          <div className="text-[10px] text-slate-500 font-mono">69.0% of all</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
          <span className="text-[10px] font-mono font-semibold uppercase text-slate-400">Sub-Related</span>
          <div className="text-lg font-bold text-amber-400 mt-1 font-mono">4,120</div>
          <div className="text-[10px] text-slate-500 font-mono">50.1% of tkts</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
          <span className="text-[10px] font-mono font-semibold uppercase text-slate-400">Avg Resolution</span>
          <div className="text-lg font-bold text-teal-400 mt-1 font-mono">14.8m</div>
          <div className="text-[10px] text-slate-500 font-mono">First Resp: 1.9m</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
          <span className="text-[10px] font-mono font-semibold uppercase text-slate-400">SLA Breach</span>
          <div className="text-lg font-bold text-rose-400 mt-1 font-mono">3.8%</div>
          <div className="text-[10px] text-slate-500 font-mono">Target ≤ 5.0%</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
          <span className="text-[10px] font-mono font-semibold uppercase text-slate-400">Refund Reqs</span>
          <div className="text-lg font-bold text-purple-400 mt-1 font-mono">₹3.43L</div>
          <div className="text-[10px] text-slate-500 font-mono">2,890 reqs</div>
        </div>
      </div>

      {/* Ticket Categories Breakdown Bento Card */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
            <Tag className="w-4 h-4 text-indigo-400" />
            <span>Ticket Category Distribution</span>
          </h4>
          <span className="text-xs text-slate-500 font-mono">8,230 tickets classified</span>
        </div>

        <div className="space-y-2.5">
          {categories.map((cat) => (
            <div key={cat.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-sans text-xs">{cat.name}</span>
                <span className="text-slate-400">
                  {cat.count.toLocaleString()} tickets ({cat.pct}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden flex">
                <div
                  className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                  style={{ width: `${cat.pct * 2.5}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
