import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShopHero from "./ShopHero";
import Helmet from "react-helmet";
import { useCartContext } from "../../sidebar_context";
import {
	gettingAllCategories,
	gettingAllGenders,
	gettingAllProducts,
} from "../../apiCore";
import ShopItems from "./ShopItems";

const isActive = (history, path) => {
	if (history === path) {
		return {
			fontWeight: "bold",
			textAlign: "center",
			textTransform: "uppercase",
			border: "1px grey solid",
			cursor: "pointer",
			background: "grey",
			color: "white",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			fontWeight: "bold",
			textAlign: "center",
			textTransform: "uppercase",
			border: "1px grey solid",
			cursor: "pointer",
		};
	}
};

const isActive2 = (history, path) => {
	if (history === path) {
		return {
			fontWeight: "bold",
			textAlign: "center",
			textTransform: "uppercase",
			border: "1px grey solid",
			cursor: "pointer",
			background: "grey",
			color: "white",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			fontWeight: "bold",
			textAlign: "center",
			textTransform: "uppercase",
			border: "1px grey solid",
			cursor: "pointer",
		};
	}
};

const ShopLandingPage = () => {
	const { chosenLanguage } = useCartContext();
	const [allProducts, setAllProducts] = useState([]);
	const [distinctCategories, setDistinctCategories] = useState([]);
	const [distinctGenders, setDistinctGenders] = useState([]);

	const [filterCategories, setFilterCategories] = useState(undefined);
	const [filterGender, setFilterGender] = useState(undefined);
	const [filterSize, setFilterSize] = useState(undefined);
	const [clickedMenu, setClickedMenu] = useState("SelectAll");
	const [clickedMenu2, setClickedMenu2] = useState("SelectAll");

	const overAllProducts = () => {
		gettingAllProducts(
			filterCategories,
			undefined,
			filterGender,
			filterSize,
			undefined,
			30,
			1
		).then((data) => {
			if (data && data.error) {
				console.log("Error rendering products");
			}
			setAllProducts(data.products);
		});
	};

	const gettingDistinctCategories = () => {
		gettingAllCategories().then((data) => {
			if (data && data.error) {
				console.log("Error getting categories");
			}
			setDistinctCategories(data.categories);
		});
	};

	const gettingDistinctGenders = () => {
		gettingAllGenders().then((data) => {
			if (data && data.error) {
				console.log("Error getting categories");
			}
			setDistinctGenders(data.genders);
		});
	};

	useEffect(() => {
		overAllProducts();
		gettingDistinctCategories();
		gettingDistinctGenders();
		// eslint-disable-next-line
	}, [filterGender, filterCategories, filterSize]);

	console.log(allProducts, "allProducts");

	return (
		<ShopLandingPageWrapper>
			<Helmet dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
				<meta charSet='utf-8' />
				{chosenLanguage === "Arabic" ? (
					<title dir='rtl'>اكس لوك | متجرنا</title>
				) : (
					<title>XLOOK | OUR STORE</title>
				)}
				<meta
					name='description'
					content={
						chosenLanguage === "Arabic"
							? ` XLOOK بدإخل مرص.
					ىه منصة تضم جميع صالونات إلحالقة ومحالت إلكوإفريإلحريىم و إلبيوت ى
					إلمنصة تقدم إلخدمات لكل أفرإد إالرسة سوإء سيدإت, آنسات, رجال أو أوالد فللجميع مكان وخدمات مقدمة.
					سني ى تستخدم منصة XLOOK مع
					ى
					الختيار وحجز موعد صالون حالقة إو بيوت عرض إالقرب لالبعد حسب مكانك.
					ىت ىت يقوم إلزإئرين بحجز إلخدمات إل
					أوطال
					تقدمها إلمنصة من خالل أبليكيشن خاص لتسجيل وحجز إلمستخدمرين
					إلخدمات إلتجميلية. Powered By https://infinite-apps.com`
							: `XLOOK is a platform that includes all barbershops, ladies' beauty salons, and beauty centers
					located in Egypt.
					The platform offers services for all family members, including women, girls, men, and
					children, with a variety of services provided.
					The XLOOK platform is used to choose and book a barbershop or beauty center appointment
					with the closest to the farthest offer according to your location. Visitors can book the services
					offered by the platform through a special application designed for user registration and booking
					beauty services. Powered By https://infinite-apps.com`
					}
				/>
				<link rel='canonical' href='https://www.xlookpro.com/xlook/shop' />
			</Helmet>
			<div className='heroWrapper'>
				<ShopHero />
			</div>
			{filterCategories || filterGender || filterSize ? (
				<div
					className='mt-3'
					onClick={() => {
						setFilterCategories(undefined);
						setFilterGender(undefined);
						setFilterSize(undefined);
						setClickedMenu("SelectAll");
						setClickedMenu2("SelectAll");
					}}
					style={{
						color: "darkred",
						textAlign: "center",
						fontWeight: "bold",
						cursor: "pointer",
					}}
				>
					<i className='fa-solid fa-filter'></i> Clear Filter{" "}
					<span style={{ color: "black", fontWeight: "bold" }}>
						({allProducts.length} Products)
					</span>
				</div>
			) : null}
			<div className='mt-2 col-md-4 mx-auto'>
				<div className='row ml-4'>
					<div
						className='col-3 py-1 text-center mx-1'
						style={isActive(clickedMenu, "SelectAll")}
						onClick={() => {
							setFilterGender(undefined);
							setClickedMenu("SelectAll");
						}}
					>
						All
					</div>
					{distinctGenders &&
						distinctGenders.map((g, i) => {
							return (
								<div
									onClick={() => {
										setFilterGender(g);
										setClickedMenu(g);
									}}
									className={
										distinctGenders.length === 2
											? "col-3 py-1 text-center mx-1"
											: "col-2 py-1 text-center mx-1"
									}
									key={i}
									style={isActive(clickedMenu, g)}
								>
									{g === "all" ? "Unisex" : g}
								</div>
							);
						})}
				</div>
				<div className='row ml-4 mt-2 '>
					<div
						className='col-3 py-1 text-center mx-1 mt-1'
						style={isActive2(clickedMenu2, "SelectAll")}
						onClick={() => {
							setFilterCategories(undefined);
							setClickedMenu2("SelectAll");
						}}
					>
						All
					</div>
					{distinctCategories &&
						distinctCategories.map((c, i) => {
							return (
								<div
									onClick={() => {
										setFilterCategories(c.categoryName);
										setClickedMenu2(c.categoryName);
									}}
									className={
										distinctCategories.length === 2
											? "col-md-3 col-4 py-1 text-center mx-1"
											: "col-md-3 col-4 py-1 text-center mx-1 mt-1"
									}
									key={i}
									style={isActive2(clickedMenu2, c.categoryName)}
								>
									{c.categoryName}
								</div>
							);
						})}
				</div>
			</div>

			<div className='row mt-3 mb-5'>
				{allProducts &&
					allProducts.map((product, i) => (
						<div
							className='col-lg-4 col-md-6 col-sm-12 mx-auto text-center'
							key={i}
						>
							<ShopItems
								product={product}
								key={i}
								chosenLanguage={chosenLanguage}
							/>
						</div>
					))}
				<hr />
			</div>
		</ShopLandingPageWrapper>
	);
};

export default ShopLandingPage;

const ShopLandingPageWrapper = styled.div`
	min-height: 1000px;
	overflow: hidden;
`;
