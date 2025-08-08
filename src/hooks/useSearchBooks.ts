import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchBooks } from '@/lib/api/search';
import type { SearchFilterTarget } from '@/lib/types/search';

const DEFAULT_SEARCH_PAGE_SIZE = 10;

export const useSearchBooks = (
	query: string,
	target: SearchFilterTarget,
	enabled: boolean
) =>
	useInfiniteQuery({
		queryKey: ['books', query, target],
		queryFn: ({ pageParam = 1 }) =>
			getSearchBooks(query, pageParam, DEFAULT_SEARCH_PAGE_SIZE, target),

		initialPageParam: 1,

		getNextPageParam: (lastPage, allPages) => {
			return lastPage.meta.is_end ? undefined : allPages.length + 1;
		},
		enabled: !!query && enabled,
		staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		select: (data) => ({
			pages: data.pages,
			pageParams: data.pageParams,
			meta: data.pages[0]?.meta,
		}),
	});
