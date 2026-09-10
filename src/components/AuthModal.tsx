import React, { useState } from 'react';
import api from '../lib/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const res = await api.auth.register({ email, password, name });
        if (res.data?.token) {
          api.setToken(res.data.token);
        }
      } else {
        const res = await api.auth.login({ email, password });
        if (res.data?.token) {
          api.setToken(res.data.token);
        }
      }
      onSuccess(email);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0e14]/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#1d2026] border border-white/10 shadow-2xl p-6 md:p-8 relative flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#908fa0] hover:text-[#e0e2eb] p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center gap-3 mb-2">
          <img
            alt="AI Nexus"
            className="h-7 w-auto"
            src="https://lh3.googleusercontent.com/aida/AEtjO1W8nEpbencAAAqfb_8fF3CaFK9nQPvF3rg69c5XrR26gMIyLhqvoquXkSq-03Fmdz3U2Prs3Fv20zJyFcmN1fVcm-k_YMeS9Kb_ewCj-jJ3tRp19HWdbrAKeVmtH6-QMTjSQjewndAQTKXhBCkzsIHPhuqgLYJiKZuZj6FDFwBgWAn_gQ2HjXiAgwimXPdaBT0h6S-qfeEs00yXLy88YFt5BwQUqRQ7NBZNddgC5c6jLuTfFyHi_p0hLwE"
          />
          <h3 className="font-headline text-[20px] font-semibold text-[#e0e2eb]">
            {isSignUp ? 'Create Nexus Account' : 'Sign in to AI Nexus'}
          </h3>
        </div>

        <p className="text-[13px] text-[#c7c4d7] mb-6">
          Access telemetry feeds, benchmark bookmarks, and custom stack configurations.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-[#e0e2eb] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Turing"
                className="w-full px-3 py-2.5 rounded-lg bg-[#191c22] border border-white/10 text-[#e0e2eb] text-[13px] placeholder:text-[#908fa0] focus:outline-none focus:border-[#7bd0ff]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#e0e2eb] mb-1.5">
              Work Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="engineer@company.com"
              className="w-full px-3 py-2.5 rounded-lg bg-[#191c22] border border-white/10 text-[#e0e2eb] text-[13px] placeholder:text-[#908fa0] focus:outline-none focus:border-[#7bd0ff]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#e0e2eb] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2.5 rounded-lg bg-[#191c22] border border-white/10 text-[#e0e2eb] text-[13px] placeholder:text-[#908fa0] focus:outline-none focus:border-[#7bd0ff]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[#00a6e0] via-[#8083ff] to-[#b76dff] text-white text-xs font-semibold shadow hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>{isSignUp ? 'Create Account' : 'Continue with Email'}</span>
            )}
          </button>
        </form>

        <div className="mt-4 p-2.5 rounded-lg bg-[#191c22]/50 border border-white/5 text-[11px] font-mono-code text-[#908fa0]">
          <span>Demo Account: </span>
          <span className="text-[#7bd0ff]">admin@nexus.ai</span> / <span className="text-[#7bd0ff]">AdminPassword123!</span>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 text-center text-[12px] text-[#908fa0]">
          {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-[#7bd0ff] font-semibold hover:underline ml-1 cursor-pointer"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};
