export type SearchBooksResponse = {
	meta: {
		total_count: number;
		pageable_count: number;
		is_end: boolean;
	};
	documents: BookItemData[];
};

export type BookItemData = {
	title: string;
	contents: string;
	url: string;
	isbn: string;
	datetime: string;
	authors: string[];
	publisher: string;
	translators: string[];
	price: number;
	sale_price: number;
	thumbnail: string;
	status: string;
};

export type SearchFilterTarget = 'title' | 'person' | 'publisher' | 'isbn';

export type SearchQuery = {
	query: string;
	page: number;
	size: number;
	target?: SearchFilterTarget;
};
