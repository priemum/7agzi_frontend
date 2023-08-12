/** @format */

import React, { useState, useEffect } from "react";
// import ReactGA from "react-ga";

import styled from "styled-components";
import { getSingleUser, isAuthenticated } from "../../auth";
import CardForEmployeesList from "./CardForEmployeesList";
import CardEmployeePhone from "./CardEmployeePhone";
import EditEmployeeModal from "./ModalsForEdit/Step4/EditEmployeeModal";
// import { Helmet } from "react-helmet";

const EmployeesListPreview = ({
	storeProperties,
	contact,
	filteredResults,
	language,
	setModalVisible,
	allWorkingHours,
	allServices,
}) => {
	// eslint-disable-next-line
	const [updatedUser, setUpdatedUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [pickedEmployee, setPickedEmployee] = useState("");
	const [employeeServices, setEmployeeServices] = useState([]);

	const { token } = isAuthenticated();

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
			{modalVisible2 ? (
				<EditEmployeeModal
					modalVisible={modalVisible2}
					setModalVisible={setModalVisible2}
					language={language}
					pickedEmployee={pickedEmployee}
					setPickedEmployee={setPickedEmployee}
					allWorkingHours={allWorkingHours}
					employeeServices={employeeServices}
					allServices={allServices}
				/>
			) : null}

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
								>
									<CardForEmployeesList
										employee={employee}
										storeProperties={storeProperties}
										contact={contact}
										language={language}
									/>
								</div>
							))}
						</div>

						<div className='row '>
							<div className='mb-3 text-center mx-auto'>
								<button
									onClick={() => {
										setModalVisible(true);
									}}
									style={{
										border: "3px dotted white",
										borderRadius: "10px",
									}}
									type='button'
									className='btn btn-info'
								>
									{language === "Arabic"
										? "أضف موظفًا جديدًا"
										: "ADD A NEW EMPLOYEE"}
								</button>
							</div>
							{filteredResults.map((employee, i) => (
								<div className='' key={i}>
									<CardEmployeePhone
										employee={employee}
										storeProperties={storeProperties}
										contact={contact}
										language={language}
										setModalVisible={setModalVisible2}
										setPickedEmployee={setPickedEmployee}
										setEmployeeServices={setEmployeeServices}
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

export default EmployeesListPreview;

const ScheduleStyling = styled.div`
	margin-left: 150px;
	margin-right: 150px;
	margin-top: 30px;

	@media (max-width: 1504px) {
		margin-left: 25px;
		margin-right: 25px;
	}

	@media (max-width: 900px) {
		margin-left: 5px;
		margin-right: 5px;

		.continueShoppingEmpty {
			display: none;
		}
	}
`;
