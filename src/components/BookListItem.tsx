import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { type BookItemData } from '@/lib/types/search';
import { formatCurrency } from '@/lib/utils';

interface BookListItemProps {
	item: BookItemData;
	onToggleDetail: () => void;
	openDetail: boolean;
	handlePurchase: (url: string) => void;
	onToggleFavorite: () => void;
	favorite: boolean;
}

export function BookListItem({
	item,
	onToggleDetail,
	openDetail,
	handlePurchase,
	onToggleFavorite,
	favorite,
}: BookListItemProps) {
	return (
		<div className="flex items-center justify-between border-b p-4">
			<div className="flex items-center">
				<div className="flex-shrink-0 relative">
					<img
						src={item.thumbnail}
						alt={item.title}
						width={48}
						height={68}
						className="object-cover ml-8 mr-12"
					/>
					<img
						src={`/img/${favorite ? 'like.svg' : 'unlike.svg'}`}
						alt="찜하기"
						width={24}
						height={24}
						className="absolute top-0 left-14 cursor-pointer"
						onClick={onToggleFavorite}
					/>
				</div>
				<div className="flex gap-4 items-center">
					<p className="text-lg font-bold text-text-primary">{item.title}</p>
					<p className="text-sm text-text-secondary">{item.authors}</p>
				</div>
			</div>

			{/* 가격 + 버튼 */}
			<div className="flex items-center gap-14 justify-end ml-12">
				<span className="text-lg font-medium text-text-primary w-[75px]">
					{item.sale_price
						? formatCurrency(item.sale_price, true)
						: formatCurrency(item.price, true)}
				</span>
				<div className="gap-2 flex items-center">
					<Button
						className="bg-primary text-white hover:bg-[#3a6fd3] p-4 h-[48px] w-[115px]"
						onClick={() => handlePurchase(item.url)}
					>
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
