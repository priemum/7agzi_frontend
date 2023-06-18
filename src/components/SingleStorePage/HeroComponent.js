import React from "react";
import styled from "styled-components";
import {Animated} from "react-animated-css";
import FirstAvailableAppointments from "./FirstAvailableAppointments";

const HeroComponent = ({
	hero1,
	onlineStoreName,
	allEmployees,
	AllServices,
	contact,
	allCustomerType,
	chosenCustomerType,
	setChosenCustomerType,
	chosenDate,
	setChosenDate,
	setChosenService,
	chosenService,
	handleChosenCustomerType,
	fromLocalStore,
}) => {
	return (
		<HeroComponentWrapper>
			<div className='row'>
				<div
					className='col-md-12 mx-auto firstAppointWrapper'
					style={{
						background:
							hero1 && hero1.images && hero1.images[0]
								? `url(${hero1.images[0].url})`
								: `url(
							"https://cdn.pixabay.com/photo/2020/05/21/11/42/hair-salon-5200393_960_720.jpg"
						)`,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						position: "relative",
						height: "650px",
						width: "100%",
						objectFit: "cover",
					}}
				>
					<div className='col-md-6 mx-auto mt-5'>
						<Animated
							animationIn='bounceInLeft'
							animationOut='zoomOut'
							animationInDuration={2000}
							animationInDelay={500}
							animationOutDuration={1000}
							isVisible={true}
						>
							<FirstAvailableAppointments
								onlineStoreName={onlineStoreName}
								allEmployees={allEmployees}
								AllServices={AllServices}
								contact={contact}
								allCustomerType={allCustomerType}
								chosenCustomerType={chosenCustomerType}
								setChosenCustomerType={setChosenCustomerType}
								chosenDate={chosenDate}
								setChosenDate={setChosenDate}
								setChosenService={setChosenService}
								chosenService={chosenService}
								handleChosenCustomerType={handleChosenCustomerType}
								fromLocalStore={fromLocalStore}
							/>
						</Animated>
					</div>
				</div>
			</div>
		</HeroComponentWrapper>
	);
};

export default HeroComponent;

const HeroComponentWrapper = styled.div`
	overflow: hidden;
`;
