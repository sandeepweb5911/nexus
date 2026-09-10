import { initialCategories } from './store';

let categories = [...initialCategories];

export const categoryRepository = {
  async findAll() {
    return [...categories];
  },

  async findBySlug(slug: string) {
    return categories.find((c) => c.slug === slug) || null;
  },

  async findById(id: string) {
    return categories.find((c) => c.id === id) || null;
  },
};
