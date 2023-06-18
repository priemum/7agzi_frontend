import React, {useState} from "react";
import styled from "styled-components";
import Photo2 from "../../Images/Photo2.png";
import Photo3 from "../../Images/Photo3.png";
import Photo4 from "../../Images/Photo4.png";
import Photo5 from "../../Images/Photo5.png";
import Photo6 from "../../Images/Photo6.png";
import Photo7 from "../../Images/Photo7.png";
import {Link} from "react-router-dom/cjs/react-router-dom.min";

const isActive = (history, path) => {
	if (history === path) {
		return {
			fontWeight: "bold",
			fontSize: "1.3rem",
			textDecoration: "underline",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "darkred",
		};
	} else {
		return {
			fontSize: "1.3rem",
			cursor: "pointer",
			transition: "var(--mainTransition)",
		};
	}
};

const MainOverallServices = () => {
	const [index, setIndex] = useState(1);
	const premiumContent = [
		{
			id: 1,
			text: "Calendar & Appointments",
			photo: Photo2,
		},

		{
			id: 2,
			text: "Business Management",
			photo: Photo3,
		},

		{
			id: 3,
			text: "Marketing Tools",
			photo: Photo4,
		},

		{
			id: 4,
			text: "Bottom Line Protection",
			photo: Photo5,
		},

		{
			id: 5,
			text: "Performance Snapshots",
			photo: Photo6,
		},
	];
	return (
		<MainOverallServicesWrapper>
			<div className='row'>
				<div className='col-md-5 mx-auto'>
					<div className='subtitle mb-3'>Hair Brush Pro</div>
					<h3>The resources you require, right at your fingertips.</h3>
				</div>
				<div className='col-md-6 my-auto mx-auto'>
					<h4>
						Enterprises such as yours demand extra. To maintain your pace, Hair
						Brush Pro offers dual distinct experiences - a tablet-based
						interface for reception area needs, and a mobile solution for
						managing schedules while in transit.
					</h4>
				</div>
			</div>

			<br />
			<div className='col-md-6 mx-auto'>
				<hr />
			</div>

			<div className='row my-5'>
				<div className='col-md-5 mx-auto my-auto'>
					<div className='subtitle mb-3'>Hair Brush Premium</div>
					{premiumContent &&
						premiumContent.map((c, i) => {
							return (
								<div
									key={i}
									className={i === 0 ? "mt-3 firstTextList" : "textList"}
									style={isActive(c.id, index + 1)}
									onClick={() => {
										setIndex(i);
									}}
								>
									{" "}
									{c.text}{" "}
								</div>
							);
						})}
				</div>
				<div className='col-md-6 my-auto mx-auto'>
					<div className='textList'>
						<img
							src={premiumContent[index].photo}
							alt='Developed By infinite-apps.com'
							width='100%'
						/>
					</div>
				</div>
			</div>
			<br />

			<div className='col-md-6 mx-auto'>
				<hr />
			</div>

			<div className='section3 col-md-8 mx-auto'>
				<div className='row'>
					<div className='col-md-5 section3Text mt-5'>
						<h3>
							Let's strive for superior results and elevate your productivity.
						</h3>

						<Link to='#' className='btn btn-info mt-3 ml-3'>
							START FREE TRIAL!
						</Link>
					</div>
					<div className='col-md-6 photo7Class'>
						<img src={Photo7} alt='developed by infinite-apps.com' />
					</div>
				</div>
			</div>
		</MainOverallServicesWrapper>
	);
};

export default MainOverallServices;

const MainOverallServicesWrapper = styled.div`
	margin: 60px 300px;
	background-color: #f6f6fb;
	padding: 20px;

	.subtitle {
		font-weight: bold;
		text-decoration: underline;
	}

	h3 {
		font-weight: bold;
	}

	h4 {
		font-size: 1.1rem;
	}

	.textList {
		margin-top: 70px;
		font-size: 1.3rem;
		font-weight: bold;
	}

	.firstTextList {
		font-size: 1.3rem;
		font-weight: bold;
	}

	hr {
		border-bottom: 3px #4a4a4a solid;
	}

	.section3Text > h3 {
		font-size: 1.2rem;
		color: white;
		margin-top: 50px;
	}

	.section3 {
		margin: 70px 0px;
		background-color: #363636;
		padding: 20px;
		min-height: 300px !important;
		border-radius: 20px;
	}

	@media (max-width: 1200px) {
		margin: 60px 15px;
		.section3Text > h3 {
			margin-top: 10px;
		}

		.section3 {
			background-color: #363636;
			padding: 10px;
			min-height: 390px !important;
			border-radius: 20px;
		}

		.photo7Class > img {
			width: 120%;
			right: -10%;
			margin-top: 20px;
			position: absolute;
		}

		.textList {
			margin-top: 70px;
			font-size: 1.1rem;
			font-weight: bold;
		}

		.firstTextList {
			font-size: 1.1rem;
			font-weight: bold;
		}
	}
`;
