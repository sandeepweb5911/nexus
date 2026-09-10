import React, { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenSubmit: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenSubmit,
  onOpenAuth,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { id: 'discover', label: 'Discover' },
    { id: 'categories', label: 'Categories' },
    { id: 'trending', label: 'Trending' },
    { id: 'new-tools', label: 'New Tools' },
    { id: 'compare', label: 'Compare' },
    { id: 'deals', label: 'Deals' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0e14]/85 backdrop-blur-xl border-b border-white/10">
      <div className="h-20 max-w-[84rem] mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('compare')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <img
              alt="AI Nexus Brand Mark"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1W8nEpbencAAAqfb_8fF3CaFK9nQPvF3rg69c5XrR26gMIyLhqvoquXkSq-03Fmdz3U2Prs3Fv20zJyFcmN1fVcm-k_YMeS9Kb_ewCj-jJ3tRp19HWdbrAKeVmtH6-QMTjSQjewndAQTKXhBCkzsIHPhuqgLYJiKZuZj6FDFwBgWAn_gQ2HjXiAgwimXPdaBT0h6S-qfeEs00yXLy88YFt5BwQUqRQ7NBZNddgC5c6jLuTfFyHi_p0hLwE"
            />
            <span className="font-headline text-[18px] md:text-[20px] font-semibold text-[#e0e2eb] tracking-tight">
              AI Nexus
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#272a31] text-[#c0c1ff]'
                    : 'text-[#c7c4d7] hover:text-[#e0e2eb] hover:bg-[#272a31]/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#272a31]/60 border border-white/10 text-[#c7c4d7] hover:text-[#e0e2eb] hover:border-[#7bd0ff]/40 transition-all text-left shadow-inner group"
          >
            <span className="material-symbols-outlined text-[16px] text-[#7bd0ff] group-hover:scale-110 transition-transform">
              search
            </span>
            <span className="text-[13px]">Search...</span>
            <kbd className="font-mono-code text-[11px] bg-[#1d2026] px-1.5 py-0.5 rounded border border-white/10 text-[#908fa0]">
              ⌘K
            </kbd>
          </button>

          {/* Submit Tool Button */}
          <button
            onClick={onOpenSubmit}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#7bd0ff] bg-[#1d2026] border border-[#7bd0ff]/30 hover:border-[#7bd0ff] shadow-[0_0_12px_rgba(123,208,255,0.15)] hover:shadow-[0_0_20px_rgba(123,208,255,0.3)] transition-all"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            <span>Submit Tool</span>
          </button>

          {/* Sign In */}
          <button
            onClick={onOpenAuth}
            className="hidden sm:inline-block text-xs font-semibold text-[#c7c4d7] hover:text-[#e0e2eb] transition-colors px-2"
          >
            Sign In
          </button>

          {/* Get Started Button with Avatar */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full bg-gradient-to-r from-[#00a6e0] via-[#8083ff] to-[#b76dff] text-white text-xs font-semibold shadow-[0_0_20px_rgba(128,131,255,0.4)] hover:shadow-[0_0_28px_rgba(128,131,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span className="font-semibold text-white">Get Started</span>
            <img
              alt="Profile"
              className="w-7 h-7 rounded-full object-cover ring-2 ring-white/20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQeSaya8_nFBUKMHHO1n7QGM67fgCWEbYfh6dR3RC2kVFFImjOyJBBDemxP4VVuWkP86hZnGgaRXRgtaAugYddZ9o4BBfGhFtPawwFQOQ4XLI_Xf6NmSb7JLvAt_DocrhMkvqWGUEXChp-UV_9nMCG2j0HPaOkHcdVRgazg-zhMhkwn8Lq42yOlQF3M-YapoOvUEyVL1G2jbZbQ7sz3isI0CBloh_ysMxbz7bNl4FtkHpTXnXF32KMFQ"
            />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="xl:hidden p-2 text-[#c7c4d7] hover:text-white rounded-lg hover:bg-[#272a31]"
          >
            <span className="material-symbols-outlined">
              {mobileNavOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#0b0e14] px-4 py-3 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileNavOpen(false);
              }}
              className={`px-3 py-2 text-sm font-semibold rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-[#272a31] text-[#c0c1ff]'
                  : 'text-[#c7c4d7] hover:text-[#e0e2eb]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex gap-2">
            <button
              onClick={() => {
                onOpenSearch();
                setMobileNavOpen(false);
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-[#1d2026] text-xs font-semibold text-center text-[#7bd0ff]"
            >
              Search ⌘K
            </button>
            <button
              onClick={() => {
                onOpenSubmit();
                setMobileNavOpen(false);
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-[#272a31] text-xs font-semibold text-center text-white"
            >
              Submit Tool
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
