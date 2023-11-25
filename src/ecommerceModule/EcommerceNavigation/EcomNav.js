import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const EcomNav = ({ clickedMenu, setClickedMenu, chosenLanguage, user }) => {
	const isActive = (history, path) => {
		if (history === path) {
			return {
				background: "#0f377e",
				fontWeight: "bold",
				borderRadius: "5px",
				fontSize: "1rem",
				textAlign: "center",
				padding: "10px",
				color: "white",
				transition: "var(--mainTransition)",
			};
		} else {
			return {
				backgroundColor: "white",
				padding: "10px",
				borderRadius: "5px",
				fontSize: "1.2rem",
				fontWeight: "bold",
				textAlign: "center",
				cursor: "pointer",
				transition: "var(--mainTransition)",
				color: "black",
			};
		}
	};

	return (
		<EcomNavWrapper>
			<div
				className='row mx-auto'
				style={{ backgroundColor: "white", padding: "5px" }}
			>
				<div
					style={isActive(clickedMenu, "StoreSettings")}
					className='col-md-3 col-6 mx-auto menuItems mb-2'
					onClick={() => setClickedMenu("StoreSettings")}
				>
					<Link
						className='p-0'
						style={isActive(clickedMenu, "StoreSettings")}
						onClick={() => setClickedMenu("StoreSettings")}
						to={
							user.role === 5000
								? "/ecommerce/admin/dashboard?storesettings"
								: "/store/admin/ecommerce-integration?storesettings"
						}
					>
						<i className='fa-solid fa-list mx-1'></i>
						{chosenLanguage === "Arabic" ? "إعدادات المتجر" : "Store Settings"}
					</Link>
				</div>
				<div
					style={isActive(clickedMenu, "Subcategories")}
					className='col-md-3 col-6 mx-auto menuItems'
					onClick={() => setClickedMenu("Subcategories")}
				>
					<Link
						className='p-0'
						style={isActive(clickedMenu, "Subcategories")}
						onClick={() => setClickedMenu("Subcategories")}
						to={
							user.role === 5000
								? "/ecommerce/admin/dashboard?subcategory"
								: "/store/admin/ecommerce-integration?subcategory"
						}
					>
						<i className='fa-solid fa-sitemap mx-1'></i>
						{chosenLanguage === "Arabic" ? "الفئات الفرعية" : "Subcategories"}
					</Link>
				</div>
				<div
					style={isActive(clickedMenu, "Products")}
					className='col-md-3 col-6 mx-auto menuItems'
					onClick={() => setClickedMenu("Products")}
				>
					<Link
						className='p-0'
						style={isActive(clickedMenu, "Products")}
						onClick={() => setClickedMenu("Products")}
						to={
							user.role === 5000
								? "/ecommerce/admin/dashboard?products"
								: "/store/admin/ecommerce-integration?products"
						}
					>
						<i className='fa-solid fa-tags mx-1'></i>
						{chosenLanguage === "Arabic" ? "المنتجات" : "Products"}
					</Link>
				</div>
				<div
					style={isActive(clickedMenu, "Orders")}
					className='col-md-3 col-6 mx-auto menuItems'
					onClick={() => setClickedMenu("Orders")}
				>
					<Link
						className='p-0'
						style={isActive(clickedMenu, "Orders")}
						onClick={() => setClickedMenu("Orders")}
						to={
							user.role === 5000
								? "/ecommerce/admin/dashboard?orders"
								: "/store/admin/ecommerce-integration?orders"
						}
					>
						<i className='fa-solid fa-clipboard-check mx-1'></i>
						{chosenLanguage === "Arabic" ? "الأوردرات" : "Orders"}
					</Link>
				</div>
			</div>
		</EcomNavWrapper>
	);
};

export default EcomNav;

const EcomNavWrapper = styled.span`
	min-height: 900px;
	padding: 20px !important;
`;
