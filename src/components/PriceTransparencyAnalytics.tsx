import React, { useState } from 'react';
import {
  IndianRupee,
  Flame,
} from 'lucide-react';
import { PRICE_DELTA_BUCKETS } from '../data/mockSupabaseData';
import { PriceDeltaBucket } from '../types';

export const PriceTransparencyAnalytics: React.FC = () => {
  const [activeCorrelation, setActiveCorrelation] = useState<
    'rejection' | 'sentiment' | 'tickets' | 'refunds'
  >('rejection');

  const getMetricValue = (bucket: PriceDeltaBucket) => {
    switch (activeCorrelation) {
      case 'rejection':
        return {
          value: `${bucket.rejectionRate}%`,
          raw: bucket.rejectionRate,
          max: 50,
          label: 'Rejection Rate',
          barColor: 'bg-rose-500',
        };
      case 'sentiment':
        return {
          value: `${bucket.negativeSentimentPct}%`,
          raw: bucket.negativeSentimentPct,
          max: 80,
          label: 'Negative Sentiment %',
          barColor: 'bg-amber-500',
        };
      case 'tickets':
        return {
          value: `${bucket.supportTicketsCount} tkts`,
          raw: bucket.supportTicketsCount,
          max: 1300,
          label: 'Support Tickets',
          barColor: 'bg-blue-500',
        };
      case 'refunds':
        return {
          value: `${bucket.refundRequestsCount} reqs`,
          raw: bucket.refundRequestsCount,
          max: 900,
          label: 'Refund Requests',
          barColor: 'bg-purple-500',
        };
    }
  };

  return (
    <section id="price-transparency-section" className="space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <IndianRupee className="w-4 h-4 text-indigo-400" />
            <span>Price Transparency &amp; Delta Sensitivity Analytics</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Correlation analysis measuring the compounding impact of replacement price differences on customer behavior.
          </p>
        </div>
      </div>

      {/* Prominent High-Impact Callout Bento */}
      <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-semibold uppercase tracking-wider font-mono">
              <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>Critical Price Sensitivity Insight</span>
            </div>
            <h4 className="text-lg font-bold text-white tracking-tight">
              &ldquo;Customers receiving substitutions costing ₹50+ more are 2.4× more likely to reject them.&rdquo;
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When replacements carry a price markup &gt; ₹50, customer rejection reaches{' '}
              <strong className="text-rose-400">43.5%</strong> and negative sentiment spikes to{' '}
              <strong className="text-rose-400">68.9%</strong>, generating ₹2.06 Lakhs in weekly refund disputes.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 shrink-0 text-center min-w-[140px] font-mono">
            <span className="text-3xl font-bold text-rose-400">2.4×</span>
            <span className="text-[11px] text-white font-medium">Rejection Surge</span>
            <span className="text-[10px] text-rose-400/80 mt-0.5">at +₹50 Markup</span>
          </div>
        </div>
      </div>

      {/* 4 Correlation Switchers Bento */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar bg-slate-900/50 border border-slate-800 p-1.5 rounded-2xl text-xs">
        {[
          { id: 'rejection', label: '1. Price vs Rejection' },
          { id: 'sentiment', label: '2. Price vs Sentiment' },
          { id: 'tickets', label: '3. Price vs Tickets' },
          { id: 'refunds', label: '4. Price vs Refunds' },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCorrelation(c.id as any)}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition ${
              activeCorrelation === c.id
                ? 'bg-indigo-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Price Delta Buckets Bento Table & Visual Bars */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white">
            Price Delta Buckets Breakdown (7 Tier Analysis)
          </h4>
          <span className="text-xs text-slate-500 font-mono">26,090 transactions</span>
        </div>

        <div className="space-y-2.5 pt-1">
          {PRICE_DELTA_BUCKETS.map((bucket) => {
            const m = getMetricValue(bucket);
            const barWidth = Math.min(100, (m.raw / m.max) * 100);

            return (
              <div
                key={bucket.bucket}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">
                      {bucket.label}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ({bucket.volume.toLocaleString()} orders)
                    </span>
                    {bucket.impactMultiplier >= 2.0 && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        {bucket.impactMultiplier}x Friction
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-[11px]">
                    <span className="text-slate-400">
                      Rejection: <strong className="text-rose-400">{bucket.rejectionRate}%</strong>
                    </span>
                    <span className="text-slate-400">
                      Neg: <strong className="text-amber-400">{bucket.negativeSentimentPct}%</strong>
                    </span>
                    <span className="text-slate-400">
                      Refunds: <strong className="text-slate-300">{bucket.refundRequestsCount} reqs</strong>
                    </span>
                    <span className="font-bold text-indigo-400 text-xs">
                      {m.value}
                    </span>
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden flex">
                  <div
                    className={`h-full ${m.barColor} transition-all duration-500 rounded-full`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
