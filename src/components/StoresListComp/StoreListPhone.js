import React from "react";
import styled from "styled-components";
import FiltersPhone from "./FiltersPhone";
import CardsStorePhone from "./CardsStorePhone";

const StoreListPhone = ({ activeStoresOnly, allServicesCombined }) => {
	return (
		<StoreListPhoneWrapper>
			<FiltersPhone />
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
									<CardsStorePhone
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
