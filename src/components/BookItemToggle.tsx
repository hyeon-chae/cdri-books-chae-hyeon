import { useState, useCallback } from 'react';

import { type BookItemData } from '@/lib/types/search';
import { BookListItem } from './BookListItem';
import { BookDetailItem } from './BookDetailItem';

interface BookItemToggleProps {
	item: BookItemData;
}

export function BookItemToggle({ item }: BookItemToggleProps) {
	const [openDetail, setOpenDetail] = useState(false);

	const onToggleDetail = useCallback(() => {
		setOpenDetail((prev) => !prev);
	}, []);

	return (
		<div>
			{openDetail ? (
				// 상세보기 모드
				<BookDetailItem
					item={item}
					onToggleDetail={onToggleDetail}
					openDetail={openDetail}
				/>
			) : (
				// 목록 모드
				<BookListItem
					item={item}
					onToggleDetail={onToggleDetail}
					openDetail={openDetail}
				/>
			)}
		</div>
	);
}
