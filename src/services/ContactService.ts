import { api } from '@/lib/api';
import { ContactInquiry } from '@/types/gallery';

export const ContactService = {
  getAll: async (): Promise<ContactInquiry[]> => {
    const res = await api.get('/api/contacts/');
    return res.data;
  },
  submit: async (data: Omit<ContactInquiry, 'id' | 'created_at'>) => {
    const res = await api.post('/api/contacts/', data);
    return res.data;
  },
  delete: async (id: string | number) => {
    await api.delete(`/api/contacts/${id}/`);
  }
};

export default ContactService;
