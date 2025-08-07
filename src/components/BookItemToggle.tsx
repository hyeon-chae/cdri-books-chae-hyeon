import { useState, useCallback } from 'react';

import { type BookItemData } from '@/lib/types/search';
import { BookListItem } from './BookListItem';
import { BookDetailItem } from './BookDetailItem';

interface BookItemToggleProps {
	item: BookItemData;
}

export function BookItemToggle({ item }: BookItemToggleProps) {
	const [openDetail, setOpenDetail] = useState(false);
	const [favorite, setFavorite] = useState(false);

	const onToggleDetail = useCallback(() => {
		setOpenDetail((prev) => !prev);
	}, []);

	const onToggleFavorite = useCallback((isbn: string) => {
		setFavorite((prev) => !prev);
		console.log(`Toggled favorite for ISBN: ${isbn}`);
	}, []);

	const handlePurchase = useCallback((url: string) => {
		// 클릭시 새탭으로 url 열기
		window.open(url, '_blank');
	}, []);

	const Component = openDetail ? BookDetailItem : BookListItem;

	return (
		<div>
			<Component
				item={item}
				onToggleDetail={onToggleDetail}
				openDetail={openDetail}
				handlePurchase={handlePurchase}
				onToggleFavorite={onToggleFavorite}
				favorite={favorite}
			/>
		</div>
	);
}
