import React, { useState, useEffect } from 'react';
import { CATALOG_TOOLS } from '../data/toolsData';
import { AITool } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: AITool) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTool,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered from global hook
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = CATALOG_TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.provider.toLowerCase().includes(query.toLowerCase()) ||
      t.primaryUseCase.toLowerCase().includes(query.toLowerCase()) ||
      t.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0e14]/85 backdrop-blur-xl flex items-start justify-center pt-24 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-[#1d2026] border border-white/10 shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#191c22]">
          <span className="material-symbols-outlined text-[#7bd0ff] text-xl">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI models, benchmarks, coding agents..."
            className="flex-1 bg-transparent text-[#e0e2eb] text-[14px] placeholder:text-[#908fa0] focus:outline-none"
          />
          <kbd className="font-mono-code text-[11px] bg-[#272a31] px-1.5 py-0.5 rounded border border-white/10 text-[#908fa0]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="py-8 text-center text-[#908fa0] text-[13px]">
              No models or frameworks found for "{query}".
            </div>
          ) : (
            results.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  onSelectTool(tool);
                  onClose();
                }}
                className="w-full p-2.5 rounded-xl hover:bg-[#272a31] text-left flex items-center justify-between gap-3 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#32353c] flex items-center justify-center text-[#7bd0ff] shrink-0">
                    <span className="material-symbols-outlined text-base">{tool.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-[#e0e2eb] group-hover:text-white">
                        {tool.name}
                      </span>
                      <span className="font-mono-code text-[11px] text-[#908fa0]">
                        {tool.provider}
                      </span>
                    </div>
                    <span className="text-[12px] text-[#c7c4d7] truncate max-w-sm">
                      {tool.primaryUseCase}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono-code text-[11px] px-2 py-0.5 rounded-full bg-[#191c22] text-[#c0c1ff]">
                    {tool.tag}
                  </span>
                  <span className="material-symbols-outlined text-sm text-[#908fa0] group-hover:text-[#7bd0ff] group-hover:translate-x-0.5 transition-all">
                    arrow_forward
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="p-2.5 bg-[#191c22]/60 border-t border-white/5 flex items-center justify-between text-[11px] text-[#908fa0] px-4">
          <span>Tip: Click any tool to compare or benchmark</span>
          <span>AI Nexus Telemetry Index v2.4</span>
        </div>
      </div>
    </div>
  );
};
