import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookItemData } from '@/lib/types/search';

interface BookmarkState {
	bookmarks: BookItemData[];
	addBookmark: (item: BookItemData) => void;
	removeBookmark: (isbn: string) => void;
	toggleBookmark: (item: BookItemData) => void;
	isBookmarked: (isbn: string) => boolean;
	clearAll: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
	persist(
		(set, get) => ({
			bookmarks: [],
			addBookmark: (item) =>
				set((state) => ({ bookmarks: [...state.bookmarks, item] })),
			removeBookmark: (isbn) =>
				set((state) => ({
					bookmarks: state.bookmarks.filter((b) => b.isbn !== isbn),
				})),
			toggleBookmark: (item) => {
				const exists = get().bookmarks.some((b) => b.isbn === item.isbn);
				if (exists) {
					get().removeBookmark(item.isbn);
				} else {
					get().addBookmark(item);
				}
			},
			isBookmarked: (isbn) => get().bookmarks.some((b) => b.isbn === isbn),
			clearAll: () => set({ bookmarks: [] }),
		}),
		{
			name: 'bookmark-storage', // localStorage 키 이름
		}
	)
);
