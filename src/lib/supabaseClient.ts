import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  ReviewRecord,
  SupportTicketRecord,
  SupabaseConfig,
  LinkedPair,
} from '../types';
import {
  INITIAL_REVIEWS,
  INITIAL_TICKETS,
  CITIES,
  DARK_STORES,
  CATEGORIES,
  SKUS,
} from '../data/mockSupabaseData';

const CONFIG_STORAGE_KEY = 'feedback_sentiment_supabase_config';
const REVIEWS_STORAGE_KEY = 'feedback_sentiment_reviews_data';
const TICKETS_STORAGE_KEY = 'feedback_sentiment_tickets_data';

export const SUPABASE_SQL_SCHEMA = `-- ==========================================
-- Feedback Sentiment Board - Supabase Schema
-- 1. reviews schema
-- 2. support_tickets schema
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. REVIEWS TABLE SCHEMA
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    order_id TEXT NOT NULL,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT NOT NULL,
    comment TEXT NOT NULL,
    sentiment TEXT NOT NULL CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    sentiment_score NUMERIC(4, 2) NOT NULL DEFAULT 0.00,
    source TEXT NOT NULL CHECK (source IN ('reviews', 'surveys', 'social_nps')),
    theme TEXT NOT NULL,
    sub_theme TEXT NOT NULL,
    city TEXT NOT NULL,
    dark_store_id TEXT NOT NULL,
    category TEXT NOT NULL,
    sku_id TEXT NOT NULL,
    sku_name TEXT NOT NULL,
    oos_item TEXT NOT NULL,
    substitute_item TEXT,
    price_delta NUMERIC(8, 2) NOT NULL DEFAULT 0.00,
    substitution_status TEXT NOT NULL CHECK (substitution_status IN ('Accepted', 'Rejected', 'Alternative Selected', 'Auto-Refunded', 'Auto-Fallback', 'Timeout', 'No Sub Needed')),
    order_cancelled BOOLEAN NOT NULL DEFAULT FALSE,
    refund_amount NUMERIC(8, 2) NOT NULL DEFAULT 0.00,
    has_linked_ticket BOOLEAN NOT NULL DEFAULT FALSE,
    linked_ticket_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for reviews
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_sentiment ON public.reviews(sentiment);
CREATE INDEX IF NOT EXISTS idx_reviews_theme ON public.reviews(theme);
CREATE INDEX IF NOT EXISTS idx_reviews_city ON public.reviews(city);
CREATE INDEX IF NOT EXISTS idx_reviews_dark_store ON public.reviews(dark_store_id);
CREATE INDEX IF NOT EXISTS idx_reviews_order_id ON public.reviews(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);

-- 2. SUPPORT TICKETS TABLE SCHEMA
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id TEXT PRIMARY KEY,
    ticket_number TEXT NOT NULL UNIQUE,
    customer_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    order_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    theme TEXT NOT NULL,
    sub_theme TEXT NOT NULL,
    is_oos_related BOOLEAN NOT NULL DEFAULT TRUE,
    is_substitution_related BOOLEAN NOT NULL DEFAULT TRUE,
    status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'resolved', 'escalated')),
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    sentiment TEXT NOT NULL CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    source_channel TEXT NOT NULL,
    city TEXT NOT NULL,
    dark_store_id TEXT NOT NULL,
    first_response_time_mins NUMERIC(5, 2) NOT NULL DEFAULT 2.0,
    resolution_time_mins NUMERIC(6, 2) NOT NULL DEFAULT 15.0,
    sla_breached BOOLEAN NOT NULL DEFAULT FALSE,
    refund_requested BOOLEAN NOT NULL DEFAULT FALSE,
    refund_amount NUMERIC(8, 2) NOT NULL DEFAULT 0.00,
    refund_status TEXT NOT NULL CHECK (refund_status IN ('approved', 'processed', 'rejected', 'none')),
    linked_review_id UUID REFERENCES public.reviews(id) ON DELETE SET NULL,
    agent_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for support_tickets
CREATE INDEX IF NOT EXISTS idx_tickets_status ON public.support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_category ON public.support_tickets(category);
CREATE INDEX IF NOT EXISTS idx_tickets_theme ON public.support_tickets(theme);
CREATE INDEX IF NOT EXISTS idx_tickets_order_id ON public.support_tickets(order_id);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON public.support_tickets(created_at DESC);

-- Row Level Security (RLS) policies
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-access for dashboard" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public read-access for dashboard" ON public.support_tickets FOR SELECT USING (true);
`;

