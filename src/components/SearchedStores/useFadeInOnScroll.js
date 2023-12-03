import { useEffect, useRef, useState } from "react";

function useFadeInOnScroll() {
	const ref = useRef(null);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				threshold: 0.1,
			}
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				// eslint-disable-next-line
				observer.unobserve(ref.current);
			}
		};
		// eslint-disable-next-line
	}, []);
	// eslint-disable-next-line
	return [ref, isVisible];
}

export default useFadeInOnScroll;
