// src/components/ui/PaginationWrapper.tsx
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
} from '@/components/ui/pagination';

interface PaginationWrapperProps {
	page: number;
	totalPages: number;
	onChange: (page: number) => void;
	className?: string;
}

export function PaginationWrapper({
	page,
	totalPages,
	onChange,
	className,
}: PaginationWrapperProps) {
	if (totalPages <= 1) return null;

	return (
		<Pagination className={className}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={page === 1 ? undefined : () => onChange(page - 1)}
						className={page === 1 ? 'pointer-events-none opacity-50' : ''}
					/>
				</PaginationItem>

				{Array.from({ length: totalPages }, (_, i) => (
					<PaginationItem key={i}>
						<PaginationLink
							isActive={page === i + 1}
							onClick={() => onChange(i + 1)}
						>
							{i + 1}
						</PaginationLink>
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						onClick={page === totalPages ? undefined : () => onChange(page + 1)}
						className={
							page === totalPages ? 'pointer-events-none opacity-50' : ''
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
