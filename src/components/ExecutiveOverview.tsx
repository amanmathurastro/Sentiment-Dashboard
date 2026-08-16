import React from 'react';
import {
  MessageSquare,
  Star,
  Headphones,
  TrendingDown,
  TrendingUp,
  Percent,
  XCircle,
  IndianRupee,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { KPISummary, TimeframeComparison } from '../types';

interface ExecutiveOverviewProps {
  summary: KPISummary;
  timeframe: TimeframeComparison;
  setTimeframe: (t: TimeframeComparison) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  summary,
  timeframe,
  setTimeframe,
}) => {
  // Comparative calculations based on timeframe
  const getDeltas = () => {
    switch (timeframe) {
      case 'today_vs_yesterday':
        return {
          feedbackDelta: '+4.2%',
          feedbackPositive: true,
          negativeDelta: '+1.8%',
          negativeDeltaDirection: 'bad',
          ratingDelta: '+0.04 ★',
          ratingPositive: true,
          rejectionDelta: '+0.8%',
          rejectionWarning: false,
          cancelDelta: '-0.1%',
          refundDelta: '+₹12,400',
          resTimeDelta: '-1.2m',
          subtext: 'vs. Yesterday',
        };
      case 'last_7d_vs_prev_7d':
        return {
          feedbackDelta: '+8.6%',
          feedbackPositive: true,
          negativeDelta: '+8.2%',
          negativeDeltaDirection: 'bad',
          ratingDelta: '-0.12 ★',
          ratingPositive: false,
          rejectionDelta: '+3.4%',
          rejectionWarning: true,
          cancelDelta: '+0.1%',
          refundDelta: '+₹48,200',
          resTimeDelta: '-2.4m',
          subtext: 'vs. Prior 7 Days',
        };
      case 'last_30d_vs_prev_30d':
        return {
          feedbackDelta: '+14.1%',
          feedbackPositive: true,
          negativeDelta: '-2.4%',
          negativeDeltaDirection: 'good',
          ratingDelta: '+0.25 ★',
          ratingPositive: true,
          rejectionDelta: '-1.5%',
          rejectionWarning: false,
          cancelDelta: '-0.3%',
          refundDelta: '-₹92,000',
          resTimeDelta: '-4.8m',
          subtext: 'vs. Prior 30 Days',
        };
      case 'before_launch_vs_after_launch':
        return {
          feedbackDelta: '-18.5%',
          feedbackPositive: true,
          negativeDelta: '-12.8%',
          negativeDeltaDirection: 'good',
          ratingDelta: '+0.42 ★',
          ratingPositive: true,
          rejectionDelta: '+6.0%',
          rejectionWarning: true,
          cancelDelta: '+0.1%',
          refundDelta: '-₹3.77L',
          resTimeDelta: '-11.6m',
          subtext: 'vs. Baseline',
        };
    }
  };

  const deltas = getDeltas();

  return (
    <section id="executive-overview-section" className="space-y-4">
      {/* Header & Timeframe Switcher in Bento Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Executive CX Scorecard
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Live Stream
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Multi-channel sentiment and substitution health across Reviews, Support tickets, and In-App flows.
          </p>
        </div>

        {/* Timeframe Comparison Toggle */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'today_vs_yesterday', label: 'Today vs Yesterday' },
            { id: 'last_7d_vs_prev_7d', label: 'Last 7D' },
            { id: 'last_30d_vs_prev_30d', label: 'Last 30D' },
            { id: 'before_launch_vs_after_launch', label: 'Before vs After Launch' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTimeframe(t.id as TimeframeComparison)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                timeframe === t.id
                  ? 'bg-indigo-600 text-white shadow-md font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Bento Row: 4 Essential Hero Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Feedback */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
              Total Feedback
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white tracking-tight">
              {summary.totalFeedback.toLocaleString()}
            </span>
            <span className="text-emerald-400 text-xs font-medium font-mono">
              {deltas.feedbackDelta}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            {deltas.subtext} • 3 source channels
          </p>
        </div>

        {/* 2. Avg App Rating */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
              Avg App Rating
            </span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white tracking-tight">
              {summary.averageRating}
            </span>
            <span
              className={`text-xs font-medium font-mono ${
                deltas.ratingPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {deltas.ratingDelta}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            Benchmark target: &ge; 4.20 ★
          </p>
        </div>

        {/* 3. Sub. Rejection */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
              Sub. Rejection
            </span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <TrendingDown className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white tracking-tight">
              {summary.substitutionRejectionRate}%
            </span>
            <span className="text-amber-400 text-xs font-medium font-mono">
              {deltas.rejectionWarning ? 'Warning' : 'Stable'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            Target &le; 30% • 2.4x on &gt;₹50 delta
          </p>
        </div>

        {/* 4. Resolution Time */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
              Resolution Time
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white tracking-tight">
              {summary.averageResolutionTimeMins}m
            </span>
            <span className="text-emerald-400 text-xs font-medium font-mono">
              {deltas.resTimeDelta}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            SLA Breach: {summary.slaBreachPct}% (Target &lt; 5%)
          </p>
        </div>
      </div>

      {/* Secondary Bento Row: 5 Specialized Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Reviews */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              App Reviews
            </span>
            <Star className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-bold text-white">
              {summary.totalReviews.toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">47.7% of volume</p>
        </div>

        {/* Support Tickets */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Support Tickets
            </span>
            <Headphones className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-bold text-white">
              {summary.totalSupportTickets.toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">OOS contact: {summary.oosSupportContactRate}%</p>
        </div>

        {/* Negative Sentiment % */}
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider">
              Negative Bias
            </span>
            <Percent className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold text-rose-400">
              {summary.negativeFeedbackPct}%
            </span>
            <span className="text-[10px] font-mono font-semibold text-rose-400">
              {deltas.negativeDelta}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Driven by price delta</p>
        </div>

        {/* Order Cancel Rate */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Cancel Rate
            </span>
            <XCircle className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-bold text-white">
              {summary.fullOrderCancellationRate}%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Target &le; 1.1%</p>
        </div>

        {/* Total Refund Amount */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Dispute Refunds
            </span>
            <IndianRupee className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-bold text-white">
              ₹{(summary.totalRefundAmount / 100000).toFixed(2)}L
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Weekly total</p>
        </div>
      </div>
    </section>
  );
};
