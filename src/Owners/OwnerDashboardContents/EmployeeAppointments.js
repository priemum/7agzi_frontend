import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {getEmployees, listScheduledOrders2} from "../apiOwner";
import {isAuthenticated} from "../../auth";
import {Link} from "react-router-dom";
import SingleStylistCalendar from "./SingleStylistCalendar";
import {read} from "../../apiCore";

const EmployeeAppointments = () => {
	const [allAddedEmployees, setAllAddedEmployees] = useState([]);
	const [orders, setOrders] = useState([]);
	const [clickedEmployee, setClickedEmployee] = useState("");
	const [clicking, setClicking] = useState(true);
	const [loading, setLoading] = useState(true);
	const [HistOrders, setHistOrders] = useState([]);
	const [state, setState] = useState({
		weekendsVisible: true,
		currentEvents: [],
	});
	// eslint-disable-next-line
	const [chosenStylist, setChosenStylist] = useState({});

	const {user, token} = isAuthenticated();

	const loadOrders = () => {
		function compareTotalAppointments(a, b) {
			const TotalAppointmentsA = a.createdAt;
			const TotalAppointmentsB = b.createdAt;

			let comparison = 0;
			if (TotalAppointmentsA < TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = -1;
			}
			return comparison;
		}

		listScheduledOrders2(user._id, token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				const renderedAppointments = data.sort(compareTotalAppointments);
				setOrders(renderedAppointments);
				setLoading(true);
				if (clickedEmployee) {
					read(clickedEmployee).then((data2) => {
						setLoading(true);
						if (data2.error) {
							setLoading(false);
							console.log(data2.error);
						} else {
							setChosenStylist(data2);
							setHistOrders(
								renderedAppointments.filter(
									(i) => i.employees[0]._id === data2._id
								)
							);
							setLoading(false);
						}
					});
				}

				setLoading(false);
			}
		});
	};

	const loadAllAvailableEmployees = () => {
		getEmployees(user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAddedEmployees(data.filter((e) => e.activeEmployee !== false));
			}
		});
	};

	console.log(clickedEmployee, "clicked Emp");

	useEffect(() => {
		loadOrders();
		loadAllAvailableEmployees();
		localStorage.removeItem("pickedServiceFirstAvailable");
		localStorage.removeItem("PetType");
		localStorage.removeItem("PetSize");
		localStorage.removeItem("chosenDateFromFirstAvailable");
		localStorage.removeItem("barber");
		localStorage.removeItem("chosenStylistId_Store");
		localStorage.removeItem("chosenStylistUpdate");

		//For Calendar

		// eslint-disable-next-line
	}, [clickedEmployee]);

	return (
		<EmployeeAppointmentsWrapper>
			<React.Fragment>
				<div
					className='mx-4 my-5 p-3'
					style={{
						textAlign: "center",
						border: "1px solid black",
						borderRadius: "15px",
					}}
				>
					<div
						className='mb-1'
						style={{
							fontWeight: "bold",
							fontSize: "1.3rem",
							textShadow: "3px 3px 6px",
							letterSpacing: "6px",
							color: "#7a0909",
						}}
					>
						<Link
							style={{
								fontWeight: "bold",
								fontSize: "1.3rem",
								textShadow: "3px 3px 6px",
								letterSpacing: "6px",
								color: "#7a0909",
							}}
							to='/store/admin/all-stylists-calendars'
						>
							Stylists Calendars:
						</Link>
					</div>
					<div
						className='col-md-3 mx-auto mb-4'
						style={{
							fontWeight: "bold",
							borderBottom: "3px solid black",
							borderBottomColor: "darkBlue",
							boxShadow: "2px 5px 2px 2px rgb(0,0,0,0.2)",
						}}
					></div>
					<div className='row'>
						{allAddedEmployees &&
							allAddedEmployees.map((i, c) => (
								<div className='col-md-3 my-3 mx-auto EmployeesLinks' key={c}>
									{" "}
									<Link
										to={
											!clicking
												? "/store/admin/dashboard?barber-appointments-stylist"
												: "/store/admin/dashboard?barber-appointments"
										}
										onClick={() => {
											setClickedEmployee(i._id);
											setClicking(!clicking);
										}}
										style={{fontWeight: "bold"}}
									>
										{i.employeeName} (
										{orders &&
											orders.filter(
												(ii) =>
													ii.employees &&
													ii.employees[0] &&
													ii.employees[0]._id === i._id
											) &&
											orders.filter(
												(ii) =>
													ii.employees &&
													ii.employees[0] &&
													ii.employees[0]._id === i._id
											).length}{" "}
										overall),
										<span style={{color: "black"}}>
											{" "}
											(
											{orders &&
												orders.filter(
													(ii) =>
														ii.employees &&
														ii.employees[0] &&
														ii.employees[0]._id === i._id &&
														new Date(ii.scheduledDate).toLocaleDateString() ===
															new Date().toLocaleDateString()
												) &&
												orders.filter(
													(ii) =>
														ii.employees &&
														ii.employees[0] &&
														ii.employees[0]._id === i._id &&
														new Date(ii.scheduledDate).toLocaleDateString() ===
															new Date().toLocaleDateString()
												).length}{" "}
											Appointments Today )
										</span>
									</Link>
								</div>
							))}
					</div>
				</div>
			</React.Fragment>
			{clickedEmployee ? (
				<SingleStylistCalendar
					clickedEmployeeId={clickedEmployee}
					HistOrders={HistOrders}
					chosenStylist={chosenStylist}
					loading={loading}
					state={state}
					setState={setState}
					clicking={clicking}
					setClicking={setClicking}
				/>
			) : null}
		</EmployeeAppointmentsWrapper>
	);
};

export default EmployeeAppointments;

const EmployeeAppointmentsWrapper = styled.div``;
