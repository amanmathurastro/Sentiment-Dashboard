import React, { useState } from 'react';
import {
  Flame,
  Building2,
  Check,
} from 'lucide-react';
import { EmergingAlert } from '../types';
import { INITIAL_ALERTS } from '../data/mockSupabaseData';

export const IssueAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<EmergingAlert[]>(INITIAL_ALERTS);
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleUpdateStatus = (id: string, newStatus: EmergingAlert['status']) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const filteredAlerts = alerts.filter(
    (a) => selectedType === 'all' || a.type === selectedType
  );

  const alertTypes = [
    'all',
    'Sentiment Spike',
    'Ticket Spike',
    'Rating Drop',
    'Rejection Spike',
    'Refund Spike',
    'New Emerging Theme',
  ];

  return (
    <section id="issue-alerts-section" className="space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Automated Issue Detection &amp; Emerging Anomaly Alerts</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time heuristic monitor triggering immediate alerts when sentiment, rejection, or refund deltas exceed safety thresholds.
          </p>
        </div>
      </div>

      {/* Alert Filter Pills Bento */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar bg-slate-900/50 border border-slate-800 p-1.5 rounded-2xl text-xs">
        {alertTypes.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1.5 rounded-xl capitalize font-medium whitespace-nowrap transition text-xs font-mono ${
              selectedType === t
                ? 'bg-rose-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {t === 'all' ? 'All Categories (4)' : t}
          </button>
        ))}
      </div>

      {/* Alerts Cards Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3.5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${
                        alert.severity === 'CRITICAL'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : alert.severity === 'HIGH'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}
                    >
                      {alert.severity} SEVERITY
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {alert.type} • {alert.timestamp}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">
                    {alert.title}
                  </h4>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shrink-0 ${
                    alert.status === 'resolved'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : alert.status === 'investigating'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse'
                  }`}
                >
                  {alert.status}
                </span>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center font-mono">
                <div>
                  <span className="text-[9px] uppercase font-semibold text-slate-500">Negative Sent</span>
                  <div className="text-xs font-bold text-rose-400">
                    +{alert.negativeSentimentDeltaPct}%
                  </div>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-semibold text-slate-500">Tickets</span>
                  <div className="text-xs font-bold text-amber-400">
                    +{alert.ticketVolumeDeltaPct}%
                  </div>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-semibold text-slate-500">Rejection</span>
                  <div className="text-xs font-bold text-indigo-400">
                    {alert.rejectionRatePct}%
                  </div>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-semibold text-slate-500">Price Delta</span>
                  <div className="text-xs font-bold text-rose-400">
                    +₹{alert.avgPriceDeltaINR}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {alert.description}
              </p>

              {/* Recommended Action */}
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs">
                <span className="font-bold text-indigo-300 block mb-0.5">
                  Recommended Action:
                </span>
                <p className="text-slate-300 leading-snug">
                  {alert.recommendedAction}
                </p>
              </div>
            </div>

            {/* Dark Stores Affected & Action Buttons */}
            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Hubs: {alert.darkStoresAffected.join(', ')}</span>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-center">
                {alert.status !== 'investigating' && alert.status !== 'resolved' && (
                  <button
                    onClick={() => handleUpdateStatus(alert.id, 'investigating')}
                    className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold transition"
                  >
                    Investigate Hub
                  </button>
                )}
                {alert.status !== 'resolved' ? (
                  <button
                    onClick={() => handleUpdateStatus(alert.id, 'resolved')}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition"
                  >
                    Mark Resolved
                  </button>
                ) : (
                  <span className="text-emerald-400 text-xs font-bold flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Resolved</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
