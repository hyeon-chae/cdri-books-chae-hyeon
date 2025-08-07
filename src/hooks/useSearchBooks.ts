import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchBooks } from '@/lib/api/search';

export const useSearchBooks = (query: string, enabled: boolean) =>
	useInfiniteQuery({
		queryKey: ['books', query],
		queryFn: ({ pageParam = 1 }) => getSearchBooks(query, pageParam),

		initialPageParam: 1,

		getNextPageParam: (lastPage, allPages) => {
			return lastPage.meta.is_end ? undefined : allPages.length + 1;
		},
		enabled: !!query && enabled,
		staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		// select: (data) => ({
		//   pages: data.pages,
		//   pageParams: data.pageParams,
		//   meta: data.pages[0]?.meta,
		// }),
	});
