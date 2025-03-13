export const ITEMS_PER_PAGE = 9;
export const DEBOUNCE_DELAY = 1000;

export const CACHE_CONFIG = {
  SHORT: {
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  },
  LONG: {
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  },
  INFINITE: {
    staleTime: Infinity,
    gcTime: Infinity,
  },
} as const;



