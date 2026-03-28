export interface Brand {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface MediaEntry {
  id: string;
  title: string;
  description: string;
  url: string;
  published: boolean;
}

export interface JournalEntry {
  id: string;
  title: string;
  description?: string; // Optional if not used everywhere
  excerpt: string;
  date: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}
