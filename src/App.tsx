import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SummaryStats } from './components/SummaryStats';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { FloatingActionBar } from './components/FloatingActionBar';
import { BuilderDirectoryCard } from './components/BuilderDirectoryCard';
import { RecommendedAlternativesCard } from './components/RecommendedAlternativesCard';
import { ToolSubmissionModal } from './components/ToolSubmissionModal';
import { AddToolModal } from './components/AddToolModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { DeepDiveModal } from './components/DeepDiveModal';
import { AuthModal } from './components/AuthModal';
import { DirectoryView } from './components/DirectoryView';
import { Footer } from './components/Footer';
import { INITIAL_TOOLS, CATALOG_TOOLS } from './data/toolsData';
import { AITool } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('compare');
  const [activeTools, setActiveTools] = useState<AITool[]>(INITIAL_TOOLS);
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Modals state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAddToolModalOpen, setIsAddToolModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isDeepDiveModalOpen, setIsDeepDiveModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Keyboard shortcut ⌘K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Remove a tool from active comparison
  const handleRemoveTool = (id: string) => {
    if (activeTools.length <= 1) {
      showToast('At least one model must remain in the comparison matrix.');
      return;
    }
    const removed = activeTools.find((t) => t.id === id);
    setActiveTools((prev) => prev.filter((t) => t.id !== id));
    if (removed) {
      showToast(`Removed ${removed.name} from comparison.`);
    }
  };

  // Add a tool to active comparison
  const handleAddTool = (tool: AITool) => {
    if (activeTools.some((t) => t.id === tool.id)) {
      showToast(`${tool.name} is already in the comparison.`);
      return;
    }
    setActiveTools((prev) => [...prev, tool]);
    showToast(`Added ${tool.name} to the comparison matrix.`);
  };

  // Swap in a recommended alternative
  const handleSwapIn = (toolId: string) => {
    const replacement = CATALOG_TOOLS.find((t) => t.id === toolId);
    if (!replacement) return;

    if (activeTools.some((t) => t.id === toolId)) {
      showToast(`${replacement.name} is already active in the matrix.`);
      return;
    }

    if (activeTools.length < 5) {
      setActiveTools((prev) => [...prev, replacement]);
      showToast(`Added ${replacement.name} to the comparison matrix.`);
    } else {
      // Replace the last item
      const replaced = activeTools[activeTools.length - 1];
      setActiveTools((prev) => [...prev.slice(0, prev.length - 1), replacement]);
      showToast(`Swapped ${replaced.name} with ${replacement.name}.`);
    }
  };

  // Reset to default 4 foundational models
  const handleReset = () => {
    setActiveTools(INITIAL_TOOLS);
    setHighlightDifferences(false);
    showToast('Reset comparison matrix to foundational profiles.');
  };

  // Toggle tool in compare from directory
  const handleToggleCompare = (tool: AITool) => {
    if (activeTools.some((t) => t.id === tool.id)) {
      handleRemoveTool(tool.id);
    } else {
      handleAddTool(tool);
    }
  };

  return (
    <div className="bg-[#10131a] text-[#e0e2eb] min-h-screen flex flex-col antialiased selection:bg-[#8083ff] selection:text-[#0d0096]">
      {/* Toast banner */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1d2026] border border-[#7bd0ff]/40 text-[#e0e2eb] text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-sm text-[#7bd0ff]">
            info
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenSubmit={() => setIsSubmitModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1 bg-[#10131a]">
        {activeTab === 'compare' ? (
          <div className="flex flex-col w-full">
            <div className="relative w-full max-w-[84rem] mx-auto px-4 md:px-6 pt-8 pb-16 overflow-hidden">
              {/* Radial backdrop illumination */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#8083ff]/20 via-[#7bd0ff]/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

              {/* Title & Controls Row */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div className="flex flex-col max-w-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#272a31] text-[#7bd0ff] font-mono-code text-[11px] tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7bd0ff] animate-pulse" />
                      Telemetry Matrix v2.4
                    </span>
                    <span className="text-[#908fa0] font-mono-code text-[11px]">
                      / {activeTools.length} Models Selected
                    </span>
                  </div>
                  <h1 className="font-headline text-[32px] md:text-[40px] font-bold text-[#e0e2eb] tracking-tight">
                    Compare AI Tools Side-by-Side
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#c7c4d7] mt-1.5 leading-relaxed">
                    Evaluate capabilities, benchmarks, pricing, and integrations before choosing your computational stack.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
                  {/* Highlight Differences Button */}
                  <button
                    onClick={() => {
                      const next = !highlightDifferences;
                      setHighlightDifferences(next);
                      showToast(next ? 'Highlighting differences across models' : 'Difference highlighting turned off');
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-xs transition-all shadow-sm active:scale-95 ${
                      highlightDifferences
                        ? 'bg-[#8083ff] text-[#0d0096] shadow-[0_0_15px_rgba(128,131,255,0.4)]'
                        : 'bg-[#272a31] text-[#e0e2eb] hover:bg-[#363940]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm text-[#7bd0ff]">
                      difference
                    </span>
                    <span>Highlight Differences</span>
                  </button>

                  {/* Reset Button */}
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1d2026] text-[#c7c4d7] hover:text-[#e0e2eb] hover:bg-[#272a31] font-semibold text-xs transition-all active:scale-95"
                    title="Reset to default models"
                  >
                    <span className="material-symbols-outlined text-sm">restart_alt</span>
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Summary Stats 4-Card Grid */}
              <SummaryStats activeTools={activeTools} />

              {/* Foundational Profiles Comparison Matrix */}
              <ComparisonMatrix
                activeTools={activeTools}
                highlightDifferences={highlightDifferences}
                onRemoveTool={handleRemoveTool}
                onOpenAddTool={() => setIsAddToolModalOpen(true)}
              />

              {/* Floating Bottom Action Bar */}
              <FloatingActionBar
                modelCount={activeTools.length}
                onOpenDeepDive={() => setIsDeepDiveModalOpen(true)}
                onExportPdf={() => {
                  showToast('Preparing printable matrix layout...');
                  window.print();
                }}
              />

              {/* Lower 2-column modules: Builder Directory & Recommended Alternatives */}
              <div className="mt-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-5">
                  <BuilderDirectoryCard onOpenSubmit={() => setIsSubmitModalOpen(true)} />
                </div>
                <div className="lg:col-span-7">
                  <RecommendedAlternativesCard
                    onSwapIn={handleSwapIn}
                    onBrowseAll={() => setIsAddToolModalOpen(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Secondary Directory Views */
          <DirectoryView
            currentTab={activeTab}
            activeTools={activeTools}
            onToggleCompare={handleToggleCompare}
            onGoToCompare={() => setActiveTab('compare')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavClick={(tab) => setActiveTab(tab)}
        onOpenSubmit={() => setIsSubmitModalOpen(true)}
      />

      {/* Modals */}
      <ToolSubmissionModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitSuccess={(name) => {
          showToast(`Successfully submitted "${name}" for automated crawling!`);
        }}
      />

      <AddToolModal
        isOpen={isAddToolModalOpen}
        onClose={() => setIsAddToolModalOpen(false)}
        activeToolIds={activeTools.map((t) => t.id)}
        onSelectTool={handleAddTool}
      />

      <QuickSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectTool={(tool) => {
          handleAddTool(tool);
          setActiveTab('compare');
        }}
      />

      <DeepDiveModal
        isOpen={isDeepDiveModalOpen}
        onClose={() => setIsDeepDiveModalOpen(false)}
        activeTools={activeTools}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(email) => {
          showToast(`Welcome back, ${email || 'Developer'}! Active telemetry unlocked.`);
        }}
      />
    </div>
  );
}
