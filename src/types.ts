export interface AITool {
  id: string;
  name: string;
  provider: string;
  icon: string;
  colorTheme: 'tertiary' | 'secondary' | 'primary' | 'secondary-fixed' | 'emerald';
  priceMonthly: string;
  priceRaw: number;
  tag: string;
  primaryUseCase: string;
  rating: number;
  reviewsCount: number;
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
  description?: string;
  category?: string;
}

export interface ComparisonStat {
  title: string;
  value: string;
  subValue: string;
  icon: string;
  colorTheme: string;
}

export interface ToolSubmission {
  name: string;
  url: string;
  domain: string;
  pricingModel: string;
  description?: string;
  email?: string;
}
