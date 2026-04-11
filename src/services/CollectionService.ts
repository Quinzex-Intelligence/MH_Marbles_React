import { api } from '@/lib/api';
import { Collection } from '@/types/gallery';

export const CollectionService = {
  getAll: async (): Promise<Collection[]> => {
    const res = await api.get('/api/collections/');
    return res.data;
  },
  create: async (data: FormData) => {
    const res = await api.post('/api/collections/', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  update: async (id: string | number, data: FormData) => {
    const res = await api.patch(`/api/collections/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  delete: async (id: string | number) => {
    await api.delete(`/api/collections/${id}/`);
  }
};

export default CollectionService;
