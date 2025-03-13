export const QUERY_KEYS = {
  RECIPES: {
    all: ['recipes'] as const,
    search: (query: string) => [...QUERY_KEYS.RECIPES.all, 'search', query] as const,
    details: (id: string) => [...QUERY_KEYS.RECIPES.all, 'details', id] as const,
  },
  SELECTED_RECIPES: {
    all: ['selectedRecipes'] as const,
    ids: ['selectedRecipeIds'] as const,
    list: (ids: string[]) => [...QUERY_KEYS.SELECTED_RECIPES.all, 'list', ids] as const,
  },
} as const; 