// Helper for generating additional random reviews & tickets for dynamic auto-refresh
export function generateRandomReview(): ReviewRecord {
  const isPositive = Math.random() > 0.45;
  const rating = isPositive ? (Math.random() > 0.5 ? 5 : 4) : Math.floor(Math.random() * 3) + 1;
  const sku = SKUS[Math.floor(Math.random() * SKUS.length)];
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  const darkStore = DARK_STORES[Math.floor(Math.random() * DARK_STORES.length)];
  const priceDeltas = [0, 8, 15, 24, 38, 55, -12];
  const delta = priceDeltas[Math.floor(Math.random() * priceDeltas.length)];
  const id = 'rev-' + Math.floor(100 + Math.random() * 900);
  const ticketId = 'TICK-' + Math.floor(8000 + Math.random() * 1000);

  const themes = [
    'Unexpected Price',
    'Unwanted Substitute',
    'Wrong Product',
    'Refund Issue',
    'Poor UX',
    'Smooth Recommendation',
  ];
  const theme = !isPositive ? themes[Math.floor(Math.random() * 5)] : 'Smooth Recommendation';

  return {
    id,
    customer_id: 'CUST-' + Math.floor(1000 + Math.random() * 9000),
    customer_name: ['Kavita Rao', 'Aditya Sen', 'Tanvi Mehta', 'Varun Kapoor', 'Meera Nair'][
      Math.floor(Math.random() * 5)
    ],
    order_id: 'ORD-' + Math.floor(980000 + Math.random() * 5000),
    rating,
    title:
      rating <= 2
        ? `Replacement cost ₹${delta} more than ordered item`
        : `Quick delivery and substitution confirmation`,
    comment:
      rating <= 2
        ? `I noticed an extra ₹${delta} charge for substitution on ${sku.name}. System should notify with bigger alerts.`
        : `Substituted item arrived in 10 mins without friction. Nice experience.`,
    sentiment: rating >= 4 ? 'positive' : rating === 3 ? 'neutral' : 'negative',
    sentiment_score: rating >= 4 ? 0.8 : rating === 3 ? 0.05 : -0.85,
    source: Math.random() > 0.3 ? 'reviews' : 'surveys',
    theme,
    sub_theme: delta > 20 ? 'Replacement > ₹20' : 'Standard substitution',
    city,
    dark_store_id: darkStore,
    category: sku.category,
    sku_id: sku.id,
    sku_name: sku.name,
    oos_item: sku.name,
    substitute_item: delta > 0 ? 'Alternative Premium ' + sku.name : undefined,
    price_delta: delta,
    substitution_status: delta > 20 ? 'Rejected' : 'Accepted',
    order_cancelled: rating === 1 && Math.random() > 0.7,
    refund_amount: rating <= 2 ? Math.max(delta, 25) : 0,
    created_at: new Date().toISOString(),
    has_linked_ticket: rating <= 2,
    linked_ticket_id: rating <= 2 ? ticketId : undefined,
  };
}

