import { useState, useMemo } from 'react';

export function usePagination<T>(data: T[], itemsPerPage = 10) {
	const [page, setPage] = useState(1);

	const totalPages = Math.ceil(data.length / itemsPerPage);

	const currentItems = useMemo(() => {
		const start = (page - 1) * itemsPerPage;
		return data.slice(start, start + itemsPerPage);
	}, [data, page, itemsPerPage]);

	return {
		currentItems,
		page,
		totalPages,
		setPage,
	};
}
