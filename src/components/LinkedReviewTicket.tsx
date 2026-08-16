import React from 'react';
import {
  Link2,
  Star,
  Headphones,
  User,
} from 'lucide-react';
import { ReviewRecord, SupportTicketRecord } from '../types';

interface LinkedReviewTicketProps {
  reviews: ReviewRecord[];
  tickets: SupportTicketRecord[];
}

export const LinkedReviewTicket: React.FC<LinkedReviewTicketProps> = () => {
  const linkedPairs = [
    {
      customerId: 'CUST-8921',
      customerName: 'Pooja Sharma',
      orderId: 'ORD-98231',
      review: {
        id: 'REV-1001',
        rating: 1,
        date: '2026-08-16 09:20',
        text: 'Ordered Amul Gold Milk 500ml, got substituted with organic cow milk and charged ₹30 extra without my clear approval! Very disappointing.',
        channel: 'Google Play Store',
      },
      ticket: {
        id: 'TCK-8841',
        subject: 'Wrong milk substitute delivered and excess ₹30 charged',
        createdAt: '2026-08-16 09:35',
        status: 'Resolved',
        agent: 'Deepak M.',
        resolution: 'Approved full refund of ₹30 delta + issued ₹50 apology wallet credit.',
        refundAmountINR: 30,
      },
    },
    {
      customerId: 'CUST-3319',
      customerName: 'Vikram Joshi',
      orderId: 'ORD-98244',
      review: {
        id: 'REV-1003',
        rating: 1,
        date: '2026-08-15 18:40',
        text: 'Aashirvaad Atta replaced with Pillsbury. Timer expired while I was driving and cannot cancel replacement!',
        channel: 'iOS App Store',
      },
      ticket: {
        id: 'TCK-8845',
        subject: 'Replacement timer expired - Atta brand mismatch',
        createdAt: '2026-08-15 18:55',
        status: 'Resolved',
        agent: 'Ananya S.',
        resolution: 'Arranged free return pickup and initiated 100% item refund of ₹245.',
        refundAmountINR: 245,
      },
    },
    {
      customerId: 'CUST-7712',
      customerName: 'Rahul Verma',
      orderId: 'ORD-98288',
      review: {
        id: 'REV-1007',
        rating: 2,
        date: '2026-08-14 14:15',
        text: 'Diet Coke replaced with regular sugary Coca-Cola. As a diabetic this is hazardous.',
        channel: 'In-App CSAT Prompt',
      },
      ticket: {
        id: 'TCK-8850',
        subject: 'Critical allergen/sugar mismatch on soda replacement',
        createdAt: '2026-08-14 14:22',
        status: 'Resolved',
        agent: 'Priya CX Desk',
        resolution: 'Urgent redelivery dispatched with zero sugar option; flagged picker algorithm.',
        refundAmountINR: 60,
      },
    },
  ];

  return (
    <section id="linked-review-ticket-section" className="space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Link2 className="w-4 h-4 text-indigo-400" />
            <span>Review &harr; Support Ticket Cross-Linking</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Holistic customer profile trace correlating public app reviews with internal CX ticketing resolutions.
          </p>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Customer Traceability Engine
        </span>
      </div>

      {/* Linked Pairs Bento Grid */}
      <div className="space-y-3">
        {linkedPairs.map((pair) => (
          <div
            key={pair.customerId}
            className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3"
          >
            {/* Customer Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white text-sm">
                    {pair.customerName}
                  </span>
                  <span className="text-slate-500 ml-2 font-mono text-[11px]">
                    {pair.customerId} • Order #{pair.orderId}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Refund Disbursed: ₹{pair.ticket.refundAmountINR}
                </span>
              </div>
            </div>

            {/* Side-by-side Connected Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
              {/* Left: App Review Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Public Review ({pair.review.id})</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{pair.review.date}</span>
                </div>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: pair.review.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] font-medium text-slate-400 ml-1 font-mono">
                    via {pair.review.channel}
                  </span>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  &ldquo;{pair.review.text}&rdquo;
                </p>
              </div>

              {/* Right: Support Ticket Resolution Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-400">
                    <Headphones className="w-3.5 h-3.5 text-blue-400" />
                    <span>Support Ticket ({pair.ticket.id})</span>
                  </div>
                  <span className="px-2 py-0.2 rounded text-[9px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {pair.ticket.status}
                  </span>
                </div>

                <div className="text-xs font-bold text-white">
                  {pair.ticket.subject}
                </div>

                <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-semibold text-slate-200 block mb-0.5 text-[11px]">
                    Resolution (Handled by {pair.ticket.agent}):
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{pair.ticket.resolution}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
