// src/App.tsx
import { useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
			{import.meta.env.local && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
}

export default App;
