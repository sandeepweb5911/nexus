import React from 'react';
import { AITool } from '../types';

interface SummaryStatsProps {
  activeTools: AITool[];
}

export const SummaryStats: React.FC<SummaryStatsProps> = ({ activeTools }) => {
  // Compute top context limit
  let topContextTool = activeTools.find((t) => t.id === 'gemini-2-pro') || activeTools[0];
  // Compute highest SWE-Bench
  const sortedSwe = [...activeTools].sort((a, b) => b.sweBenchScore - a.sweBenchScore);
  const highestSweTool = sortedSwe[0] || activeTools[0];

  // Compute median price
  const prices = activeTools.map((t) => t.priceRaw).sort((a, b) => a - b);
  const midIndex = Math.floor(prices.length / 2);
  const medianPrice =
    prices.length % 2 !== 0
      ? prices[midIndex]
      : (prices[midIndex - 1] + prices[midIndex]) / 2;

  const medianPriceFormatted = medianPrice ? `$${medianPrice.toFixed(2)}` : '$20.00';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {/* Top Context Limit */}
      <div className="p-6 rounded-xl bg-[#0b0e14] border border-white/5 shadow-md flex items-center justify-between hover:border-[#7bd0ff]/30 transition-all group">
        <div className="flex flex-col">
          <span className="font-mono-code text-[11px] text-[#908fa0] uppercase tracking-wider">
            Top Context Limit
          </span>
          <span className="font-headline text-[24px] md:text-[28px] font-semibold text-[#7bd0ff] mt-1 tracking-tight">
            {topContextTool ? topContextTool.contextTokens.replace('Tokens', 'tok') : '2,000K tok'}
          </span>
          <span className="text-[13px] text-[#c7c4d7]">
            {topContextTool ? topContextTool.name : 'Gemini 2.0 Pro'}
          </span>
        </div>
        <div className="w-12 h-12 rounded-lg bg-[#272a31] flex items-center justify-center text-[#7bd0ff] group-hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-2xl">data_object</span>
        </div>
      </div>

      {/* Highest SWE-Bench */}
      <div className="p-6 rounded-xl bg-[#0b0e14] border border-white/5 shadow-md flex items-center justify-between hover:border-[#ddb7ff]/30 transition-all group">
        <div className="flex flex-col">
          <span className="font-mono-code text-[11px] text-[#908fa0] uppercase tracking-wider">
            Highest SWE-Bench
          </span>
          <span className="font-headline text-[24px] md:text-[28px] font-semibold text-[#ddb7ff] mt-1 tracking-tight">
            {highestSweTool ? `${highestSweTool.sweBenchScore}% verified` : '70.2% verified'}
          </span>
          <span className="text-[13px] text-[#c7c4d7]">
            {highestSweTool ? highestSweTool.name : 'Claude 3.7 Sonnet'}
          </span>
        </div>
        <div className="w-12 h-12 rounded-lg bg-[#272a31] flex items-center justify-center text-[#ddb7ff] group-hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-2xl">terminal</span>
        </div>
      </div>

      {/* Median Price / Mo */}
      <div className="p-6 rounded-xl bg-[#0b0e14] border border-white/5 shadow-md flex items-center justify-between hover:border-[#c0c1ff]/30 transition-all group">
        <div className="flex flex-col">
          <span className="font-mono-code text-[11px] text-[#908fa0] uppercase tracking-wider">
            Median Price / Mo
          </span>
          <span className="font-headline text-[24px] md:text-[28px] font-semibold text-[#c0c1ff] mt-1 tracking-tight">
            {medianPriceFormatted}
          </span>
          <span className="text-[13px] text-[#c7c4d7]">Standard Pro Tier</span>
        </div>
        <div className="w-12 h-12 rounded-lg bg-[#272a31] flex items-center justify-center text-[#c0c1ff] group-hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-2xl">payments</span>
        </div>
      </div>

      {/* Privacy Standard */}
      <div className="p-6 rounded-xl bg-[#0b0e14] border border-white/5 shadow-md flex items-center justify-between hover:border-[#c4e7ff]/30 transition-all group">
        <div className="flex flex-col">
          <span className="font-mono-code text-[11px] text-[#908fa0] uppercase tracking-wider">
            Privacy Standard
          </span>
          <span className="font-headline text-[24px] md:text-[28px] font-semibold text-[#c4e7ff] mt-1 tracking-tight">
            SOC 2 Type II
          </span>
          <span className="text-[13px] text-[#c7c4d7]">Enterprise Verified</span>
        </div>
        <div className="w-12 h-12 rounded-lg bg-[#272a31] flex items-center justify-center text-[#c4e7ff] group-hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-2xl">verified_user</span>
        </div>
      </div>
    </div>
  );
};
