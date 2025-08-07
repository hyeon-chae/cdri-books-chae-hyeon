import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { BookItemToggle } from '@/components/BookItemToggle';

import { useMutation } from '@tanstack/react-query';
import { getSearchBooks } from '@/lib/api/search';
import { useState } from 'react';
import type { BookItemData } from '@/lib/types/search';
import Empty from '@/components/Empty';

export default function SearchPage() {
	const [books, setBooks] = useState<BookItemData[]>([]);
	const [totalCount, setTotalCount] = useState(0);

	const [searchQuery, setSearchQuery] = useState({
		query: '소설',
		page: 1,
		size: 10,
	});

	const searchMutation = useMutation({
		mutationFn: () =>
			getSearchBooks(searchQuery.query, searchQuery.page, searchQuery.size),
		onSuccess: (data) => {
			console.log('Search results:', data);
			setBooks(data.documents);
			setTotalCount(data.meta.total_count);
		},
		onError: (error: any) => {
			console.error('Error fetching search results:', error);
		},
	});

	return (
		<div className="w-full">
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
							className="pl-12 pr-4 rounded-full bg-[#F2F4F6] focus-visible:ring-0 focus-visible:ring-offset-0 h-[50px]"
						/>
					</div>
					<Button
						variant="outline"
						className="border-[#8D94A0] text-[#8D94A0] px-2.5 py-2.5 text-sm"
						onClick={() => {
							searchMutation.mutate();
						}}
					>
						상세검색
					</Button>
				</div>

				{/* 검색 결과 요약*/}
				<p className="text-sm text-text-primary font-[500] pt-2">
					도서 검색 결과&nbsp;&nbsp; 총{' '}
					<span className="text-[#4880EE] font-[500]">21</span>건
				</p>
			</div>
			{/* 검색 결과 목록 */}
			<div className="mt-9">
				{books.length === 0 ? (
					<div className="pt-20">
						<Empty msg="검색된 결과가 없습니다." />
					</div>
				) : (
					books.map((item, index) => <BookItemToggle key={index} item={item} />)
				)}
			</div>
		</div>
	);
}
