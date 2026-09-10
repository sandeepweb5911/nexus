'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { Rating, PricingBadge, VerifiedBadge } from '../../../components/Badges';
import { AITool, Review } from '../../../types';
import api from '../../../lib/api';

export default function ToolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [tool, setTool] = useState<AITool | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Review Form
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    async function loadTool() {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await api.tools.getBySlug(slug);
        if (res.data) {
          setTool(res.data);
          // Also fetch reviews
          const reviewsRes = await api.reviews.getForTool(res.data.id).catch(() => ({ data: [] }));
          if (reviewsRes.data) setReviews(reviewsRes.data);
          // Track click telemetry
          api.tools.trackClick(res.data.id).catch(() => {});
        } else {
          setError('Model or framework not found.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load model details.');
      } finally {
        setLoading(false);
      }
    }

    loadTool();
  }, [slug]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tool) return;
    setSubmittingReview(true);
    try {
      const res = await api.reviews.create(tool.id, { rating, title, comment });
      if (res.data) {
        setReviews([res.data, ...reviews]);
        setTitle('');
        setComment('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#10131a] text-[#e0e2eb]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center font-mono-code text-xs text-[#7bd0ff]">
          Loading model specifications from PostgreSQL backend...
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen flex flex-col bg-[#10131a] text-[#e0e2eb]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <span className="material-symbols-outlined text-4xl text-red-400 mb-2">error</span>
          <h2 className="text-xl font-bold mb-2">Model Not Found</h2>
          <p className="text-sm text-[#908fa0] mb-4">{error || 'Requested model slug does not exist.'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 rounded-xl bg-[#272a31] text-xs font-semibold text-white hover:bg-[#363940]"
          >
            Return to Matrix
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#10131a] text-[#e0e2eb]">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 max-w-[84rem] w-full mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#908fa0] font-mono-code mb-6">
          <button onClick={() => router.push('/')} className="hover:text-white">Directory</button>
          <span>/</span>
          <span>{tool.category || 'LLM & Reasoning'}</span>
          <span>/</span>
          <span className="text-[#e0e2eb]">{tool.name}</span>
        </div>

        {/* Hero Card */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0b0e14] border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#272a31] flex items-center justify-center text-[#7bd0ff] text-3xl border border-white/5">
                <span className="material-symbols-outlined text-3xl">{tool.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-headline text-2xl md:text-3xl font-bold text-[#e0e2eb]">{tool.name}</h1>
                  <VerifiedBadge />
                </div>
                <div className="flex items-center gap-3 text-xs text-[#908fa0] font-mono-code">
                  <span>Provider: {tool.provider}</span>
                  <span>•</span>
                  <Rating value={tool.rating} count={tool.reviewsCount} />
                  <span>•</span>
                  <PricingBadge model={tool.pricingModel} entryPrice={tool.priceMonthly} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00a6e0] to-[#8083ff] text-white text-xs font-semibold shadow hover:opacity-90 flex items-center gap-2"
              >
                <span>Visit Official Site</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>

          <p className="text-sm text-[#c7c4d7] mt-6 max-w-4xl leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Benchmark telemetry */}
          <div className="p-6 rounded-2xl bg-[#0b0e14] border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase text-[#7bd0ff]">
              <span className="material-symbols-outlined text-sm">speed</span>
              <span>Frontier Benchmarks</span>
            </div>
            <div>
              <span className="text-3xl font-bold font-mono-code text-[#e0e2eb]">
                {tool.sweBenchScore > 0 ? `${tool.sweBenchScore}%` : 'Multimodal'}
              </span>
              <p className="text-xs text-[#908fa0] mt-1">{tool.sweBenchNote}</p>
            </div>
          </div>

          {/* Card 2: Context Window */}
          <div className="p-6 rounded-2xl bg-[#0b0e14] border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase text-[#8083ff]">
              <span className="material-symbols-outlined text-sm">layers</span>
              <span>Context Capacity</span>
            </div>
            <div>
              <span className="text-3xl font-bold font-mono-code text-[#e0e2eb]">{tool.contextTokens}</span>
              <p className="text-xs text-[#908fa0] mt-1">{tool.contextWords}</p>
            </div>
          </div>

          {/* Card 3: Pricing and API Rates */}
          <div className="p-6 rounded-2xl bg-[#0b0e14] border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase text-[#ddb7ff]">
              <span className="material-symbols-outlined text-sm">credit_card</span>
              <span>API Inference Rates</span>
            </div>
            <div>
              <span className="text-xl font-bold font-mono-code text-[#e0e2eb]">{tool.apiRates}</span>
              <p className="text-xs text-[#908fa0] mt-1">{tool.apiRatesSub}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0b0e14] border border-white/10">
          <h3 className="text-lg font-bold text-[#e0e2eb] mb-6">User Reviews & Benchmarks</h3>

          {/* Add Review Form */}
          <form onSubmit={handleSubmitReview} className="mb-8 p-4 rounded-xl bg-[#191c22] border border-white/5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#908fa0] font-mono-code">
              Submit Telemetry Review
            </h4>
            <div className="flex items-center gap-4">
              <label className="text-xs text-[#e0e2eb]">Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="bg-[#10131a] border border-white/10 text-xs text-[#e0e2eb] rounded-lg px-2 py-1"
              >
                <option value={5}>5 Stars - Frontier Performance</option>
                <option value={4}>4 Stars - Solid Production Ready</option>
                <option value={3}>3 Stars - Moderate Consistency</option>
                <option value={2}>2 Stars - High Latency / Errors</option>
                <option value={1}>1 Star - Flawed Reasoning</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Review title (optional)..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#10131a] border border-white/10 text-xs text-[#e0e2eb]"
            />
            <textarea
              required
              placeholder="Share benchmark observations, context retention, or prompt adherence..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-[#10131a] border border-white/10 text-xs text-[#e0e2eb]"
            />
            <button
              type="submit"
              disabled={submittingReview}
              className="px-4 py-2 rounded-lg bg-[#8083ff] text-white text-xs font-semibold hover:bg-[#6c6fe6]"
            >
              {submittingReview ? 'Posting...' : 'Post Review'}
            </button>
          </form>

          {/* Reviews List */}
          <div className="space-y-3">
            {reviews.length === 0 ? (
              <p className="text-xs text-[#908fa0]">No reviews submitted yet for this model.</p>
            ) : (
              reviews.map((r) => (
                <div key={r.id} className="p-4 rounded-xl bg-[#191c22] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#e0e2eb]">{r.userName}</span>
                    <Rating value={r.rating} />
                  </div>
                  {r.title && <div className="text-xs font-semibold text-[#7bd0ff]">{r.title}</div>}
                  <p className="text-xs text-[#c7c4d7]">{r.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
