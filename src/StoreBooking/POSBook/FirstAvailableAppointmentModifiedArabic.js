import React from "react";
import styled from "styled-components";
import moment from "moment";
import { DatePicker } from "antd";
import { Link } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const FirstAvailableAppointmentModifiedArabic = ({
	user,
	language,
	chosenDate,
	setChosenDate,
	allCustomerType,
	allActiveServices,
	chosenCustomerType,
	setChosenCustomerType,
	chosenService,
	setChosenService,
	setServiceDetailsArray,
	serviceDetailsArray,
	appointmentFirst,
	allEmployees,
	chosenEmployee,
	setChosenEmployee,
	orders,
	loading,
}) => {
	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};

	const handleChosenCustomerType = (event) => {
		setChosenCustomerType(event.target.value);
	};

	const handleChangeDate = (date) => {
		const formatEnglishDate = (date) => {
			return moment(date).locale("en").format("M/DD/YYYY");
		};
		if (date) {
			const formattedDate = formatEnglishDate(moment(date).format("M/DD/YYYY"));
			setChosenDate(formattedDate);
		} else {
			setChosenDate(null);
		}
	};

	const addItem = (item = [], next = (f) => f) => {
		let barber = [];
		barber = item._id;

		localStorage.setItem("barber", JSON.stringify(barber));
		next();
	};

	const AddEmployee = () => {
		// console.log('added');
		var employee = appointmentFirst && appointmentFirst.Employee;
		addItem(employee);
		window.scrollTo(0, 0);
	};

	console.log(allEmployees, "allEmployees");

	return (
		<FirstAvailableAppointmentModifiedWrapper dir='rtl' className='mr-2'>
			<div
				style={{ fontWeight: "bolder", fontSize: "1.3rem" }}
				className='mb-4'
			>
				<strong>
					{" "}
					التاريخ: {new Date(chosenDate).toLocaleDateString("ar-EG")}
				</strong>
			</div>

			<div className='mb-2'>
				<label className='ml-4 chooseDateServiceFirstAvail '>
					اختر تاريخًا
				</label>
				<DatePicker
					onChange={handleChangeDate}
					size='small'
					defaultValue={moment(chosenDate, "M/DD/YYYY")}
					className='inputFieldsFirstAvail py-1'
					style={{ width: "72%" }}
					disabledDate={disabledDate}
					max
					inputReadOnly
					showToday={true}
					// defaultValue={chosenDate || moment()}
					placeholder='يرجى اختيار التاريخ المطلوب'
				/>
			</div>
			{chosenDate ? (
				<div>
					<label className='ml-3 mt-3 chooseDateServiceFirstAvail'>
						الخدمة لـ
					</label>
					<select
						onChange={handleChosenCustomerType}
						placeholder='يرجى الاختيار'
						style={{
							textTransform: "capitalize",
							width: "70%",
							marginRight: "30px",
						}}
						className='inputFieldsFirstAvail'
					>
						{chosenCustomerType && chosenCustomerType !== "Please Select" ? (
							<option className='items text-muted'>{chosenCustomerType}</option>
						) : (
							<option className='items text-muted'>يرجى الاختيار</option>
						)}
						{allCustomerType &&
							allCustomerType.map((s, i) => (
								<option key={i} value={s.customerType} className='items'>
									{s.customerTypeOtherLanguage}
								</option>
							))}
					</select>
					<br />
				</div>
			) : null}
			<div className='mt-3'>
				{chosenCustomerType ? (
					<React.Fragment>
						<label className='ml-2 chooseDateServiceFirstAvail'>
							الخدمات المطلوبة
						</label>
						<Select
							mode='multiple'
							placeholder='الخدمات المطلوبة'
							className='inputFields'
							style={{
								borderRadius: "5px",
								width: "70%",
								textTransform: "capitalize",
								marginRight: "30px",
							}}
							onChange={(values) => {
								const selectedServices = values.map((value) =>
									allActiveServices.find(
										(service) => service.serviceName === value
									)
								);
								console.log(selectedServices);

								setServiceDetailsArray(selectedServices);
								setChosenService(
									selectedServices &&
										selectedServices.map((iii) => iii.serviceName)
								);
							}}
						>
							<Option
								className='items text-muted inputFields'
								value=''
								disabled
							>
								Select A Service
							</Option>

							{allActiveServices &&
								allActiveServices
									.filter((s) => s.serviceName.trim() !== "")
									.map((s, i) => (
										<Option
											key={i}
											value={s.serviceName}
											className='items inputFields'
										>
											{s.serviceNameOtherLanguage}
										</Option>
									))}
						</Select>
						<div className='my-4' style={{ background: "white" }}>
							<table className='table table-bordered table-md-responsive table-hover table-striped'>
								<thead
								// className='thead-light'
								// style={{border: "2px black solid"}}
								>
									<tr>
										<th scope='col'>#</th>
										<th scope='col'>الخدمة</th>
										<th scope='col'>مدة الخدمة</th>
										<th scope='col'>السعر</th>
									</tr>
								</thead>
								<tbody>
									{serviceDetailsArray &&
										serviceDetailsArray.length > 0 &&
										serviceDetailsArray.map((d, i) => {
											return (
												<tr key={i}>
													<td>{i + 1}</td>
													<td>{d.serviceNameOtherLanguage}</td>
													<td>{d.serviceTime} دقيقة</td>
													<td>{d.servicePriceDiscount} جنيه</td>
												</tr>
											);
										})}
									<tr>
										<td></td>
										<td></td>
										<td></td>
										<td>
											{serviceDetailsArray &&
												serviceDetailsArray.reduce((total, serviceDetail) => {
													return total + serviceDetail.servicePriceDiscount;
												}, 0)}{" "}
											جنيه
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</React.Fragment>
				) : null}
			</div>
			{chosenCustomerType &&
			chosenDate &&
			chosenService &&
			appointmentFirst &&
			appointmentFirst.firstAvailableTime &&
			!loading ? (
				<div className='message mt-4'>
					أول موعد متاح مع{" "}
					<strong>
						{appointmentFirst &&
							appointmentFirst.Employee &&
							appointmentFirst.Employee.employeeName}
					</strong>{" "}
					في <strong>{new Date(chosenDate).toLocaleDateString("ar-EG")}</strong>{" "}
					<strong>
						{appointmentFirst && appointmentFirst.firstAvailableTime}
					</strong>
					<div
						onClick={AddEmployee}
						style={{
							fontWeight: "bold",
							fontSize: "1.2rem",
							marginBottom: "10px",
							marginTop: "10px",
							textShadow: "1px 2px 4px",
						}}
					>
						<Link
							className='btn btn-info'
							to={`/store/book-appointment-from-store2/employee/${appointmentFirst.Employee._id}`}
							onClick={() => {
								localStorage.setItem(
									"pickedServiceFirstAvailable",
									JSON.stringify(serviceDetailsArray)
								);
								localStorage.setItem(
									"CustomerType",
									JSON.stringify(chosenCustomerType)
								);

								const formatEnglishDate = (date) => {
									return moment(date).locale("en").format("M/DD/YYYY");
								};

								localStorage.setItem(
									"chosenDateFromFirstAvailable",
									JSON.stringify(
										formatEnglishDate(new Date(chosenDate).toLocaleDateString())
									)
								);
								window.scrollTo(0, 0);
							}}
						>
							احجز الآن...
						</Link>
					</div>
				</div>
			) : chosenCustomerType &&
			  chosenDate &&
			  chosenService &&
			  appointmentFirst &&
			  !appointmentFirst.firstAvailableTime ? (
				<div style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
					لا توجد أوقات متاحة في التاريخ المحدد
				</div>
			) : null}
			<div className='col-8 mx-auto'>
				<hr style={{ border: "1px solid black" }} />
			</div>
			<div className='mt-5'>
				<div style={{ fontSize: "1.4rem", fontWeight: "bolder" }}>
					جميع الموظفين:
				</div>

				<div
					className='my-3'
					style={{ fontSize: "1.1rem", fontWeight: "bolder" }}
				>
					<strong> احجز مع موظف معين:</strong>
				</div>
				<div className='text-center'>
					<label style={{ fontSize: "1rem", fontWeight: "bolder" }}>
						{" "}
						{language === "Arabic"
							? " اختر ستايليست "
							: "Choose A Stylist"}{" "}
					</label>
					<select
						onChange={(e) => {
							var indexOfEmployee = allEmployees
								.map((i) => i.employeeName)
								.indexOf(e.target.value);
							setChosenEmployee(allEmployees[indexOfEmployee]);
						}}
						placeholder='Select a Service'
						className='inputFields'
						style={{
							paddingTop: "12px",
							paddingBottom: "12px",
							paddingRight: "5px",
							border: "#cfcfcf solid 1px",
							borderRadius: "10px",
							width: "90%",
							textTransform: "capitalize",
							fontSize: "0.9rem",
							boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						}}
					>
						<option value='' className='text-muted'>
							{language === "Arabic" ? "اختر  " : "Select A Stylist"}
						</option>

						{allEmployees &&
							allEmployees.map((e, i) => {
								return (
									<option className='text-muted' value={e.employeeName} key={i}>
										{e.employeeNameOtherLanguage} |{" "}
										<span style={{ color: "black" }}>
											{" "}
											(
											{orders &&
												orders.filter(
													(ii) =>
														ii.employees &&
														ii.employees[0] &&
														ii.employees[0]._id === i._id &&
														new Date(ii.scheduledDate).toLocaleDateString() ===
															new Date(chosenDate).toLocaleDateString()
												) &&
												orders.filter(
													(ii) =>
														ii.employees &&
														ii.employees[0] &&
														ii.employees[0]._id === i._id &&
														new Date(ii.scheduledDate).toLocaleDateString() ===
															new Date().toLocaleDateString()
												).length}{" "}
											{language === "Arabic"
												? "حجوزات اليوم"
												: "Appoint. Today"}{" "}
											)
										</span>
									</option>
								);
							})}
					</select>
					{chosenEmployee &&
					chosenEmployee.employeeName &&
					chosenEmployee._id ? (
						<div className='my-5 mx-auto text-center'>
							<button
								style={{
									fontSize: "1.1rem",
									fontWeight: "bolder",
									background: "black",
									color: "white",
								}}
								onClick={() => {
									addItem(chosenEmployee);
									window.location.href = `/store/book-appointment-from-store2/employee/${chosenEmployee._id}`;
								}}
								className='btn'
							>
								{" "}
								{language === "Arabic" ? "احجز الآن" : "BOOK NOW"}{" "}
							</button>
						</div>
					) : null}
				</div>
			</div>
		</FirstAvailableAppointmentModifiedWrapper>
	);
};

export default FirstAvailableAppointmentModifiedArabic;

const FirstAvailableAppointmentModifiedWrapper = styled.div`
	padding: 30px;
	border-radius: 20px;
	text-align: right;

	.contentWrapper {
		position: relative;
	}

	label {
		font-size: 15px;
	}
	.message {
		font-weight: bolder;
		text-align: center;
	}

	@media (max-width: 1000px) {
		padding: 5px;
	}
`;
