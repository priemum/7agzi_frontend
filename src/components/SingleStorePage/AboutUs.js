/** @format */

import React from "react";
import styled from "styled-components";
// import ReactGA from "react-ga";

const AboutUs = ({aboutus}) => {
	// useEffect(() => {
	// 	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
	// 	// To Report Page View
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// 	// eslint-disable-next-line
	// }, []);

	return (
		<AboutPageWrapper>
			<div className='container my-5'>
				<h1 className='title text-center '>ABOUT US</h1>
				<div className='col-md-5 mx-auto mb-5'>
					<br />
					<div className='horizLine'></div>
				</div>
				<div className='row'>
					<div className='col-md-6 about-us'>
						<p className='about-title'>{aboutus && aboutus.header_1}</p>

						<div
							className='ml-3'
							dangerouslySetInnerHTML={{
								__html: aboutus && aboutus.description_1,
							}}
						/>
					</div>
					{aboutus ? (
						<div className='col-md-6 imgdiv  my-5'>
							<img
								src={
									aboutus &&
									aboutus.thumbnail &&
									aboutus.thumbnail[0] &&
									aboutus.thumbnail[0].url
								}
								className='img-fluid'
								alt='Infinite-Apps'
							/>
						</div>
					) : null}
				</div>
			</div>
		</AboutPageWrapper>
	);
};

export default AboutUs;

const AboutPageWrapper = styled.section`
	background: #f8f9fa;
	padding-bottom: 200px;
	padding-top: 50px;
	overflow: hidden;

	.title {
		font-weight: bolder;
		color: var(--mainBlue);
	}

	.about-title {
		font-size: 40px;
		font-weight: 600;
		margin-top: 8%;
		color: var(--orangePrimary);
		margin-left: 55px;
	}

	.about-us ul li {
		margin: 0px 0px;
		list-style: none;
		padding: 0px !important;
	}

	ul {
		list-style: none;
	}

	.about-us ul {
		margin-left: 20px;
	}

	.imgdiv {
		/* transform: rotate(8deg); */
		/* box-shadow: 3px 10px 3px 10px rgba(0, 0, 0, 0.1); */
	}

	.horizLine {
		border-bottom: var(--orangePrimary) solid 5px;
	}

	@media (max-width: 1000px) {
		text-align: center;
		padding-bottom: 0px;
		padding-top: 0px;

		.about-title {
			font-size: 40px;
			font-weight: 600;
			margin-top: 0%;
			color: var(--orangePrimary);
			margin-left: 0px;
		}

		ul li {
			margin: 0px !important;
		}
		.about-us ul {
			margin-left: 0px !important;
			margin-right: 30px;
		}
	}
`;
