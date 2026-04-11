import api from '@/lib/api';
import { HeroSlide } from '@/types/gallery';

export const HeroCarouselService = {
  getAll: async (): Promise<HeroSlide[]> => {
    const response = await api.get('/api/hero_carousel/');
    // Handle both DRF paginated responses and direct arrays
    const slides = Array.isArray(response.data) ? response.data : response.data.results;
    return (slides || []).filter((s: HeroSlide) => s.is_active);
  },

  create: async (data: FormData): Promise<HeroSlide> => {
    const response = await api.post('/api/hero_carousel/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id: string | number, data: FormData): Promise<HeroSlide> => {
    const response = await api.patch(`/api/hero_carousel/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id: string | number): Promise<void> => {
    await api.delete(`/api/hero_carousel/${id}/`);
  },
};

export default HeroCarouselService;
