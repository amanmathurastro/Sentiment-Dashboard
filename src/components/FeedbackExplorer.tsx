import React, { useState, useMemo } from 'react';
import {
  Search,
  Star,
  Headphones,
  ExternalLink,
} from 'lucide-react';
import { ReviewRecord, SupportTicketRecord } from '../types';

interface FeedbackExplorerProps {
  reviews: ReviewRecord[];
  tickets: SupportTicketRecord[];
  onOpenTicket: (ticketId: string) => void;
}

export const FeedbackExplorer: React.FC<FeedbackExplorerProps> = ({
  reviews,
  tickets,
  onOpenTicket,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'reviews' | 'tickets'>('all');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  // Combined and filtered items
  const filteredItems = useMemo(() => {
    let list: Array<{
      type: 'review' | 'ticket';
      id: string;
      customerName: string;
      city: string;
      darkStore: string;
      text: string;
      sentiment: string;
      category: string;
      sku: string;
      substitutedSku?: string;
      priceDeltaINR?: number;
      substitutionStatus?: string;
      rating?: number;
      ticketStatus?: string;
      date: string;
      linkedId?: string;
    }> = [];

    if (sourceFilter === 'all' || sourceFilter === 'reviews') {
      reviews.forEach((r) => {
        list.push({
          type: 'review',
          id: r.id,
          customerName: r.customer_name,
          city: r.city,
          darkStore: r.dark_store_id,
          text: r.comment || r.title,
          sentiment: r.sentiment,
          category: r.category,
          sku: r.sku_name || r.oos_item,
          substitutedSku: r.substitute_item,
          priceDeltaINR: r.price_delta,
          substitutionStatus: r.substitution_status,
          rating: r.rating,
          date: new Date(r.created_at).toLocaleDateString(),
          linkedId: r.linked_ticket_id,
        });
      });
    }

    if (sourceFilter === 'all' || sourceFilter === 'tickets') {
      tickets.forEach((t) => {
        list.push({
          type: 'ticket',
          id: t.ticket_number || t.id,
          customerName: t.customer_name,
          city: t.city,
          darkStore: t.dark_store_id,
          text: `${t.subject} — ${t.description}`,
          sentiment: t.sentiment,
          category: t.category,
          sku: t.theme,
          substitutedSku: t.sub_theme,
          priceDeltaINR: t.refund_amount,
          substitutionStatus: t.is_substitution_related ? 'Substitution Dispute' : 'Standard Query',
          ticketStatus: t.status,
          date: new Date(t.created_at).toLocaleDateString(),
          linkedId: t.linked_review_id,
        });
      });
    }

    // Apply Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.text.toLowerCase().includes(q) ||
          item.customerName.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.sku.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
      );
    }

    // Apply Sentiment
    if (sentimentFilter !== 'all') {
      list = list.filter((item) => item.sentiment === sentimentFilter);
    }

    // Apply City
    if (selectedCity !== 'all') {
      list = list.filter((item) => item.city === selectedCity);
    }

    // Apply Status
    if (statusFilter !== 'all') {
      list = list.filter((item) => item.substitutionStatus === statusFilter);
    }

    return list;
  }, [reviews, tickets, searchQuery, sourceFilter, sentimentFilter, selectedCity, statusFilter]);

  return (
    <section id="feedback-explorer-section" className="space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Search className="w-4 h-4 text-indigo-400" />
            <span>Universal Feedback &amp; Ticket Explorer</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Natural language query engine across all unified customer conversations, reviews, and support tickets.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Showing <span className="text-white font-bold">{filteredItems.length}</span> records
        </span>
      </div>

      {/* Filter and Search Bar Bento */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by keywords: 'milk brand', 'extra ₹30', 'Amul', 'refund delay', 'picker', 'Koramangala'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Source Stream</label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value as any)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Channels</option>
              <option value="reviews">⭐ App Reviews Only</option>
              <option value="tickets">🎧 Support Tickets Only</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Sentiment</label>
            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value as any)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">City Region</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Cities</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Substitution Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All States</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Alternative Selected">Alternative Selected</option>
              <option value="Auto-Refunded">Auto-Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-2.5">
        {filteredItems.slice(0, 15).map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition space-y-2.5"
          >
            {/* Header line */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2.5">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1 ${
                    item.type === 'review'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}
                >
                  {item.type === 'review' ? <Star className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
                  <span>{item.type === 'review' ? 'App Review' : 'Support Ticket'}</span>
                </span>

                <span className="text-xs font-mono font-bold text-white">
                  {item.id}
                </span>

                {item.rating && (
                  <span className="text-xs font-bold text-amber-400 flex items-center font-mono">
                    {item.rating} ★
                  </span>
                )}

                {item.ticketStatus && (
                  <span className="text-[9px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {item.ticketStatus}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-mono">
                <span className="font-semibold text-slate-200">
                  {item.customerName}
                </span>
                <span>•</span>
                <span>{item.city} ({item.darkStore})</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>
            </div>

            {/* Content text */}
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
              &ldquo;{item.text}&rdquo;
            </p>

            {/* Substitution details & price delta tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[10px] font-mono">
                  {item.category}: <strong className="text-white">{item.sku}</strong>
                </span>

                {item.substitutedSku && item.substitutedSku !== 'None' && (
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-mono border border-indigo-500/20">
                    Sub: <strong>{item.substitutedSku}</strong>
                  </span>
                )}

                {item.priceDeltaINR !== undefined && item.priceDeltaINR > 0 && (
                  <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[10px] font-mono font-bold border border-rose-500/20">
                    +₹{item.priceDeltaINR} Price Delta
                  </span>
                )}

                {item.substitutionStatus && (
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      item.substitutionStatus === 'Accepted'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    Status: {item.substitutionStatus}
                  </span>
                )}
              </div>

              {/* Linked Ticket CTA if available */}
              {item.linkedId && (
                <button
                  onClick={() => onOpenTicket(item.linkedId!)}
                  className="flex items-center space-x-1 text-xs font-mono text-indigo-400 hover:underline"
                >
                  <span>Linked {item.type === 'review' ? 'Ticket' : 'Review'} ({item.linkedId})</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
