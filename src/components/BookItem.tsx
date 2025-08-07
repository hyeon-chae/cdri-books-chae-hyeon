import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { type BookItemData } from '@/lib/types/search';
import { formatCurrency } from '@/lib/utils';

interface BookItemProps {
	item: BookItemData;
}

export function BookItem({ item }: BookItemProps) {
	const [openDetail, setOpenDetail] = useState(false);

	const onToggleDetail = useCallback(() => {
		setOpenDetail((prev) => !prev);
	}, []);

	return (
		<div>
			{openDetail ? (
				// 상세보기 모드
				<div className="flex pt-6 pb-10 px-4 gap-8 border-b items-start justify-between h-[345px]">
					{/* 책 이미지 */}
					<div className="w-[200px] flex-shrink-0">
						<img
							src={item.thumbnail}
							alt={item.title}
							width={210}
							height={280}
							className="object-cover"
						/>
					</div>

					<div className="flex flex-col items-start justify-between gap-4">
						<div className="flex gap-3 pt-5">
							<p className="text-xl font-bold text-[#222222] mb-1">
								{item.title}
							</p>
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
									<p className="text-text-subtitle text-[10px] font-medium">
										원가
									</p>
									<p className="text-lg text-text-primary line-through font-light">
										{formatCurrency(item.price, true)}
									</p>
								</div>
								<div className="gap-2 flex items-center justify-end">
									<p className="text-text-subtitle text-[10px] font-medium">
										할인가
									</p>
									<p className="text-lg text-text-primary line-through font-bold">
										{formatCurrency(item.sale_price, true)}
									</p>
								</div>
							</div>
							<Button className="bg-primary text-white hover:bg-[#3a6fd3] p-4 h-[48px] w-[240px]">
								구매하기
							</Button>
						</div>
					</div>
				</div>
			) : (
				// 목록 모드
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
							<p className="text-lg font-bold text-text-primary">
								{item.title}
							</p>
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
			)}
		</div>
	);
}
