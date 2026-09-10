import { StoredDeal, initialDeals } from './store';

let deals: StoredDeal[] = [...initialDeals];

export const dealRepository = {
  async findAll() {
    return [...deals];
  },

  async findById(id: string) {
    return deals.find((d) => d.id === id) || null;
  },

  async findByToolId(toolId: string) {
    return deals.filter((d) => d.toolId === toolId);
  },
};

// In-memory user favorites mapping: userId -> Set<toolId>
const userFavorites = new Map<string, Set<string>>();
// default demo user favorites
userFavorites.set('user_staff', new Set(['tool_claude_37', 'tool_cursor_ide']));

export const favoriteRepository = {
  async getFavorites(userId: string): Promise<string[]> {
    const favs = userFavorites.get(userId);
    return favs ? Array.from(favs) : [];
  },

  async addFavorite(userId: string, toolId: string): Promise<boolean> {
    if (!userFavorites.has(userId)) {
      userFavorites.set(userId, new Set());
    }
    userFavorites.get(userId)!.add(toolId);
    return true;
  },

  async removeFavorite(userId: string, toolId: string): Promise<boolean> {
    const favs = userFavorites.get(userId);
    if (!favs) return false;
    favs.delete(toolId);
    return true;
  },
};

// In-memory comparison session store: sessionId -> string[] (toolIds, max 4)
const comparisonSessions = new Map<string, string[]>();
comparisonSessions.set('default', ['tool_claude_37', 'tool_chatgpt_o3', 'tool_cursor_ide', 'tool_gemini_2_pro']);

export const compareRepository = {
  async getComparison(sessionId: string): Promise<string[]> {
    return comparisonSessions.get(sessionId) || comparisonSessions.get('default') || [];
  },

  async setComparison(sessionId: string, toolIds: string[]): Promise<string[]> {
    // max 4 tools enforced
    const capped = toolIds.slice(0, 4);
    comparisonSessions.set(sessionId, capped);
    return capped;
  },

  async addTool(sessionId: string, toolId: string): Promise<string[]> {
    const current = await this.getComparison(sessionId);
    if (!current.includes(toolId) && current.length < 4) {
      current.push(toolId);
      comparisonSessions.set(sessionId, current);
    }
    return current;
  },

  async removeTool(sessionId: string, toolId: string): Promise<string[]> {
    let current = await this.getComparison(sessionId);
    current = current.filter((id) => id !== toolId);
    comparisonSessions.set(sessionId, current);
    return current;
  },
};
