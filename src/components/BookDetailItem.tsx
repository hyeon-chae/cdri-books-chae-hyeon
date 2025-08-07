import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { type BookItemData } from '@/lib/types/search';
import { formatCurrency } from '@/lib/utils';

interface BookDetailItemProps {
	item: BookItemData;
	onToggleDetail: () => void;
	openDetail: boolean;
	handlePurchase: (url: string) => void;
	onToggleFavorite: (isbn: string) => void;
	favorite: boolean;
}

export function BookDetailItem({
	item,
	onToggleDetail,
	openDetail,
	handlePurchase,
	onToggleFavorite,
	favorite,
}: BookDetailItemProps) {
	return (
		<div className="flex pt-6 pb-10 px-4 gap-8 border-b items-start justify-between h-[345px]">
			{/* 책 이미지 */}
			<div className="w-[200px] flex-shrink-0 relative">
				<img
					src={item.thumbnail}
					alt={item.title}
					width={210}
					height={280}
					className="object-cover"
				/>
				<img
					src={`/img/${favorite ? 'like.svg' : 'unlike.svg'}`}
					alt="찜하기"
					width={24}
					height={24}
					className="absolute top-2 right-2 cursor-pointer"
					onClick={() => onToggleFavorite(item.isbn)}
				/>
			</div>

			<div className="flex flex-col items-start justify-between gap-4">
				<div className="flex gap-2 pt-5">
					<p className="text-xl font-bold text-[#222222] mb-1">{item.title}</p>
					<p className="text-sm text-text-subtitle mt-1">{item.authors}</p>
				</div>

				<p className="font-bold">책소개</p>

				<p className="text-[10px] font-medium leading-[16px]">
					{item.contents}
				</p>
			</div>

			{/* 가격 & 버튼 */}
			<div className="flex flex-col items-end justify-between h-full">
				<Button
					variant="ghost"
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

				<div className="text-sm space-y-1 flex flex-col items-end gap-6">
					<div>
						<div className="gap-2 flex items-center justify-end mb-2">
							<p className="text-text-subtitle text-[10px] font-medium">원가</p>
							<p
								className={`text-lg text-text-primary ${
									item.sale_price ? 'font-light line-through' : 'font-bold'
								}`}
							>
								{formatCurrency(item.price, true)}
							</p>
						</div>
						{item.sale_price && (
							<div className="gap-2 flex items-center justify-end">
								<p className="text-text-subtitle text-[10px] font-medium">
									할인가
								</p>
								<p className="text-lg text-text-primary font-bold">
									{formatCurrency(item.sale_price, true)}
								</p>
							</div>
						)}
					</div>
					<Button
						className="bg-primary text-white hover:bg-[#3a6fd3] p-4 h-[48px] w-[240px]"
						onClick={() => handlePurchase(item.url)}
					>
						구매하기
					</Button>
				</div>
			</div>
		</div>
	);
}
