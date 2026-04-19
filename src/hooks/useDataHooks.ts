import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SanitaryService from '@/services/SanitaryService';
import HeroCarouselService from '@/services/HeroCarouselService';
import CollectionService from '@/services/CollectionService';
import ContactService from '@/services/ContactService';
import BlogService from '@/services/BlogService';
import ProjectService from '@/services/ProjectService';
import { QUERY_KEYS } from '@/lib/queryClient';

// ─── Sanitary Items ───────────────────────────────────────────────────────────
export const useSanitary = () => useQuery({
  queryKey: QUERY_KEYS.sanitaryItems,
  queryFn: () => SanitaryService.getAll(),
});

export const useSanitaryCategories = () => useQuery({
  queryKey: QUERY_KEYS.sanitaryCategories,
  queryFn: () => SanitaryService.getCategories(),
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
});

export const useSanitaryMutations = () => {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: QUERY_KEYS.sanitaryItems });

  const addSanitary = useMutation({ mutationFn: (data: FormData) => SanitaryService.create(data), onSuccess: invalidate });
  const updateSanitary = useMutation({ mutationFn: ({ id, data }: { id: string | number; data: FormData }) => SanitaryService.update(id, data), onSuccess: invalidate });
  const deleteSanitary = useMutation({ mutationFn: (id: string | number) => SanitaryService.delete(id), onSuccess: invalidate });

  return { addSanitary, updateSanitary, deleteSanitary };
};

// ─── Media / Hero Carousel ────────────────────────────────────────────────────
export const useMedia = () => useQuery({
  queryKey: QUERY_KEYS.media,
  queryFn: () => HeroCarouselService.getAll(),
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
});

export const useMediaMutations = () => {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: QUERY_KEYS.media });

  const addMedia = useMutation({ mutationFn: (data: FormData) => HeroCarouselService.create(data), onSuccess: invalidate });
  const updateMedia = useMutation({ mutationFn: ({ id, data }: { id: string | number; data: FormData }) => HeroCarouselService.update(id, data), onSuccess: invalidate });
  const deleteMedia = useMutation({ mutationFn: (id: string | number) => HeroCarouselService.delete(id), onSuccess: invalidate });

  return { addMedia, updateMedia, deleteMedia };
};

// ─── Collections ──────────────────────────────────────────────────────────────
export const useCollections = () => useQuery({
  queryKey: QUERY_KEYS.collections,
  queryFn: () => CollectionService.getAll(),
  staleTime: 5 * 60 * 1000,
});

export const useCollectionMutations = () => {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: QUERY_KEYS.collections });

  const addCollection = useMutation({ mutationFn: (data: FormData) => CollectionService.create(data), onSuccess: invalidate });
  const updateCollection = useMutation({ mutationFn: ({ id, data }: { id: string | number; data: FormData }) => CollectionService.update(id, data), onSuccess: invalidate });
  const deleteCollection = useMutation({ mutationFn: (id: string | number) => CollectionService.delete(id), onSuccess: invalidate });

  return { addCollection, updateCollection, deleteCollection };
};

// ─── Messages ─────────────────────────────────────────────────────────────────
export const useMessages = () => useQuery({
  queryKey: QUERY_KEYS.messages,
  queryFn: () => ContactService.getAll(),
  staleTime: 60 * 1000, // Messages update frequently → 1 min fresh
  gcTime: 5 * 60 * 1000,
});

export const useMessageMutations = () => {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: QUERY_KEYS.messages });

  const addMessage = useMutation({ mutationFn: (msg: Parameters<typeof ContactService.submit>[0]) => ContactService.submit(msg), onSuccess: invalidate });
  const deleteMessage = useMutation({ mutationFn: (id: string | number) => ContactService.delete(id), onSuccess: invalidate });

  return { addMessage, deleteMessage };
};

// ─── Journal (Merged Projects + Blogs) ───────────────────────────────────────
export const useJournal = () => useQuery({
  queryKey: QUERY_KEYS.blogs,
  queryFn: async () => {
    const [projects, blogs] = await Promise.all([
      ProjectService.getAll(),
      BlogService.getAllBlogs()
    ]);
    
    // Merge datasets
    const merged = [...projects, ...blogs];
    
    // Sort by date (instant) descending
    return merged.sort((a, b) => {
      const dateA = a.instant ? new Date(a.instant).getTime() : 0;
      const dateB = b.instant ? new Date(b.instant).getTime() : 0;
      return dateB - dateA;
    });
  },
  staleTime: 5 * 60 * 1000,
});

export const useJournalMutations = () => {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: QUERY_KEYS.blogs });

  // Route A: Architectural Showcase (Images)
  const addProject = useMutation({ 
    mutationFn: (data: Parameters<typeof ProjectService.upload>[0]) => ProjectService.upload(data), 
    onSuccess: invalidate 
  });
  
  // Route B: Video Narratives (YouTube)
  const addBlog = useMutation({
    mutationFn: (blog: Omit<JournalEntry, 'id' | 'instant'>) => BlogService.createBlog(blog),
    onSuccess: invalidate
  });
  
  const deleteJournal = useMutation({ 
    mutationFn: (id: string | number) => {
      // In a real scenario, we might need to know if it's a blog or project to hit the right DELETE route.
      // For now, we attempt both or rely on the primary service if they share an ID space.
      // Based on current BlogService, we attempt that first if it's a simple ID.
      return ProjectService.delete(id).catch(() => BlogService.deleteBlog(id));
    }, 
    onSuccess: invalidate 
  });

  return { addProject, addBlog, deleteJournal };
};

