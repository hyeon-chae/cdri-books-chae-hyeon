import { apiGet } from './common';

import type {
	SearchBooksResponse,
	SearchFilterTarget,
	SearchQuery,
} from '../types/search';

export const getSearchBooks = async (
	query: string,
	page: number = 1,
	size: number = 10,
	target?: SearchFilterTarget
) => {
	const params: SearchQuery = { query, page, size, target };

	// 카카오 API를 통해 책 검색
	return await apiGet<SearchBooksResponse>('/search/book', params);
};
