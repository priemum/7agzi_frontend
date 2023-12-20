import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FiltersPhone from "./FiltersPhone";
import NewCardPhone from "./NewCardPhone";
import AffiliateLinks from "../HomePage/AffiliateLinks";
import SingleAffiliateProduct from "../StoresListComp/SingleAffiliateProduct";

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

const StoreListPhone = ({
	activeStoresOnly,
	allServicesCombined,
	filtersClicked,
	setFiltersClicked,
	affiliateProducts,
	randomNumberArray,
}) => {
	// eslint-disable-next-line
	const [contentRef, contentVisible] = useFadeInOnScroll();

	return (
		<StoreListPhoneWrapper>
			<FiltersPhone
				filtersClicked={filtersClicked}
				setFiltersClicked={setFiltersClicked}
			/>

			{/* <ContentContainer ref={contentRef} isVisible={contentVisible}> */}
			{/* <div>
					<AffiliateLinks affiliateProducts={affiliateProducts} />
				</div> */}
			{/* <AdSense adSlot='5842698744' /> */}

			<div className='row'>
				{activeStoresOnly &&
					activeStoresOnly.map((p, i) => {
						return (
							<>
								<div
									key={i}
									className='col-md-4'
									onClick={() => {
										localStorage.setItem("chosenStore", JSON.stringify(p));
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<NewCardPhone
										store={p}
										allServicesCombined={allServicesCombined}
									/>

									{i % 3 === 0 && i !== 0 && (
										<SingleAffiliateProduct
											affiliateProducts={affiliateProducts}
											randomNumberArray={randomNumberArray}
											chosenIndex={randomNumberArray[Math.floor(i / 3) - 1]}
										/>
									)}
								</div>
								{/* Conditionally render SingleAffiliateProduct */}
							</>
						);
					})}
			</div>
			{/* </ContentContainer> */}
			<div>
				<AffiliateLinks affiliateProducts={affiliateProducts} />
				{/* <AdSense adSlot='5842698744' /> */}
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

// eslint-disable-next-line
const ContentContainer = styled.div.attrs((props) => ({
	style: {
		opacity: props.isVisible ? 1 : 0,
	},
}))`
	transition: opacity 0.5s ease-in-out;
	margin-top: 1rem; // Representing mt-2 in your code
`;

export default StoreListPhone;
