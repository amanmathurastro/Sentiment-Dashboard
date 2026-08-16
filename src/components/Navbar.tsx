import React, { useState, useEffect } from 'react';
import {
  Activity,
  Database,
  RefreshCw,
  AlertTriangle,
  Settings,
  Sparkles,
  Zap,
} from 'lucide-react';
import { SupabaseConfig } from '../types';

interface NavbarProps {
  config: SupabaseConfig;
  onManualRefresh: () => void;
  isRefreshing: boolean;
  onOpenConfig: () => void;
  onToggleFailure: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onManualRefresh,
  isRefreshing,
  onOpenConfig,
  onToggleFailure,
}) => {
  const [countdown, setCountdown] = useState<number>(config.autoRefreshIntervalSeconds);

  useEffect(() => {
    if (config.autoRefreshIntervalSeconds <= 0) return;
    setCountdown(config.autoRefreshIntervalSeconds);

    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? config.autoRefreshIntervalSeconds : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [config.autoRefreshIntervalSeconds, config.lastRefreshedAt]);

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-slate-800/80 text-slate-200 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shadow-inner shadow-indigo-500/20">
              <Activity className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center">
                  Sentiment Board
                  <span className="text-indigo-400 font-mono text-xs ml-2.5 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                    v2.4.0
                  </span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  CX Leadership
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Executive Overview &amp; Insight Engine • Substitution Analytics
              </p>
            </div>
          </div>

          {/* Controls & Database Indicators */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Connection Status Badge */}
            <div
              id="db-connection-status-badge"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-bold tracking-wider uppercase ${
                config.isConnected && !config.simulateFailure && !config.isFallbackActive
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  config.isConnected && !config.simulateFailure && !config.isFallbackActive
                    ? 'bg-emerald-500'
                    : 'bg-amber-500 animate-pulse'
                }`}
              />
              <Database className="w-3.5 h-3.5" />
              <span>
                {config.isConnected && !config.simulateFailure && !config.isFallbackActive
                  ? config.mode === 'live_supabase'
                    ? 'Supabase Live'
                    : 'Supabase Connected'
                  : 'Fallback: Mockup Data'}
              </span>
            </div>

            {/* Auto-Refresh Counter & Manual Refresh Button */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 rounded-xl p-1">
              <button
                id="manual-refresh-button"
                onClick={onManualRefresh}
                disabled={isRefreshing}
                title="Manual data refresh from Supabase"
                className="bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white text-xs px-3.5 py-1.5 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 font-medium disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Syncing...' : 'Manual Refresh'}</span>
              </button>
              <div className="px-2.5 text-[11px] text-slate-400 flex items-center gap-1">
                <span className="text-slate-500 font-medium">Auto:</span>
                <span className="font-mono text-indigo-300 font-bold">{countdown}s</span>
              </div>
            </div>

            {/* Edge Case Simulator Button */}
            <button
              id="toggle-failure-simulation-button"
              onClick={onToggleFailure}
              title="Test edge case: Simulate DB connection drop / failure"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                config.simulateFailure
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">
                {config.simulateFailure ? 'Failure Active' : 'Simulate Error'}
              </span>
            </button>

            {/* Config Modal Button */}
            <button
              id="open-supabase-config-modal"
              onClick={onOpenConfig}
              title="Supabase Schema & Credentials Setup"
              className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
