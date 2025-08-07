import { useCallback, useRef, useState } from 'react';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import useClickOutside from '@/hooks/useClickOutside';
import type { RefObject } from 'react';

interface SearchInputProps {
	inputValue: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	onHistoryClick: (keyword: string) => void;
	onRemoveHistory: (keyword: string) => void;
	histories: string[];
	inputRef: RefObject<HTMLInputElement | null>;
}

export function SearchInput({
	inputValue,
	onChange,
	onSubmit,
	onHistoryClick,
	onRemoveHistory,
	histories,
	inputRef,
}: SearchInputProps) {
	const [showDropdown, setShowDropdown] = useState(false);
	const inputWrapperRef = useRef<HTMLDivElement>(null);

	useClickOutside(inputWrapperRef, () => setShowDropdown(false));

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			onSubmit();
			setShowDropdown(false);
		},
		[onSubmit]
	);

	return (
		<div className="flex items-center gap-4 relative" ref={inputWrapperRef}>
			<div
				className={`relative w-[480px] max-w-lg bg-[#F2F4F6] ${
					showDropdown ? 'rounded-t-[24px]' : 'rounded-full'
				}`}
			>
				<form
					className="flex items-center px-2.5"
					onSubmit={(e) => handleSubmit(e)}
				>
					<Search className="text-text-primary ml-2" size={24} />
					<Input
						ref={inputRef}
						type="text"
						placeholder="검색어를 입력하세요"
						value={inputValue}
						onChange={(e) => onChange(e.target.value)}
						onFocus={() => setShowDropdown(true)}
						className="px-3 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[50px] placeholder:text-[#8D94A0]"
					/>
				</form>

				{showDropdown && histories.length > 0 && (
					<div className="absolute top-[50px] left-0 w-full bg-[#F2F4F6] rounded-b-[24px] z-10 pb-4">
						{histories.map((history) => (
							<div
								key={history}
								className="py-2 pl-[50px] pr-6 flex items-center justify-between hover:bg-[#e9ecef] cursor-pointer"
							>
								<p
									className="text-text-subtitle font-medium hover:text-text-primary"
									onClick={() => {
										onHistoryClick(history);
										setShowDropdown(false);
									}}
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
			<Button
				variant="outline"
				className="border-[#8D94A0] text-[#8D94A0] px-2.5 py-2.5 text-sm"
				onClick={onSubmit}
			>
				상세검색
			</Button>
		</div>
	);
}
