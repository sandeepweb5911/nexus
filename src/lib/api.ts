const API_BASE_URL = typeof window !== 'undefined' ? '' : 'http://localhost:3000';

class ApiClient {
  private token: string | null = null;
  private sessionId: string = 'nexus_session_default';

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('nexus_auth_token');
      const storedSession = localStorage.getItem('nexus_session_id');
      if (storedSession) {
        this.sessionId = storedSession;
      } else {
        this.sessionId = `session_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('nexus_session_id', this.sessionId);
      }
    }
  }

  public setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('nexus_auth_token', token);
      } else {
        localStorage.removeItem('nexus_auth_token');
      }
    }
  }

  public getToken() {
    return this.token;
  }

  private async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-session-id': this.sessionId,
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (error: any) {
      console.warn(`[API Client Error] ${endpoint}:`, error.message);
      throw error;
    }
  }

  // Auth Endpoints
  public auth = {
    register: (data: { email: string; password: string; name?: string }) =>
      this.request<{ success: boolean; data: { user: any; token: string } }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    login: (data: { email: string; password: string }) =>
      this.request<{ success: boolean; data: { user: any; token: string } }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    logout: () => {
      this.setToken(null);
      return this.request('/auth/logout', { method: 'POST' });
    },
    me: () => this.request<{ success: boolean; data: any }>('/auth/me'),
  };

  // Tools Endpoints
  public tools = {
    getAll: (params: Record<string, any> = {}) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query.append(key, String(val));
        }
      });
      const qs = query.toString() ? `?${query.toString()}` : '';
      return this.request<{ success: boolean; data: any[]; meta: any }>(`/tools${qs}`);
    },
    getBySlug: (slug: string) => this.request<{ success: boolean; data: any }>(`/tools/${slug}`),
    search: (q: string) => this.request<{ success: boolean; data: any[] }>(`/tools/search?q=${encodeURIComponent(q)}`),
    getTrending: () => this.request<{ success: boolean; data: any[] }>('/trending'),
    getNew: () => this.request<{ success: boolean; data: any[] }>('/tools/new'),
    trackClick: (id: string) => this.request(`/tools/${id}/click`, { method: 'POST' }),
  };

  // Categories Endpoints
  public categories = {
    getAll: () => this.request<{ success: boolean; data: any[] }>('/categories'),
    getBySlug: (slug: string) => this.request<{ success: boolean; data: any }>(`/categories/${slug}`),
  };

  // Compare Endpoints
  public compare = {
    get: () => this.request<{ success: boolean; data: any[] }>('/compare'),
    set: (toolIds: string[]) =>
      this.request<{ success: boolean; data: any[] }>('/compare', {
        method: 'POST',
        body: JSON.stringify({ toolIds }),
      }),
    remove: (toolId: string) =>
      this.request<{ success: boolean; data: any[] }>(`/compare/${toolId}`, {
        method: 'DELETE',
      }),
  };

  // Favorites Endpoints
  public favorites = {
    getAll: () => this.request<{ success: boolean; data: any[] }>('/favorites'),
    add: (toolId: string) =>
      this.request<{ success: boolean; message: string }>(`/favorites/${toolId}`, {
        method: 'POST',
      }),
    remove: (toolId: string) =>
      this.request<{ success: boolean; message: string }>(`/favorites/${toolId}`, {
        method: 'DELETE',
      }),
  };

  // Reviews Endpoints
  public reviews = {
    getForTool: (toolId: string) => this.request<{ success: boolean; data: any[] }>(`/tools/${toolId}/reviews`),
    create: (toolId: string, data: { rating: number; title?: string; comment: string; userName?: string }) =>
      this.request<{ success: boolean; data: any }>(`/tools/${toolId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    delete: (reviewId: string) => this.request(`/reviews/${reviewId}`, { method: 'DELETE' }),
  };

  // Deals Endpoints
  public deals = {
    getAll: () => this.request<{ success: boolean; data: any[] }>('/deals'),
    getById: (id: string) => this.request<{ success: boolean; data: any }>(`/deals/${id}`),
  };

  // Submissions Endpoints
  public submissions = {
    create: (data: { name: string; url: string; domain: string; pricingModel: string; description?: string; email?: string }) =>
      this.request<{ success: boolean; message: string; data: any }>('/submissions', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getMy: () => this.request<{ success: boolean; data: any[] }>('/submissions/my'),
  };

  // Admin Endpoints
  public admin = {
    getAnalytics: () => this.request<{ success: boolean; data: any }>('/admin/analytics'),
    getSubmissions: () => this.request<{ success: boolean; data: any[] }>('/admin/submissions'),
    approveSubmission: (id: string, notes?: string) =>
      this.request<{ success: boolean; message: string; data: any }>(`/admin/submissions/${id}/approve`, {
        method: 'PUT',
        body: JSON.stringify({ notes }),
      }),
    rejectSubmission: (id: string, notes?: string) =>
      this.request<{ success: boolean; message: string; data: any }>(`/admin/submissions/${id}/reject`, {
        method: 'PUT',
        body: JSON.stringify({ notes }),
      }),
    getUsers: () => this.request<{ success: boolean; data: any[] }>('/admin/users'),
    getReviews: () => this.request<{ success: boolean; data: any[] }>('/admin/reviews'),
  };
}

export const api = new ApiClient();
export default api;
