import React, { useState } from 'react';
import { AITool } from '../types';

interface DeepDiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTools: AITool[];
}

export const DeepDiveModal: React.FC<DeepDiveModalProps> = ({
  isOpen,
  onClose,
  activeTools,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyReport = () => {
    const textReport = activeTools
      .map(
        (t) =>
          `[${t.name} - ${t.provider}]\nPrice: ${t.priceMonthly} | SWE-Bench: ${t.sweBenchScore}% | Context: ${t.contextTokens}\nUse Case: ${t.primaryUseCase}\nPrivacy: ${t.privacy}\n`
      )
      .join('\n---\n');
    navigator.clipboard.writeText(`AI Nexus Computational Stack Report:\n\n${textReport}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0e14]/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-[#1d2026] border border-white/10 shadow-2xl p-6 md:p-8 relative flex flex-col max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#908fa0] hover:text-[#e0e2eb] p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#00a6e0] to-[#8083ff] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">analytics</span>
          </div>
          <div>
            <h3 className="font-headline text-[22px] font-semibold text-[#e0e2eb] tracking-tight">
              Nexus Deep Dive Synthesis
            </h3>
            <span className="font-mono-code text-[11px] text-[#7bd0ff]">
              Stack Telemetry & Trade-off Assessment
            </span>
          </div>
        </div>

        <p className="text-[13px] text-[#c7c4d7] mt-2 mb-6">
          Architectural breakdown comparing the {activeTools.length} selected models across reasoning density, multimodal throughput, and developer operational efficiency.
        </p>

        {/* Breakdown cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {activeTools.map((tool) => (
            <div
              key={tool.id}
              className="p-4 rounded-xl bg-[#191c22] border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-headline text-[15px] font-semibold text-[#e0e2eb]">
                      {tool.name}
                    </span>
                    <span className="font-mono-code text-[11px] text-[#7bd0ff]">
                      {tool.provider}
                    </span>
                  </div>
                  <span className="font-mono-code text-[12px] font-bold text-[#c0c1ff]">
                    {tool.priceMonthly}
                  </span>
                </div>

                <p className="text-[12px] text-[#c7c4d7] mb-3 leading-relaxed">
                  {tool.description || tool.primaryUseCase}
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-white/5 text-[11px]">
                <div className="flex justify-between text-[#908fa0]">
                  <span>SWE-Bench Verified:</span>
                  <span className="font-mono-code text-[#e0e2eb] font-semibold">
                    {tool.sweBenchScore}%
                  </span>
                </div>
                <div className="flex justify-between text-[#908fa0]">
                  <span>Context Capacity:</span>
                  <span className="font-mono-code text-[#e0e2eb] font-semibold">
                    {tool.contextTokens}
                  </span>
                </div>
                <div className="flex justify-between text-[#908fa0]">
                  <span>API Baseline:</span>
                  <span className="font-mono-code text-[#7bd0ff]">
                    {tool.apiRates}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stack Recommendation Box */}
        <div className="p-4 rounded-xl bg-[#0b0e14] border border-[#8083ff]/30 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#c0c1ff] text-base">
              architecture
            </span>
            <span className="font-headline text-[14px] font-semibold text-[#e0e2eb]">
              Nexus Stack Recommendation
            </span>
          </div>
          <p className="text-[12px] text-[#c7c4d7] leading-relaxed">
            For production workflows with high complexity, pair a frontier architect model (e.g.{' '}
            <strong className="text-white">Claude 3.7</strong> or{' '}
            <strong className="text-white">Gemini 2.0 Pro</strong> for 2M token repo ingestion)
            with an agentic IDE like <strong className="text-white">Cursor</strong>, and utilize cost-effective open-weights routing for routine micro-tasks.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#272a31] hover:bg-[#363940] text-[#e0e2eb] text-xs font-semibold"
          >
            Close
          </button>
          <button
            onClick={handleCopyReport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00a6e0] to-[#8083ff] text-white text-xs font-semibold shadow hover:opacity-90"
          >
            <span className="material-symbols-outlined text-sm">
              {copied ? 'done' : 'content_copy'}
            </span>
            <span>{copied ? 'Report Copied!' : 'Copy Summary Report'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
