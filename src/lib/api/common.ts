type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiFetchOptions {
	path: string;
	method?: ApiMethod;
	params?: Record<string, any>;
	body?: any;
	headers?: HeadersInit;
}

const BASE_URL = import.meta.env.VITE_API_URL;
const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

export async function apiFetch<T>(options: ApiFetchOptions): Promise<T> {
	const { path, method = 'GET', params, body, headers } = options;

	const queryString = params
		? '?' +
		  Object.entries(params)
				.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
				.join('&')
		: '';

	const url = `${BASE_URL}${path}${queryString}`;

	const customHeaders: Record<string, string> = {
		Authorization: `KakaoAK ${KAKAO_API_KEY}`,
		...(headers as Record<string, string>),
	};

	if (body && method !== 'GET' && method !== 'DELETE') {
		customHeaders['Content-Type'] = 'application/json';
	}

	const res = await fetch(url, {
		method,
		// credentials: 'include',
		headers: customHeaders,
		body: body ? JSON.stringify(body) : undefined,
	});

	if (!res.ok) {
		const errData = await res.json().catch(() => ({}));
		throw new Error(errData.message || 'API Error');
	}

	return res.json();
}

export const apiGet = <T>(path: string, params?: Record<string, any>) => {
	return apiFetch<T>({ path, method: 'GET', params });
};

export const apiPost = <T>(path: string, body?: any) => {
	return apiFetch<T>({ path, method: 'POST', body });
};

export const apiPut = <T>(path: string, body?: any) => {
	return apiFetch<T>({ path, method: 'PUT', body });
};

export const apiPatch = <T>(path: string, body?: any) => {
	return apiFetch<T>({ path, method: 'PATCH', body });
};

export const apiDelete = <T>(path: string, body?: any) => {
	return apiFetch<T>({ path, method: 'DELETE', body });
};
