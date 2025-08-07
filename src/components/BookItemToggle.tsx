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

	const handlePurchase = useCallback((url: string) => {
		// 클릭시 새탭으로 url 열기
		window.open(url, '_blank');
	}, []);

	return (
		<div>
			{openDetail ? (
				// 상세보기 모드
				<BookDetailItem
					item={item}
					onToggleDetail={onToggleDetail}
					openDetail={openDetail}
					handlePurchase={handlePurchase}
				/>
			) : (
				// 목록 모드
				<BookListItem
					item={item}
					onToggleDetail={onToggleDetail}
					openDetail={openDetail}
					handlePurchase={handlePurchase}
				/>
			)}
		</div>
	);
}
