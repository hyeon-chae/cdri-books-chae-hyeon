import { useCallback, useRef, useState } from 'react';

import Empty from '@/components/Empty';
import { BookItemToggle } from '@/components/BookItemToggle';
import { SearchInput } from '@/components/SearchInput';

import { formatCurrency } from '@/lib/utils';
import { useSearchBooks } from '@/hooks/useSearchBooks';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

import { useSearchHistoryStore } from '@/stores/searchHistoryStore';
import type { SearchFilterTarget } from '@/lib/types/search';

export default function SearchContents() {
	const { histories, addHistory, removeHistory } = useSearchHistoryStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [searchFilter, setSearchFilter] = useState<SearchFilterTarget>('title');

	const [enabled, setEnabled] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useSearchBooks(searchQuery, searchFilter, enabled);

	const totalCount = data?.meta.total_count ?? 0;
	const books = data?.pages.flatMap((page) => page.documents) ?? [];

	const onSearch = useCallback(
		(filterKeyword?: string, target?: SearchFilterTarget) => {
			// filterKeyword가 있으면 해당 키워드로 검색
			const query = filterKeyword || inputValue;
			if (!query) return;

			if (target) {
				setSearchFilter(target);
			}

			filterKeyword && setInputValue(query);
			setSearchQuery(query);
			setEnabled(true);
			addHistory(query);
			inputRef.current?.blur();
		},
		[inputValue, addHistory]
	);

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

				{/* 검색 박스 */}
				<SearchInput
					inputValue={inputValue}
					onChange={setInputValue}
					onSubmit={onSearch}
					onHistoryClick={onSearchHistory}
					onRemoveHistory={onRemoveHistory}
					histories={histories}
					inputRef={inputRef}
				/>

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
