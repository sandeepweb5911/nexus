import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const toolCreateSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  provider: z.string().min(2, 'Provider is required'),
  icon: z.string().default('smart_toy'),
  colorTheme: z.string().default('primary'),
  tag: z.string().default('Frontier'),
  primaryUseCase: z.string().min(5, 'Primary use case is required'),
  description: z.string().min(10, 'Description is required'),
  websiteUrl: z.string().url('Website URL must be valid'),
  priceMonthly: z.string().default('$20/mo'),
  priceRaw: z.number().default(20.0),
  pricingModel: z.enum(['FREE', 'FREEMIUM', 'PAID', 'SUBSCRIPTION', 'OPEN_WEIGHTS', 'CONTACT_SALES']).default('FREEMIUM'),
  pricingModelEntry: z.string().default('$20/mo'),
  freeTierLimits: z.string().default('Limited access'),
  contextTokens: z.string().default('128K tokens'),
  contextWords: z.string().default('~96K words'),
  contextHighlight: z.boolean().default(false),
  sweBenchScore: z.number().default(0),
  sweBenchNote: z.string().default('Benchmark rating'),
  multimodal: z.string().default('Text, Code'),
  multimodalSub: z.string().default('Multimodal'),
  multimodalHighlight: z.boolean().default(false),
  apiRates: z.string().default('Pay per token'),
  apiRatesSub: z.string().default('Standard API'),
  privacy: z.string().default('Standard enterprise encryption'),
  privacyVerified: z.boolean().default(true),
  platforms: z.string().default('Web, API'),
  categorySlug: z.string().optional(),
});

export const reviewCreateSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  comment: z.string().min(5, 'Review comment must be at least 5 characters'),
});

export const submissionCreateSchema = z.object({
  name: z.string().min(2, 'Tool name is required'),
  url: z.string().url('Must be a valid URL'),
  domain: z.string().min(2, 'Domain is required'),
  pricingModel: z.string().min(2, 'Pricing model is required'),
  description: z.string().optional(),
  email: z.string().email().optional(),
});
