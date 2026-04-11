import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

// ─── Global Query Client Config ───────────────────────────────────────────────
// Industry-standard stale/cache times.
// We keep data fresh for 5 mins but keep it in cache for 24 hours (for persistence).

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24h to support persistence
      retry: (failureCount, error: unknown) => {
        const err = error as { response?: { status?: number } };
        if (err?.response?.status === 404) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

// ─── Persister Setup ─────────────────────────────────────────────────────────
// Saves the query cache to LocalStorage so it survives browser restarts.
export const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'MH_MARBLES_OFFLINE_CACHE',
});

// ─── Query Keys (Centralized) ────────────────────────────────────────────────
export const QUERY_KEYS = {
  products: ['products'] as const,
  productPage: (cursor?: string) => ['products', 'page', cursor] as const,
  brands: ['brands'] as const,
  categories: ['categories'] as const,
  sanitaryItems: ['sanitary', 'items'] as const,
  sanitaryCategories: ['sanitary', 'categories'] as const,
  collections: ['collections'] as const,
  media: ['media'] as const,
  blogs: ['blogs'] as const,
  messages: ['messages'] as const,
} as const;
