import React, { useState } from 'react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenSubmit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenSubmit }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3500);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#0b0e14] border-t border-white/10 mt-auto">
      <div className="max-w-[84rem] mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12 mb-12">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="AI Nexus Brand Mark"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1W8nEpbencAAAqfb_8fF3CaFK9nQPvF3rg69c5XrR26gMIyLhqvoquXkSq-03Fmdz3U2Prs3Fv20zJyFcmN1fVcm-k_YMeS9Kb_ewCj-jJ3tRp19HWdbrAKeVmtH6-QMTjSQjewndAQTKXhBCkzsIHPhuqgLYJiKZuZj6FDFwBgWAn_gQ2HjXiAgwimXPdaBT0h6S-qfeEs00yXLy88YFt5BwQUqRQ7NBZNddgC5c6jLuTfFyHi_p0hLwE"
              />
              <span className="font-headline text-[20px] font-semibold text-[#e0e2eb]">
                AI Nexus
              </span>
            </div>

            <p className="text-[13px] text-[#c7c4d7] max-w-sm leading-relaxed">
              The vanguard directory indexing frontier artificial intelligence, neural frameworks, and autonomous tooling across the machine learning sphere.
            </p>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-xs font-semibold text-[#e0e2eb]">
                Get the best AI tools in your inbox
              </span>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  className="w-full bg-[#191c22] border border-white/10 rounded-lg px-3 py-2 text-[13px] text-[#e0e2eb] placeholder:text-[#908fa0] focus:outline-none focus:border-[#7bd0ff] transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#8083ff] hover:bg-[#8083ff]/90 text-[#0d0096] text-xs font-bold transition-opacity shrink-0 active:scale-95"
                >
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>

          {/* Explore Column */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-[#e0e2eb] uppercase tracking-wider">
              Explore
            </span>
            <ul className="flex flex-col gap-2 text-[13px] text-[#c7c4d7]">
              <li>
                <button
                  onClick={() => onNavClick('discover')}
                  className="hover:text-[#7bd0ff] transition-colors text-left"
                >
                  AI Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('categories')}
                  className="hover:text-[#7bd0ff] transition-colors text-left"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('trending')}
                  className="hover:text-[#7bd0ff] transition-colors text-left"
                >
                  Trending
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('new-tools')}
                  className="hover:text-[#7bd0ff] transition-colors text-left"
                >
                  New Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('compare')}
                  className="hover:text-[#7bd0ff] transition-colors text-left"
                >
                  Compare
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('deals')}
                  className="hover:text-[#7bd0ff] transition-colors text-left"
                >
                  Deals
                </button>
              </li>
            </ul>
          </div>

          {/* For Developers */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-[#e0e2eb] uppercase tracking-wider">
              For Developers
            </span>
            <ul className="flex flex-col gap-2 text-[13px] text-[#c7c4d7]">
              <li>
                <button
                  onClick={onOpenSubmit}
                  className="hover:text-[#7bd0ff] transition-colors text-left"
                >
                  Submit Tool
                </button>
              </li>
              <li>
                <a href="#api" className="hover:text-[#7bd0ff] transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#guidelines" className="hover:text-[#7bd0ff] transition-colors">
                  Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-[#e0e2eb] uppercase tracking-wider">
              Company
            </span>
            <ul className="flex flex-col gap-2 text-[13px] text-[#c7c4d7]">
              <li>
                <a href="#about" className="hover:text-[#7bd0ff] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#7bd0ff] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#7bd0ff] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#advertise" className="hover:text-[#7bd0ff] transition-colors">
                  Advertise
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-[#e0e2eb] uppercase tracking-wider">
              Legal
            </span>
            <ul className="flex flex-col gap-2 text-[13px] text-[#c7c4d7]">
              <li>
                <a href="#privacy" className="hover:text-[#7bd0ff] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#7bd0ff] transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#cookie" className="hover:text-[#7bd0ff] transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#affiliate" className="hover:text-[#7bd0ff] transition-colors">
                  Affiliate Disclosure
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[13px] text-[#908fa0]">
            © 2026 AI Nexus Inc. Engineered for the computational intelligence era.
          </span>
          <div className="flex items-center gap-4 text-[#c7c4d7]">
            <a
              href="#network"
              aria-label="Global Network"
              className="hover:text-[#7bd0ff] transition-colors"
            >
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
            <a
              href="#terminal"
              aria-label="Community Terminal"
              className="hover:text-[#7bd0ff] transition-colors"
            >
              <span className="material-symbols-outlined text-lg">terminal</span>
            </a>
            <a
              href="#rss"
              aria-label="RSS Feed"
              className="hover:text-[#7bd0ff] transition-colors"
            >
              <span className="material-symbols-outlined text-lg">rss_feed</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
