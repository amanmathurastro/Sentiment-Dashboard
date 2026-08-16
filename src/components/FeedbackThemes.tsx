import React from 'react';
import { Sparkles } from 'lucide-react';

interface FeedbackThemesProps {
  onSelectTheme: (theme: string) => void;
  selectedTheme: string;
}

export const FeedbackThemes: React.FC<FeedbackThemesProps> = ({
  onSelectTheme,
  selectedTheme,
}) => {
  const themesList = [
    {
      name: 'Unexpected Price',
      pct: 32,
      volume: 8350,
      negRatio: 78,
      trend: '+14% this week',
      description:
        'Customer surprised by replacement price delta, markup discrepancy, or unclear mobile checkout price banner.',
    },
    {
      name: 'Unwanted Substitute',
      pct: 27,
      volume: 7040,
      negRatio: 72,
      trend: '+9% this week',
      description:
        'System picked alternative flavor, premium organic brand, or unwanted size when user desired standard staple.',
    },
    {
      name: 'Wrong Product',
      pct: 16,
      volume: 4170,
      negRatio: 68,
      trend: '-2% this week',
      description:
        'Dark store picker packed incorrect SKU or different category item without customer confirmation.',
    },
    {
      name: 'Refund Issue',
      pct: 11,
      volume: 2870,
      negRatio: 82,
      trend: '+4% this week',
      description:
        'Delay in bank UPI refund webhook or confusion over promotional discount clawback upon partial item refund.',
    },
    {
      name: 'Poor UX',
      pct: 8,
      volume: 2090,
      negRatio: 61,
      trend: '+6% this week',
      description:
        '45-second substitution timer expiration, small font hierarchy for price delta, or push notification missed.',
    },
    {
      name: 'Other',
      pct: 6,
      volume: 1570,
      negRatio: 45,
      trend: '-1% this week',
      description:
        'Packaging damage, delivery bag hygiene, and rider communication queries unrelated to substitution.',
    },
  ];

  return (
    <section id="feedback-themes-section" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>AI Automated Feedback Themes</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Natural language clustering categorizing 26,090 customer reviews and tickets into actionable thematic buckets.
          </p>
        </div>
        <div className="text-[11px] text-slate-400 font-mono">
          Click any theme card to isolate root-cause diagnostics
        </div>
      </div>

      {/* Themes Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themesList.map((theme) => {
          const isSelected = selectedTheme === theme.name;
          return (
            <div
              key={theme.name}
              onClick={() => onSelectTheme(isSelected ? '' : theme.name)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/30 shadow-lg'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                      Theme Cluster
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">
                      {theme.name}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-indigo-400 tracking-tight font-mono">
                      {theme.pct}%
                    </span>
                    <div className="text-[10px] text-slate-500 font-mono">{theme.volume.toLocaleString()} msgs</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${theme.pct * 2.8}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {theme.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-[11px] font-semibold text-rose-400">
                  {theme.negRatio}% Neg Ratio
                </span>
                <span className="text-[10px] text-slate-400">
                  {theme.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
