import React, { useState } from 'react';
import {
  GitFork,
  Users,
  MessageSquare,
  Frown,
  Headphones,
  IndianRupee,
  TrendingUp,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ROOT_CAUSE_NODES } from '../data/mockSupabaseData';
import { RootCauseNode } from '../types';

export const RootCauseAnalysis: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<RootCauseNode>(ROOT_CAUSE_NODES[0]);

  return (
    <section id="root-cause-analysis-section" className="space-y-4">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <GitFork className="w-4 h-4 text-indigo-400" />
            <span>Root Cause Deep-Dive Diagnostics</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Hierarchical decomposition going one level deeper into the primary drivers of customer dissatisfaction.
          </p>
        </div>
        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Focus: Unexpected Price (32% Volume)
        </span>
      </div>

      {/* Main Bento Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Interactive Tree Visualizer Bento (Col 5) */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            <span>Root Cause Hierarchy Tree</span>
          </div>

          {/* Root Node: Unexpected Price */}
          <div className="p-4 rounded-xl bg-slate-950 text-white border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">Parent Feedback Theme</span>
              <span className="text-xs font-mono bg-indigo-600 px-2 py-0.5 rounded text-white font-bold">
                32% Total
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">Unexpected Price</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              8,350 total mentions • 5 specific sub-driver root branches
            </p>
          </div>

          {/* Tree Branches */}
          <div className="relative pl-6 space-y-2.5 before:absolute before:left-3 before:top-2 before:bottom-3 before:w-0.5 before:bg-slate-800">
            {ROOT_CAUSE_NODES.filter((n) => n.parentTheme === 'Unexpected Price').map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`relative flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/20 shadow'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  {/* Branch indicator */}
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-slate-800" />

                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                      <span>{node.title}</span>
                      {node.rejectionImpactMultiplier >= 2.0 && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          {node.rejectionImpactMultiplier}x Impact
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {node.affectedCustomers.toLocaleString()} users • {node.negativeSentimentPct}% Neg
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition ${
                      isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Node Diagnostic Card Bento (Col 7) */}
        <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
                  Root Cause Inspection
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  {selectedNode.title}
                </h4>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {selectedNode.rejectionImpactMultiplier}x Rejection Multiplier
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              {selectedNode.description}
            </p>

            {/* 6 Metric Panels */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {/* 1. Affected Customers */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center space-x-1.5 text-slate-400 text-xs font-medium mb-1">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Affected Users</span>
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  {selectedNode.affectedCustomers.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500">Unique accounts</div>
              </div>

              {/* 2. Feedback Volume */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center space-x-1.5 text-slate-400 text-xs font-medium mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span>Feedback Volume</span>
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  {selectedNode.feedbackVolume.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500">Reviews &amp; surveys</div>
              </div>

              {/* 3. Sentiment */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center space-x-1.5 text-slate-400 text-xs font-medium mb-1">
                  <Frown className="w-3.5 h-3.5 text-rose-400" />
                  <span>Negative Sentiment</span>
                </div>
                <div className="text-lg font-bold text-rose-400 font-mono">
                  {selectedNode.negativeSentimentPct}%
                </div>
                <div className="text-[10px] text-slate-500">High friction intensity</div>
              </div>

              {/* 4. Support Ticket Volume */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center space-x-1.5 text-slate-400 text-xs font-medium mb-1">
                  <Headphones className="w-3.5 h-3.5 text-blue-400" />
                  <span>Support Tickets</span>
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  {selectedNode.supportTicketVolume.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500">Direct agent queries</div>
              </div>

              {/* 5. Refund Amount */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center space-x-1.5 text-slate-400 text-xs font-medium mb-1">
                  <IndianRupee className="w-3.5 h-3.5 text-rose-400" />
                  <span>Refund Disbursed</span>
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  ₹{(selectedNode.refundAmountINR / 1000).toFixed(0)}K
                </div>
                <div className="text-[10px] text-slate-500">₹{selectedNode.refundAmountINR.toLocaleString()} total</div>
              </div>

              {/* 6. Rejection Impact */}
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <div className="flex items-center space-x-1.5 text-rose-400 text-xs font-medium mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                  <span>Rejection Multiplier</span>
                </div>
                <div className="text-lg font-black text-rose-400 font-mono">
                  {selectedNode.rejectionImpactMultiplier}x
                </div>
                <div className="text-[10px] text-rose-400/80">vs baseline rate</div>
              </div>
            </div>
          </div>

          {/* Actionable Strategy Box */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start space-x-3">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-bold text-indigo-300">
                Executive Action Recommendation for &ldquo;{selectedNode.title}&rdquo;
              </div>
              <p className="text-slate-300 leading-relaxed">
                {selectedNode.rejectionImpactMultiplier >= 2.0
                  ? 'Immediate algorithm patch: Enforce hard price parity threshold (cap delta at ₹15) before triggering auto-replacement.'
                  : 'UI enhancement: Increase contrast and size of price delta indicator badge on mobile substitution prompt.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
