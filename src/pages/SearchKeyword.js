import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { storeSearch } from "../apiCore";
import StoreListPhone from "../components/SearchedStores/StoreListPhone";
import { useCartContext } from "../sidebar_context";

const SearchKeyword = () => {
	const [searchedStores, setSearchedStores] = useState([]);
	const { chosenLanguage } = useCartContext();
	const { keyword } = useParams();

	useEffect(() => {
		storeSearch(keyword)
			.then((data) => {
				// Get only the first 50 elements of the array
				const firstFiftyStores = data.slice(0, 50);
				setSearchedStores(firstFiftyStores);
			})
			.catch((err) => console.error(err));
	}, [keyword]);

	return (
		<SearchKeywordWrapper>
			<div>
				<StoreListPhone
					activeStoresOnly={searchedStores}
					language={chosenLanguage}
				/>
			</div>
		</SearchKeywordWrapper>
	);
};

export default SearchKeyword;

const SearchKeywordWrapper = styled.div`
	min-height: 1100px;
	background-color: black;
	padding-bottom: 50px;

	img {
		width: 100%;
		min-height: 300px;
	}

	@media (max-width: 1000px) {
		img {
			width: 100%;
			min-height: 100%;
		}
	}
`;
