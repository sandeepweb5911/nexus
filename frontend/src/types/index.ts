export interface AITool {
  id: string;
  slug: string;
  name: string;
  provider: string;
  icon: string;
  colorTheme: string;
  tag: string;
  primaryUseCase: string;
  description: string;
  websiteUrl: string;
  priceMonthly: string;
  priceRaw: number;
  pricingModel: string;
  pricingModelEntry: string;
  freeTierLimits: string;
  contextTokens: string;
  contextWords: string;
  contextHighlight?: boolean;
  contextBadge?: string;
  sweBenchScore: number;
  sweBenchNote: string;
  multimodal: string;
  multimodalSub: string;
  multimodalHighlight?: boolean;
  apiRates: string;
  apiRatesSub: string;
  privacy: string;
  privacyVerified: boolean;
  platforms: string;
  rating: number;
  reviewsCount: number;
  featured: boolean;
  trending: boolean;
  viewCount: number;
  clickCount: number;
  category?: string;
  categorySlug?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface Review {
  id: string;
  userId: string;
  toolId: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  helpful: number;
  createdAt: string;
}

export interface Deal {
  id: string;
  toolId: string;
  title: string;
  description: string;
  discount: string;
  couponCode?: string;
  url: string;
  startsAt: string;
  expiresAt?: string;
}

export interface ToolSubmission {
  id?: string;
  name: string;
  url: string;
  domain: string;
  pricingModel: string;
  description?: string;
  email?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
}
