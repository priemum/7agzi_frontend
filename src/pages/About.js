/** @format */

import React from "react";
import styled from "styled-components";
// import AboutPhoto from "../imgs/traffic-3098747_1920.jpg";
// import AboutPhoto from "../Navbar/RCHDIGIMP_Logo.jpg";
// import ReactGA from "react-ga";
import Helmet from "react-helmet";

const About = () => {
	// useEffect(() => {
	// 	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
	// 	// To Report Page View
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// 	// eslint-disable-next-line
	// }, []);

	return (
		<AboutPageWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Infinite-Apps | About Us</title>
				<meta
					name='description'
					content={`Hair Brush Booking Software Developed By Infinite-Apps.com`}
				/>
				<link rel='canonical' href='https://infinite-apps.com' />
			</Helmet>
			<div className='container my-5'>
				<h1 className='title text-center '>ABOUT US</h1>
				<div className='col-md-5 mx-auto mb-5'>
					<br />
					<div className='horizLine'></div>
				</div>
				<div className='row'>
					<div className='col-md-6 about-us'>
						<p className='about-title'>We Are Here!!</p>

						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic sit
							harum quidem! Consectetur, autem. Rerum provident rem velit sequi
							perspiciatis dolorem inventore incidunt adipisci fugit totam
							soluta alias beatae quisquam, optio numquam nemo eveniet nostrum
							expedita quaerat? Deleniti consequuntur expedita saepe, ipsum
							assumenda sunt harum sint aperiam quasi ex! Excepturi earum
							molestias optio ratione adipisci facilis, officia tempore
							voluptatem deserunt sunt ipsum? Error quam, pariatur distinctio
							reiciendis sint ut laudantium dolorem alias saepe quibusdam ipsum
							qui quaerat ex provident cumque culpa. Nisi expedita tempore
							voluptates magnam, quisquam illo libero non saepe hic! Est,
							impedit, error eos, earum optio voluptatem quidem sequi quibusdam
							sit quos eius aperiam quaerat beatae cupiditate dolores nisi
							voluptate enim. Nostrum sint ad, aperiam natus provident dolore
							dolorum distinctio suscipit? Optio nisi dolorem sunt, porro quae
							animi tenetur suscipit ullam hic aspernatur officiis blanditiis
							commodi alias aliquid voluptatem ipsa quaerat nemo rem rerum
							reprehenderit at molestiae. Eum?
						</p>
					</div>
					<div className='col-md-6 imgdiv  my-5'>
						<img src='' className='img-fluid' alt='Infinite-Apps' />
					</div>
				</div>
			</div>
		</AboutPageWrapper>
	);
};

export default About;

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
