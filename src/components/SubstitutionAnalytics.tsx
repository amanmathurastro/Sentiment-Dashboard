import React from 'react';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  ShoppingBag,
  Layers,
} from 'lucide-react';

export const SubstitutionAnalytics: React.FC = () => {
  const funnelSteps = [
    {
      step: '1. OOS Item Detected',
      count: '42,800',
      pct: 100,
      dropoff: '8% inventory unmatchable',
      color: 'bg-slate-600 text-white',
    },
    {
      step: '2. Substitution Offered',
      count: '39,376',
      pct: 92,
      dropoff: '14% missed push notification',
      color: 'bg-indigo-500 text-white',
    },
    {
      step: '3. User Viewed Prompt',
      count: '33,384',
      pct: 78,
      dropoff: 'User decision point',
      color: 'bg-blue-500 text-white',
    },
    {
      step: '4. User Accepted',
      count: '18,832',
      pct: 44,
      dropoff: '34% Rejected',
      color: 'bg-emerald-500 text-white',
    },
    {
      step: '5. Alternative Selected',
      count: '5,992',
      pct: 14,
      dropoff: 'Custom item chosen from catalog',
      color: 'bg-amber-500 text-white',
    },
    {
      step: '6. Auto-Refunded / Fallback',
      count: '3,424',
      pct: 8,
      dropoff: 'Disbursed to wallet/bank',
      color: 'bg-purple-500 text-white',
    },
  ];

  const coreRates = [
    {
      title: 'Acceptance Rate',
      value: '44.0%',
      target: 'Target ≥ 48%',
      trend: '+2.1% WoW',
      status: 'improving',
      icon: CheckCircle2,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Rejection Rate',
      value: '34.0%',
      target: 'Target ≤ 30%',
      trend: '-1.4% WoW',
      status: 'warning',
      icon: XCircle,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      title: 'Alternative Pick',
      value: '14.0%',
      target: 'Catalog Self-Service',
      trend: '+4.5% WoW',
      status: 'healthy',
      icon: RefreshCw,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Auto-Refund Rate',
      value: '8.0%',
      target: 'Clean Instant Refund',
      trend: 'Stable',
      status: 'healthy',
      icon: RotateCcw,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Auto-Fallback',
      value: '12.0%',
      target: 'Store Rule Triggered',
      trend: '+1.8%',
      status: 'neutral',
      icon: Layers,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Timeout Rate',
      value: '6.0%',
      target: 'Target ≤ 4%',
      trend: '+0.8% (45s window)',
      status: 'warning',
      icon: Clock,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <section id="substitution-analytics-section" className="space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <RotateCcw className="w-4 h-4 text-indigo-400" />
            <span>Substitution Engine Analytics &amp; Conversion Funnel</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Full lifecycle telemetry from Out-Of-Stock item trigger to acceptance, rejection, alternative picks, and refunds.
          </p>
        </div>
      </div>

      {/* 6 Core Metric Bento Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {coreRates.map((rate) => {
          const Icon = rate.icon;
          return (
            <div
              key={rate.title}
              className={`p-3.5 rounded-2xl border flex flex-col justify-between ${rate.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{rate.title}</span>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="my-2">
                <div className="text-xl font-bold font-mono">{rate.value}</div>
                <div className="text-[10px] opacity-80 font-mono">{rate.target}</div>
              </div>
              <div className="text-[10px] font-medium opacity-90 font-mono">{rate.trend}</div>
            </div>
          );
        })}
      </div>

      {/* Visual Substitution Funnel Bento Card */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
            <span>End-to-End Substitution Conversion Funnel</span>
          </h4>
          <span className="text-xs text-slate-500 font-mono">42,800 OOS Instances</span>
        </div>

        <div className="space-y-3 pt-1">
          {funnelSteps.map((step) => (
            <div key={step.step} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-sans text-xs">
                  {step.step}
                </span>
                <div className="flex items-center space-x-3">
                  <span className="text-slate-500 text-[10px]">
                    {step.dropoff}
                  </span>
                  <span className="font-bold text-white">
                    {step.count} ({step.pct}%)
                  </span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden flex">
                <div
                  className={`h-full ${step.color} transition-all duration-500 rounded-full`}
                  style={{ width: `${step.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
