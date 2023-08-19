import React from "react";
import styled from "styled-components";
// eslint-disable-next-line
import FiltersPhone from "./FiltersPhone";
// import CardsStorePhone from "./CardsStorePhone";
import NewCardPhone from "./NewCardPhone";
import AdSense from "../AdSense";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const StoreListPhone = ({
	activeStoresOnly,
	allServicesCombined,
	filtersClicked,
	setFiltersClicked,
}) => {
	return (
		<StoreListPhoneWrapper>
			<FiltersPhone
				filtersClicked={filtersClicked}
				setFiltersClicked={setFiltersClicked}
			/>
			<div className='container mt-2'>
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
									<NewCardPhone
										store={p}
										allServicesCombined={allServicesCombined}
									/>

									{i === 5 ? (
										<div
											onClick={() => {
												ReactGA.event("Ads_Clicked", {
													event_category: "Ads_Clicked",
													event_label: "Ads_Clicked",
													value: 1, // Optional extra parameters
												});

												ReactPixel.track("Ads_Clicked", {
													content_name: "Ads_Clicked",
													content_category: "Ads_Clicked",
													value: "",
													currency: "",
												});
											}}
										>
											<AdSense adSlot='5842698744' />
										</div>
									) : null}
								</div>
							);
						})}
				</div>
			</div>
		</StoreListPhoneWrapper>
	);
};

export default StoreListPhone;

const StoreListPhoneWrapper = styled.div`
	display: none;
	color: white;

	@media (max-width: 1000px) {
		display: block;
	}
`;
