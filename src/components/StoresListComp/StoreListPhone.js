import React from "react";
import styled from "styled-components";
// eslint-disable-next-line
import FiltersPhone from "./FiltersPhone";
// import CardsStorePhone from "./CardsStorePhone";
import NewCardPhone from "./NewCardPhone";

const StoreListPhone = ({
	activeStoresOnly,
	allServicesCombined,
	filtersClicked,
	setFiltersClicked,
}) => {
	return (
		<StoreListPhoneWrapper>
			{/* <FiltersPhone
				filtersClicked={filtersClicked}
				setFiltersClicked={setFiltersClicked}
			/> */}
			<div className='container'>
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