export function generateRandomTicket(linkedReview?: ReviewRecord): SupportTicketRecord {
  const id = linkedReview?.linked_ticket_id || 'TICK-' + Math.floor(8000 + Math.random() * 1000);
  const city = linkedReview?.city || CITIES[Math.floor(Math.random() * CITIES.length)];
  const darkStore =
    linkedReview?.dark_store_id || DARK_STORES[Math.floor(Math.random() * DARK_STORES.length)];

  return {
    id,
    ticket_number: 'TCK-2026-' + id.replace('TICK-', ''),
    customer_id: linkedReview?.customer_id || 'CUST-' + Math.floor(1000 + Math.random() * 9000),
    customer_name: linkedReview?.customer_name || 'Rajesh Kulkarni',
    order_id: linkedReview?.order_id || 'ORD-' + Math.floor(980000 + Math.random() * 5000),
    subject: linkedReview
      ? `Dispute regarding ₹${linkedReview.price_delta} substitution charge`
      : 'General substitution inquiry',
    description: linkedReview
      ? `Customer opened support channel regarding review: "${linkedReview.comment}"`
      : 'User requested clarification regarding stockout policy.',
    category: linkedReview?.price_delta ? 'Incorrect Billing' : 'Unwanted Item',
    theme: linkedReview?.theme || 'Unexpected Price',
    sub_theme: linkedReview?.sub_theme || 'Replacement > ₹20',
    is_oos_related: true,
    is_substitution_related: true,
    status: Math.random() > 0.5 ? 'resolved' : 'open',
    priority: Math.random() > 0.6 ? 'high' : 'medium',
    sentiment: 'negative',
    source_channel: 'Live Chat',
    city,
    dark_store_id: darkStore,
    first_response_time_mins: +(Math.random() * 4 + 1).toFixed(1),
    resolution_time_mins: +(Math.random() * 20 + 8).toFixed(1),
    sla_breached: Math.random() > 0.85,
    refund_requested: true,
    refund_amount: linkedReview?.refund_amount || 35,
    refund_status: 'processed',
    linked_review_id: linkedReview?.id,
    created_at: new Date().toISOString(),
    agent_notes: 'Auto-synced via customer support bridge.',
  };
}

class SupabaseDataService {
  private config: SupabaseConfig;
  private supabaseClient: SupabaseClient | null = null;
  private reviews: ReviewRecord[] = [];
  private tickets: SupportTicketRecord[] = [];
  private listeners: (() => void)[] = [];
  private refreshTimer: number | null = null;

  constructor() {
    this.config = this.loadConfig();
    this.initData();
    this.setupAutoRefresh();
  }

