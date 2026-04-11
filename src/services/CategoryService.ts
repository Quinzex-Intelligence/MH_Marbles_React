import { api } from '@/lib/api';

export interface Category {
  id: number;
  name: string;
  slug: string;
  image_key?: string;
  image_url?: string;
}

export const CategoryService = {
  getCategories: async () => {
    const response = await api.get<Category[]>('/api/categories/');
    return response.data;
  },
  
  addCategory: async (data: FormData) => {
    const response = await api.post<Category>('/api/categories/', data);
    return response.data;
  },
  
  updateCategory: async (id: number | string, data: FormData) => {
    const response = await api.patch<Category>(`/api/categories/${id}/`, data);
    return response.data;
  },
  
  deleteCategory: async (id: number | string) => {
    await api.delete(`/api/categories/${id}/`);
  }
};

export default CategoryService;
