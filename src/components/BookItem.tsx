import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { type BookItemData } from '@/lib/types/search';

interface BookItemProps {
	item: BookItemData;
}

export function BookItem({ item }: BookItemProps) {
	return (
		<div className="flex items-center justify-between border-b pb-4">
			{/* 썸네일 */}
			<div className="flex items-center gap-4">
				<img
					src={item.url}
					alt={item.title}
					width={60}
					height={80}
					className="object-cover rounded"
				/>
				<div className="flex flex-col">
					<span className="text-base font-bold text-[#222222]">
						{item.title}
					</span>
					<span className="text-sm text-[#6D7582]">{item.authors}</span>
				</div>
			</div>

			{/* 가격 + 버튼 */}
			<div className="flex items-center gap-3 min-w-[220px] justify-end">
				<span className="text-base font-medium text-[#353C49]">
					{item.price}
				</span>
				<Button className="bg-[#4880EE] text-white hover:bg-[#3a6fd3] px-4 py-2 h-9 rounded-md">
					구매하기
				</Button>
				<Button
					variant="outline"
					className="text-[#353C49] border-[#DADADA] bg-[#F2F4F6] hover:bg-[#e4e7ea] px-3 h-9"
				>
					상세보기
					<ChevronDown size={16} className="ml-1" />
				</Button>
			</div>
		</div>
	);
}
