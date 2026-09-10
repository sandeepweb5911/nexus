import { StoredSubmission, initialSubmissions } from './store';

let submissions: StoredSubmission[] = [...initialSubmissions];

export const submissionRepository = {
  async findAll() {
    return [...submissions];
  },

  async findByUserId(userId: string) {
    return submissions.filter((s) => s.userId === userId);
  },

  async findById(id: string) {
    return submissions.find((s) => s.id === id) || null;
  },

  async create(data: {
    name: string;
    url: string;
    domain: string;
    pricingModel: string;
    description?: string;
    email?: string;
    userId?: string;
  }) {
    const newSubmission: StoredSubmission = {
      id: `sub_${Date.now()}`,
      userId: data.userId,
      name: data.name,
      url: data.url,
      domain: data.domain,
      pricingModel: data.pricingModel,
      description: data.description || '',
      email: data.email,
      status: 'PENDING',
      notes: 'Crawling preliminary endpoint metadata.',
      createdAt: new Date().toISOString(),
    };
    submissions.unshift(newSubmission);
    return newSubmission;
  },

  async updateStatus(id: string, status: 'APPROVED' | 'REJECTED', notes?: string) {
    const idx = submissions.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    submissions[idx].status = status;
    if (notes) submissions[idx].notes = notes;
    return submissions[idx];
  },
};
