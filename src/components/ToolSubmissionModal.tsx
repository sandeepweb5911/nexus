import React, { useState } from 'react';

interface ToolSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (toolName: string) => void;
}

export const ToolSubmissionModal: React.FC<ToolSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [domain, setDomain] = useState('Large Language Model');
  const [pricingModel, setPricingModel] = useState('Freemium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(name);
      setName('');
      setUrl('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0e14]/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-[#1d2026] border border-white/10 shadow-2xl p-6 md:p-8 relative flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#908fa0] hover:text-[#e0e2eb] p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-[#8083ff]/20 flex items-center justify-center text-[#c0c1ff]">
            <span className="material-symbols-outlined text-lg">add_circle</span>
          </div>
          <h3 className="font-headline text-[22px] font-semibold text-[#e0e2eb] tracking-tight">
            Submit Tool to Nexus
          </h3>
        </div>

        <p className="text-[13px] text-[#c7c4d7] mb-6">
          Enter preliminary meta details. Our crawler checks API endpoints within 2 hours.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#e0e2eb] mb-1.5">
              Product or Model Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Meta Llama 4 Scout"
              className="w-full px-3 py-2.5 rounded-lg bg-[#191c22] border border-white/10 text-[#e0e2eb] text-[13px] placeholder:text-[#908fa0] focus:outline-none focus:border-[#7bd0ff] focus:bg-[#32353c]/40 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#e0e2eb] mb-1.5">
              Primary URL
            </label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2.5 rounded-lg bg-[#191c22] border border-white/10 text-[#e0e2eb] text-[13px] placeholder:text-[#908fa0] focus:outline-none focus:border-[#7bd0ff] focus:bg-[#32353c]/40 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#e0e2eb] mb-1.5">
                Core Domain
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#191c22] border border-white/10 text-[#e0e2eb] text-[13px] focus:outline-none focus:border-[#7bd0ff]"
              >
                <option value="Large Language Model">Large Language Model</option>
                <option value="Autonomous Agent / Coding">Autonomous Agent / Coding</option>
                <option value="Vision & Image Generation">Vision & Image Generation</option>
                <option value="Vector Infrastructure">Vector Infrastructure</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#e0e2eb] mb-1.5">
                Pricing Model
              </label>
              <select
                value={pricingModel}
                onChange={(e) => setPricingModel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#191c22] border border-white/10 text-[#e0e2eb] text-[13px] focus:outline-none focus:border-[#7bd0ff]"
              >
                <option value="Freemium">Freemium</option>
                <option value="Open Weights (Free)">Open Weights (Free)</option>
                <option value="Pay-per-token API">Pay-per-token API</option>
                <option value="Commercial SaaS">Commercial SaaS</option>
              </select>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#191c22]/70 border border-white/5 flex items-center gap-2 mt-1">
            <span className="material-symbols-outlined text-[#7bd0ff] text-base">verified</span>
            <span className="text-[12px] text-[#908fa0]">
              Automated telemetry crawl extracts context tokens, SWE-bench and pricing.
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 py-3 rounded-xl bg-gradient-to-r from-[#00a6e0] via-[#8083ff] to-[#b76dff] text-white text-xs font-semibold shadow-lg hover:shadow-[#8083ff]/30 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Verifying Crawler Specs...</span>
              </>
            ) : (
              <span>Submit for Editorial Review</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
