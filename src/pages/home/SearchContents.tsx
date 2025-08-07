import { useCallback, useRef, useState } from 'react';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Empty from '@/components/Empty';
import { BookItemToggle } from '@/components/BookItemToggle';

import { formatCurrency } from '@/lib/utils';
import { useSearchBooks } from '@/hooks/useSearchBooks';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useClickOutside from '@/hooks/useClickOutside';
import { useSearchHistoryStore } from '@/stores/searchHistoryStore';

export default function SearchContents() {
	const { histories, addHistory, removeHistory } = useSearchHistoryStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [inputValue, setInputValue] = useState('');

	const [enabled, setEnabled] = useState(false);

	const [showDropdown, setShowDropdown] = useState(false);

	const inputWrapperRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useSearchBooks(searchQuery, enabled);

	const totalCount = data?.meta.total_count ?? 0;
	const books = data?.pages.flatMap((page) => page.documents) ?? [];

	useClickOutside(inputWrapperRef, () => {
		setShowDropdown(false);
	});

	const onSearch = useCallback(() => {
		setSearchQuery(inputValue);
		setEnabled(true);
		addHistory(inputValue);
		setShowDropdown(false);
		inputRef.current?.blur();
	}, [inputValue]);

	const onRemoveHistory = useCallback(
		(keyword: string) => {
			removeHistory(keyword);
		},
		[removeHistory]
	);

	const onSearchHistory = useCallback(
		(keyword: string) => {
			setInputValue(keyword);
			setSearchQuery(keyword);
			setEnabled(true);
			addHistory(keyword);
			setShowDropdown(false);
			inputRef.current?.blur();
		},
		[addHistory]
	);

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

				<div className="flex items-start gap-4 relative" ref={inputWrapperRef}>
					{/* 검색창 박스 */}
					<div
						className={`relative w-[480px] max-w-lg bg-[#F2F4F6] ${
							showDropdown ? 'rounded-t-[24px]' : 'rounded-full'
						}`}
						tabIndex={0}
					>
						<form
							className="flex items-center px-2.5"
							onSubmit={(e) => {
								e.preventDefault();
								onSearch();
							}}
						>
							<Search className="text-text-primary ml-2" size={24} />
							<Input
								ref={inputRef}
								type="text"
								placeholder="검색어를 입력하세요"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onFocus={() => setShowDropdown(true)}
								className="px-3 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[50px] placeholder:text-[#8D94A0]"
							/>
						</form>

						{/* 드롭다운 목록 */}
						{showDropdown && histories.length > 0 && (
							<div className="absolute top-[50px] left-0 w-full bg-[#F2F4F6] rounded-b-[24px] z-10 pb-4">
								{histories.map((history) => (
									<div
										key={history}
										className="py-2 pl-[50px] pr-6 flex items-center justify-between hover:bg-[#e9ecef] cursor-pointer"
									>
										<p
											className="text-text-subtitle font-medium hover:text-text-primary"
											onClick={() => onSearchHistory(history)}
										>
											{history}
										</p>
										<X
											size={20}
											className="cursor-pointer"
											onClick={() => onRemoveHistory(history)}
										/>
									</div>
								))}
							</div>
						)}
					</div>

					{/* 상세검색 버튼 */}
					<Button
						variant="outline"
						className="border-[#8D94A0] text-[#8D94A0] px-2.5 py-2.5 text-sm"
						onClick={onSearch}
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

			{/* 옵저버가 인지하는 요소 */}
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
