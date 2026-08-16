import React, { useState } from 'react';
import {
  Smile,
  Meh,
  Frown,
  TrendingUp,
  Filter,
  RotateCcw,
} from 'lucide-react';
import { FilterState, SentimentType, FeedbackSource, SubstitutionStatus } from '../types';
import { CITIES, DARK_STORES, CATEGORIES } from '../data/mockSupabaseData';

interface SentimentDashboardProps {
  filters: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

export const SentimentDashboard: React.FC<SentimentDashboardProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const [trendGranularity, setTrendGranularity] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  // Trend data points
  const trendData = {
    daily: [
      { date: 'Mon 10 Aug', positive: 64, neutral: 20, negative: 16 },
      { date: 'Tue 11 Aug', positive: 61, neutral: 21, negative: 18 },
      { date: 'Wed 12 Aug', positive: 58, neutral: 22, negative: 20 },
      { date: 'Thu 13 Aug', positive: 55, neutral: 20, negative: 25 },
      { date: 'Fri 14 Aug', positive: 52, neutral: 19, negative: 29 },
      { date: 'Sat 15 Aug', positive: 50, neutral: 18, negative: 32 },
      { date: 'Sun 16 Aug', positive: 54, neutral: 21, negative: 25 },
    ],
    weekly: [
      { date: 'Week 29 (Jul)', positive: 68, neutral: 19, negative: 13 },
      { date: 'Week 30 (Jul)', positive: 65, neutral: 21, negative: 14 },
      { date: 'Week 31 (Aug)', positive: 62, neutral: 22, negative: 16 },
      { date: 'Week 32 (Aug)', positive: 56, neutral: 20, negative: 24 },
      { date: 'Week 33 (Current)', positive: 54, neutral: 21, negative: 25 },
    ],
    monthly: [
      { date: 'May 2026', positive: 70, neutral: 18, negative: 12 },
      { date: 'Jun 2026', positive: 67, neutral: 19, negative: 14 },
      { date: 'Jul 2026', positive: 63, neutral: 21, negative: 16 },
      { date: 'Aug 2026 (MTD)', positive: 56, neutral: 21, negative: 23 },
    ],
  };

  const currentTrend = trendData[trendGranularity];

  const sourceSentiment = [
    { source: '⭐ App Reviews', pos: 62, neu: 20, neg: 18, count: '12,450' },
    { source: '🎧 Support Tickets', pos: 41, neu: 28, neg: 31, count: '8,230' },
    { source: '📝 CSAT Surveys', pos: 55, neu: 23, neg: 22, count: '5,420' },
  ];

