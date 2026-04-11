export interface Brand {
  id: string | number;
  name: string;
  logo?: string;
  image?: string;
  image_url?: string;
  description?: string;
}

export interface Collection {
  id: string | number;
  name: string;
  description: string;
  cover_image: string;
}

export interface MediaEntry {
  id: string | number;
  heading: string;
  subtext: string;
  image: string;
  cta_text: string;
  cta_link: string;
  order: number;
}

export interface JournalEntry {
  id: string | number;
  title: string;
  description: string;
  ytUrl?: string;
  instant?: string;
}

export interface ContactInquiry {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  heading: string;
  subtext: string;
  cta_text: string;
  cta_link: string;
  is_active: boolean;
  order: number;
}

export type Message = ContactInquiry;
