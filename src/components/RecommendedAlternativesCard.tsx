import React from 'react';
import { AITool } from '../types';

interface RecommendedAlternativesCardProps {
  onSwapIn: (toolId: string) => void;
  onBrowseAll: () => void;
}

export const RecommendedAlternativesCard: React.FC<RecommendedAlternativesCardProps> = ({
  onSwapIn,
  onBrowseAll,
}) => {
  const alternatives = [
    {
      id: 'deepseek-r1',
      name: 'DeepSeek R1',
      badge: 'Open Weights',
      badgeColor: 'bg-[#c0c1ff]/10 text-[#c0c1ff]',
      description: 'Open-source frontier reasoning rivaling proprietary models at 1/20th the inference cost.',
      price: '$0.55 / 1M',
      icon: 'neurology',
      iconColor: 'text-[#7bd0ff]',
    },
    {
      id: 'windsurf-codeium',
      name: 'Windsurf (Codeium)',
      badge: 'Flow Paradigm',
      badgeColor: 'bg-[#ddb7ff]/10 text-[#ddb7ff]',
      description: 'Next-gen agentic IDE with contextual Cascade workflows and seamless multi-file edits.',
      price: '$15 / mo',
      icon: 'developer_mode_tv',
      iconColor: 'text-[#ddb7ff]',
    },
    {
      id: 'perplexity-pro',
      name: 'Perplexity Pro',
      badge: 'Deep Research',
      badgeColor: 'bg-[#7bd0ff]/10 text-[#7bd0ff]',
      description: 'Autonomous live web synthesis combining multi-source citations with reasoning models.',
      price: '$20 / mo',
      icon: 'explore',
      iconColor: 'text-[#c0c1ff]',
    },
  ];

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#0b0e14] border border-white/10 shadow-xl flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-mono-code text-[11px] text-[#908fa0] uppercase tracking-wider">
              Nexus Algorithm
            </span>
            <h3 className="font-headline text-[22px] md:text-[26px] font-semibold text-[#e0e2eb] tracking-tight mt-1">
              Recommended Alternatives
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#7bd0ff]/10 border border-[#7bd0ff]/20 text-[#7bd0ff] font-mono-code text-[11px] font-semibold">
            High Similarity
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {alternatives.map((item) => (
            <div
              key={item.id}
              className="p-3.5 md:p-4 rounded-xl bg-[#191c22] border border-white/5 hover:border-white/15 hover:bg-[#1d2026] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#32353c] border border-white/5 flex items-center justify-center shrink-0">
                  <span className={`material-symbols-outlined text-2xl ${item.iconColor}`}>
                    {item.icon}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-headline text-[15px] font-semibold text-[#e0e2eb]">
                      {item.name}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-mono-code text-[10px] font-semibold uppercase ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#c7c4d7] line-clamp-1 mt-0.5 max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <span className="font-mono-code text-[11px] text-[#908fa0] mr-2">
                  {item.price}
                </span>
                <button
                  onClick={() => onSwapIn(item.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#272a31] hover:bg-[#363940] border border-white/10 hover:border-[#7bd0ff]/40 text-[#e0e2eb] text-xs font-semibold transition-all active:scale-95 flex items-center gap-1 group-hover:text-white"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#7bd0ff]">
                    swap_horiz
                  </span>
                  <span>Swap In</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[13px] text-[#908fa0]">Looking for niche models?</span>
        <button
          onClick={onBrowseAll}
          className="text-xs font-semibold text-[#7bd0ff] hover:text-[#c4e7ff] flex items-center gap-1 transition-colors group"
        >
          <span>Browse Full Matrix (1,840+ Tools)</span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
};
