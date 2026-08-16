import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Smile,
  GitFork,
  RotateCcw,
  Headphones,
  Flame,
  Search,
  Target,
  Database,
  Layers,
  Sparkles,
  BarChart3,
  Link2,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

import { supabaseService } from './lib/supabaseClient';
import {
  ReviewRecord,
  SupportTicketRecord,
  KPISummary,
  SupabaseConfig,
  FilterState,
  TimeframeComparison,
} from './types';

// Subcomponents
import { Navbar } from './components/Navbar';
import { ConnectionAlertBanner } from './components/ConnectionAlertBanner';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { SourceOverview } from './components/SourceOverview';
import { SentimentDashboard } from './components/SentimentDashboard';
import { FeedbackThemes } from './components/FeedbackThemes';
import { RootCauseAnalysis } from './components/RootCauseAnalysis';
import { SubstitutionAnalytics } from './components/SubstitutionAnalytics';
import { PriceTransparencyAnalytics } from './components/PriceTransparencyAnalytics';
import { SupportTicketAnalytics } from './components/SupportTicketAnalytics';
import { ReviewAnalytics } from './components/ReviewAnalytics';
import { IssueAlerts } from './components/IssueAlerts';
import { AIInsights } from './components/AIInsights';
import { FeedbackExplorer } from './components/FeedbackExplorer';
import { LinkedReviewTicket } from './components/LinkedReviewTicket';
import { TrendsComparison } from './components/TrendsComparison';
import { GoalsOKRTracking } from './components/GoalsOKRTracking';

type ActiveTab =
  | 'overview'
  | 'sentiment'
  | 'themes'
  | 'substitution'
  | 'support_reviews'
  | 'alerts_ai'
  | 'explorer'
  | 'goals';

export default function App() {
  const [dataState, setDataState] = useState(supabaseService.getState());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedTheme, setSelectedTheme] = useState<string>('Unexpected Price');
  const [timeframe, setTimeframe] = useState<TimeframeComparison>('before_launch_vs_after_launch');

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    source: 'all',
    sentiment: 'all',
    theme: '',
    subTheme: '',
    city: '',
    darkStore: '',
    category: '',
    sku: '',
    priceDeltaRange: 'all',
    dateRange: 'all',
    rating: 'all',
    ticketStatus: 'all',
    substitutionStatus: 'all',
    onlyLinked: false,
  });

  // Subscribe to Supabase Datastore real-time & auto-refresh events
  useEffect(() => {
    const unsubscribe = supabaseService.subscribe(() => {
      setDataState(supabaseService.getState());
    });
    return () => unsubscribe();
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await supabaseService.manualRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleToggleFailure = () => {
    supabaseService.toggleSimulatedFailure(!dataState.config.simulateFailure);
  };

  const handleFetchMockupFallback = () => {
    supabaseService.fetchFromMockupFile();
    setDataState(supabaseService.getState());
  };

  const handleSaveConfig = (updates: Partial<SupabaseConfig>) => {
    supabaseService.updateConfig(updates);
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      source: 'all',
      sentiment: 'all',
      theme: '',
      subTheme: '',
      city: '',
      darkStore: '',
      category: '',
      sku: '',
      priceDeltaRange: 'all',
      dateRange: 'all',
      rating: 'all',
      ticketStatus: 'all',
      substitutionStatus: 'all',
      onlyLinked: false,
    });
  };

  const tabs: Array<{ id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'overview', label: '1. Executive & Sources', icon: LayoutDashboard },
    { id: 'sentiment', label: '2. Sentiment Intelligence', icon: Smile },
    { id: 'themes', label: '3. Themes & Root Cause', icon: GitFork },
    { id: 'substitution', label: '4. Substitution & Price Delta', icon: RotateCcw },
    { id: 'support_reviews', label: '5. Reviews & Support Tickets', icon: Headphones },
    { id: 'alerts_ai', label: '6. Alerts & AI Insights', icon: Flame },
    { id: 'explorer', label: '7. Feedback Explorer & Linking', icon: Search },
    { id: 'goals', label: '8. Trends & OKR Goals', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Main Navigation Header */}
      <Navbar
        config={dataState.config}
        onManualRefresh={handleManualRefresh}
        onOpenConfig={() => setIsConfigOpen(true)}
        onToggleFailure={handleToggleFailure}
        isRefreshing={isRefreshing}
      />

      {/* Critical Edge Case Connection Failure Alert Banner */}
      <ConnectionAlertBanner
        config={dataState.config}
        onManualRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
        onResolveSimulation={() => supabaseService.toggleSimulatedFailure(false)}
        onFetchMockupFallback={handleFetchMockupFallback}
      />

      {/* Sub-Navigation Tab Bar */}
      <div className="bg-slate-900/80 border-b border-slate-800/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 py-2 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* TAB 1: Executive Overview + Feedback Source Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <ExecutiveOverview
              summary={dataState.kpiSummary}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
            />
            <SourceOverview />
          </div>
        )}

        {/* TAB 2: Sentiment Dashboard */}
        {activeTab === 'sentiment' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <SentimentDashboard
              filters={filters}
              onFilterChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))}
              onResetFilters={handleResetFilters}
            />
          </div>
        )}

        {/* TAB 3: Feedback Themes & Root Cause Analysis */}
        {activeTab === 'themes' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <FeedbackThemes
              onSelectTheme={setSelectedTheme}
              selectedTheme={selectedTheme}
            />
            <RootCauseAnalysis />
          </div>
        )}

        {/* TAB 4: Substitution Analytics & Price Transparency */}
        {activeTab === 'substitution' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <SubstitutionAnalytics />
            <PriceTransparencyAnalytics />
          </div>
        )}

        {/* TAB 5: Support Ticket Analytics & Review Analytics */}
        {activeTab === 'support_reviews' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <SupportTicketAnalytics tickets={dataState.supportTickets} />
            <ReviewAnalytics reviews={dataState.reviews} />
          </div>
        )}

        {/* TAB 6: Issue Detection Alerts & AI Insights */}
        {activeTab === 'alerts_ai' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <IssueAlerts />
            <AIInsights />
          </div>
        )}

        {/* TAB 7: Feedback Explorer & Review <-> Ticket Linking */}
        {activeTab === 'explorer' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <FeedbackExplorer
              reviews={dataState.reviews}
              tickets={dataState.supportTickets}
              onOpenTicket={(ticketId) => {
                // switch to linking or highlight
                setActiveTab('explorer');
              }}
            />
            <LinkedReviewTicket
              reviews={dataState.reviews}
              tickets={dataState.supportTickets}
            />
          </div>
        )}

        {/* TAB 8: Trends Comparison & Goals / OKR Tracking */}
        {activeTab === 'goals' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <TrendsComparison />
            <GoalsOKRTracking />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-4 px-4 sm:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>
              Connected to Supabase Schema: <code className="text-emerald-400">reviews</code> &amp;{' '}
              <code className="text-emerald-400">support_tickets</code>
            </span>
          </div>
          <div>
            Prepared for Priya &amp; CX Leadership • Real-time Auto-Refresh Active (
            {dataState.config.autoRefreshIntervalSeconds > 0
              ? `${dataState.config.autoRefreshIntervalSeconds}s`
              : 'Manual'}
            )
          </div>
        </div>
      </footer>

      {/* Supabase Schema & Credentials Configuration Modal */}
      <SupabaseConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={dataState.config}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
}
