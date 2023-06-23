/** @format */

import React, {useState, useEffect} from "react";
// import ReactGA from "react-ga";

import styled from "styled-components";
import {getSingleUser, isAuthenticated} from "../../auth";
import CardForEmployeesList from "./CardForEmployeesList";
// import { Helmet } from "react-helmet";

const EmployeesList = ({storeProperties, contact, filteredResults}) => {
	// eslint-disable-next-line
	const [updatedUser, setUpdatedUser] = useState({});
	const [loading, setLoading] = useState(true);

	const {token} = isAuthenticated();

	const getCurrentUser = () => {
		setLoading(true);
		const userId =
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id;
		getSingleUser(userId, token).then((data) => {
			if (data.error) {
				setLoading(false);
				console.log("Error getting single user");
			} else if (data && data.activeUser === false) {
				window.location.reload(false);
				setLoading(false);
				return localStorage.removeItem("jwt");
			} else {
				setUpdatedUser(data);
				// console.log(data, "user");
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		getCurrentUser();
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
		<ScheduleStyling>
			<React.Fragment>
				{loading ? (
					<div
						style={{
							marginTop: "15%",
							textAlign: "center",
							fontSize: "1.9rem",
							color: "darkslategray",
							fontWeight: "bold",
						}}
					>
						Loading...
					</div>
				) : (
					<React.Fragment>
						<div className='continueShoppingEmpty mx-auto my-5'>
							Our Stylists
						</div>
						<div className='row '>
							{filteredResults.map((employee, i) => (
								<div
									className='col-lg-4 col-md-6 col-sm-12 mx-auto text-center'
									key={i}
									onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
								>
									<CardForEmployeesList
										employee={employee}
										storeProperties={storeProperties}
										contact={contact}
									/>
								</div>
							))}
						</div>
					</React.Fragment>
				)}
			</React.Fragment>
			<br />
			<br />
		</ScheduleStyling>
	);
};

export default EmployeesList;

const ScheduleStyling = styled.div`
	margin-left: 150px;
	margin-right: 150px;
	margin-top: 30px;

	@media (max-width: 1504px) {
		margin-left: 25px;
		margin-right: 25px;
	}

	@media (max-width: 900px) {
		margin-left: 15px;
		margin-right: 15px;

		.continueShoppingEmpty {
			display: none;
		}
	}
`;
