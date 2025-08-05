import { useState } from 'react';
import Header from '@/components/Header';

export default function Home() {
	const [activeTab, setActiveTab] = useState('search');

	return (
		<div className="">
			<Header onCangeTab={setActiveTab} />
			<h1 className="text-2xl font-bold mb-4"></h1>
			<div className="">
				{activeTab === 'search' && <div>도서 검색</div>}
				{activeTab === 'favorites' && <div>내가 찜한 책</div>}
			</div>
		</div>
	);
}
