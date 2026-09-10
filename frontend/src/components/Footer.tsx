'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  onNavClick?: (tab: string) => void;
  onOpenSubmit?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenSubmit }) => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0b0e14] text-[#908fa0] text-xs mt-auto">
      <div className="max-w-[84rem] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                alt="AI Nexus"
                className="h-6 w-auto"
                src="https://lh3.googleusercontent.com/aida/AEtjO1W8nEpbencAAAqfb_8fF3CaFK9nQPvF3rg69c5XrR26gMIyLhqvoquXkSq-03Fmdz3U2Prs3Fv20zJyFcmN1fVcm-k_YMeS9Kb_ewCj-jJ3tRp19HWdbrAKeVmtH6-QMTjSQjewndAQTKXhBCkzsIHPhuqgLYJiKZuZj6FDFwBgWAn_gQ2HjXiAgwimXPdaBT0h6S-qfeEs00yXLy88YFt5BwQUqRQ7NBZNddgC5c6jLuTfFyHi_p0hLwE"
              />
              <span className="font-headline font-bold text-sm text-[#e0e2eb]">AI Nexus</span>
            </div>
            <p className="text-[12px] text-[#c7c4d7] leading-relaxed">
              Standardized computational intelligence directory and side-by-side benchmark matrix.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#e0e2eb] mb-3 uppercase tracking-wider text-[11px] font-mono-code">
              Directory
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavClick && onNavClick('discover')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Explore Models
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick && onNavClick('trending')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Verified SWE-Bench Leaders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick && onNavClick('deals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Developer Grants
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#e0e2eb] mb-3 uppercase tracking-wider text-[11px] font-mono-code">
              Builders
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenSubmit}
                  className="hover:text-[#7bd0ff] transition-colors cursor-pointer"
                >
                  Submit Tool to Crawler
                </button>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Telemetry Management
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#e0e2eb] mb-3 uppercase tracking-wider text-[11px] font-mono-code">
              Telemetry Status
            </h4>
            <div className="p-3 rounded-xl bg-[#191c22] border border-white/5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-[#e0e2eb] font-mono-code">
                  Crawler Engine: Operational
                </span>
              </div>
              <p className="text-[11px] text-[#908fa0]">
                Syncing with Node.js Express & PostgreSQL backend.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <span>© 2026 AI Nexus Directory Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Terms</span>
            <span className="hover:underline cursor-pointer">Security Compliance</span>
            <span className="hover:underline cursor-pointer">Enterprise SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
