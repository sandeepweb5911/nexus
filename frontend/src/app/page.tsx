'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ToolCard } from '../components/ToolCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { AITool } from '../types';
import api from '../lib/api';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'compare' | 'discover' | 'trending' | 'deals'>('compare');
  const [tools, setTools] = useState<AITool[]>([]);
  const [compareTools, setCompareTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [pricing, setPricing] = useState('All');
  const [sort, setSort] = useState('default');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Modals
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form states for submit modal
  const [subName, setSubName] = useState('');
  const [subUrl, setSubUrl] = useState('');
  const [subDomain, setSubDomain] = useState('Large Language Model');
  const [subPricing, setSubPricing] = useState('Freemium');
  const [subLoading, setSubLoading] = useState(false);

  // Form states for auth modal
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authIsSignUp, setAuthIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch tools & comparison list from the Express backend
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [toolsRes, compareRes] = await Promise.all([
          api.tools.getAll({
            category: category !== 'All' ? category : undefined,
            sort: sort !== 'default' ? sort : undefined,
          }),
          api.compare.get(),
        ]);

        if (toolsRes.data) setTools(toolsRes.data);
        if (compareRes.data) setCompareTools(compareRes.data);
      } catch (err) {
        console.error('API load error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [category, sort]);

  const toggleFavorite = async (id: string) => {
    const updated = new Set(favorites);
    if (updated.has(id)) {
      updated.delete(id);
      setFavorites(updated);
      await api.favorites.remove(id).catch(() => {});
      showToast('Removed from bookmarks');
    } else {
      updated.add(id);
      setFavorites(updated);
      await api.favorites.add(id).catch(() => {});
      showToast('Saved to bookmarks');
    }
  };

  const handleToggleCompare = async (tool: AITool) => {
    const exists = compareTools.some((t) => t.id === tool.id);
    if (exists) {
      if (compareTools.length <= 1) {
        showToast('At least one tool must remain in the matrix.');
        return;
      }
      const updated = compareTools.filter((t) => t.id !== tool.id);
      setCompareTools(updated);
      await api.compare.remove(tool.id).catch(() => {});
      showToast(`Removed ${tool.name} from comparison.`);
    } else {
      const updated = [...compareTools, tool];
      setCompareTools(updated);
      await api.compare.set(updated.map((t) => t.id)).catch(() => {});
      showToast(`Added ${tool.name} to comparison.`);
    }
  };

  const handleSubmitTool = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubLoading(true);
    try {
      await api.submissions.create({
        name: subName,
        url: subUrl,
        domain: subDomain,
        pricingModel: subPricing,
      });
      showToast(`Successfully submitted ${subName} to crawler.`);
      setSubName('');
      setSubUrl('');
      setIsSubmitOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Submission error');
    } finally {
      setSubLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      if (authIsSignUp) {
        const res = await api.auth.register({ email: authEmail, password: authPassword });
        if (res.data?.token) api.setToken(res.data.token);
      } else {
        const res = await api.auth.login({ email: authEmail, password: authPassword });
        if (res.data?.token) api.setToken(res.data.token);
      }
      showToast(`Logged in as ${authEmail}`);
      setIsAuthOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Authentication error');
    } finally {
      setAuthLoading(false);
    }
  };

  const filteredTools = tools.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.provider.toLowerCase().includes(search.toLowerCase()) ||
      t.primaryUseCase.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab: any) => setActiveTab(tab)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1d2026] border border-[#7bd0ff]/40 text-[#e0e2eb] text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-[#7bd0ff]">info</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-20 max-w-[84rem] w-full mx-auto px-4 md:px-6">
        {/* Navigation Tabs Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#272a31] text-[#7bd0ff] font-mono-code text-[11px] uppercase tracking-wider">
                Production Next.js + Express
              </span>
              <span className="text-[#908fa0] text-xs font-mono-code">
                / {tools.length} Tools Indexed
              </span>
            </div>
            <h1 className="font-headline text-[32px] md:text-[38px] font-bold text-[#e0e2eb] tracking-tight">
              {activeTab === 'compare' ? 'Side-by-Side Model Matrix' : 'Directory Ecosystem'}
            </h1>
            <p className="text-[14px] text-[#c7c4d7]">
              Real-time telemetry, context token boundaries, and verified SWE-bench scoring.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'compare'
                  ? 'bg-[#7bd0ff]/20 text-[#7bd0ff] border border-[#7bd0ff]/40'
                  : 'bg-[#191c22] text-[#908fa0] hover:text-white border border-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-sm">compare_arrows</span>
              <span>Comparison Matrix ({compareTools.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('discover')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'discover'
                  ? 'bg-[#7bd0ff]/20 text-[#7bd0ff] border border-[#7bd0ff]/40'
                  : 'bg-[#191c22] text-[#908fa0] hover:text-white border border-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-sm">grid_view</span>
              <span>All Tools</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Comparison Matrix */}
        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0b0e14] shadow-2xl p-6">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-4 text-xs font-mono-code text-[#908fa0] uppercase tracking-wider w-1/5">
                      Benchmark Metric
                    </th>
                    {compareTools.map((t) => (
                      <th key={t.id} className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-[#272a31] flex items-center justify-center text-[#7bd0ff]">
                            <span className="material-symbols-outlined text-xl">{t.icon}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-[#e0e2eb]">{t.name}</div>
                            <div className="text-[11px] font-mono-code text-[#908fa0]">{t.provider}</div>
                          </div>
                          <button
                            onClick={() => handleToggleCompare(t)}
                            className="text-[11px] text-red-400 hover:text-red-300 font-mono-code underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  <tr>
                    <td className="py-4 px-4 font-semibold text-[#908fa0] font-mono-code">
                      SWE-Bench Verified
                    </td>
                    {compareTools.map((t) => (
                      <td key={t.id} className="py-4 px-4 text-center">
                        <span className="text-[15px] font-bold text-[#7bd0ff] font-mono-code">
                          {t.sweBenchScore > 0 ? `${t.sweBenchScore}%` : 'Multimodal'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-4 px-4 font-semibold text-[#908fa0] font-mono-code">
                      Context Tokens
                    </td>
                    {compareTools.map((t) => (
                      <td key={t.id} className="py-4 px-4 text-center font-mono-code text-[#e0e2eb]">
                        {t.contextTokens}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-4 px-4 font-semibold text-[#908fa0] font-mono-code">
                      Pricing & Access
                    </td>
                    {compareTools.map((t) => (
                      <td key={t.id} className="py-4 px-4 text-center">
                        <span className="px-2.5 py-1 rounded-full font-mono-code text-[11px] bg-[#272a31] text-emerald-400">
                          {t.priceMonthly}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-4 px-4 font-semibold text-[#908fa0] font-mono-code">
                      API Rates
                    </td>
                    {compareTools.map((t) => (
                      <td key={t.id} className="py-4 px-4 text-center font-mono-code text-[#c7c4d7]">
                        {t.apiRates}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="py-4 px-4 font-semibold text-[#908fa0] font-mono-code">
                      Data Privacy
                    </td>
                    {compareTools.map((t) => (
                      <td key={t.id} className="py-4 px-4 text-center text-[#908fa0]">
                        {t.privacy}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View Mode 2: Discover / Directory */}
        {activeTab !== 'compare' && (
          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar
              selectedCategory={category}
              onSelectCategory={setCategory}
              selectedPricing={pricing}
              onSelectPricing={setPricing}
              selectedSort={sort}
              onSelectSort={setSort}
            />

            <div className="flex-1 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#908fa0] text-lg">
                  search
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search directory by name, provider, or capability..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0b0e14] rounded-xl text-[13px] text-[#e0e2eb] placeholder:text-[#908fa0] focus:outline-none focus:border-[#7bd0ff] border border-white/10"
                />
              </div>

              {/* Grid */}
              {loading ? (
                <div className="py-16 text-center text-[#7bd0ff] font-mono-code text-xs">
                  Synchronizing directory telemetry from Node.js Express API...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      isComparing={compareTools.some((t) => t.id === tool.id)}
                      isFavorite={favorites.has(tool.id)}
                      onToggleCompare={handleToggleCompare}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Submit Modal */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b0e14]/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#1d2026] border border-white/10 p-6 relative">
            <button
              onClick={() => setIsSubmitOpen(false)}
              className="absolute top-6 right-6 text-[#908fa0] hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-headline text-xl font-bold text-[#e0e2eb] mb-2">Submit Tool to Nexus</h3>
            <p className="text-xs text-[#c7c4d7] mb-6">Submitted models are reviewed and indexed into the PostgreSQL directory.</p>
            <form onSubmit={handleSubmitTool} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-[#e0e2eb]">Tool Name</label>
                <input
                  type="text"
                  required
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#191c22] border border-white/10 text-xs text-[#e0e2eb]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-[#e0e2eb]">Tool URL</label>
                <input
                  type="url"
                  required
                  value={subUrl}
                  onChange={(e) => setSubUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#191c22] border border-white/10 text-xs text-[#e0e2eb]"
                />
              </div>
              <button
                type="submit"
                disabled={subLoading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00a6e0] to-[#8083ff] text-white text-xs font-semibold"
              >
                {subLoading ? 'Submitting...' : 'Submit Tool'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b0e14]/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#1d2026] border border-white/10 p-6 relative">
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-6 right-6 text-[#908fa0] hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-headline text-xl font-bold text-[#e0e2eb] mb-2">
              {authIsSignUp ? 'Create Nexus Account' : 'Sign in to AI Nexus'}
            </h3>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-[#e0e2eb]">Email</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#191c22] border border-white/10 text-xs text-[#e0e2eb]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-[#e0e2eb]">Password</label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#191c22] border border-white/10 text-xs text-[#e0e2eb]"
                />
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00a6e0] to-[#8083ff] text-white text-xs font-semibold"
              >
                {authLoading ? 'Processing...' : authIsSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            <div className="mt-4 text-center text-xs text-[#908fa0]">
              <button
                onClick={() => setAuthIsSignUp(!authIsSignUp)}
                className="text-[#7bd0ff] hover:underline"
              >
                {authIsSignUp ? 'Have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b0e14]/85 backdrop-blur-xl flex items-start justify-center pt-24 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#1d2026] border border-white/10 p-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <span className="material-symbols-outlined text-[#7bd0ff]">search</span>
              <input
                type="text"
                autoFocus
                placeholder="Search models, providers, frameworks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#e0e2eb] focus:outline-none"
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-xs text-[#908fa0]">
                ESC
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto mt-3 space-y-2">
              {filteredTools.slice(0, 5).map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    handleToggleCompare(t);
                    setIsSearchOpen(false);
                  }}
                  className="p-2 rounded-xl hover:bg-white/5 flex items-center justify-between cursor-pointer"
                >
                  <span className="text-xs font-semibold text-[#e0e2eb]">{t.name}</span>
                  <span className="text-[11px] font-mono-code text-[#7bd0ff]">{t.contextTokens}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer onNavClick={(tab) => setActiveTab(tab as any)} onOpenSubmit={() => setIsSubmitOpen(true)} />
    </div>
  );
}
