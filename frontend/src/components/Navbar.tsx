'use client';

import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenSubmit?: () => void;
  onOpenAuth?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenSubmit,
  onOpenAuth,
  activeTab = 'compare',
  setActiveTab,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#10131a]/85 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-[84rem] mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              alt="AI Nexus"
              className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1W8nEpbencAAAqfb_8fF3CaFK9nQPvF3rg69c5XrR26gMIyLhqvoquXkSq-03Fmdz3U2Prs3Fv20zJyFcmN1fVcm-k_YMeS9Kb_ewCj-jJ3tRp19HWdbrAKeVmtH6-QMTjSQjewndAQTKXhBCkzsIHPhuqgLYJiKZuZj6FDFwBgWAn_gQ2HjXiAgwimXPdaBT0h6S-qfeEs00yXLy88YFt5BwQUqRQ7NBZNddgC5c6jLuTfFyHi_p0hLwE"
            />
            <span className="font-headline font-bold text-lg tracking-tight text-[#e0e2eb] hidden sm:inline">
              AI Nexus
            </span>
          </Link>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'compare', label: 'Compare Matrix' },
              { id: 'discover', label: 'Explore Directory' },
              { id: 'trending', label: 'Trending' },
              { id: 'deals', label: 'Deals & Grants' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab && setActiveTab(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'text-white bg-white/10'
                    : 'text-[#908fa0] hover:text-[#e0e2eb] hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Link
              href="/admin"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#908fa0] hover:text-[#7bd0ff] hover:bg-white/5 transition-colors"
            >
              Admin
            </Link>
          </nav>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#191c22] hover:bg-[#272a31] border border-white/10 text-xs text-[#908fa0] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#7bd0ff]">search</span>
            <span className="hidden sm:inline">Search AI tools...</span>
            <kbd className="hidden lg:inline-block font-mono-code text-[10px] bg-[#10131a] px-1 rounded border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Submit Tool Button */}
          <button
            onClick={onOpenSubmit}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#191c22] hover:bg-[#272a31] border border-white/10 text-xs font-semibold text-[#e0e2eb] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#7bd0ff]">add_circle</span>
            <span>Submit Tool</span>
          </button>

          {/* Sign In Button */}
          <button
            onClick={onOpenAuth}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00a6e0] to-[#8083ff] text-white text-xs font-semibold shadow hover:opacity-95 active:scale-95 transition-all cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};
