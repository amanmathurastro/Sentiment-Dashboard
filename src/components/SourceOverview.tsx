import React from 'react';
import { Star, Headphones, FileText, Globe, HelpCircle, AlertCircle, TrendingUp, Compass } from 'lucide-react';

export const SourceOverview: React.FC = () => {
  const sourcesData = [
    {
      source: 'App Store & Play Store',
      icon: Star,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      id: 'reviews',
      volume: '12,450',
      volumePct: 47.7,
      negativePct: '18%',
      positivePct: '62%',
      avgRating: '3.8 ★',
      riskLevel: 'HIGH PUBLIC VISIBILITY',
      riskColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      keyDriver: 'Complaints about unapproved price markups and wrong substitute sizes affect store ratings publicly.',
    },
    {
      source: 'Support Tickets (Chat/Call)',
      icon: Headphones,
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-500/10 border-rose-500/20',
      id: 'support',
      volume: '8,230',
      volumePct: 31.5,
      negativePct: '31%',
      positivePct: '41%',
      avgRating: '—',
      riskLevel: 'HIGHEST DISSATISFACTION',
      riskColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      keyDriver: 'Direct friction: 31% negative sentiment driven by unexpected price deltas (+₹20–50) and UPI refund latency.',
    },
    {
      source: 'Post-Order CSAT Surveys',
      icon: FileText,
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10 border-indigo-500/20',
      id: 'surveys',
      volume: '5,420',
      volumePct: 20.8,
      negativePct: '22%',
      positivePct: '55%',
      avgRating: '—',
      riskLevel: 'ACTIONABLE FEEDBACK',
      riskColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      keyDriver: '45-second substitution timer expires while commuting, causing unwanted auto-fallback items.',
    },
  ];

  return (
    <section id="source-overview-section" className="space-y-4">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <span>Feedback Source Intelligence</span>
            <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700">
              Cross-Channel Matrix
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Differentiate sentiment and volume distribution across customer touchpoints.
          </p>
        </div>
      </div>

      {/* Bento Grid: 1 Strategic Banner + 3 Source Bento Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Key Question Strategic Bento Box (Col 12 on mobile, Col 12 top or Col 5) */}
        <div className="md:col-span-12 p-5 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-slate-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Executive Strategic Question</span>
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">
                &ldquo;Where is customer dissatisfaction coming from?&rdquo;
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Support tickets</strong> carry the highest concentration of dissatisfaction (<strong className="text-rose-400 font-bold">31% negative</strong>),
                primarily triggered by unexpected billing charges for milk and staple substitutions. Simultaneously,{' '}
                <strong className="text-white">18% of App Store reviews</strong> amplify this friction in public forums, depressing the app rating to{' '}
                <strong className="text-amber-400 font-bold">3.8 ★</strong>.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/80 border border-slate-800 shrink-0 text-center min-w-[150px]">
              <span className="text-2xl font-black text-rose-400">31% Neg</span>
              <span className="text-[11px] text-slate-300 font-medium">in Support Channel</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Primary Friction Node</span>
            </div>
          </div>
        </div>

        {/* 3 Source Bento Tiles */}
        {sourcesData.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="md:col-span-4 bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-xl border ${s.iconBg}`}>
                    <Icon className={`w-4 h-4 ${s.iconColor}`} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{s.source}</h5>
                    <span className="text-[10px] text-slate-500 font-mono">{s.volumePct}% share</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${s.riskColor}`}>
                  {s.riskLevel.split(' ')[0]}
                </span>
              </div>

              {/* Volume & Pos/Neg Split */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold text-white tracking-tight">{s.volume}</span>
                  <span className="text-xs font-semibold text-amber-400">{s.avgRating}</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Positive</span>
                    <span className="font-mono font-semibold text-emerald-400">{s.positivePct}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: s.positivePct }} />
                  </div>
                  <div className="flex justify-between text-[11px] pt-1">
                    <span className="text-slate-400">Negative</span>
                    <span className="font-mono font-semibold text-rose-400">{s.negativePct}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: s.negativePct }} />
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 text-[11px] text-slate-400 leading-snug">
                {s.keyDriver}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
