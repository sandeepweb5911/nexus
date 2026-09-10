'use client';

import React from 'react';
import Link from 'next/link';
import { AITool } from '../types';

interface ToolCardProps {
  tool: AITool;
  isComparing?: boolean;
  isFavorite?: boolean;
  onToggleCompare?: (tool: AITool) => void;
  onToggleFavorite?: (toolId: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isComparing = false,
  isFavorite = false,
  onToggleCompare,
  onToggleFavorite,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-[#0b0e14] border border-white/10 hover:border-[#7bd0ff]/40 transition-all flex flex-col justify-between group shadow-lg">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#272a31] border border-white/5 flex items-center justify-center text-[#7bd0ff] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">{tool.icon}</span>
            </div>
            <div>
              <Link href={`/tools/${tool.slug}`}>
                <h3 className="font-headline text-[16px] font-semibold text-[#e0e2eb] hover:text-[#7bd0ff] transition-colors">
                  {tool.name}
                </h3>
              </Link>
              <span className="font-mono-code text-[11px] text-[#908fa0]">{tool.provider}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(tool.id)}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isFavorite
                    ? 'bg-[#8083ff]/20 text-[#8083ff] border-[#8083ff]/40'
                    : 'bg-[#191c22] text-[#908fa0] hover:text-white border-white/5'
                }`}
                title={isFavorite ? 'Remove bookmark' : 'Bookmark model'}
              >
                <span className="material-symbols-outlined text-sm">
                  {isFavorite ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
            )}
            <span className="px-2 py-0.5 rounded-full font-mono-code text-[11px] font-medium bg-[#1d2026] text-[#c0c1ff]">
              {tool.tag}
            </span>
          </div>
        </div>

        <p className="text-[13px] text-[#c7c4d7] leading-relaxed mb-4 line-clamp-2">
          {tool.description || tool.primaryUseCase}
        </p>

        {/* Specs Pills */}
        <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-[#191c22]/60 border border-white/5 text-[11px] font-mono-code">
          <div>
            <span className="text-[#908fa0] block">SWE-Bench:</span>
            <span className="text-[#e0e2eb] font-semibold">
              {tool.sweBenchScore > 0 ? `${tool.sweBenchScore}%` : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-[#908fa0] block">Context:</span>
            <span className="text-[#7bd0ff] font-semibold truncate block">{tool.contextTokens}</span>
          </div>
          <div>
            <span className="text-[#908fa0] block">Price:</span>
            <span className="text-[#e0e2eb] font-semibold">{tool.priceMonthly}</span>
          </div>
          <div>
            <span className="text-[#908fa0] block">Rating:</span>
            <span className="text-[#ddb7ff] font-semibold">★ {Number(tool.rating).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-[12px] text-[#908fa0] truncate max-w-[140px]">
          {tool.platforms ? tool.platforms.split(',')[0] : 'Web, API'}
        </span>

        {onToggleCompare && (
          <button
            onClick={() => onToggleCompare(tool)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
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
        )}
      </div>
    </div>
  );
};
