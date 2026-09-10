'use client';

import React from 'react';

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedPricing: string;
  onSelectPricing: (pricing: string) => void;
  selectedSort: string;
  onSelectSort: (sort: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedPricing,
  onSelectPricing,
  selectedSort,
  onSelectSort,
}) => {
  const categories = [
    { id: 'All', label: 'All Categories' },
    { id: 'llm-reasoning', label: 'LLM & Reasoning' },
    { id: 'developer-tools', label: 'Developer Tools' },
    { id: 'search-research', label: 'Search & Research' },
    { id: 'open-weights', label: 'Open Weights' },
    { id: 'multimodal-vision', label: 'Multimodal & Vision' },
    { id: 'audio-speech', label: 'Audio & Speech' },
  ];

  const pricingModels = [
    { id: 'All', label: 'All Pricing' },
    { id: 'Free', label: 'Free Tier / Open' },
    { id: 'Paid', label: 'Paid / Subscription' },
  ];

  const sortOptions = [
    { id: 'default', label: 'Featured & Rating' },
    { id: 'sweBench', label: 'SWE-Bench Score' },
    { id: 'rating', label: 'User Rating' },
    { id: 'priceAsc', label: 'Price: Low to High' },
    { id: 'priceDesc', label: 'Price: High to Low' },
    { id: 'trending', label: 'Most Popular' },
  ];

  return (
    <aside className="w-full lg:w-64 p-5 rounded-2xl bg-[#0b0e14] border border-white/10 space-y-6 shrink-0">
      {/* Category Section */}
      <div>
        <h4 className="text-xs font-semibold text-[#e0e2eb] uppercase font-mono-code mb-3 tracking-wider">
          Architecture
        </h4>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#7bd0ff]/15 text-[#7bd0ff] border border-[#7bd0ff]/30'
                  : 'text-[#908fa0] hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div>
        <h4 className="text-xs font-semibold text-[#e0e2eb] uppercase font-mono-code mb-3 tracking-wider">
          Pricing Model
        </h4>
        <div className="space-y-1">
          {pricingModels.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPricing(p.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedPricing === p.id
                  ? 'bg-[#8083ff]/15 text-[#c0c1ff] border border-[#8083ff]/30'
                  : 'text-[#908fa0] hover:text-white hover:bg-white/5'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting */}
      <div>
        <h4 className="text-xs font-semibold text-[#e0e2eb] uppercase font-mono-code mb-3 tracking-wider">
          Sort Order
        </h4>
        <select
          value={selectedSort}
          onChange={(e) => onSelectSort(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-[#191c22] border border-white/10 text-xs text-[#e0e2eb] focus:outline-none focus:border-[#7bd0ff]"
        >
          {sortOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};
