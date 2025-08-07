import { BookItemToggle } from '@/components/BookItemToggle';

export default function FavoritesContents() {
	return (
		<div className="w-full">
			<div className="space-y-4">
				<p className="text-[22px] font-bold text-[##1A1E27]">내가 찜한 책</p>
				<p className="text-sm text-text-primary font-[500]">
					도서 검색 결과&nbsp;&nbsp; 총{' '}
					<span className="text-[#4880EE] font-[500]">21</span>건
				</p>
			</div>
		</div>
	);
}
