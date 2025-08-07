import { useEffect, useRef } from 'react';

interface Props {
	onIntersect: () => void;
	enabled: boolean;
	threshold?: number;
}

const useInfiniteScroll = ({ onIntersect, enabled, threshold = 1 }: Props) => {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const node = ref.current;

		if (!enabled || !node) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				// console.log('옵저버 콜백 실행', entry.isIntersecting);
				if (entry.isIntersecting) {
					// console.log('인터섹션 감지');
					onIntersect();
				}
			},
			{
				threshold,
			}
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, [enabled, onIntersect, threshold]);

	return ref;
};

export default useInfiniteScroll;
