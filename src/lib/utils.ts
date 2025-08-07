import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number, withSymbol = false): string => {
	return withSymbol
		? `${value.toLocaleString('ko-KR')}원`
		: value.toLocaleString('ko-KR');
};
