import { categoryRepository } from '../repositories/categoryRepository';
import { reviewRepository } from '../repositories/reviewRepository';
import { submissionRepository } from '../repositories/submissionRepository';
import { dealRepository, favoriteRepository, compareRepository } from '../repositories/dealRepository';
import { toolRepository } from '../repositories/toolRepository';
import { userRepository } from '../repositories/userRepository';

export const categoryService = {
  async getCategories() {
    return await categoryRepository.findAll();
  },
  async getCategoryBySlug(slug: string) {
    const cat = await categoryRepository.findBySlug(slug);
    if (!cat) throw new Error('Category not found');
    return cat;
  },
};

export const reviewService = {
  async getReviewsForTool(toolId: string) {
    return await reviewRepository.findByToolId(toolId);
  },
  async createReview(data: { userId: string; toolId: string; userName: string; rating: number; title?: string; comment: string }) {
    return await reviewRepository.create(data);
  },
  async updateReview(id: string, userId: string, data: { rating?: number; title?: string; comment?: string }) {
    const review = await reviewRepository.findById(id);
    if (!review) throw new Error('Review not found');
    if (review.userId !== userId) throw new Error('Unauthorized to edit this review');
    return await reviewRepository.update(id, data);
  },
  async deleteReview(id: string, userId: string, isAdmin = false) {
    const review = await reviewRepository.findById(id);
    if (!review) throw new Error('Review not found');
    if (review.userId !== userId && !isAdmin) throw new Error('Unauthorized to delete this review');
    return await reviewRepository.delete(id);
  },
};

export const submissionService = {
  async submitTool(data: { name: string; url: string; domain: string; pricingModel: string; description?: string; email?: string; userId?: string }) {
    return await submissionRepository.create(data);
  },
  async getMySubmissions(userId: string) {
    return await submissionRepository.findByUserId(userId);
  },
  async getAllSubmissions() {
    return await submissionRepository.findAll();
  },
  async approveSubmission(id: string, notes?: string) {
    const sub = await submissionRepository.findById(id);
    if (!sub) throw new Error('Submission not found');
    const updated = await submissionRepository.updateStatus(id, 'APPROVED', notes);
    // Create actual tool in directory
    await toolRepository.create({
      name: sub.name,
      websiteUrl: sub.url,
      primaryUseCase: sub.description || `${sub.domain} framework`,
      description: sub.description || `Autonomous ${sub.domain} platform.`,
      tag: sub.domain,
      pricingModelEntry: sub.pricingModel,
    });
    return updated;
  },
  async rejectSubmission(id: string, notes?: string) {
    const sub = await submissionRepository.findById(id);
    if (!sub) throw new Error('Submission not found');
    return await submissionRepository.updateStatus(id, 'REJECTED', notes);
  },
};

export const dealService = {
  async getDeals() {
    return await dealRepository.findAll();
  },
  async getDealById(id: string) {
    const deal = await dealRepository.findById(id);
    if (!deal) throw new Error('Deal not found');
    return deal;
  },
};

export const favoriteService = {
  async getFavorites(userId: string) {
    const toolIds = await favoriteRepository.getFavorites(userId);
    const tools = await Promise.all(toolIds.map((id) => toolRepository.findById(id)));
    return tools.filter(Boolean);
  },
  async addFavorite(userId: string, toolId: string) {
    return await favoriteRepository.addFavorite(userId, toolId);
  },
  async removeFavorite(userId: string, toolId: string) {
    return await favoriteRepository.removeFavorite(userId, toolId);
  },
};

export const compareService = {
  async getComparison(sessionId: string) {
    const toolIds = await compareRepository.getComparison(sessionId);
    const tools = await Promise.all(toolIds.map((id) => toolRepository.findById(id)));
    return tools.filter(Boolean);
  },
  async setComparison(sessionId: string, toolIds: string[]) {
    const updatedIds = await compareRepository.setComparison(sessionId, toolIds);
    const tools = await Promise.all(updatedIds.map((id) => toolRepository.findById(id)));
    return tools.filter(Boolean);
  },
  async addTool(sessionId: string, toolId: string) {
    const updatedIds = await compareRepository.addTool(sessionId, toolId);
    const tools = await Promise.all(updatedIds.map((id) => toolRepository.findById(id)));
    return tools.filter(Boolean);
  },
  async removeTool(sessionId: string, toolId: string) {
    const updatedIds = await compareRepository.removeTool(sessionId, toolId);
    const tools = await Promise.all(updatedIds.map((id) => toolRepository.findById(id)));
    return tools.filter(Boolean);
  },
};

export const adminService = {
  async getAnalytics() {
    const { total } = await toolRepository.findAll({ limit: 1 });
    const allTools = (await toolRepository.findAll({ limit: 100 })).tools;
    const submissions = await submissionRepository.findAll();
    const pendingSubmissions = submissions.filter((s) => s.status === 'PENDING').length;
    const users = await userRepository.findAll();
    const reviews = await reviewRepository.findAll();

    const totalViews = allTools.reduce((acc, t) => acc + t.viewCount, 0);
    const totalClicks = allTools.reduce((acc, t) => acc + t.clickCount, 0);

    const popularTools = [...allTools].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);

    return {
      totalTools: total,
      pendingSubmissions,
      totalUsers: users.length,
      totalReviews: reviews.length,
      totalViews,
      totalClicks,
      popularTools,
    };
  },
};
