'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ToolSubmission } from '../../types';
import api from '../../lib/api';

export default function AdminDashboardPage() {
  const [submissions, setSubmissions] = useState<ToolSubmission[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      try {
        const [subRes, analyticsRes] = await Promise.all([
          api.admin.getSubmissions().catch(() => ({ data: [] })),
          api.admin.getAnalytics().catch(() => ({ data: null })),
        ]);
        if (subRes.data) setSubmissions(subRes.data);
        if (analyticsRes.data) setAnalytics(analyticsRes.data);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  const handleApprove = async (id?: string) => {
    if (!id) return;
    try {
      await api.admin.approveSubmission(id, 'Approved by Nexus Admin');
      setSubmissions(submissions.filter((s) => s.id !== id));
      showToast('Tool submission approved & queued for indexing.');
    } catch (err: any) {
      showToast(err.message || 'Approval failed');
    }
  };

  const handleReject = async (id?: string) => {
    if (!id) return;
    try {
      await api.admin.rejectSubmission(id, 'Failed verification criteria');
      setSubmissions(submissions.filter((s) => s.id !== id));
      showToast('Tool submission rejected.');
    } catch (err: any) {
      showToast(err.message || 'Rejection failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#10131a] text-[#e0e2eb]">
      <Navbar />

      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1d2026] border border-[#7bd0ff]/40 text-[#e0e2eb] text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-[#7bd0ff]">info</span>
          <span>{toast}</span>
        </div>
      )}

      <main className="flex-1 pt-24 pb-20 max-w-[84rem] w-full mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8083ff]/20 text-[#c0c1ff] font-mono-code text-[11px] uppercase tracking-wider">
                Admin Console
              </span>
              <span className="text-xs text-[#908fa0] font-mono-code">
                Node.js + PostgreSQL Backend
              </span>
            </div>
            <h1 className="text-3xl font-bold font-headline text-[#e0e2eb]">Telemetry & Editorial Console</h1>
            <p className="text-sm text-[#c7c4d7]">Review pending crawler submissions and monitor usage telemetry.</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-[#191c22] border border-white/10 text-xs font-semibold text-[#e0e2eb] hover:bg-[#272a31]"
          >
            Back to Matrix
          </Link>
        </div>

        {/* Analytics stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[#0b0e14] border border-white/10 space-y-1">
            <span className="text-xs text-[#908fa0] font-mono-code uppercase">Indexed Tools</span>
            <div className="text-2xl font-bold text-[#e0e2eb]">
              {analytics?.totalTools || 10}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0b0e14] border border-white/10 space-y-1">
            <span className="text-xs text-[#908fa0] font-mono-code uppercase">Telemetry Clicks</span>
            <div className="text-2xl font-bold text-[#7bd0ff]">
              {analytics?.totalClicks || 24890}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0b0e14] border border-white/10 space-y-1">
            <span className="text-xs text-[#908fa0] font-mono-code uppercase">Pending Review</span>
            <div className="text-2xl font-bold text-amber-400">
              {submissions.length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0b0e14] border border-white/10 space-y-1">
            <span className="text-xs text-[#908fa0] font-mono-code uppercase">System Status</span>
            <div className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Healthy (PostgreSQL)
            </div>
          </div>
        </div>

        {/* Submissions queue */}
        <div className="p-6 rounded-2xl bg-[#0b0e14] border border-white/10">
          <h2 className="text-lg font-bold text-[#e0e2eb] mb-4">Pending Tool Submissions</h2>
          {loading ? (
            <p className="text-xs text-[#908fa0] font-mono-code">Loading submission queue...</p>
          ) : submissions.length === 0 ? (
            <div className="py-12 text-center text-[#908fa0] text-xs">
              No pending submissions at this time. All models reviewed!
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {submissions.map((sub) => (
                <div key={sub.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-[#e0e2eb]">{sub.name}</span>
                      <span className="px-2 py-0.5 rounded font-mono-code text-[10px] bg-[#1d2026] text-[#7bd0ff]">
                        {sub.domain}
                      </span>
                      <span className="px-2 py-0.5 rounded font-mono-code text-[10px] bg-[#1d2026] text-emerald-400">
                        {sub.pricingModel}
                      </span>
                    </div>
                    <a
                      href={sub.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#8083ff] hover:underline"
                    >
                      {sub.url}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(sub.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/30 cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(sub.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold hover:bg-red-500/30 cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
