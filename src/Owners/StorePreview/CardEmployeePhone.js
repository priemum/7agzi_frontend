/** @format */

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { showAverageRating2 } from "../../components/SingleEmployee/Rating";
import StarRating from "react-star-ratings";

const CardEmployeePhone = ({
	employee,
	storeProperties,
	contact,
	language,
}) => {
	const scheduleAppointmentbtn = () => {
		return (
			<div>
				<button
					style={{
						border: "3px dotted white",
						borderRadius: "10px",
						backgroundColor: "darkred",
						color: "white",
					}}
					type='button'
					className='btn '
				>
					{language === "Arabic" ? "تعديل الموظف" : "EDIT EMPLOYEE"}
				</button>
			</div>
		);
	};

	const ShowImage = ({ item }) => (
		<div className='product-img'>
			{item && item.workPhotos && (
				<Carousel
					showArrows={false}
					dynamicHeight={true}
					autoPlay
					infiniteLoop
					interval={5000}
					showStatus={false}
					showIndicators={false}
					showThumbs={false}
					// swipeable={false}
				>
					{item.workPhotos.map((i) => (
						<img
							alt={item.employeeName}
							src={i.url}
							key={i.public_id}
							style={{
								height: "75%",
								width: "100%",
								objectFit: "cover",
							}}
						/>
					))}
				</Carousel>
			)}
		</div>
	);

	return (
		<ProductWrapper className='cardPhone'>
			<div className='card-img-top center img'>
				<Link to='#'>
					<ShowImage item={employee} />
				</Link>
			</div>
			<div className='row mb-4'>
				<div className='col-6'>
					<div
						className='mt-2 ml-4'
						style={{
							fontSize: "18px",
							fontWeight: "bold",
							color: "white",
							textTransform: "uppercase",
						}}
					>
						{employee.employeeName}
					</div>
					{employee && employee.ratings && employee.ratings.length > 0 ? (
						<div className='mb-1 ml-4'>{showAverageRating2(employee)}</div>
					) : (
						<div className='mb-1 ml-4'>
							<span>
								<StarRating
									starDimension='20px'
									starSpacing='2px'
									starRatedColor='#ffba3b'
									rating={3.5}
									editing={false}
								/>{" "}
							</span>
						</div>
					)}

					<div className='ml-4'>
						{employee &&
							employee.services &&
							employee.services.map((s, i) => {
								if (i <= 4) {
									// Check if current element is the last one in the iteration or the 5th one (since we're showing max 5 items)
									const isLastElement =
										i === employee.services.length - 1 || i === 4;

									return (
										<span
											style={{
												color: "lightgrey",
												textTransform: "uppercase",
												fontSize: "11px",
											}}
											key={i}
										>
											{s.serviceName} {isLastElement ? "" : "- "}
										</span>
									);
								} else {
									return null;
								}
							})}
					</div>
				</div>

				<div className='col-6 mt-3'>
					{scheduleAppointmentbtn()}

					<div className='mr-3'>
						{/* {showViewButton()} */}
						<div
							className='mx-auto mt-2 text-center'
							style={{
								fontSize: "12px",
								color: "lightgreen",
								fontWeight: "bolder",
							}}
						>
							<strong>AVAILABLE TODAY</strong>
						</div>
					</div>
				</div>
			</div>
		</ProductWrapper>
	);
};

export default CardEmployeePhone;

const ProductWrapper = styled.div`
	display: none;

	@media (max-width: 1000px) {
		display: block;

		button {
			background-color: #222427;
			border: 1px solid #222427;
			font-size: 15px;
			font-weight: bolder;
		}
	}
`;
