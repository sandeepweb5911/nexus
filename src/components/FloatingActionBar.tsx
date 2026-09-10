import React, { useState } from 'react';

interface FloatingActionBarProps {
  modelCount: number;
  onOpenDeepDive: () => void;
  onExportPdf: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  modelCount,
  onOpenDeepDive,
  onExportPdf,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sticky bottom-6 z-30 w-full flex justify-center mt-6 px-4 pointer-events-none">
      <div className="flex items-center justify-between gap-4 p-2 pl-4 pr-2 rounded-full bg-[#32353c]/90 backdrop-blur-2xl border border-white/10 shadow-2xl max-w-2xl w-full pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7bd0ff] animate-pulse" />
          <span className="text-xs font-semibold text-[#e0e2eb] hidden sm:inline">
            Active Session: {modelCount} Models locked
          </span>
          <span className="text-xs font-semibold text-[#e0e2eb] sm:hidden">
            {modelCount} Models
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Share Link */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#272a31] hover:bg-[#363940] text-xs font-semibold text-[#e0e2eb] transition-all border border-white/5 active:scale-95"
            title="Copy comparison URL to clipboard"
          >
            <span className="material-symbols-outlined text-[15px] text-[#7bd0ff]">
              {copied ? 'done' : 'link'}
            </span>
            <span>{copied ? 'Copied!' : 'Share Link'}</span>
          </button>

          {/* Export PDF */}
          <button
            onClick={onExportPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#272a31] hover:bg-[#363940] text-xs font-semibold text-[#e0e2eb] transition-all border border-white/5 active:scale-95"
            title="Export view to PDF format"
          >
            <span className="material-symbols-outlined text-[15px]">download</span>
            <span className="hidden xs:inline">Export PDF</span>
          </button>

          {/* Deep Dive */}
          <button
            onClick={onOpenDeepDive}
            className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00a6e0] via-[#8083ff] to-[#b76dff] text-white text-xs font-semibold shadow-lg hover:shadow-[#8083ff]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
            <span>Deep Dive</span>
          </button>
        </div>
      </div>
    </div>
  );
};
