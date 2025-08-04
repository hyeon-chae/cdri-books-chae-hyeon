import { apiGet } from './common';

import type { SearchResult } from '../types/search';

export const searchBooks = async (
	query: string,
	page: number = 1,
	size: number = 10
) => {
	const params = { query, page, size };

	// 카카오 API를 통해 책 검색
	return await apiGet<SearchResult>('/search/book', params);
};
