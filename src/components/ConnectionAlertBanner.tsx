import React from 'react';
import { AlertOctagon, RefreshCw, FileCode, CheckCircle2 } from 'lucide-react';
import { SupabaseConfig } from '../types';

interface ConnectionAlertBannerProps {
  config: SupabaseConfig;
  onManualRefresh: () => void;
  isRefreshing: boolean;
  onResolveSimulation: () => void;
  onFetchMockupFallback?: () => void;
}

export const ConnectionAlertBanner: React.FC<ConnectionAlertBannerProps> = ({
  config,
  onManualRefresh,
  isRefreshing,
  onResolveSimulation,
  onFetchMockupFallback,
}) => {
  if (config.isConnected && !config.connectionError && !config.simulateFailure && !config.isFallbackActive) {
    return null;
  }

  return (
    <div
      id="connection-failure-alert-banner"
      className="bg-amber-950/90 border-b border-amber-800 text-white px-4 py-2.5 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-amber-900/70 border border-amber-700/60 rounded-xl shrink-0">
            <AlertOctagon className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-xs font-bold text-white">
                Supabase Unavailable • Fallback Mockup Data Active
              </h4>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-amber-900/80 text-amber-300 rounded border border-amber-700">
                FALLBACK: MOCKUP FILE DATASET
              </span>
              <span className="inline-flex items-center text-[10px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Data Loaded from mockSupabaseData.ts
              </span>
            </div>
            <p className="text-[11px] text-amber-200/90 mt-0.5">
              {config.connectionError ||
                'Supabase query failed or is disconnected. The system has automatically loaded baseline records from the mockup file (mockSupabaseData.ts) as a fallback.'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
          {onFetchMockupFallback && (
            <button
              id="reload-mockup-fallback-button"
              onClick={onFetchMockupFallback}
              className="flex items-center space-x-1 px-2.5 py-1 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-mono rounded-xl border border-slate-700 transition"
              title="Reload baseline records from mockSupabaseData.ts"
            >
              <FileCode className="w-3 h-3 text-indigo-400" />
              <span>Reload Mockup File</span>
            </button>
          )}

          {config.simulateFailure && (
            <button
              id="resolve-simulated-error-button"
              onClick={onResolveSimulation}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono rounded-xl border border-slate-700 transition"
            >
              Turn Off Simulation
            </button>
          )}

          <button
            id="banner-manual-retry-button"
            onClick={onManualRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-mono font-bold shadow transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Retrying Supabase...' : 'Retry Supabase'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
