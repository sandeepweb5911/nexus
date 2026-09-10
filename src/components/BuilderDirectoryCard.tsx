import React from 'react';

interface BuilderDirectoryCardProps {
  onOpenSubmit: () => void;
}

export const BuilderDirectoryCard: React.FC<BuilderDirectoryCardProps> = ({ onOpenSubmit }) => {
  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#0b0e14] border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden h-full group">
      {/* Ambient background glow */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#8083ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#272a31] border border-white/5 flex items-center justify-center text-[#7bd0ff] shadow-inner">
            <span className="material-symbols-outlined text-2xl">rocket_launch</span>
          </div>
          <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#7bd0ff] font-semibold">
            Builder Directory
          </span>
        </div>

        <h2 className="font-headline text-[22px] md:text-[26px] font-semibold text-[#e0e2eb] tracking-tight leading-snug">
          Submit Your AI Tool to 450k+ Engineers
        </h2>

        <p className="text-[14px] text-[#c7c4d7] mt-3 leading-relaxed">
          Fast-track indexation on AI Nexus. Reach autonomous agent developers, technical founders, and enterprise technology buyers searching for specialized models.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="p-3.5 rounded-lg bg-[#191c22] border border-white/5 flex flex-col">
            <span className="font-headline text-[18px] md:text-[20px] text-[#c0c1ff] font-bold">
              24-48h
            </span>
            <span className="text-[12px] text-[#908fa0] mt-0.5">Editorial Verification</span>
          </div>
          <div className="p-3.5 rounded-lg bg-[#191c22] border border-white/5 flex flex-col">
            <span className="font-headline text-[18px] md:text-[20px] text-[#7bd0ff] font-bold">
              DoFollow
            </span>
            <span className="text-[12px] text-[#908fa0] mt-0.5">Domain Authority 78</span>
          </div>
        </div>
      </div>

      <div className="pt-8 mt-6 border-t border-white/5 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex -space-x-2 overflow-hidden">
            <img
              className="w-8 h-8 rounded-full ring-2 ring-[#0b0e14] object-cover"
              alt="Founder"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuABFNM7b2UX8aU1ifMIQv8rK8PaEFBRcaBeEdeKwBrZqz_Swnp8-Rgt3rftu5vyycv5w1P0YgEdwGZ5GIlWm_LwJkqQiXOe2tcJfLGFb_71_dWHsEc6fEBtLzYaD4JT-BuUJy8LZKJCFgL5GAKxExIo1A8uWtSNxNNFlyH4HfrZfkiPw9Xsm1-6rDUyIP1xn3XXxCONRRUa54C5WGLHSCFaSQZa4CkLlDBe_K2DyKQtkDHYD-VJCFDAiA"
            />
            <img
              className="w-8 h-8 rounded-full ring-2 ring-[#0b0e14] object-cover"
              alt="Researcher"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxwP4JcOgEzhUQfSoR1DJGHTnWmC6LjzquIabZNFA5ciI-X-EI1MrsDxrS-eUZIdippAIRFfEc7pkfBqX-uiv69yl_ViQPb21B7AEnr7i5D4G4W5hGVXZ8vfcI_WrWeM_mwxnchAh5FnxSjvNdQnbojoRExObBQwbbj9-_c9nZ0njzlcVmCLRrZPxFPXGE5mqz3Nmo7g6FNzgCEmf1ZS5mRz6Y6h-gr41P1WtXMPcfEy_WupgBFuET5A"
            />
            <img
              className="w-8 h-8 rounded-full ring-2 ring-[#0b0e14] object-cover"
              alt="Tech Leader"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg6JUPLn9AcwnkHhj3bp6GY6cu1BO8Jz-8RSSXvK62uqPqUBtZk5Lb9CC9fqTWb8l4q5Zcx46GF9Qt_aA3099pdw93Ffx3bYJ5KD9lS-4t2VWS9qZanChuje6rnFzDtnNNuWhDVVO9idtVQyXf46zXIbRtb-tZjWnbNnoj6prvds1BTuvUNiH70lusWrvpV5OjySAqhRBEdWTAxFOwPvFvPmOqASc9hTUxUTa4yaG7kRwYvFjtRxcozg"
            />
          </div>
          <span className="text-[13px] text-[#c7c4d7] font-medium">
            32 tools indexed this week
          </span>
        </div>

        <button
          onClick={onOpenSubmit}
          className="w-full py-3 px-4 rounded-xl bg-[#272a31] hover:bg-[#363940] border border-white/10 hover:border-[#7bd0ff]/40 text-[#e0e2eb] font-headline text-[15px] font-semibold transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-[0.99]"
        >
          <span>Open Tool Submission Form</span>
          <span className="material-symbols-outlined text-sm text-[#7bd0ff] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};
