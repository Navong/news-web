import { create } from 'zustand';

interface NewsState {
  category: string;
  setCategory: (category: string) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  category: 'Top Headlines',
  setCategory: (category) => set({ category: category.charAt(0).toUpperCase() + category.slice(1) }),
}));
