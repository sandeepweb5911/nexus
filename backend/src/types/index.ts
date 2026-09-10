export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface JwtUserPayload {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface ToolFilterParams {
  category?: string;
  pricing?: string;
  rating?: number;
  useCase?: string;
  platform?: string;
  sort?: 'rating' | 'sweBench' | 'priceAsc' | 'priceDesc' | 'newest' | 'trending';
  page?: number;
  limit?: number;
}
