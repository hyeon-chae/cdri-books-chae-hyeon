import { BookItemToggle } from '@/components/BookItemToggle';
import Empty from '@/components/Empty';

import { useBookmarkStore } from '@/stores/bookmarkStore';

export default function FavoritesContents() {
	const { bookmarks } = useBookmarkStore();

	console.log('북마크 목록:', bookmarks);

	return (
		<div className="w-full">
			<div className="space-y-4">
				<p className="text-[22px] font-bold text-[##1A1E27]">내가 찜한 책</p>
				<p className="text-sm text-text-primary font-[500]">
					도서 검색 결과&nbsp;&nbsp; 총{' '}
					<span className="text-[#4880EE] font-[500]">{bookmarks.length}</span>
					건
				</p>
			</div>

			<div className="mt-9">
				{bookmarks.length === 0 ? (
					<div className="pt-20">
						<Empty msg="찜한 책이 없습니다." />
					</div>
				) : (
					bookmarks.map((item, index) => (
						<BookItemToggle key={index} item={item} />
					))
				)}
			</div>
		</div>
	);
}
