import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

interface HeaderTab {
	onCangeTab: (value: string) => void;
}

export default function Header({ onCangeTab }: HeaderTab) {
	const handleHeaderTabClick = (value: string) => {
		onCangeTab(value);
	};

	return (
		<header className="w-full">
			<div className="mx-auto flex max-w-7xl items-center justify-between p-6 ">
				<h1 className="text-primary">CERTICOS BOOKS</h1>

				<Tabs defaultValue="search">
					<TabsList className="flex gap-8 bg-white px-0">
						<TabsTrigger
							value="search"
							className="tab-trigger-custom"
							onClick={() => handleHeaderTabClick('search')}
						>
							도서 검색
						</TabsTrigger>
						<TabsTrigger
							value="favorites"
							className="tab-trigger-custom"
							onClick={() => handleHeaderTabClick('favorites')}
						>
							내가 찜한 책
						</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="w-[100px]"></div>
			</div>
		</header>
	);
}
