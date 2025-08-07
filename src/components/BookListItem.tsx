import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { type BookItemData } from '@/lib/types/search';
import { formatCurrency } from '@/lib/utils';

interface BookListItemProps {
	item: BookItemData;
	onToggleDetail: () => void;
	openDetail: boolean;
}

export function BookListItem({
	item,
	onToggleDetail,
	openDetail,
}: BookListItemProps) {
	return (
		<div className="flex items-center justify-between border-b p-4">
			<div className="flex items-center gap-4">
				<img
					src={item.thumbnail}
					alt={item.title}
					width={48}
					height={68}
					className="object-cover ml-8"
				/>
				<div className="flex gap-4 items-center">
					<p className="text-lg font-bold text-text-primary">{item.title}</p>
					<p className="text-sm text-text-secondary">{item.authors}</p>
				</div>
			</div>

			{/* 가격 + 버튼 */}
			<div className="flex items-center gap-14 justify-end">
				<span className="text-lg font-medium text-text-primary">
					{formatCurrency(item.sale_price, true)}
				</span>
				<div className="gap-2 flex items-center">
					<Button className="bg-primary text-white hover:bg-[#3a6fd3] p-4 h-[48px] w-[115px]">
						구매하기
					</Button>
					<Button
						variant="outline"
						className="text-text-secondary border-[#F2F4F6] bg-[#F2F4F6] hover:bg-[#e4e7ea] p-4 h-[48px] w-[115px]"
						onClick={onToggleDetail}
					>
						상세보기
						{openDetail ? (
							<ChevronUp size={16} className="ml-1" />
						) : (
							<ChevronDown size={16} className="ml-1" />
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
