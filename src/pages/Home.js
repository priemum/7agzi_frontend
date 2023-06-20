import React, {useEffect} from "react";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import MainHeroComp from "../components/HomePage/MainHeroComp";
import MainOverallServices from "../components/HomePage/MainOverallServices";

const Home = ({language, setLanguage}) => {
	useEffect(() => {
		localStorage.removeItem("pickedServiceFirstAvailable");
		localStorage.removeItem("pickedPetSizeFirstAvailable");
		localStorage.removeItem("pickedPetTypeFirstAvailable");
		localStorage.removeItem("chosenDateFromFirstAvailable");
		localStorage.removeItem("barber");
		localStorage.removeItem("chosenStylistId_Store");
		localStorage.removeItem("CustomerType");
		localStorage.removeItem("chosenStylistUpdate");

		// eslint-disable-next-line
	}, []);
	return (
		<HomeWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				{language === "Arabic" ? (
					<title>برنامج الحجز الرسمي لفرشاة الشعر</title>
				) : (
					<title>Hairbrush Official Booking Software</title>
				)}

				{language === "Arabic" ? (
					<meta name='description' content='افضل برنامج حجز فى مصر' />
				) : (
					<meta
						name='description'
						content='The best booking software in Egypt'
					/>
				)}

				<link rel='canonical' href='https://infinite-apps.com' />
			</Helmet>
			<MainHeroComp language={language} />
			<MainOverallServices language={language} />
		</HomeWrapper>
	);
};

export default Home;

const HomeWrapper = styled.div`
	min-height: 800px;
	overflow-x: hidden !important;

	background-color: black;
`;
