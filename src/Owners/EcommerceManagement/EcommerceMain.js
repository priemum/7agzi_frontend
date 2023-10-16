import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import OwnerNavmenu from "../NewOwnerNavMenu/OwnerNavmenu";
import { useCartContext } from "../../sidebar_context";
import EcomNav from "../../ecommerceModule/EcommerceNavigation/EcomNav";
import AddCategory from "../../ecommerceModule/Categories/AddCategory";
import AddSubcategory from "../../ecommerceModule/Subcategory/AddSubcategory";
import AddProduct from "../../ecommerceModule/ProductManagement/AddingProduct/AddProduct";
import StoreSettingsView from "../../ecommerceModule/StoreSettings/StoreSettingsView";
import { isAuthenticated } from "../../auth";

const EcommerceMain = () => {
	const [clickedMenu, setClickedMenu] = useState("Categories");
	const [categoryMenu, setCategoryMenu] = useState("AddCategory");
	const [SubcategoryMenu, setSubCategoryMenu] = useState("AddSubCategory");
	const { chosenLanguage } = useCartContext();
	const { user } = isAuthenticated();

	console.log(clickedMenu, "clickedMenu");

	useEffect(() => {
		if (window.location.search.includes("categories")) {
			setClickedMenu("Categories");
		} else if (window.location.search.includes("subcategory")) {
			setClickedMenu("Subcategories");
		} else if (window.location.search.includes("products")) {
			setClickedMenu("Products");
		} else if (window.location.search.includes("orders")) {
			setClickedMenu("Orders");
		} else if (window.location.search.includes("storesettings")) {
			setClickedMenu("StoreSettings");
		} else {
			setClickedMenu("Categories");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<EcommerceMainWrapper dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
			<div className='grid-container'>
				<div className='menuWrapper'>
					{user.role === 5000 ? null : (
						<OwnerNavmenu language={chosenLanguage} fromPage='EcommerceStore' />
					)}
				</div>
				<div
					className='ecommerceStoreWrapper'
					dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "left" }}
				>
					<EcomNav
						clickedMenu={clickedMenu}
						setClickedMenu={setClickedMenu}
						chosenLanguage={chosenLanguage}
						user={user}
					/>
					{clickedMenu === "Categories" ? (
						<AddCategory
							chosenLanguage={chosenLanguage}
							categoryMenu={categoryMenu}
							setCategoryMenu={setCategoryMenu}
						/>
					) : null}

					{clickedMenu === "Subcategories" ? (
						<AddSubcategory
							chosenLanguage={chosenLanguage}
							SubcategoryMenu={SubcategoryMenu}
							setSubCategoryMenu={setSubCategoryMenu}
						/>
					) : null}

					{clickedMenu === "Products" ? (
						<AddProduct
							chosenLanguage={chosenLanguage}
							SubcategoryMenu={SubcategoryMenu}
							setSubCategoryMenu={setSubCategoryMenu}
						/>
					) : null}

					{clickedMenu === "StoreSettings" ? (
						<StoreSettingsView chosenLanguage={chosenLanguage} />
					) : null}
				</div>
			</div>
		</EcommerceMainWrapper>
	);
};

export default EcommerceMain;

const EcommerceMainWrapper = styled.div`
	min-height: 1000px;

	.grid-container {
		display: grid;
		grid-template-columns: 5% 95%;
	}

	.menuWrapper {
		background-color: black;
		overflow: auto;
		min-height: 1000px;
	}

	.ecommerceStoreWrapper {
		margin: 50px;
	}

	@media (max-width: 1200px) {
		.grid-container {
			display: grid;
			grid-template-columns: 18% 82%;
		}

		.menuItems {
			font-size: 12px !important;
			margin: auto !important;
		}

		.messageWrapper {
			margin-right: 2px !important;
			margin-left: 5px !important;
		}

		.ecommerceStoreWrapper {
			margin: 10px;
		}
	}
`;
