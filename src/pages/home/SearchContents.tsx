import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { BookItem } from '@/components/BookItem';

export default function SearchPage() {
	return (
		<div className="w-full">
			<div className="space-y-6">
				{/* 제목 */}
				<h1 className="text-[22px] font-bold text-[##1A1E27]">도서 검색</h1>

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
					>
						상세검색
					</Button>
				</div>

				{/* 검색 결과 요약*/}
				<p className="text-sm text-primary font-[500]">
					도서 검색 결과&nbsp;&nbsp; 총{' '}
					<span className="text-[#4880EE] font-[500]">21</span>건
				</p>
			</div>
			{/* 검색 결과 목록 */}
			<div className="mt-9">{/* <BookItem /> */}</div>
		</div>
	);
}
