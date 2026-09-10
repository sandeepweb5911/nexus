import React, { useState } from 'react';
import { AITool } from '../types';
import { CATALOG_TOOLS } from '../data/toolsData';

interface DirectoryViewProps {
  currentTab: string;
  activeTools: AITool[];
  onToggleCompare: (tool: AITool) => void;
  onGoToCompare: () => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  currentTab,
  activeTools,
  onToggleCompare,
  onGoToCompare,
}) => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Filter tools based on current tab
  let baseTools = [...CATALOG_TOOLS];
  if (currentTab === 'trending') {
    baseTools.sort((a, b) => b.sweBenchScore - a.sweBenchScore);
  } else if (currentTab === 'new-tools') {
    baseTools = baseTools.slice().reverse();
  } else if (currentTab === 'deals') {
    baseTools.sort((a, b) => a.priceRaw - b.priceRaw);
  }

  const filtered = baseTools.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.provider.toLowerCase().includes(search.toLowerCase()) ||
      t.primaryUseCase.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === 'All' || t.tag === selectedTag || t.category === selectedTag;
    return matchesSearch && matchesTag;
  });

  const getTabTitle = () => {
    switch (currentTab) {
      case 'discover':
        return {
          title: 'Explore Computational Intelligence',
          subtitle: 'Browse 1,840+ indexed neural models, agentic IDEs, and frontier APIs.',
        };
      case 'categories':
        return {
          title: 'Categorical Framework Index',
          subtitle: 'Organized by architectural domain, reasoning paradigm, and deployment model.',
        };
      case 'trending':
        return {
          title: 'Trending Frontier Benchmarks',
          subtitle: 'Highest velocity and verified SWE-bench scoring models this week.',
        };
      case 'new-tools':
        return {
          title: 'Recently Indexed Models',
          subtitle: 'Newly validated crawler entries ready for benchmark testing.',
        };
      case 'deals':
        return {
          title: 'Developer Deals & Free Tiers',
          subtitle: 'Subsidized inference rates, open-weight economics, and developer grants.',
        };
      default:
        return {
          title: 'AI Nexus Directory',
          subtitle: 'Explore and benchmark the machine learning ecosystem.',
        };
    }
  };

  const { title, subtitle } = getTabTitle();

  return (
    <div className="w-full max-w-[84rem] mx-auto px-4 md:px-6 pt-6 pb-20">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#272a31] text-[#7bd0ff] font-mono-code text-[11px] uppercase tracking-wider">
              Directory v2.4
            </span>
            <span className="text-[#908fa0] text-xs font-mono-code">
              / {filtered.length} Models Displayed
            </span>
          </div>
          <h1 className="font-headline text-[32px] md:text-[38px] font-bold text-[#e0e2eb] tracking-tight">
            {title}
          </h1>
          <p className="text-[15px] text-[#c7c4d7] mt-1">{subtitle}</p>
        </div>

        {/* Quick Back to Compare button */}
        <button
          onClick={onGoToCompare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00a6e0] to-[#8083ff] text-white text-xs font-semibold shadow hover:opacity-90 transition-all shrink-0 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-sm">compare_arrows</span>
          <span>Open Comparison Matrix ({activeTools.length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-8 bg-[#0b0e14] p-3 rounded-2xl border border-white/10">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#908fa0] text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search directory by name, provider, or capability..."
            className="w-full pl-10 pr-4 py-2 bg-[#191c22] rounded-xl text-[13px] text-[#e0e2eb] placeholder:text-[#908fa0] focus:outline-none focus:border-[#7bd0ff] border border-white/5"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Hybrid Think', 'Code Native', 'Open Weights', '2M Window', 'Deep Research'].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedTag === tag
                    ? 'bg-[#7bd0ff]/20 text-[#7bd0ff] border border-[#7bd0ff]/40'
                    : 'bg-[#191c22] text-[#908fa0] hover:text-white border border-white/5'
                }`}
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((tool) => {
          const isComparing = activeTools.some((t) => t.id === tool.id);
          return (
            <div
              key={tool.id}
              className="p-5 rounded-2xl bg-[#0b0e14] border border-white/10 hover:border-[#7bd0ff]/40 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#272a31] border border-white/5 flex items-center justify-center text-[#7bd0ff] group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[22px]">
                        {tool.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline text-[16px] font-semibold text-[#e0e2eb]">
                        {tool.name}
                      </h3>
                      <span className="font-mono-code text-[11px] text-[#908fa0]">
                        {tool.provider}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full font-mono-code text-[11px] font-medium bg-[#1d2026] text-[#c0c1ff]">
                    {tool.tag}
                  </span>
                </div>

                <p className="text-[13px] text-[#c7c4d7] leading-relaxed mb-4 line-clamp-2">
                  {tool.description || tool.primaryUseCase}
                </p>

                {/* Specs pills */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-[#191c22]/60 border border-white/5 text-[11px] font-mono-code">
                  <div>
                    <span className="text-[#908fa0] block">SWE-Bench:</span>
                    <span className="text-[#e0e2eb] font-semibold">{tool.sweBenchScore}%</span>
                  </div>
                  <div>
                    <span className="text-[#908fa0] block">Context:</span>
                    <span className="text-[#7bd0ff] font-semibold">{tool.contextTokens}</span>
                  </div>
                  <div>
                    <span className="text-[#908fa0] block">Price:</span>
                    <span className="text-[#e0e2eb] font-semibold">{tool.priceMonthly}</span>
                  </div>
                  <div>
                    <span className="text-[#908fa0] block">Rating:</span>
                    <span className="text-[#ddb7ff] font-semibold">★ {tool.rating.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-[12px] text-[#908fa0] truncate max-w-[140px]">
                  {tool.platforms.split(',')[0]}
                </span>

                <button
                  onClick={() => onToggleCompare(tool)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    isComparing
                      ? 'bg-[#8083ff]/20 text-[#c0c1ff] border border-[#8083ff]/40 hover:bg-[#8083ff]/30'
                      : 'bg-[#272a31] hover:bg-[#363940] text-white border border-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isComparing ? 'check' : 'add'}
                  </span>
                  <span>{isComparing ? 'In Matrix' : 'Compare'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
