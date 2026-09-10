import { StoredReview, initialReviews } from './store';

let reviews: StoredReview[] = [...initialReviews];

export const reviewRepository = {
  async findByToolId(toolId: string) {
    return reviews.filter((r) => r.toolId === toolId);
  },

  async findById(id: string) {
    return reviews.find((r) => r.id === id) || null;
  },

  async create(data: { userId: string; toolId: string; userName: string; rating: number; title?: string; comment: string }) {
    const newReview: StoredReview = {
      id: `rev_${Date.now()}`,
      userId: data.userId,
      toolId: data.toolId,
      userName: data.userName,
      rating: data.rating,
      title: data.title || '',
      comment: data.comment,
      helpful: 0,
      createdAt: new Date().toISOString(),
    };
    reviews.unshift(newReview);
    return newReview;
  },

  async update(id: string, data: Partial<StoredReview>) {
    const idx = reviews.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    reviews[idx] = { ...reviews[idx], ...data };
    return reviews[idx];
  },

  async delete(id: string) {
    const idx = reviews.findIndex((r) => r.id === id);
    if (idx === -1) return false;
    reviews.splice(idx, 1);
    return true;
  },

  async findAll() {
    return [...reviews];
  },
};
