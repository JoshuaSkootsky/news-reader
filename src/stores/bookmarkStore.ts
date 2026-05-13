import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../types/article';
import { getArticleById } from '../services/mockData';

interface BookmarkState {
  bookmarkIds: string[];
  isLoading: boolean;
  addBookmark: (article: Article) => Promise<void>;
  removeBookmark: (articleId: string) => Promise<void>;
  isBookmarked: (articleId: string) => boolean;
  loadBookmarks: () => Promise<void>;
  getBookmarkedArticles: () => Article[];
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarkIds: [],
  isLoading: true,

  addBookmark: async (article: Article) => {
    const currentIds = get().bookmarkIds;
    if (!currentIds.includes(article.id)) {
      const newIds = [...currentIds, article.id];
      set({ bookmarkIds: newIds });
      try {
        await AsyncStorage.setItem('bookmarkIds', JSON.stringify(newIds));
      } catch (e) {
        console.error('Failed to save bookmark', e);
      }
    }
  },

  removeBookmark: async (articleId: string) => {
    const newIds = get().bookmarkIds.filter(id => id !== articleId);
    set({ bookmarkIds: newIds });
    try {
      await AsyncStorage.setItem('bookmarkIds', JSON.stringify(newIds));
    } catch (e) {
      console.error('Failed to remove bookmark', e);
    }
  },

  isBookmarked: (articleId: string) => {
    return get().bookmarkIds.includes(articleId);
  },

  loadBookmarks: async () => {
    set({ isLoading: true });
    try {
      const storedIds = await AsyncStorage.getItem('bookmarkIds');
      if (storedIds) {
        set({ bookmarkIds: JSON.parse(storedIds) });
      }
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    } finally {
      set({ isLoading: false });
    }
  },

  getBookmarkedArticles: () => {
    const ids = get().bookmarkIds;
    return ids
      .map(id => getArticleById(id))
      .filter((article): article is Article => article !== undefined);
  },
}));