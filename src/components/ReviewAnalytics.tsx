import React from 'react';
import { Star, AlertCircle } from 'lucide-react';
import { ReviewRecord } from '../types';

interface ReviewAnalyticsProps {
  reviews: ReviewRecord[];
}

export const ReviewAnalytics: React.FC<ReviewAnalyticsProps> = () => {
  const ratingBuckets = [
    { stars: 5, count: 4732, pct: 38, color: 'bg-emerald-500' },
    { stars: 4, count: 2988, pct: 24, color: 'bg-teal-500' },
    { stars: 3, count: 1245, pct: 10, color: 'bg-amber-400' },
    { stars: 2, count: 1245, pct: 10, color: 'bg-orange-500' },
    { stars: 1, count: 2240, pct: 18, color: 'bg-rose-500' },
  ];

  const oneStarThemes = [
    { theme: 'Unwanted Substitution', pct: 42, color: 'bg-rose-500' },
    { theme: 'Incorrect Price / Extra Billing', pct: 25, color: 'bg-amber-500' },
    { theme: 'Poor Product Quality', pct: 17, color: 'bg-orange-500' },
    { theme: 'Delivery & Bag Delay', pct: 9, color: 'bg-blue-500' },
    { theme: 'Other', pct: 7, color: 'bg-slate-500' },
  ];

  return (
    <section id="review-analytics-section" className="space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Customer Review &amp; Star Rating Analytics</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Star rating distribution, temporal trajectory, and direct causal linkage with feedback themes.
          </p>
        </div>
      </div>

      {/* Overview Bento Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
          <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">Total Reviews</span>
          <div className="text-xl font-bold text-white mt-1">12,450</div>
          <div className="text-[11px] text-slate-500 font-mono">Public &amp; In-app</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
          <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">Average Rating</span>
          <div className="text-xl font-bold text-amber-400 mt-1 flex items-center space-x-1 font-mono">
            <span>3.82</span>
            <span className="text-xs text-slate-500 font-normal">/ 5.0 ★</span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">Benchmark: 4.20 ★</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
          <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">1-Star Reviews</span>
          <div className="text-xl font-bold text-rose-400 mt-1 font-mono">2,240</div>
          <div className="text-[11px] text-rose-400 font-mono">18.0% of total</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
          <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">Sentiment Score</span>
          <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">+0.44</div>
          <div className="text-[11px] text-slate-500 font-mono">Scale (-1.0 to +1.0)</div>
        </div>
      </div>

      {/* Star Distribution and 1-Star Theme Connection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Star Distribution */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-3.5">
          <h4 className="text-sm font-bold text-white">
            1 to 5 Star Rating Breakdown
          </h4>
          <div className="space-y-2.5">
            {ratingBuckets.map((b) => (
              <div key={b.stars} className="flex items-center space-x-3 text-xs font-mono">
                <div className="w-12 font-semibold text-slate-300 flex items-center space-x-1">
                  <span>{b.stars}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                </div>
                <div className="flex-1 h-2 rounded-full bg-slate-950 overflow-hidden flex">
                  <div
                    className={`h-full ${b.color} rounded-full transition-all duration-500`}
                    style={{ width: `${b.pct * 2}%` }}
                  />
                </div>
                <div className="w-24 text-right font-medium text-slate-400 text-[11px]">
                  {b.count.toLocaleString()} ({b.pct}%)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Review Themes Connected with 1-Star Ratings */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>1-Star Review Theme Anatomy</span>
            </h4>
            <span className="text-xs text-rose-400 font-mono">
              2,240 Reviews
            </span>
          </div>

          <p className="text-xs text-slate-400">
            What drove customers to leave 1-star ratings? <strong className="text-slate-200">67% of 1-star reviews</strong> stem directly from unwanted substitutions and unexpected price surges.
          </p>

          <div className="space-y-2.5 pt-1">
            {oneStarThemes.map((item) => (
              <div key={item.theme} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-sans text-xs">{item.theme}</span>
                  <span className="text-rose-400 font-bold">{item.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden flex">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.pct * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
