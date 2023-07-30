import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { showAverageRatingForEntireStore } from "../../components/SingleEmployee/Rating";
import { Animated } from "react-animated-css";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const HeroComponent = ({
	hero1,
	fromLocalStore,
	allEmployees,
	AllServices2,
	language,
	setModalVisible,
	setModalVisible2,
	overallAddedSettings,
}) => {
	const [offsetY, setOffsetY] = useState(0);
	const handleScroll = () => setOffsetY(window.scrollY);

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 5, behavior: "smooth" });
		}, 1000);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const allRatingArray = allEmployees && allEmployees.map((i) => i.ratings);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.gtag("event", "page_view", {
			page_path: window.location.pathname,
		});

		// eslint-disable-next-line
	}, [window.location.pathname]);

	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);

	return (
		<HeroComponentWrapper>
			<div
				className='row rowWrapper'
				style={{
					background:
						hero1 && hero1.images && hero1.images[0]
							? `url(${hero1.images[0].url})`
							: `url(
							"https://cdn.pixabay.com/photo/2020/05/21/11/42/hair-salon-5200393_960_720.jpg"
						)`,
					backgroundPosition: `center ${offsetY * 0.7}px`,
					backgroundRepeat: "no-repeat",
					backgroundSize: window.innerWidth >= 1000 ? "cover" : "cover",
					position: "relative",
					height: window.innerWidth >= 1000 ? "760px" : "100vh", // change this line
					width: window.innerWidth >= 1000 ? "100vw" : "104vw", // change this line
				}}
			>
				{overallAddedSettings && overallAddedSettings.length > 1 ? (
					<div
						style={{
							position: "absolute",
							top: 15, // adjust to fit your needs
							left: 15, // adjust to fit your needs
						}}
					>
						<button
							style={{
								border: "3px dotted white",
								borderRadius: "10px",
								backgroundColor: "darkred",
								color: "white",
							}}
							type='button'
							className='btn  p-1'
							onClick={() => {
								window.location.href = "/store/admin/dashboard";
							}}
						>
							{language === "Arabic" ? "الصفحة الرئيسية" : "Owner Dashboard"}
						</button>
					</div>
				) : null}

				<div
					style={{
						position: "absolute",
						top: 15, // adjust to fit your needs
						right: 15, // adjust to fit your needs
					}}
				>
					{overallAddedSettings && overallAddedSettings.length === 0 ? (
						<div
							style={{
								position: "absolute",
								top: "2px", // adjust this to fit your needs
								right: "160%", // adjust this to center the arrow above the button
								animation: "moveArrow1 1s infinite",
								transform: "translateX(50%)",
								width: "80%",
								background: "rgba(0, 0, 0, 0.5)",
								textAlign: "right",
								fontWeight: "bolder",
								fontSize: "1.8rem",
								color: "#ff7676",
							}}
						>
							#1 →
						</div>
					) : null}

					<button
						style={{
							border: "3px dotted black",
							borderRadius: "10px",
						}}
						type='button'
						className='btn btn-info p-1'
						onClick={() => {
							setModalVisible(true);
							ReactGA.event("Account_Clicked_To_Edit_ThumbnailPhotos", {
								event_category: "Account_Clicked_To_Edit_ThumbnailPhotos",
								event_label: "Account_Clicked_To_Edit_ThumbnailPhotos",
								value: 0, // Optional extra parameters
							});

							ReactPixel.track("Account_Clicked_To_Edit_ThumbnailPhotos", {
								content_name: "Account_Clicked_To_Edit_ThumbnailPhotos",
								content_category: "Account_Clicked_To_Edit_ThumbnailPhotos",
								value: "",
								currency: "",
							});
						}}
					>
						{language === "Arabic" ? "تعديل الصورة الرئيسية" : "Edit Banner"}
					</button>
				</div>
			</div>
			<div className='col-md-11 mx-auto firstAppointWrapper'>
				<div className='appointment-component col-md-6 requiredComponentBottomLeft'>
					<Animated
						animationIn='bounceInRight'
						animationOut='zoomOut'
						animationInDuration={2000}
						animationInDelay={500}
						animationOutDuration={1000}
						isVisible={true}
					>
						<div className='ml-3'>
							<h3
								style={{
									fontSize: "1.3rem",
									fontWeight: "bold",
									color: "white",
									textTransform: "uppercase",
								}}
							>
								{language === "Arabic" ? (
									<strong>
										{fromLocalStore && fromLocalStore.addStoreNameArabic
											? fromLocalStore.addStoreNameArabic
											: "أضف اسم متجرك"}
									</strong>
								) : (
									<strong>
										{fromLocalStore && fromLocalStore.addStoreName
											? fromLocalStore.addStoreName
											: "Add Your Store Name"}
									</strong>
								)}
							</h3>
							<div
								style={{
									position: "relative",
									top: 15,
									right: 15,
								}}
							>
								{overallAddedSettings && overallAddedSettings.length === 1 ? (
									<>
										<div
											style={{
												position: "absolute",
												top: "-25px", // adjust this to fit your needs
												left: "50%", // adjust this to center the arrow above the button
												animation: "moveArrow2 1s infinite",
												transform: "translateX(-50%)",
												fontWeight: "bolder",
												fontSize: "1.8rem",
												color: "#ff7676",
												background: "black",
												padding: "5px",
												borderRadius: "10px",
											}}
										>
											← #2
										</div>
									</>
								) : null}

								{overallAddedSettings && overallAddedSettings.length > 0 ? (
									<button
										style={{
											border: "3px dotted black",
											borderRadius: "10px",
											fontSize: "13px",
										}}
										type='button'
										className='btn btn-info p-1'
										onClick={() => {
											setModalVisible2(true);
											ReactGA.event(
												"Account_Clicked_To_Edit_GeneralSalonData",
												{
													event_category:
														"Account_Clicked_To_Edit_GeneralSalonData",
													event_label:
														"Account_Clicked_To_Edit_GeneralSalonData",
													value: 0, // Optional extra parameters
												}
											);

											ReactPixel.track(
												"Account_Clicked_To_Edit_GeneralSalonData",
												{
													content_name:
														"Account_Clicked_To_Edit_GeneralSalonData",
													content_category:
														"Account_Clicked_To_Edit_GeneralSalonData",
													value: "",
													currency: "",
												}
											);
										}}
									>
										{language === "Arabic"
											? "تعديل إسم الصالون"
											: "Edit Salon Name"}
									</button>
								) : null}
							</div>
						</div>
						<div className='ml-3'>
							{showAverageRatingForEntireStore(allRatingArray, fromLocalStore)}
						</div>

						<div className='ml-3'>
							{AllServices2 &&
								AllServices2.length > 0 &&
								AllServices2.map((s, i) => {
									if (i <= 4) {
										// Check if current element is the last one in the iteration or the 5th one (since we're showing max 5 items)
										const isLastElement =
											i === AllServices2.length - 1 || i === 4;

										return (
											<span
												style={{
													color: "darkgrey",
													textTransform: "uppercase",
													fontSize: "12px",
												}}
												key={i}
											>
												{language === "Arabic"
													? s.serviceNameOtherLanguage
													: s.serviceName}{" "}
												{isLastElement ? "" : "- "}
											</span>
										);
									} else {
										return null;
									}
								})}
						</div>
					</Animated>
				</div>
			</div>
		</HeroComponentWrapper>
	);
};

