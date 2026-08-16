import React, { useState } from 'react';
import {
  X,
  Database,
  Copy,
  Check,
  Server,
  RefreshCw,
  FileCode,
} from 'lucide-react';
import { SupabaseConfig } from '../types';
import { SUPABASE_SQL_SCHEMA, supabaseService } from '../lib/supabaseClient';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SupabaseConfig;
  onSaveConfig: (updates: Partial<SupabaseConfig>) => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [url, setUrl] = useState(config.url);
  const [anonKey, setAnonKey] = useState(config.anonKey);
  const [refreshInterval, setRefreshInterval] = useState(config.autoRefreshIntervalSeconds);
  const [copied, setCopied] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    onSaveConfig({
      url: url.trim(),
      anonKey: anonKey.trim(),
      autoRefreshIntervalSeconds: Number(refreshInterval),
    });
    setTestStatus('Configuration updated successfully!');
    setTimeout(() => {
      setTestStatus(null);
      onClose();
    }, 1200);
  };

  const handleResetData = () => {
    supabaseService.resetToDefaults();
    setTestStatus('Reset to baseline dataset with 150+ realistic reviews & support tickets.');
    setTimeout(() => setTestStatus(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Supabase Database Integration</h3>
              <p className="text-xs text-slate-400 font-mono">
                Schemas: <code className="text-emerald-400">reviews</code> &amp;{' '}
                <code className="text-emerald-400">support_tickets</code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Mode Info Bento */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
            <Server className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-semibold text-slate-200">
                Active Engine:{' '}
                <span className="text-indigo-400 font-mono">
                  {config.mode === 'live_supabase'
                    ? 'Connected to Live Supabase Project'
                    : 'Built-in High-Fidelity Supabase Datastore Engine'}
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The board provides a zero-setup reactive datastore with realistic quick-commerce
                substitution scenarios. If Supabase is unreachable or queries fail, the board automatically fetches and falls back to baseline records from the mockup data file (<code className="text-indigo-300 font-mono">mockSupabaseData.ts</code>) to keep all dashboards operational.
              </p>
            </div>
          </div>

          {/* Real Supabase Credentials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Supabase Connection Parameters (Optional)
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  placeholder="https://xyzcompany.supabase.co"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Supabase Anon / Public Key
                </label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Auto Refresh Setting */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Auto-Refresh Cadence
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '10 Seconds', val: 10 },
                { label: '30 Seconds', val: 30 },
                { label: '60 Seconds', val: 60 },
                { label: 'Disabled', val: 0 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setRefreshInterval(opt.val)}
                  className={`py-2 px-3 rounded-xl text-xs font-mono text-center transition ${
                    refreshInterval === opt.val
                      ? 'bg-indigo-600 border border-indigo-500 text-white font-bold'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* SQL Schemas Viewer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Supabase SQL Migration Schema
                </h4>
              </div>
              <button
                onClick={handleCopySchema}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl text-xs transition border border-slate-800 font-mono"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied SQL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Schema SQL</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-400/90 overflow-x-auto max-h-48 leading-relaxed">
              {SUPABASE_SQL_SCHEMA}
            </pre>
          </div>

          {/* Status feedback */}
          {testStatus && (
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-xl flex items-center space-x-2 font-mono">
              <Check className="w-4 h-4 text-indigo-400" />
              <span>{testStatus}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900">
          <button
            onClick={handleResetData}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Datastore</span>
          </button>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
