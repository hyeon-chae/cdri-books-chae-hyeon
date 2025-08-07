import { useCallback, useState } from 'react';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Empty from '@/components/Empty';
import { BookItemToggle } from '@/components/BookItemToggle';

import { useSearchBooks } from '@/hooks/useSearchBooks';
import { formatCurrency } from '@/lib/utils';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

export default function SearchContents() {
	const [searchQuery, setSearchQuery] = useState('');
	const [inputValue, setInputValue] = useState('');

	const [enabled, setEnabled] = useState(false);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useSearchBooks(searchQuery, enabled);

	const totalCount = data?.pages[0]?.meta.total_count ?? 0;
	const books = data?.pages.flatMap((page) => page.documents) ?? [];

	const onSearch = useCallback(() => {
		setSearchQuery(inputValue);
		setEnabled(true);
	}, [inputValue]);

	// 스크롤 감지 후 fetchNextPage 호출
	const loadMoreRef = useInfiniteScroll({
		onIntersect: () => {
			if (hasNextPage && !isFetchingNextPage) {
				fetchNextPage();
			}
		},
		enabled: enabled && !!hasNextPage,
	});

	return (
		<div className="w-full flex-1">
			<div className="space-y-4">
				{/* 제목 */}
				<p className="text-[22px] font-bold text-[##1A1E27]">도서 검색</p>

				{/* 검색창 + 버튼 */}
				<div className="flex items-center gap-4">
					<div className="relative w-[480px] max-w-lg bg-[#F2F4F6] px-2.5 rounded-full">
						<Search
							className="absolute left-4 top-1/2 -translate-y-1/2 text-[#353C49]"
							size={30}
						/>
						<Input
							type="text"
							placeholder="검색어를 입력하세요"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									onSearch();
								}
							}}
							disabled={isLoading}
							className="pl-12 pr-4 rounded-full bg-[#F2F4F6] focus-visible:ring-0 focus-visible:ring-offset-0 h-[50px]"
						/>
					</div>
					<Button
						variant="outline"
						className="border-[#8D94A0] text-[#8D94A0] px-2.5 py-2.5 text-sm"
						onClick={() => onSearch()}
					>
						상세검색
					</Button>
				</div>

				{/* 검색 결과 요약*/}
				<p className="text-sm text-text-primary font-[500] pt-2">
					도서 검색 결과&nbsp;&nbsp; 총{' '}
					<span className="text-[#4880EE] font-[500]">
						{formatCurrency(totalCount)}
					</span>
					건
				</p>
			</div>
			{/* 검색 결과 목록 */}
			<div className="mt-9 h-auto overflow-y-scroll">
				{books.length === 0 ? (
					<div className="pt-20">
						<Empty msg="검색된 결과가 없습니다." />
					</div>
				) : (
					books.map((item) => <BookItemToggle item={item} key={item.isbn} />)
				)}
			</div>
			<div ref={loadMoreRef} style={{ height: '1px' }} />
			{isLoading && (
				<p className="text-center text-text-secondary py-10">로딩 중...</p>
			)}
			{isFetchingNextPage && (
				<p className="text-center text-text-secondary py-10">
					다음 페이지 불러오는 중...
				</p>
			)}
		</div>
	);
}
