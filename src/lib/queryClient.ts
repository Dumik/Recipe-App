import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { QUERY_KEYS } from '../constants/queryKeys';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'RECIPE_APP_CACHE',
  throttleTime: 1000,
  serialize: data => JSON.stringify(data),
  deserialize: (data) => {
    try {
      if (typeof data !== 'string') {
        throw new Error('Invalid cache data format');
      }

      const parsed = JSON.parse(data);
      
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid cache structure');
      }

      return parsed;
    } catch (error) {
      console.error('Failed to parse cache data:', error);
      return {}; 
    }
  },
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  buster: 'v1', 
  dehydrateOptions: {
    shouldDehydrateQuery: query => {
      const queryKey = query.queryKey as string[];
      return (
        queryKey[0] === QUERY_KEYS.RECIPES.all[0] ||
        queryKey[0] === QUERY_KEYS.SELECTED_RECIPES.all[0]
      );
    },
  },
});

export { queryClient }; 