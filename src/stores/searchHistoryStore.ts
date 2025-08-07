import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchHistoryStore {
	histories: string[];
	addHistory: (keyword: string) => void;
	removeHistory: (keyword: string) => void;
	clearHistory: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryStore>()(
	persist(
		(set, get) => ({
			histories: [],
			addHistory: (keyword: string) => {
				const { histories } = get();
				const filtered = histories.filter((item) => item !== keyword); // 중복 제거
				const newHistories = [keyword, ...filtered].slice(0, 8); // 8개 유지
				set({ histories: newHistories });
			},
			removeHistory: (keyword: string) => {
				set((state) => ({
					histories: state.histories.filter((item) => item !== keyword),
				}));
			},
			clearHistory: () => {
				set({ histories: [] });
			},
		}),
		{
			name: 'search-history', // 로컬스토리지 키 이름
		}
	)
);
