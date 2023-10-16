import React from "react";
import styled from "styled-components";
import moment from "moment";
import { DatePicker } from "antd";
import { Link } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const FirstAvailableAppointmentClientArabic = ({
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
			return moment(date).locale("en").format("MM/DD/YYYY");
		};
		if (date) {
			const formattedDate = formatEnglishDate(
				moment(date).format("MM/DD/YYYY")
			);
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

	return (
		<FirstAvailableAppointmentModifiedWrapper dir='rtl'>
			<div className='mt-3 firstAvailableApp text-center'>
				تحقق من أول موعد متاح في{" "}
				{new Date(chosenDate).toLocaleDateString("ar-EG")}
			</div>
			<div className='horizLine col-6 col-lg-2 col-md-3  mx-auto'></div>

			<div className='mb-2'>
				<label className='ml-3 chooseDateServiceFirstAvail '>
					اختر تاريخًا
				</label>
				<DatePicker
					onChange={handleChangeDate}
					size='small'
					defaultValue={moment(chosenDate, "MM/DD/YYYY")}
					className='inputFieldsFirstAvail py-1'
					style={{ width: "75%" }}
					disabledDate={disabledDate}
					max
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
						style={{ textTransform: "capitalize" }}
						className='inputFieldsFirstAvail ml-1 w-75'
					>
						{chosenCustomerType && chosenCustomerType !== "Please Select" ? (
							<option className='items text-muted'>{chosenCustomerType}</option>
						) : (
							<option className='items text-muted'>يرجى الاختيار</option>
						)}
						{allCustomerType &&
							allCustomerType.map((s, i) => (
								<option key={i} value={s} className='items'>
									{s}
								</option>
							))}
					</select>
					<br />
				</div>
			) : null}

			<div>
				{chosenCustomerType ? (
					<React.Fragment>
						<label className='ml-2 chooseDateServiceFirstAvail'>
							اختر خدمة
						</label>

						<Select
							mode='multiple'
							placeholder='Select Services'
							value={serviceDetailsArray.map((i) => i.serviceName)}
							className='inputFields no-input-keyboard'
							style={{
								borderRadius: "5px",
								width: "75%",
								textTransform: "capitalize",
							}}
							onChange={(values) => {
								const selectedServices = values.map((value) =>
									allActiveServices.find(
										(service) => service.serviceName === value
									)
								);

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
					</React.Fragment>
				) : null}
			</div>
			{chosenCustomerType &&
			chosenDate &&
			chosenService &&
			appointmentFirst &&
			appointmentFirst.firstAvailableTime &&
			!loading ? (
				<div className='message'>
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
							to={`/schedule-an-appointment`}
							onClick={() => {
								localStorage.setItem(
									"pickedServiceFirstAvailable",
									JSON.stringify(serviceDetailsArray)
								);
								localStorage.setItem(
									"CustomerType",
									JSON.stringify(chosenCustomerType)
								);

								localStorage.setItem(
									"chosenDateFromFirstAvailable",
									JSON.stringify(chosenDate)
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
			  !appointmentFirst &&
			  !appointmentFirst.firstAvailableTime ? (
				<div className='message'>
					لا توجد أوقات متاحة في التاريخ المحدد{" "}
					{new Date(chosenDate).toLocaleDateString("ar-EG")}
				</div>
			) : (
				<div className='pleaseSelectAServFirstAvailArabic'>
					الرجاء اختيار خدمة للتحقق من أول موعد متاح
					<div className='my-3 disclaimerArabic'>
						إذا كان لديك الحاجة لجدولة أكثر من شخص، يرجى جدولة موعد منفصل لكل
						منهم. قد تتمكن من جدولة المواعيد مع مصففين مختلفين في آن واحد لإنهاء
						احتياجاتك في وقت أقل!
					</div>
				</div>
			)}
		</FirstAvailableAppointmentModifiedWrapper>
	);
};

export default FirstAvailableAppointmentClientArabic;

const FirstAvailableAppointmentModifiedWrapper = styled.div`
	text-align: center;
	margin-left: 100px;
	margin-right: 100px;
	padding: 30px;
	border-radius: 20px 100px;
	z-index: 1000;
	background-color: #4e0000;
	margin-left: 0px;
	margin-right: 0px;

	.contentWrapper {
		position: relative;
	}

	.no-input-keyboard .ant-select-selector input {
		pointer-events: none !important;
	}

	@media (max-width: 1000px) {
		background-color: #4e0000;
		margin-left: 0px;
		margin-right: 0px;
	}
`;
