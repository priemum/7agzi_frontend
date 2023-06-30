/** @format */

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { isAuthenticated } from "../../auth";
import { updateStoreStatus } from "../apiBoss";

const CardForStoreBoss = ({ store, allAppointments }) => {
	const { user, token } = isAuthenticated();

	const handleStatusChange = (e, storeId) => {
		if (window.confirm("Are You Sure Your Want To Deactivate Store?")) {
			updateStoreStatus(
				user._id,
				token,
				storeId,
				JSON.parse(e.target.value)
			).then((data) => {
				if (data.error) {
					console.log("Status update failed");
				} else {
					window.scrollTo({ top: 0, behavior: "smooth" });
					window.location.reload(false);
				}
			});
		}
	};

	const ShowImage = ({ item }) => (
		<div className='product-img' style={{ borderRadius: "50%" }}>
			{item && item.storeThumbnail && (
				<Carousel
					showArrows={false}
					dynamicHeight={true}
					autoPlay
					infiniteLoop
					interval={5000}
					showStatus={false}
					showIndicators={false}
					showThumbs={false}
				>
					{item.storeThumbnail.map((i) => (
						<img
							alt='Developed By Infinite-Apps.com'
							src={i.url}
							key={i.public_id}
							style={{ height: "240px", width: "100%", objectFit: "cover" }}
						/>
					))}
				</Carousel>
			)}
		</div>
	);

	var theIndexOfAppointments =
		allAppointments &&
		allAppointments.map((ii) => ii._id).indexOf(store.belongsTo._id);

	return (
		<ProductWrapper className='my-3'>
			<div
				className='card '
				style={{ borderRadius: "5% 10%", backgroundColor: "#f7f7f6" }}
			>
				<div className='card-body  '>
					<div className='card-img-top  img'>
						<Link to={`/boss/store/admin/dashboard/${store.belongsTo._id}`}>
							<ShowImage item={store} />
						</Link>
					</div>
					<div
						className='mt-3 mb-3'
						style={{
							fontSize: "18px",
							fontWeight: "bold",
							textTransform: "capitalize",
						}}
					>
						{store.belongsTo.storeType}
					</div>

					<div
						className='mt-3 mb-3'
						style={{
							fontSize: "18px",
							fontWeight: "bold",
							textTransform: "capitalize",
						}}
					>
						{store.addStoreName}
					</div>

					<div
						className='mt-3 mb-3'
						style={{
							fontSize: "13px",
							fontWeight: "bold",
						}}
					>
						Address: {store.belongsTo.storeAddress}
					</div>
					<div
						className='mt-3 mb-3'
						style={{
							fontSize: "13px",
							fontWeight: "bold",
						}}
					>
						Agent: {store.belongsTo.agent.name}
					</div>
					<div className='mt-3'>
						Total Appointments:{" "}
						{allAppointments &&
							allAppointments[theIndexOfAppointments] &&
							allAppointments[theIndexOfAppointments].totalAppointments}
					</div>
					<div className='mt-3'>
						Total Amount:{" "}
						{allAppointments &&
							allAppointments[theIndexOfAppointments] &&
							allAppointments[theIndexOfAppointments].totalAmount}{" "}
						EGP
					</div>
					<div className='mt-3'>
						Our Share:{" "}
						{allAppointments &&
							allAppointments[theIndexOfAppointments] &&
							allAppointments[theIndexOfAppointments]
								.totalOnlineServicesFees}{" "}
						EGP
					</div>
					{!store.activeStore ? (
						<div
							className='mt-3 mx-auto text-center'
							style={{ fontWeight: "bolder", color: "darkred" }}
						>
							INACTIVE STORE
						</div>
					) : null}
					{store.activeStore ? (
						<div>
							<select
								className='form-control mt-3 col-md-10 mx-auto'
								onChange={(e) => handleStatusChange(e, store._id)}
								style={{
									background:
										store.activeStore === true ? "darkgreen" : "#363636",
									color: "white",
									borderRadius: "5px",
								}}
							>
								<option value='Please Select'>
									{store.activeStore === true ? "Activated" : "Disabled"}
								</option>
								<option value={true}>Activate</option>
								<option value={false}>Deactivate</option>
							</select>
						</div>
					) : null}
				</div>
			</div>
		</ProductWrapper>
	);
};

export default CardForStoreBoss;

const ProductWrapper = styled.div`
	.card {
		box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.3);
		transition: var(--mainTransition);
		min-height: 650px;
	}
	.card:hover {
		box-shadow: 7px 10px 5px 0px rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}
	.card-img-top {
		transition: var(--mainTransition);
	}

	.card:hover .card-img-top {
		transform: scale(1.05);
		opacity: 0.7;
	}

	.card-body {
		font-weight: bold;
		letter-spacing: 2px;
	}

	button {
		position: absolute;
		top: 80%;
		text-align: center;
		right: 23%;
	}
	@media (max-width: 900px) {
		.card {
			width: 100%;
		}
		button {
			top: 80%;
			text-align: center;
			right: 25%;
		}

		.cardData {
			font-size: 12px !important;
		}
		.BarberDetails {
			font-size: 12px !important;
		}
	}
`;
