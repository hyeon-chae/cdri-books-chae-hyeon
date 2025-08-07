import { useState } from 'react';
import Header from '@/components/Header';
import SearchPage from './SearchContents';
import FavoritesContents from './FavoritesContents';

export default function Home() {
	const [activeTab, setActiveTab] = useState('search');

	return (
		<div>
			<Header onCangeTab={setActiveTab} />
			<h1 className="text-2xl font-bold mb-4"></h1>
			<div className="w-[960px] mx-auto py-20">
				{activeTab === 'search' && <SearchPage />}
				{activeTab === 'favorites' && <FavoritesContents />}
			</div>
		</div>
	);
}
