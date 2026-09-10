import { toolRepository } from '../repositories/toolRepository';
import { ToolFilterParams } from '../types';

export const toolService = {
  async getTools(params: ToolFilterParams) {
    return await toolRepository.findAll(params);
  },

  async getToolBySlug(slug: string) {
    const tool = await toolRepository.findBySlug(slug);
    if (!tool) {
      throw new Error('AI Tool not found');
    }
    await toolRepository.recordView(tool.id);
    return tool;
  },

  async getToolById(id: string) {
    const tool = await toolRepository.findById(id);
    if (!tool) {
      throw new Error('AI Tool not found');
    }
    return tool;
  },

  async searchTools(query: string) {
    return await toolRepository.search(query);
  },

  async getTrendingTools() {
    return await toolRepository.getTrending();
  },

  async getNewTools() {
    return await toolRepository.getNew();
  },

  async createTool(data: any) {
    return await toolRepository.create(data);
  },

  async updateTool(id: string, data: any) {
    const updated = await toolRepository.update(id, data);
    if (!updated) {
      throw new Error('Tool not found for update');
    }
    return updated;
  },

  async deleteTool(id: string) {
    const deleted = await toolRepository.delete(id);
    if (!deleted) {
      throw new Error('Tool not found for deletion');
    }
    return true;
  },

  async trackClick(id: string) {
    await toolRepository.recordClick(id);
  },
};
