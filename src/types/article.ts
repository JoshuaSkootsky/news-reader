export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage?: string;
  publishedAt: string;
  category: Category;
  imageUrl: string;
  readingTime: number;
  isPremium?: boolean;
}

export type Category = 'politics' | 'culture' | 'technology' | 'science' | 'ideas' | 'books';

export interface CategoryInfo {
  id: Category;
  name: string;
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'politics', name: 'Politics', color: '#E53935' },
  { id: 'culture', name: 'Culture', color: '#8E24AA' },
  { id: 'technology', name: 'Technology', color: '#1E88E5' },
  { id: 'science', name: 'Science', color: '#43A047' },
  { id: 'ideas', name: 'Ideas', color: '#FB8C00' },
  { id: 'books', name: 'Books', color: '#6D4C41' },
];