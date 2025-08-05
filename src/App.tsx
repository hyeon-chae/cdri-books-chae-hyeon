import { useState } from 'react';

import Header from '@/components/Header';

function App() {
	const [activeTab, setActiveTab] = useState('search');

	return (
		<>
			<Header onCangeTab={setActiveTab} />
			<div className="">
				{activeTab === 'search' && <div>도서 검색</div>}
				{activeTab === 'favorites' && <div>내가 찜한 책</div>}
			</div>
		</>
	);
}

export default App;
