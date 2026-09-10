import React, { useState, useEffect } from 'react';
import { AITool } from '../types';
import { CATALOG_TOOLS } from '../data/toolsData';
import api from '../lib/api';

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeToolIds: string[];
  onSelectTool: (tool: AITool) => void;
}

export const AddToolModal: React.FC<AddToolModalProps> = ({
  isOpen,
  onClose,
  activeToolIds,
  onSelectTool,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [tools, setTools] = useState<AITool[]>(CATALOG_TOOLS);

  useEffect(() => {
    if (isOpen) {
      api.tools.getAll().then((res) => {
        if (res.data && res.data.length > 0) {
          setTools(res.data);
        }
      }).catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['All', 'LLM & Reasoning', 'Developer Tools', 'Open Weights', 'Search & Research'];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.primaryUseCase.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || tool.category === categoryFilter || tool.tag === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0e14]/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-[#1d2026] border border-white/10 shadow-2xl p-6 relative flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#908fa0] hover:text-[#e0e2eb] p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-2xl text-[#7bd0ff]">
            dashboard_customize
          </span>
          <h3 className="font-headline text-[20px] font-semibold text-[#e0e2eb] tracking-tight">
            Add AI Tool to Comparison
          </h3>
        </div>
        <p className="text-[13px] text-[#c7c4d7] mb-4">
          Select frontier models or developer frameworks to benchmark side-by-side.
        </p>

        {/* Search Bar */}
        <div className="relative mb-3">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#908fa0] text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by model name, provider, or capability..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#191c22] border border-white/10 text-[#e0e2eb] text-[13px] placeholder:text-[#908fa0] focus:outline-none focus:border-[#7bd0ff]"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#7bd0ff]/20 text-[#7bd0ff] border border-[#7bd0ff]/40'
                  : 'bg-[#191c22] text-[#908fa0] hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filteredTools.length === 0 ? (
            <div className="py-12 text-center text-[#908fa0] text-[13px]">
              No AI tools matched your search filter.
            </div>
          ) : (
            filteredTools.map((tool) => {
              const isAlreadyAdded = activeToolIds.includes(tool.id);
              return (
                <div
                  key={tool.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#191c22] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#272a31] border border-white/5 flex items-center justify-center text-[#7bd0ff]">
                      <span className="material-symbols-outlined text-xl">
                        {tool.icon}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[14px] text-[#e0e2eb]">
                          {tool.name}
                        </span>
                        <span className="px-2 py-0.5 rounded font-mono-code text-[10px] bg-[#272a31] text-[#908fa0]">
                          {tool.tag}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#c7c4d7] line-clamp-1">
                        {tool.primaryUseCase}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-semibold text-[#e0e2eb] block">
                        {tool.priceMonthly}
                      </span>
                      <span className="font-mono-code text-[10px] text-[#7bd0ff]">
                        {tool.sweBenchScore > 0 ? `${tool.sweBenchScore}% SWE` : 'Multimodal'}
                      </span>
                    </div>

                    <button
                      disabled={isAlreadyAdded}
                      onClick={() => {
                        onSelectTool(tool);
                        onClose();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        isAlreadyAdded
                          ? 'bg-[#272a31] text-[#908fa0] cursor-not-allowed opacity-60'
                          : 'bg-gradient-to-r from-[#00a6e0] to-[#8083ff] text-white shadow hover:opacity-90 active:scale-95'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {isAlreadyAdded ? 'check' : 'add'}
                      </span>
                      <span>{isAlreadyAdded ? 'Active' : 'Add'}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
