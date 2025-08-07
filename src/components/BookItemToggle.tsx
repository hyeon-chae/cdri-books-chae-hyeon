import { useState, useCallback } from 'react';

import { type BookItemData } from '@/lib/types/search';
import { BookListItem } from './BookListItem';
import { BookDetailItem } from './BookDetailItem';

import { useBookmarkStore } from '@/stores/bookmarkStore';

interface BookItemToggleProps {
	item: BookItemData;
}

export function BookItemToggle({ item }: BookItemToggleProps) {
	const [openDetail, setOpenDetail] = useState(false);

	const { toggleBookmark, isBookmarked } = useBookmarkStore();
	const favorite = isBookmarked(item.isbn);

	const onToggleDetail = useCallback(() => {
		setOpenDetail((prev) => !prev);
	}, []);

	const onToggleFavorite = useCallback(() => {
		toggleBookmark(item);
	}, [item, toggleBookmark]);

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
