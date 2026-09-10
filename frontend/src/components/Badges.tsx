import React from 'react';

export const Rating: React.FC<{ value: number; count?: number }> = ({ value, count }) => {
  return (
    <div className="inline-flex items-center gap-1.5 font-mono-code text-xs">
      <span className="text-amber-400">★</span>
      <span className="font-semibold text-[#e0e2eb]">{value.toFixed(2)}</span>
      {count !== undefined && <span className="text-[#908fa0]">({count})</span>}
    </div>
  );
};

export const PricingBadge: React.FC<{ model: string; entryPrice?: string }> = ({ model, entryPrice }) => {
  const isFree = model.toLowerCase().includes('free') || model.toLowerCase().includes('open');
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-mono-code uppercase font-semibold ${
        isFree
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
          : 'bg-[#8083ff]/10 text-[#c0c1ff] border border-[#8083ff]/30'
      }`}
    >
      {entryPrice || model}
    </span>
  );
};

export const VerifiedBadge: React.FC<{ label?: string }> = ({ label = 'Verified Benchmark' }) => {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#272a31] text-[#7bd0ff] font-mono-code text-[11px]">
      <span className="material-symbols-outlined text-[14px]">verified</span>
      <span>{label}</span>
    </span>
  );
};