  return (
    <section id="sentiment-dashboard-section" className="space-y-4">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <span>Customer Sentiment Intelligence</span>
            <span className="text-[10px] font-semibold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              56% Net Positive
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-channel sentiment analysis, temporal trends, and granular multidimensional slicing.
          </p>
        </div>
      </div>

      {/* Multidimensional Filters Bento Bar */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span>Multidimensional Dashboard Filters</span>
          </div>
          <button
            onClick={onResetFilters}
            className="flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          {/* Source Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Source Stream
            </label>
            <select
              value={filters.source}
              onChange={(e) => onFilterChange({ source: e.target.value as any })}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Sources (26.1K)</option>
              <option value="reviews">⭐ App Reviews</option>
              <option value="support">🎧 Support Tickets</option>
              <option value="surveys">📝 CSAT Surveys</option>
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              City Region
            </label>
            <select
              value={filters.city}
              onChange={(e) => onFilterChange({ city: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Cities</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Dark Store Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Dark Store Hub
            </label>
            <select
              value={filters.darkStore}
              onChange={(e) => onFilterChange({ darkStore: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Dark Stores</option>
              {DARK_STORES.map((ds) => (
                <option key={ds} value={ds}>
                  {ds}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Item Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Substitution Status Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Substitution State
            </label>
            <select
              value={filters.substitutionStatus}
              onChange={(e) => onFilterChange({ substitutionStatus: e.target.value as any })}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All States</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Alternative Selected">Alternative Selected</option>
              <option value="Auto-Refunded">Auto-Refunded</option>
              <option value="Timeout">Timeout Fallback</option>
            </select>
          </div>

          {/* Sentiment Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Sentiment Slicing
            </label>
            <select
              value={filters.sentiment}
              onChange={(e) => onFilterChange({ sentiment: e.target.value as any })}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive (56%)</option>
              <option value="neutral">Neutral (21%)</option>
              <option value="negative">Negative (23%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bento Grid: 3 Sentiment Buckets & Sentiment By Source */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Overall Distribution Breakdown Bento (Col 5) */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Overall Sentiment Distribution
            </h4>
            <span className="text-[11px] text-slate-500 font-mono">26,090 total</span>
          </div>

          {/* Segmented Bar */}
          <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-slate-950 border border-slate-800">
            <div
              className="h-full bg-emerald-500"
              style={{ width: '56%' }}
              title="Positive: 56%"
            />
            <div
              className="h-full bg-amber-400"
              style={{ width: '21%' }}
              title="Neutral: 21%"
            />
            <div
              className="h-full bg-rose-500"
              style={{ width: '23%' }}
              title="Negative: 23%"
            />
          </div>

          {/* Metric Bento Sub-Tiles */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <div className="flex items-center justify-center space-x-1 text-emerald-400 mb-1">
                <Smile className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold">Positive</span>
              </div>
              <div className="text-lg font-bold text-white">56%</div>
              <div className="text-[10px] text-slate-400">14.6K items</div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
              <div className="flex items-center justify-center space-x-1 text-amber-400 mb-1">
                <Meh className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold">Neutral</span>
              </div>
              <div className="text-lg font-bold text-white">21%</div>
              <div className="text-[10px] text-slate-400">5.5K items</div>
            </div>

            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
              <div className="flex items-center justify-center space-x-1 text-rose-400 mb-1">
                <Frown className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold">Negative</span>
              </div>
              <div className="text-lg font-bold text-white">23%</div>
              <div className="text-[10px] text-slate-400">6.0K items</div>
            </div>
          </div>
        </div>

        {/* Sentiment by Source Bento (Col 7) */}
        <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Sentiment by Source Channel
            </h4>
            <span className="text-[10px] text-slate-400 font-medium font-mono">Cross-channel</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="py-2 px-3 rounded-l-lg">Source</th>
                  <th className="py-2 px-3">Positive</th>
                  <th className="py-2 px-3">Neutral</th>
                  <th className="py-2 px-3">Negative</th>
                  <th className="py-2 px-3 rounded-r-lg">Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {sourceSentiment.map((s) => (
                  <tr key={s.source} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-semibold text-white">
                      {s.source}
                      <span className="block text-[10px] text-slate-500 font-normal">
                        {s.count} total
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-400">
                      {s.pos}%
                    </td>
                    <td className="py-3 px-3 font-bold text-amber-400">
                      {s.neu}%
                    </td>
                    <td className="py-3 px-3 font-bold text-rose-400">
                      {s.neg}%
                    </td>
                    <td className="py-3 px-3 w-40">
                      <div className="h-2 rounded-full overflow-hidden flex bg-slate-950">
                        <div className="bg-emerald-500" style={{ width: `${s.pos}%` }} />
                        <div className="bg-amber-400" style={{ width: `${s.neu}%` }} />
                        <div className="bg-rose-500" style={{ width: `${s.neg}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sentiment Trend Bento Card */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>Sentiment Trend Progression</span>
            </h4>
            <p className="text-xs text-slate-400">
              Tracking negative spike emergence following recent substitution feature rollout.
            </p>
          </div>

          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['daily', 'weekly', 'monthly'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setTrendGranularity(g)}
                className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                  trendGranularity === g
                    ? 'bg-indigo-600 text-white shadow font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Chart Bars */}
        <div className="space-y-3 pt-2">
          {currentTrend.map((row) => (
            <div key={row.date} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-300 font-mono text-[11px]">{row.date}</span>
                <div className="flex items-center space-x-3 text-[11px] font-mono">
                  <span className="text-emerald-400">Pos: {row.positive}%</span>
                  <span className="text-amber-400">Neu: {row.neutral}%</span>
                  <span className="text-rose-400 font-bold">Neg: {row.negative}%</span>
                </div>
              </div>
              <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-slate-950">
                <div className="h-full bg-emerald-500" style={{ width: `${row.positive}%` }} />
                <div className="h-full bg-amber-400" style={{ width: `${row.neutral}%` }} />
                <div className="h-full bg-rose-500" style={{ width: `${row.negative}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
