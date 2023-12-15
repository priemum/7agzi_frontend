import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import NewCardPhone from "./NewCardPhone";
// import AdSense from "../AdSense";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

// Custom Hook for Fade-In effect
function useFadeInOnScroll() {
	const ref = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				} else {
					setIsVisible(false);
				}
			},
			{
				threshold: 0.1, // You can adjust this if needed
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
	}, []);

	return [ref, isVisible];
}

const StoreListPhone = ({ activeStoresOnly }) => {
	const [contentRef, contentVisible] = useFadeInOnScroll();

	return (
		<StoreListPhoneWrapper>
			<div ref={contentRef} isVisible={contentVisible}>
				<div className='row'>
					{activeStoresOnly &&
						activeStoresOnly.map((p, i) => {
							return (
								<div
									key={i}
									className='col-md-4'
									onClick={() => {
										localStorage.setItem("chosenStore", JSON.stringify(p));
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<NewCardPhone store={p} />

									{(i === 5 || i === 10) && (
										<div
											onClick={() => {
												ReactGA.event("Ads_Clicked_SearchList", {
													event_category: "Ads_Clicked_SearchList",
													event_label: "Ads_Clicked",
													value: 1,
												});

												ReactPixel.track("Ads_Clicked_SearchList", {
													content_name: "Ads_Clicked_SearchList",
													content_category: "Ads_Clicked_SearchList",
													value: "",
													currency: "",
												});
											}}
										>
											{/* <AdSense adSlot='5842698744' /> */}
										</div>
									)}
								</div>
							);
						})}
				</div>
			</div>
		</StoreListPhoneWrapper>
	);
};

const StoreListPhoneWrapper = styled.div`
	color: white;
	margin-right: 200px;
	margin-left: 200px;
	margin-bottom: 200px;

	@media (max-width: 1100px) {
		display: block;
		margin-right: 5px;
		margin-left: 5px;
		margin-bottom: 20px;
	}
`;

export default StoreListPhone;
