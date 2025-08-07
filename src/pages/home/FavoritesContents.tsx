import { useState } from 'react';

import type { BookItemData } from '@/lib/types/search';
import { BookItemToggle } from '@/components/BookItemToggle';
import Empty from '@/components/Empty';

export default function FavoritesContents() {
	const [favorites, setFavorites] = useState<BookItemData[]>([]);
	return (
		<div className="w-full">
			<div className="space-y-4">
				<p className="text-[22px] font-bold text-[##1A1E27]">내가 찜한 책</p>
				<p className="text-sm text-text-primary font-[500]">
					도서 검색 결과&nbsp;&nbsp; 총{' '}
					<span className="text-[#4880EE] font-[500]">{favorites.length}</span>
					건
				</p>
			</div>

			<div className="mt-9">
				{favorites.length === 0 ? (
					<div className="pt-20">
						<Empty msg="찜한 책이 없습니다." />
					</div>
				) : (
					favorites.map((item, index) => (
						<BookItemToggle key={index} item={item} />
					))
				)}
			</div>
		</div>
	);
}
