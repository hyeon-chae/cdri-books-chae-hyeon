import { useCallback, useRef, useState } from 'react';

import { ChevronDown, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import useClickOutside from '@/hooks/useClickOutside';
import type { RefObject } from 'react';
import type { SearchFilterTarget } from '@/lib/types/search';

interface SearchInputProps {
	inputValue: string;
	onChange: (value: string) => void;
	onSubmit: (filterKeyword?: string, target?: SearchFilterTarget) => void;
	onHistoryClick: (keyword: string) => void;
	onRemoveHistory: (keyword: string) => void;
	histories: string[];
	inputRef: RefObject<HTMLInputElement | null>;
}

const filterOptions = [
	{
		label: '제목',
		value: 'title',
	},
	{
		label: '저자명',
		value: 'person',
	},
	{
		label: '출판사',
		value: 'publisher',
	},
	{
		label: 'ISBN',
		value: 'isbn',
	},
] as const;

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

	const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
	const [searchFilter, setSearchFilter] = useState<SearchFilterTarget>('title');
	const [advancedSearchQuery, setAdvancedSearchQuery] = useState('');

	const inputWrapperRef = useRef<HTMLDivElement>(null);
	const filterRef = useRef<HTMLDivElement>(null);

	useClickOutside(inputWrapperRef, () => setShowDropdown(false));

	const handleShowAdvancedSearch = useCallback(() => {
		setShowAdvancedSearch((prev) => !prev);
		setShowDropdown(false);
		onChange(''); // Clear input when toggling advanced search
	}, []);

	const handleCloseAdvancedSearch = useCallback(() => {
		setShowAdvancedSearch(false);
		intialFilter();
	}, []);

	const handleAdvancedSearch = useCallback(() => {
		onSubmit(advancedSearchQuery, searchFilter);
		setShowAdvancedSearch(false);
		intialFilter();
	}, [advancedSearchQuery, searchFilter, onSubmit]);

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			onSubmit();
			setShowDropdown(false);
		},
		[onSubmit]
	);

	const intialFilter = useCallback(() => {
		setAdvancedSearchQuery(''); // Clear advanced search query
		setSearchFilter('title'); // Reset filter to default
	}, []);

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
						onFocus={() => {
							setShowDropdown(true);
							setShowAdvancedSearch(false);
							intialFilter();
						}}
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
				onClick={handleShowAdvancedSearch}
			>
				상세검색
			</Button>

			{showAdvancedSearch && (
				<div
					ref={filterRef}
					className="absolute top-[60px] left-[280px] z-20 mt-2 w-[360px] bg-white rounded-xl shadow-[0px_4px_14px_6px_rgba(151,151,151,0.15)] px-6 py-9 flex flex-col gap-4"
				>
					{/* 상단 닫기 버튼 */}
					<div className="absolute top-2 right-2">
						<X
							size={20}
							className="cursor-pointer text-gray-400 hover:text-gray-600"
							onClick={handleCloseAdvancedSearch}
						/>
					</div>

					{/* 필터 선택 + 입력 */}
					<div className="flex items-center gap-3">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div className="border-b border-[#D2D6DA]">
									<Button
										variant="ghost"
										className="flex justify-between items-center text-sm text-text-primary font-bold bg-white hover:bg-none px-2 min-w-[100px]"
									>
										{filterOptions.find((el) => el.value === searchFilter)
											?.label ?? '제목'}
										<ChevronDown className="w-4 h-4 ml-1 text-right" />
									</Button>
								</div>
							</DropdownMenuTrigger>

							<DropdownMenuContent
								ref={filterRef}
								align="start"
								className="w-24 shadow-[0px_4px_14px_6px_rgba(151,151,151,0.15)]"
							>
								{filterOptions.map((option) => (
									<DropdownMenuItem
										key={option.value}
										onClick={() => setSearchFilter(option.value)}
										className="text-sm px-3 py-2 text-text-primary font-medium cursor-pointer hover:bg-gray-100"
									>
										{option.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
						<div className="w-full border-b border-primary">
							<Input
								placeholder="검색어 입력"
								value={advancedSearchQuery}
								onChange={(e) => setAdvancedSearchQuery(e.target.value)}
								className="flex-1 focus-visible:ring-0 text-sm"
							/>
						</div>
					</div>

					{/* 검색하기 버튼 */}
					<Button
						className="bg-[#4880EE] text-white rounded-md hover:bg-[#3a6fd3]"
						onClick={handleAdvancedSearch}
					>
						검색하기
					</Button>
				</div>
			)}
		</div>
	);
}