export default HeroComponent;

const HeroComponentWrapper = styled.div`
	overflow: hidden;

	.firstAppointWrapper {
		position: relative; // Relative positioning is necessary for absolute child positioning

		.appointment-component {
			width: 50%; // Control width of the components instead of using flex
		}

		.requiredComponentBottomLeft {
			position: absolute; // Position the required component absolutely...
			bottom: 200px; // ...at the bottom...
			left: 10px; // ...and to the left of the parent container.
		}
	}

	.requiredComponentBottomLeft > div {
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		padding: 30px 10px;
		/* border-radius: 100px 20px; */
		border-radius: 5px;
	}

	@keyframes moveArrow1 {
		0% {
			transform: translateX(60px);
		}
		50% {
			transform: translateX(40px);
		}
		100% {
			transform: translateX(60px);
		}
	}

	@keyframes moveArrow2 {
		0% {
			transform: translateX(-70px);
		}
		50% {
			transform: translateX(-40px);
		}
		100% {
			transform: translateX(-70px);
		}
	}

	@media (max-width: 1000px) {
		.firstAppointWrapper {
			position: relative; // Relative positioning is necessary for absolute child positioning

			.appointment-component {
				width: 100%; // Control width of the components instead of using flex
			}

			.requiredComponentBottomLeft {
				position: absolute; // Position the required component absolutely...
				bottom: -10px; // ...at the bottom...
				left: 0px; // ...and to the left of the parent container.
				width: 103.5%;
			}
		}

		.rowWrapper {
			height: 450px !important;
			background-size: cover !important;
		}

		.firstAppointWrapperSub {
			display: none;
		}
	}
`;