  private loadConfig(): SupabaseConfig {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      url: '',
      anonKey: '',
      isConnected: true, // Connected to mock Supabase engine by default
      mode: 'mock_engine',
      isFallbackActive: false,
      lastRefreshedAt: new Date().toISOString(),
      autoRefreshIntervalSeconds: 30, // 30s auto-refresh by default
      simulateFailure: false,
      connectionError: null,
    };
  }

  private saveConfig() {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(this.config));
    } catch {
      // ignore
    }
  }

  /**
   * Directly loads full baseline data from the mockup file (mockSupabaseData.ts).
   * Used as the primary fallback when Supabase is unreachable or queries fail.
   */
  public fetchFromMockupFile(): { reviewsCount: number; ticketsCount: number } {
    try {
      this.reviews = JSON.parse(JSON.stringify(INITIAL_REVIEWS));
      this.tickets = JSON.parse(JSON.stringify(INITIAL_TICKETS));
      this.persistData();
    } catch {
      this.reviews = [...INITIAL_REVIEWS];
      this.tickets = [...INITIAL_TICKETS];
    }
    return {
      reviewsCount: this.reviews.length,
      ticketsCount: this.tickets.length,
    };
  }

  private initData() {
    try {
      const savedRev = localStorage.getItem(REVIEWS_STORAGE_KEY);
      const savedTick = localStorage.getItem(TICKETS_STORAGE_KEY);
      if (savedRev && savedTick) {
        const parsedRev = JSON.parse(savedRev);
        const parsedTick = JSON.parse(savedTick);
        if (Array.isArray(parsedRev) && parsedRev.length > 0 && Array.isArray(parsedTick) && parsedTick.length > 0) {
          this.reviews = parsedRev;
          this.tickets = parsedTick;
          return;
        }
      }
    } catch {
      // fallback to mockup file
    }
    this.fetchFromMockupFile();
  }

  private persistData() {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(this.tickets));
    } catch {
      // ignore
    }
  }

  public getConfig(): SupabaseConfig {
    return { ...this.config };
  }

  public updateConfig(updates: Partial<SupabaseConfig>) {
    this.config = { ...this.config, ...updates };
    if (this.config.url && this.config.anonKey) {
      try {
        this.supabaseClient = createClient(this.config.url, this.config.anonKey);
        this.config.mode = 'live_supabase';
        this.config.isFallbackActive = false;
        this.config.connectionError = null;
      } catch (err: any) {
        this.config.isConnected = false;
        this.config.isFallbackActive = true;
        this.config.connectionError = err.message || 'Invalid Supabase credentials';
        this.fetchFromMockupFile();
      }
    }
    this.saveConfig();
    this.setupAutoRefresh();
    this.notify();
  }

  public setSimulateFailure(simulate: boolean) {
    this.config.simulateFailure = simulate;
    if (simulate) {
      this.config.isConnected = false;
      this.config.isFallbackActive = true;
      this.config.connectionError =
        'Database connection failure simulated: Unable to reach Supabase. Fallback dataset active from mockSupabaseData.ts mockup file.';
      // Immediately fallback to fetching from mockup file
      this.fetchFromMockupFile();
    } else {
      this.config.isConnected = true;
      this.config.isFallbackActive = false;
      this.config.connectionError = null;
      this.config.lastRefreshedAt = new Date().toISOString();
    }
    this.saveConfig();
    this.notify();
  }

  public async manualRefresh(): Promise<{ success: boolean; message: string }> {
    // If failure simulation is active, switch to fallback mock data immediately
    if (this.config.simulateFailure) {
      this.config.isConnected = false;
      this.config.isFallbackActive = true;
      this.config.connectionError =
        'Connection Failed: Database server unreachable. Fallback data fetched from mockSupabaseData.ts.';
      this.fetchFromMockupFile();
      this.saveConfig();
      this.notify();
      return {
        success: false,
        message: 'Supabase simulation active: loaded mock data from mockup file fallback.',
      };
    }

    try {
      // If live Supabase is configured, attempt fetch from real tables with timeout guard
      if (this.config.mode === 'live_supabase' && this.supabaseClient) {
        // Guard with a 4-second timeout to prevent indefinite UI hangs
        const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
          setTimeout(() => reject(new Error('Supabase request timeout after 4000ms')), 4000)
        );

        const revPromise = this.supabaseClient
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        const tickPromise = this.supabaseClient
          .from('support_tickets')
          .select('*')
          .order('created_at', { ascending: false });

        const [revResult, tickResult] = await Promise.all([
          Promise.race([revPromise, timeoutPromise]),
          Promise.race([tickPromise, timeoutPromise]),
        ]);

        if (revResult.error || tickResult.error) {
          throw new Error((revResult.error || tickResult.error)?.message || 'Supabase query error');
        }

        if (revResult.data && revResult.data.length > 0) {
          this.reviews = revResult.data;
        }
        if (tickResult.data && tickResult.data.length > 0) {
          this.tickets = tickResult.data;
        }

        this.config.isConnected = true;
        this.config.isFallbackActive = false;
        this.config.connectionError = null;
        this.config.lastRefreshedAt = new Date().toISOString();
        this.persistData();
        this.saveConfig();
        this.notify();
        return {
          success: true,
          message: 'Successfully refreshed live data from Supabase tables.',
        };
      } else {
        // Mock engine data refresh: inject dynamic realistic update occasionally
        if (Math.random() > 0.4) {
          const newRev = generateRandomReview();
          this.reviews = [newRev, ...this.reviews.slice(0, 35)];
          if (newRev.has_linked_ticket) {
            const newTick = generateRandomTicket(newRev);
            this.tickets = [newTick, ...this.tickets.slice(0, 30)];
          }
          this.persistData();
        }

        this.config.isConnected = true;
        this.config.isFallbackActive = false;
        this.config.connectionError = null;
        this.config.lastRefreshedAt = new Date().toISOString();
        this.saveConfig();
        this.notify();
        return {
          success: true,
          message: 'Refreshed data from Supabase Datastore.',
        };
      }
    } catch (err: any) {
      // Supabase is down or query failed -> fallback directly to mockup file
      console.warn('Supabase query failed, falling back to mockup file dataset:', err);
      this.config.isConnected = false;
      this.config.isFallbackActive = true;
      this.config.connectionError =
        `Supabase query failed (${err.message || 'Network error'}). Fallback mock dataset active from mockSupabaseData.ts.`;
      
      // Fetch fresh dataset from mockup file as fallback
      this.fetchFromMockupFile();
      this.config.lastRefreshedAt = new Date().toISOString();
      this.saveConfig();
      this.notify();
      return {
        success: false,
        message: 'Supabase failed. Automatically loaded dataset from mockup file as fallback.',
      };
    }
  }

  public setupAutoRefresh() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }

    if (this.config.autoRefreshIntervalSeconds > 0) {
      this.refreshTimer = window.setInterval(() => {
        this.manualRefresh();
      }, this.config.autoRefreshIntervalSeconds * 1000);
    }
  }

  public getReviews(): ReviewRecord[] {
    return [...this.reviews];
  }

  public getTickets(): SupportTicketRecord[] {
    return [...this.tickets];
  }

  public getLinkedPairs(): LinkedPair[] {
    const pairs: LinkedPair[] = [];
    for (const rev of this.reviews) {
      if (rev.has_linked_ticket && rev.linked_ticket_id) {
        const ticket = this.tickets.find((t) => t.id === rev.linked_ticket_id);
        if (ticket) {
          pairs.push({
            review: rev,
            ticket,
            customer_name: rev.customer_name,
            order_id: rev.order_id,
            total_impact_inr: (rev.refund_amount || 0) + (ticket.refund_amount || 0),
            resolved_status: ticket.status === 'resolved',
          });
        }
      }
    }
    return pairs;
  }

  public getKPISummary() {
    return {
      totalFeedback: 26090,
      totalReviews: 12450,
      totalSupportTickets: 8230,
      totalSurveys: 5410,
      negativeFeedbackPct: 23.0,
      positiveFeedbackPct: 56.0,
      neutralFeedbackPct: 21.0,
      averageRating: 3.82,
      substitutionRejectionRate: 34.0,
      fullOrderCancellationRate: 1.1,
      totalRefundAmount: 343200,
      averageResolutionTimeMins: 14.8,
      slaBreachPct: 3.8,
      oosSupportContactRate: 4.1,
    };
  }

  public getState() {
    return {
      reviews: this.getReviews(),
      supportTickets: this.getTickets(),
      kpiSummary: this.getKPISummary(),
      config: this.getConfig(),
    };
  }

  public toggleSimulatedFailure(simulate?: boolean) {
    const nextState = simulate !== undefined ? simulate : !this.config.simulateFailure;
    this.setSimulateFailure(nextState);
  }

  public resetToDefaults() {
    this.reviews = [...INITIAL_REVIEWS];
    this.tickets = [...INITIAL_TICKETS];
    this.config.simulateFailure = false;
    this.config.isConnected = true;
    this.config.connectionError = null;
    this.config.lastRefreshedAt = new Date().toISOString();
    this.persistData();
    this.saveConfig();
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    for (const l of this.listeners) {
      try {
        l();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export const supabaseService = new SupabaseDataService();
