/**
 * Feedback Sentiment Board Types & Supabase Schemas
 */

export type SentimentType = 'positive' | 'neutral' | 'negative';
export type FeedbackSource = 'reviews' | 'support' | 'surveys' | 'social_nps';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'escalated';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type SubstitutionStatus =
  | 'Accepted'
  | 'Rejected'
  | 'Alternative Selected'
  | 'Auto-Refunded'
  | 'Auto-Fallback'
  | 'Timeout'
  | 'No Sub Needed';

export type TimeframeComparison =
  | 'today_vs_yesterday'
  | 'last_7d_vs_prev_7d'
  | 'last_30d_vs_prev_30d'
  | 'before_launch_vs_after_launch';

export interface ReviewRecord {
  id: string;
  customer_id: string;
  customer_name: string;
  order_id: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  sentiment: SentimentType;
  sentiment_score: number; // -1.0 to 1.0
  source: 'reviews' | 'surveys' | 'social_nps';
  theme: string;
  sub_theme: string;
  city: string;
  dark_store_id: string;
  category: string;
  sku_id: string;
  sku_name: string;
  oos_item: string;
  substitute_item?: string;
  price_delta: number; // INR difference e.g., +30, 0, -10
  substitution_status: SubstitutionStatus;
  order_cancelled: boolean;
  refund_amount: number;
  created_at: string;
  has_linked_ticket: boolean;
  linked_ticket_id?: string;
}

export interface SupportTicketRecord {
  id: string;
  ticket_number: string;
  customer_id: string;
  customer_name: string;
  order_id: string;
  subject: string;
  description: string;
  category:
    | 'Incorrect Billing'
    | 'Unwanted Item'
    | 'Wrong Substitute'
    | 'Refund Issue'
    | 'Delivery Delay'
    | 'Product Quality'
    | 'Poor Recommendation'
    | 'Confusing UX'
    | 'Packaging Issue'
    | 'Other';
  theme: string;
  sub_theme: string;
  is_oos_related: boolean;
  is_substitution_related: boolean;
  status: TicketStatus;
  priority: TicketPriority;
  sentiment: SentimentType;
  source_channel: 'Live Chat' | 'WhatsApp' | 'In-App Ticket' | 'Phone Support' | 'Email';
  city: string;
  dark_store_id: string;
  first_response_time_mins: number;
  resolution_time_mins: number;
  sla_breached: boolean;
  refund_requested: boolean;
  refund_amount: number;
  refund_status: 'approved' | 'processed' | 'rejected' | 'none';
  linked_review_id?: string;
  created_at: string;
  agent_notes?: string;
}

export interface LinkedPair {
  review: ReviewRecord;
  ticket: SupportTicketRecord;
  customer_name: string;
  order_id: string;
  total_impact_inr: number;
  resolved_status: boolean;
}

export interface KPISummary {
  totalFeedback: number;
  totalReviews: number;
  totalSupportTickets: number;
  totalSurveys: number;
  negativeFeedbackPct: number;
  positiveFeedbackPct: number;
  neutralFeedbackPct: number;
  averageRating: number;
  substitutionRejectionRate: number;
  fullOrderCancellationRate: number;
  totalRefundAmount: number;
  averageResolutionTimeMins: number;
  slaBreachPct: number;
  oosSupportContactRate: number;
}

export interface KPIComparisonData {
  current: KPISummary;
  previous: KPISummary;
  timeframeLabel: string;
  targetMetrics?: {
    oosSupportContactRate: number;
    substitutionRejectionRate: number;
    fullOrderCancellationRate: number;
  };
}

export interface RootCauseNode {
  id: string;
  title: string;
  parentTheme: string;
  affectedCustomers: number;
  feedbackVolume: number;
  negativeSentimentPct: number;
  supportTicketVolume: number;
  refundAmountINR: number;
  rejectionImpactMultiplier: number;
  description: string;
  trend: 'up' | 'down' | 'stable';
}

export interface PriceDeltaBucket {
  bucket: string;
  label: string;
  minDelta: number;
  maxDelta: number;
  volume: number;
  rejectionRate: number;
  negativeSentimentPct: number;
  supportTicketsCount: number;
  refundRequestsCount: number;
  avgRefundAmount: number;
  impactMultiplier: number;
}

export interface EmergingAlert {
  id: string;
  type:
    | 'Sentiment Spike'
    | 'Ticket Spike'
    | 'Rating Drop'
    | 'Rejection Spike'
    | 'Refund Spike'
    | 'New Emerging Theme'
    | 'New Product Issue';
  title: string;
  category: string;
  negativeSentimentDeltaPct: number;
  ticketVolumeDeltaPct: number;
  rejectionRatePct: number;
  avgPriceDeltaINR: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: 'active' | 'acknowledged' | 'investigating' | 'resolved';
  timestamp: string;
  description: string;
  recommendedAction: string;
  darkStoresAffected: string[];
}

export interface GoalMetric {
  goal: string;
  category: string;
  baseline: number;
  current: number;
  target: number;
  unit: string;
  status: 'On Track' | 'Near Goal' | 'Behind';
}

export type AIInsightReport = {
  generatedAt: string;
  topPainPoint: string;
  actionRecommendation: string;
  riskAlert: string;
  trendDetection: string;
  strategicSummary: string;
  recommendedActionsList: {
    action: string;
    impact: string;
    effort: string;
    owner: string;
  }[];
};

export interface AIInsightsReport {
  generatedAt: string;
  executiveSummary: string;
  topProblems: {
    title: string;
    impact: string;
    metrics: string;
    severity: 'high' | 'medium';
  }[];
  emergingProblems: {
    title: string;
    trigger: string;
    trend: string;
    velocity: string;
  }[];
  rootCauses: {
    theme: string;
    coreDriver: string;
    evidence: string;
  }[];
  customerImpact: string;
  businessImpact: string;
  recommendations: {
    action: string;
    expectedOutcome: string;
    priority: 'Immediate' | 'Next Sprint' | 'Strategic';
    affectedArea: string;
  }[];
}

export interface FilterState {
  searchQuery: string;
  source: 'all' | FeedbackSource;
  sentiment: 'all' | SentimentType;
  theme: string;
  subTheme: string;
  city: string;
  darkStore: string;
  category: string;
  sku: string;
  priceDeltaRange: 'all' | 'discount' | 'same' | '1-10' | '10-20' | '20-50' | '50+';
  dateRange: 'today' | '7d' | '30d' | 'all';
  rating: number | 'all';
  ticketStatus: 'all' | TicketStatus;
  substitutionStatus: 'all' | SubstitutionStatus;
  onlyLinked: boolean;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
  mode: 'mock_engine' | 'live_supabase' | 'fallback_mockup';
  isFallbackActive: boolean;
  lastRefreshedAt: string | null;
  autoRefreshIntervalSeconds: number; // e.g. 15, 30, 60, 0 for off
  simulateFailure: boolean;
  connectionError: string | null;
}
