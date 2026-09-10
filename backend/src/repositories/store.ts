// In-memory data store for fallback and rapid development when DB connection is not configured

export interface StoredTool {
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
  categorySlug?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  createdAt: string;
}

export interface StoredReview {
  id: string;
  userId: string;
  toolId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  createdAt: string;
}

export interface StoredSubmission {
  id: string;
  userId?: string;
  name: string;
  url: string;
  domain: string;
  pricingModel: string;
  description?: string;
  email?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes?: string;
  createdAt: string;
}

export interface StoredDeal {
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

export const initialTools: StoredTool[] = [
  {
    id: 'tool_claude_37',
    slug: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    icon: 'psychology',
    colorTheme: 'tertiary',
    tag: 'Hybrid Think',
    primaryUseCase: 'Agentic coding, deep analytical reasoning, and long-context synthesis.',
    description: 'Hybrid reasoning model capable of seamless switching between instantaneous response and extended internal chain-of-thought tokens. Premier choice for enterprise codebase refactoring.',
    websiteUrl: 'https://anthropic.com/claude',
    priceMonthly: '$20/mo',
    priceRaw: 20,
    pricingModel: 'FREEMIUM',
    pricingModelEntry: '$20/mo (Pro Tier)',
    freeTierLimits: 'Generous dynamic daily rate limits',
    contextTokens: '200,000 tokens',
    contextWords: '~150,000 words',
    contextHighlight: true,
    contextBadge: 'Top Tier',
    sweBenchScore: 70.2,
    sweBenchNote: 'Verified SWE-Bench Verified SOTA',
    multimodal: 'Text, Code, Vision',
    multimodalSub: 'Native image tokenization',
    multimodalHighlight: true,
    apiRates: '$3.00 / 1M input',
    apiRatesSub: '$15.00 / 1M output (3x for thinking)',
    privacy: 'Enterprise Zero Data Retention',
    privacyVerified: true,
    platforms: 'Web, Mac, Windows, API, Claude Code CLI',
    rating: 4.92,
    reviewsCount: 1420,
    featured: true,
    trending: true,
    viewCount: 14200,
    clickCount: 5200,
    categorySlug: 'llm-reasoning',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tool_chatgpt_o3',
    slug: 'chatgpt-plus-o3-mini',
    name: 'ChatGPT Plus (o3-mini)',
    provider: 'OpenAI',
    icon: 'auto_awesome',
    colorTheme: 'secondary',
    tag: 'High Velocity',
    primaryUseCase: 'STEM problem solving, competitive coding, and math-dense tasks.',
    description: 'Specialized low-latency reasoning model optimized for mathematical deduction, code generation, and multi-step competitive programming benchmarks.',
    websiteUrl: 'https://chatgpt.com',
    priceMonthly: '$20/mo',
    priceRaw: 20,
    pricingModel: 'FREEMIUM',
    pricingModelEntry: '$20/mo (Plus Tier)',
    freeTierLimits: 'GPT-4o mini unlimited; o3-mini limited',
    contextTokens: '200,000 tokens',
    contextWords: '~150,000 words',
    contextHighlight: false,
    sweBenchScore: 68.4,
    sweBenchNote: 'Internal eval benchmarks',
    multimodal: 'Text, Code, Audio, Vision',
    multimodalSub: 'Advanced Voice + Canvas',
    multimodalHighlight: true,
    apiRates: '$1.10 / 1M input',
    apiRatesSub: '$4.40 / 1M output',
    privacy: 'Opt-out available in settings',
    privacyVerified: true,
    platforms: 'Web, iOS, Android, macOS, Windows',
    rating: 4.78,
    reviewsCount: 3105,
    featured: true,
    trending: true,
    viewCount: 22400,
    clickCount: 8900,
    categorySlug: 'llm-reasoning',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tool_cursor_ide',
    slug: 'cursor-ide',
    name: 'Cursor IDE',
    provider: 'Anysphere',
    icon: 'code',
    colorTheme: 'primary',
    tag: 'Code Native',
    primaryUseCase: 'Agentic full-codebase editing, multi-file generation, terminal execution.',
    description: 'VS Code fork rebuilt ground-up for AI pair-programming. Features whole-repository indexing, composer mode, and automated terminal debugging.',
    websiteUrl: 'https://cursor.com',
    priceMonthly: '$20/mo',
    priceRaw: 20,
    pricingModel: 'FREEMIUM',
    pricingModelEntry: '$20/mo (Pro Tier)',
    freeTierLimits: '2-week Pro trial, 2000 completions/mo',
    contextTokens: '200,000 tokens',
    contextWords: 'Whole repo vector indexing',
    contextHighlight: false,
    sweBenchScore: 65.8,
    sweBenchNote: 'Composer Agent mode rating',
    multimodal: 'Text, Code, Diffs',
    multimodalSub: 'Terminal logs + AST inspect',
    multimodalHighlight: false,
    apiRates: 'Bring Your Own Key option',
    apiRatesSub: 'Zero margin passthrough',
    privacy: 'SOC 2 Type II, Privacy Mode on',
    privacyVerified: true,
    platforms: 'macOS, Windows, Linux',
    rating: 4.88,
    reviewsCount: 2240,
    featured: true,
    trending: true,
    viewCount: 19800,
    clickCount: 7100,
    categorySlug: 'developer-tools',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tool_gemini_2_pro',
    slug: 'gemini-2-pro',
    name: 'Gemini 2.0 Pro',
    provider: 'Google',
    icon: 'cognition',
    colorTheme: 'secondary-fixed',
    tag: '2M Window',
    primaryUseCase: 'Ultra-long repository analysis, video QA, multihour audio transcription.',
    description: 'Massive multimodal context engine supporting up to 2 million tokens in production. Excels at multimodal reasoning across hours of video, audio, and large repositories.',
    websiteUrl: 'https://aistudio.google.com',
    priceMonthly: 'Free / Pay-per-token',
    priceRaw: 0,
    pricingModel: 'FREEMIUM',
    pricingModelEntry: 'Free Tier Available (AI Studio)',
    freeTierLimits: 'Up to 15 RPM free during preview',
    contextTokens: '2,000,000 tokens',
    contextWords: '~1.5M words / 2hrs video',
    contextHighlight: true,
    contextBadge: 'Industry Leader',
    sweBenchScore: 66.4,
    sweBenchNote: 'Verified 2M window needle search',
    multimodal: 'Native Audio, Video, Code, Vision',
    multimodalSub: 'Real-time Live WebSockets',
    multimodalHighlight: true,
    apiRates: '$1.25 / 1M input',
    apiRatesSub: '$5.00 / 1M output',
    privacy: 'Enterprise Cloud Grade & FedRAMP',
    privacyVerified: true,
    platforms: 'Web Studio, Vertex AI, REST, SDKs',
    rating: 4.81,
    reviewsCount: 980,
    featured: true,
    trending: true,
    viewCount: 16500,
    clickCount: 6400,
    categorySlug: 'llm-reasoning',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tool_deepseek_r1',
    slug: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek AI',
    icon: 'hub',
    colorTheme: 'secondary',
    tag: 'Open Weights',
    primaryUseCase: 'Open-weight mathematical reasoning, pure code synthesis, zero-margin cost.',
    description: 'Breakthrough reinforcement-learning reasoning model with open weights. Delivers frontier performance at an order of magnitude lower API pricing.',
    websiteUrl: 'https://deepseek.com',
    priceMonthly: '$0.55 / 1M tokens',
    priceRaw: 0.55,
    pricingModel: 'OPEN_WEIGHTS',
    pricingModelEntry: 'Free Web Chat & Ultra-cheap API',
    freeTierLimits: 'Free daily limits on web platform',
    contextTokens: '128,000 tokens',
    contextWords: '~96,000 words',
    contextHighlight: false,
    sweBenchScore: 69.8,
    sweBenchNote: 'Matches OpenAI o1 on math benchmarks',
    multimodal: 'Text, Code',
    multimodalSub: 'Reasoning thought traces',
    multimodalHighlight: false,
    apiRates: '$0.55 / 1M input (cache miss)',
    apiRatesSub: '$2.19 / 1M output',
    privacy: 'Self-hostable MIT weights',
    privacyVerified: true,
    platforms: 'Ollama, vLLM, DeepSeek API, Web',
    rating: 4.89,
    reviewsCount: 1840,
    featured: true,
    trending: true,
    viewCount: 25400,
    clickCount: 9300,
    categorySlug: 'open-weights',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tool_windsurf',
    slug: 'windsurf-editor',
    name: 'Windsurf (Codeium)',
    provider: 'Codeium',
    icon: 'terminal',
    colorTheme: 'primary',
    tag: 'Flow Agent',
    primaryUseCase: 'Flow-state autonomous code editing with Cascade multi-step planning.',
    description: 'Collaborative IDE with Cascade agents designed to keep developers in flow state while automating complex architectural refactors.',
    websiteUrl: 'https://codeium.com/windsurf',
    priceMonthly: '$15/mo',
    priceRaw: 15,
    pricingModel: 'FREEMIUM',
    pricingModelEntry: '$15/mo (Pro Tier)',
    freeTierLimits: 'Generous free tier for solo devs',
    contextTokens: '128,000 tokens',
    contextWords: 'Deep codebase comprehension',
    contextHighlight: false,
    sweBenchScore: 63.2,
    sweBenchNote: 'Cascade flow benchmarked',
    multimodal: 'Text, Code, Git diffs',
    multimodalSub: 'Inline contextual overlays',
    multimodalHighlight: false,
    apiRates: 'Pro subscription included',
    apiRatesSub: 'Optional usage caps',
    privacy: 'Enterprise zero training pledge',
    privacyVerified: true,
    platforms: 'macOS, Windows, Linux',
    rating: 4.74,
    reviewsCount: 890,
    featured: false,
    trending: true,
    viewCount: 11200,
    clickCount: 4200,
    categorySlug: 'developer-tools',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tool_perplexity_pro',
    slug: 'perplexity-pro',
    name: 'Perplexity Pro',
    provider: 'Perplexity',
    icon: 'manage_search',
    colorTheme: 'tertiary',
    tag: 'Deep Research',
    primaryUseCase: 'Synthesized real-time search, citation indexing, autonomous deep research.',
    description: 'AI conversational search engine that indexes live web pages, academic papers, and financial filings with verified citations.',
    websiteUrl: 'https://perplexity.ai',
    priceMonthly: '$20/mo',
    priceRaw: 20,
    pricingModel: 'FREEMIUM',
    pricingModelEntry: '$20/mo (Pro Tier)',
    freeTierLimits: '5 Pro queries every 4 hours, basic search unlimited',
    contextTokens: '128,000 tokens',
    contextWords: 'Multi-query web synthesis',
    contextHighlight: false,
    sweBenchScore: 58.0,
    sweBenchNote: 'Optimized for retrieval & citations',
    multimodal: 'Text, Web, Images, PDFs',
    multimodalSub: 'Academic sources & Wolfram Alpha',
    multimodalHighlight: true,
    apiRates: '$5.00 / 1,000 API requests',
    apiRatesSub: 'Live web index included',
    privacy: 'Incognito search mode supported',
    privacyVerified: true,
    platforms: 'Web, iOS, Android, Mac App, Chrome',
    rating: 4.82,
    reviewsCount: 2650,
    featured: true,
    trending: true,
    viewCount: 18900,
    clickCount: 6800,
    categorySlug: 'search-research',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tool_midjourney',
    slug: 'midjourney-v6-1',
    name: 'Midjourney v6.1',
    provider: 'Midjourney',
    icon: 'palette',
    colorTheme: 'emerald',
    tag: 'Creative SOTA',
    primaryUseCase: 'Photorealistic image synthesis, brand asset generation, texture rendering.',
    description: 'Gold standard generative visual model for creative directors, UI designers, and concept artists with unparalleled coherence.',
    websiteUrl: 'https://midjourney.com',
    priceMonthly: '$10/mo',
    priceRaw: 10,
    pricingModel: 'SUBSCRIPTION',
    pricingModelEntry: '$10/mo (Basic Tier)',
    freeTierLimits: 'No ongoing free tier',
    contextTokens: 'Visual Prompting',
    contextWords: 'Omni-directional aesthetic control',
    contextHighlight: false,
    sweBenchScore: 0,
    sweBenchNote: 'Non-code generation model',
    multimodal: 'Prompt to 4K Image',
    multimodalSub: 'Inpainting, Outpainting, Vary Region',
    multimodalHighlight: true,
    apiRates: 'Enterprise API in closed beta',
    apiRatesSub: 'Fast GPU hours tiers',
    privacy: 'Stealth mode on Pro/Mega tiers',
    privacyVerified: true,
    platforms: 'Web Editor, Discord',
    rating: 4.91,
    reviewsCount: 4200,
    featured: false,
    trending: false,
    viewCount: 28400,
    clickCount: 11200,
    categorySlug: 'multimodal-vision',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tool_elevenlabs',
    slug: 'elevenlabs-multilingual-v2',
    name: 'ElevenLabs Speech',
    provider: 'ElevenLabs',
    icon: 'graphic_eq',
    colorTheme: 'secondary-fixed',
    tag: 'Ultra Realistic',
    primaryUseCase: 'Real-time conversational voice agents, dubbing, hyper-realistic text-to-speech.',
    description: 'Human-parity audio generation engine supporting 32 languages, voice cloning in under 1 minute, and sub-100ms conversational agent APIs.',
    websiteUrl: 'https://elevenlabs.io',
    priceMonthly: '$5/mo',
    priceRaw: 5,
    pricingModel: 'FREEMIUM',
    pricingModelEntry: '$5/mo (Starter Tier)',
    freeTierLimits: '10,000 characters/mo free',
    contextTokens: 'Text-to-Audio',
    contextWords: 'Emotion & pacing tokenization',
    contextHighlight: false,
    sweBenchScore: 0,
    sweBenchNote: 'Audio generation benchmark leader',
    multimodal: 'Text to Audio / Voice to Voice',
    multimodalSub: 'Conversational WebSockets streaming',
    multimodalHighlight: true,
    apiRates: '$0.15 per 1,000 characters',
    apiRatesSub: 'Ultra-low latency edge CDN',
    privacy: 'Enterprise data protection agreement',
    privacyVerified: true,
    platforms: 'Web Studio, REST API, Python, Node.js SDK',
    rating: 4.87,
    reviewsCount: 1620,
    featured: false,
    trending: true,
    viewCount: 14500,
    clickCount: 5600,
    categorySlug: 'audio-speech',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tool_runway',
    slug: 'runway-gen-3-alpha',
    name: 'Runway Gen-3 Alpha',
    provider: 'Runway',
    icon: 'movie',
    colorTheme: 'tertiary',
    tag: 'World Models',
    primaryUseCase: 'Generative video, camera motion steering, dynamic cinematic simulations.',
    description: 'Frontier video synthesis model delivering photorealistic motion graphics, camera choreography, and physics simulation for filmmakers.',
    websiteUrl: 'https://runwayml.com',
    priceMonthly: '$15/mo',
    priceRaw: 15,
    pricingModel: 'FREEMIUM',
    pricingModelEntry: '$15/mo (Standard Tier)',
    freeTierLimits: '125 one-time credits',
    contextTokens: 'Video Frames',
    contextWords: 'Text/Image-to-Video 10s clips',
    contextHighlight: false,
    sweBenchScore: 0,
    sweBenchNote: 'Cinematic temporal consistency SOTA',
    multimodal: 'Text/Image to 4K Video',
    multimodalSub: 'Motion Brush + Camera Director',
    multimodalHighlight: true,
    apiRates: 'API access on Enterprise plans',
    apiRatesSub: 'Credit bundles available',
    privacy: 'Enterprise private workspaces',
    privacyVerified: true,
    platforms: 'Web, iOS, API',
    rating: 4.79,
    reviewsCount: 1140,
    featured: false,
    trending: false,
    viewCount: 13200,
    clickCount: 4800,
    categorySlug: 'multimodal-vision',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const initialCategories = [
  { id: 'cat_llm', slug: 'llm-reasoning', name: 'LLM & Reasoning', description: 'Frontier foundation models with advanced chain-of-thought and thinking modes.', icon: 'neurology' },
  { id: 'cat_dev', slug: 'developer-tools', name: 'Developer Tools', description: 'Agentic IDEs, code generation, and automated software engineering workflows.', icon: 'terminal' },
  { id: 'cat_search', slug: 'search-research', name: 'Search & Research', description: 'Synthesized real-time search, citation indexing, and autonomous deep research.', icon: 'manage_search' },
  { id: 'cat_open', slug: 'open-weights', name: 'Open Weights', description: 'Self-hostable, permissive, and distillable open parameter weights.', icon: 'lock_open' },
  { id: 'cat_vision', slug: 'multimodal-vision', name: 'Multimodal & Vision', description: 'Photorealistic image synthesis, 3D world models, and spatial generation.', icon: 'palette' },
  { id: 'cat_audio', slug: 'audio-speech', name: 'Audio & Speech', description: 'Ultra-low latency speech cloning, generative sound design, and synthesis.', icon: 'graphic_eq' },
];

export const initialDeals: StoredDeal[] = [
  {
    id: 'deal_claude',
    toolId: 'tool_claude_37',
    title: 'Nexus Launch Bonus: $250 API Credit Grant',
    description: 'New verified developer teams receive $250 in Anthropic API credit for building with Claude 3.7 Sonnet.',
    discount: '$250 Credit',
    couponCode: 'NEXUS-CLAUDE-37',
    url: 'https://anthropic.com',
    startsAt: new Date().toISOString(),
  },
  {
    id: 'deal_cursor',
    toolId: 'tool_cursor_ide',
    title: 'Startup Grant: 6 Months Free Team Seats',
    description: 'YC and accelerated startups receive 6 months of Cursor Team tier with zero margin LLM token access.',
    discount: '6 Mos Free',
    couponCode: 'NEXUS-STARTUP-CURSOR',
    url: 'https://cursor.com',
    startsAt: new Date().toISOString(),
  },
  {
    id: 'deal_deepseek',
    toolId: 'tool_deepseek_r1',
    title: 'DeepSeek Cloud Compute Grant: 50M Tokens',
    description: 'Deploy reasoning microservices with 50M free tokens on DeepSeek V3/R1 high-concurrency clusters.',
    discount: '50M Tokens',
    couponCode: 'NEXUS-R1-COMPUTE',
    url: 'https://deepseek.com',
    startsAt: new Date().toISOString(),
  },
];

export const initialSubmissions: StoredSubmission[] = [
  {
    id: 'sub_mistral',
    name: 'Mistral Large 2',
    url: 'https://mistral.ai',
    domain: 'Large Language Model',
    pricingModel: 'Pay-per-token API',
    description: '123B open-weights model targeting frontier multilingual code generation.',
    status: 'PENDING',
    notes: 'Crawler active on API endpoints.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sub_cohere',
    name: 'Cohere Command R+',
    url: 'https://cohere.com',
    domain: 'Enterprise Retrieval',
    pricingModel: 'Freemium',
    description: 'Enterprise RAG model optimized for business applications with citations.',
    status: 'PENDING',
    notes: 'Submitted for editorial benchmark.',
    createdAt: new Date().toISOString(),
  },
];

export const initialReviews: StoredReview[] = [
  {
    id: 'rev_1',
    userId: 'user_admin',
    toolId: 'tool_claude_37',
    userName: 'Nexus Staff Engineer',
    rating: 5,
    title: 'SOTA performance on complex refactoring',
    comment: 'The hybrid thinking capability eliminates hallucination in complex AST traversals. Essential tool in our stack.',
    helpful: 24,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rev_2',
    userId: 'user_staff',
    toolId: 'tool_cursor_ide',
    userName: 'Principal Developer',
    rating: 5,
    title: 'Game changer for repository context',
    comment: 'Composer agent indexing whole workspaces allows us to ship PRs in minutes instead of days.',
    helpful: 19,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rev_3',
    userId: 'user_staff',
    toolId: 'tool_gemini_2_pro',
    userName: 'Senior ML Researcher',
    rating: 5,
    title: '2M tokens is mind-blowing for large repos',
    comment: 'Ingesting our entire 150-file repository into a single context prompt with zero needle loss.',
    helpful: 14,
    createdAt: new Date().toISOString(),
  },
];
