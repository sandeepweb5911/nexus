import { StoredTool, initialTools } from './store';
import { ToolFilterParams } from '../types';

let tools: StoredTool[] = [...initialTools];

export const toolRepository = {
  async findAll(params: ToolFilterParams = {}) {
    let result = [...tools];

    if (params.category && params.category !== 'All') {
      result = result.filter(
        (t) =>
          t.categorySlug === params.category ||
          t.tag.toLowerCase() === params.category.toLowerCase()
      );
    }

    if (params.pricing && params.pricing !== 'All') {
      const p = params.pricing.toLowerCase();
      if (p.includes('free')) {
        result = result.filter((t) => t.priceRaw === 0 || t.pricingModel === 'FREE' || t.pricingModel === 'FREEMIUM');
      } else if (p.includes('open')) {
        result = result.filter((t) => t.pricingModel === 'OPEN_WEIGHTS');
      } else if (p.includes('paid') || p.includes('sub')) {
        result = result.filter((t) => t.priceRaw > 0);
      }
    }

    if (params.rating) {
      result = result.filter((t) => t.rating >= (params.rating || 0));
    }

    if (params.useCase) {
      const uc = params.useCase.toLowerCase();
      result = result.filter(
        (t) =>
          t.primaryUseCase.toLowerCase().includes(uc) ||
          t.description.toLowerCase().includes(uc)
      );
    }

    if (params.platform) {
      const pf = params.platform.toLowerCase();
      result = result.filter((t) => t.platforms.toLowerCase().includes(pf));
    }

    // Sorting
    switch (params.sort) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'sweBench':
        result.sort((a, b) => b.sweBenchScore - a.sweBenchScore);
        break;
      case 'priceAsc':
        result.sort((a, b) => a.priceRaw - b.priceRaw);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.priceRaw - a.priceRaw);
        break;
      case 'trending':
        result.sort((a, b) => b.clickCount - a.clickCount);
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        // default sorting: featured first, then rating
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
    }

    const total = result.length;
    const page = params.page || 1;
    const limit = params.limit || 50;
    const startIndex = (page - 1) * limit;
    const paginated = result.slice(startIndex, startIndex + limit);

    return {
      tools: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  async findBySlug(slug: string) {
    return tools.find((t) => t.slug === slug) || null;
  },

  async findById(id: string) {
    return tools.find((t) => t.id === id) || null;
  },

  async search(query: string) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return tools.slice(0, 10);

    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.provider.toLowerCase().includes(q) ||
        t.tag.toLowerCase().includes(q) ||
        t.primaryUseCase.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  },

  async getTrending() {
    return [...tools].sort((a, b) => b.sweBenchScore - a.sweBenchScore).slice(0, 6);
  },

  async getNew() {
    return [...tools]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  },

  async create(data: Partial<StoredTool>) {
    const id = `tool_${Date.now()}`;
    const slug = data.slug || (data.name || 'tool').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newTool: StoredTool = {
      id,
      slug,
      name: data.name || 'Untitled AI Tool',
      provider: data.provider || 'Independent',
      icon: data.icon || 'smart_toy',
      colorTheme: data.colorTheme || 'primary',
      tag: data.tag || 'Frontier',
      primaryUseCase: data.primaryUseCase || 'General Intelligence',
      description: data.description || '',
      websiteUrl: data.websiteUrl || 'https://nexus.ai',
      priceMonthly: data.priceMonthly || '$20/mo',
      priceRaw: data.priceRaw || 20,
      pricingModel: data.pricingModel || 'FREEMIUM',
      pricingModelEntry: data.pricingModelEntry || '$20/mo',
      freeTierLimits: data.freeTierLimits || 'Standard usage limits',
      contextTokens: data.contextTokens || '128,000 tokens',
      contextWords: data.contextWords || '~96,000 words',
      contextHighlight: data.contextHighlight || false,
      sweBenchScore: data.sweBenchScore || 0,
      sweBenchNote: data.sweBenchNote || 'Benchmark tested',
      multimodal: data.multimodal || 'Text, Code',
      multimodalSub: data.multimodalSub || 'Standard multimodal',
      multimodalHighlight: data.multimodalHighlight || false,
      apiRates: data.apiRates || 'Pay-as-you-go',
      apiRatesSub: data.apiRatesSub || 'Standard rates',
      privacy: data.privacy || 'Enterprise Grade',
      privacyVerified: data.privacyVerified !== undefined ? data.privacyVerified : true,
      platforms: data.platforms || 'Web, API',
      rating: data.rating || 4.8,
      reviewsCount: 0,
      featured: false,
      trending: true,
      viewCount: 0,
      clickCount: 0,
      categorySlug: data.categorySlug || 'llm-reasoning',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tools.unshift(newTool);
    return newTool;
  },

  async update(id: string, data: Partial<StoredTool>) {
    const idx = tools.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    tools[idx] = {
      ...tools[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return tools[idx];
  },

  async delete(id: string) {
    const idx = tools.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    tools.splice(idx, 1);
    return true;
  },

  async recordView(id: string) {
    const tool = tools.find((t) => t.id === id);
    if (tool) tool.viewCount += 1;
  },

  async recordClick(id: string) {
    const tool = tools.find((t) => t.id === id);
    if (tool) tool.clickCount += 1;
  },
};
