import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	createScheduledAppointment,
	getServices,
	gettingEmployeeFreeSlots,
	read,
} from "../../apiCore";
import { isAuthenticated } from "../../auth";
import { Spin } from "antd";
import moment from "moment";
import ScheduleFormHelper from "./ScheduleFormHelper";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import NavbarPOS from "../NavbarPOS/NavbarPOS";
import { allLoyaltyPointsAndStoreStatus } from "../../Owners/apiOwner";
import ScheduleFormHelperArabic from "./ScheduleFormHelperArabic";
import DiscountModal from "./DiscountModal";
import { useCartContext } from "../../sidebar_context";

const ScheduleFormFinal = ({ language, setLanguage }) => {
	const [pickedEmployee, setPickedEmployee] = useState("");
	const [loading, setLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [scheduledHours, setScheduledHours] = useState([]);
	const [onlineStoreName, setOnlineStoreName] = useState("");
	const [AllServices, setAllServices] = useState("");
	const [serviceDetailsArray, setServiceDetailsArray] = useState([]);
	const [allCustomerTypes, setAllCustomerTypes] = useState([]);
	const [chosenCustomerType, setChosenCustomerType] = useState("");
	const [chosenTime, setChosenTime] = useState(null);
	const [employeeAvailability, setEmployeeAvailability] = useState("");
	const [scheduledByUserName, setScheduledByUserName] = useState("");
	const [discountCash, setDiscountCash] = useState(0);
	const [customerPhone, setCustomerPhone] = useState(null);
	const { chosenLanguage } = useCartContext();
	// const [fullName, setFullName] = useState("");
	// const [chosenTime, setChosenTime] = useState("");
	// eslint-disable-next-line
	const [chosenDate, setChosenDate] = useState(moment().format("MM/DD/YYYY"));

	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	const formatEnglishDate = (date) => {
		return moment(date).locale("en").format("MM/DD/YYYY");
	};

	var userBelongsToModified = user.role === 1000 ? user._id : user.belongsTo;

	const checkLength = (i) => {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	};

	const today = new Date();
	var todayDate =
		today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
	var h = today.getHours();
	var m = today.getMinutes();
	h = checkLength(h);
	m = checkLength(m);

	// eslint-disable-next-line
	const timeNow = h + ":" + m;

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};

	useEffect(() => {
		const pickedDateFirstAvailable = JSON.parse(
			localStorage.getItem("chosenDateFromFirstAvailable")
		);
		if (pickedDateFirstAvailable) {
			setChosenDate(formatEnglishDate(pickedDateFirstAvailable));
		} else {
			setChosenDate(formatEnglishDate(moment()));
		}
		// eslint-disable-next-line
	}, []);

	const loadPickedEmployee = (
		employeeId,
		pickedServiceFirstAvailable,
		CustomerType
	) => {
		setLoading(true);
		read(employeeId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setPickedEmployee(data);
				if (
					chosenDate &&
					new Date(chosenDate).toLocaleDateString() ===
						new Date(todayDate).toLocaleDateString()
				) {
					setScheduledHours(data && data.workingHours.sort());
				} else {
					setScheduledHours(data && data.workingHours.sort());
				}
				if (
					pickedServiceFirstAvailable &&
					pickedServiceFirstAvailable.length > 0
				) {
					setServiceDetailsArray(pickedServiceFirstAvailable);
				}

				if (CustomerType) {
					setChosenCustomerType(CustomerType);
				}
				//--------------------------------------//
				//getting Services Associated With Picked Employee
				getServices(token, userBelongsToModified).then((data2) => {
					setLoading(true);

					if (data2.error) {
						console.log(data2.error);
					} else {
						var pickedEmployeePetsIncluded =
							data &&
							data.services &&
							data.services.map((ii) => ii.customerType);
						var pickedEmployeeServicesIncluded =
							data &&
							data.services &&
							data.services.map((ii) => ii.serviceName + ii.customerType);

						// console.log(
						// 	pickedEmployeeServicesIncluded,
						// 	"pickedEmployeeServicesIncluded from API",
						// );
						setAllCustomerTypes([
							...new Set(
								data2 &&
									data2.filter(
										(i) =>
											pickedEmployeePetsIncluded &&
											pickedEmployeePetsIncluded[0] &&
											pickedEmployeePetsIncluded.indexOf(i.customerType) !== -1
									) &&
									data2
										.filter(
											(i) =>
												pickedEmployeePetsIncluded &&
												pickedEmployeePetsIncluded[0] &&
												pickedEmployeePetsIncluded.indexOf(i.customerType) !==
													-1
										)
										.map((iii) => iii.customerType)
							),
						]);

						if (chosenCustomerType) {
							setAllServices(
								data2.filter((i) => i.activeService === true) &&
									data2
										.filter((i) => i.activeService === true)
										.map((ii) => ii) &&
									data2
										.filter((i) => i.activeService === true)
										.map((ii) => ii)
										.filter(
											(iv) =>
												iv.customerType === chosenCustomerType &&
												iv.serviceType === "package service" &&
												pickedEmployeeServicesIncluded &&
												pickedEmployeeServicesIncluded.indexOf(
													iv.serviceName + iv.customerType
												) !== -1
										)
							);
						}
					}
					setLoading(false);
				});
			}
		});
		setLoading(false);
	};

	const getOnlineStoreName = () => {
		allLoyaltyPointsAndStoreStatus("token", userBelongsToModified).then(
			(data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setOnlineStoreName(data && data[data.length - 1]);
				}
			}
		);
	};

	useEffect(() => {
		const chosenStylistId = JSON.parse(localStorage.getItem("barber"));
		const pickedServiceFirstAvailable = JSON.parse(
			localStorage.getItem("pickedServiceFirstAvailable")
		);
		const CustomerType = JSON.parse(localStorage.getItem("CustomerType"));

		loadPickedEmployee(
			chosenStylistId,
			pickedServiceFirstAvailable,
			CustomerType
		);

		getOnlineStoreName();
		// eslint-disable-next-line
	}, [chosenCustomerType]);

	const getEmployeeFreeSlots = (
		employeeId,
		customerType,
		services,
		date,
		ownerId
	) => {
		gettingEmployeeFreeSlots(
			employeeId,
			customerType,
			services.join(","),
			date,
			ownerId
		).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setEmployeeAvailability(data);
			}
		});
	};

	useEffect(() => {
		if (
			pickedEmployee &&
			pickedEmployee._id &&
			chosenDate &&
			chosenCustomerType &&
			userBelongsToModified &&
			serviceDetailsArray &&
			serviceDetailsArray.length > 0
		) {
			// Format date to "MM-DD-YYYY"
			const inputDate = chosenDate.replace(/\//g, "-"); // Replace slashes with dashes
			const date = new Date(inputDate);

			if (isNaN(date.getTime())) {
				console.error("Invalid Date");
				return;
			}

			const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
			const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
			const year = date.getFullYear();

			const formattedDate = `${month}-${day}-${year}`;

			// console.log(formattedDate, "chosenDate");
			let allPickedServices =
				serviceDetailsArray && serviceDetailsArray.map((i) => i.serviceName);
			getEmployeeFreeSlots(
				pickedEmployee._id,
				chosenCustomerType,
				allPickedServices,
				formattedDate,
				userBelongsToModified
			);
		}
		// eslint-disable-next-line
	}, [chosenCustomerType, serviceDetailsArray, chosenDate, chosenTime]);

	const appointmentStarts = () => {
		if (
			chosenDate &&
			chosenTime &&
			employeeAvailability &&
			employeeAvailability.hoursAvailable &&
			employeeAvailability.hoursAvailable.length > 0
		) {
			const [chosenMonth, chosenDay, chosenYear] =
				(chosenDate && chosenDate.split("/").map(Number)) ||
				(chosenDate && chosenDate._d && chosenDate._d.split("/").map(Number));
			const [chosenHour, chosenMinute] = chosenTime.split(":").map(Number);
			const startDate = new Date(
				chosenYear,
				chosenMonth - 1,
				chosenDay,
				chosenHour,
				chosenMinute
			);

			// Step 2: Format start date using toLocaleDateString and toLocaleTimeString
			const formattedStartDate = startDate.toLocaleDateString("en-US", {
				weekday: "long",
				day: "numeric",
				month: "long",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});

			// Step 3: Calculate end date by adding totalServiceTime (in minutes) to start date
			const totalServiceTimeInMilliseconds =
				employeeAvailability && employeeAvailability.totalServiceTime * 60000;
			const endDate = new Date(
				startDate.getTime() + totalServiceTimeInMilliseconds
			);

			// Step 4: Format end date using toLocaleDateString and toLocaleTimeString
			const formattedEndDate = endDate.toLocaleDateString("en-US", {
				weekday: "long",
				day: "numeric",
				month: "long",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});

			return [formattedStartDate, formattedEndDate];
		} else {
			return null;
		}
	};

	const appointmentStartsArabic = () => {
		if (
			chosenDate &&
			chosenTime &&
			employeeAvailability &&
			employeeAvailability.hoursAvailable &&
			employeeAvailability.hoursAvailable.length > 0
		) {
			const [chosenMonth, chosenDay, chosenYear] =
				(chosenDate && chosenDate.split("/").map(Number)) ||
				(chosenDate && chosenDate._d && chosenDate._d.split("/").map(Number));
			const [chosenHour, chosenMinute] = chosenTime.split(":").map(Number);
			const startDate = new Date(
				chosenYear,
				chosenMonth - 1,
				chosenDay,
				chosenHour,
				chosenMinute
			);

			// Step 2: Format start date using toLocaleDateString and toLocaleTimeString
			const formattedStartDate = startDate.toLocaleDateString("ar-EG", {
				weekday: "long",
				day: "numeric",
				month: "long",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});

			// Step 3: Calculate end date by adding totalServiceTime (in minutes) to start date
			const totalServiceTimeInMilliseconds =
				employeeAvailability && employeeAvailability.totalServiceTime * 60000;
			const endDate = new Date(
				startDate.getTime() + totalServiceTimeInMilliseconds
			);

			// Step 4: Format end date using toLocaleDateString and toLocaleTimeString
			const formattedEndDate = endDate.toLocaleDateString("ar-EG", {
				weekday: "long",
				day: "numeric",
				month: "long",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});

			return [formattedStartDate, formattedEndDate];
		} else {
			return null;
		}
	};

	var days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	var d = new Date(chosenDate);
	var chosenDateName = days[d.getDay()];

	const clickSubmitSchedule_NoPayment = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		if (
			pickedEmployee &&
			pickedEmployee.workingDays[0] &&
			pickedEmployee.workingDays.indexOf(chosenDateName) < 0
		) {
			return toast.error(
				`${pickedEmployee.employeeName} is off today, Please chose another date`
			);
		}

		if (!customerPhone) {
			return toast.error("Please Fill in Your Phone #...");
		}

		if (!scheduledByUserName) {
			return toast.error("Please Fill in Your User Name...");
		}

		if (customerPhone.length !== 11) {
			return toast.error(
				"Please make sure the phone number is only 11 digits & In English"
			);
		}

		if (serviceDetailsArray.length === 0) {
			return toast.error("Add at least one service");
		}

		if (!serviceDetailsArray) {
			return toast.error("Add at least one service");
		}

		function containsArabicNumerals(str) {
			// Regular expression to match Arabic numerals
			const arabicNumeralsRegex = /[\u0660-\u0669]/;
			return arabicNumeralsRegex.test(str);
		}

		function removeNonNumericCharacters(str) {
			// Regular expression to remove non-numeric characters
			const numericOnlyRegex = /\D/g;
			return str.replace(numericOnlyRegex, "");
		}

		function convertArabicToEnglishNumerals(arabicNumber) {
			const arabicNumeralsMap = {
				"٠": "0",
				"١": "1",
				"٢": "2",
				"٣": "3",
				"٤": "4",
				"٥": "5",
				"٦": "6",
				"٧": "7",
				"٨": "8",
				"٩": "9",
			};

			// Convert Arabic numerals to English numerals
			return arabicNumber.replace(
				/[\u0660-\u0669]/g,
				(match) => arabicNumeralsMap[match]
			);
		}

		function convertArabicOrNumericToEnglish(arabicNumber) {
			// Remove non-numeric characters (including '+') from the input
			const numericOnly = removeNonNumericCharacters(arabicNumber);

			// Check if the input contains Arabic numerals
			if (containsArabicNumerals(arabicNumber)) {
				// If it contains Arabic numerals, convert to English numerals
				return convertArabicToEnglishNumerals(numericOnly);
			}

			// Return the numericOnly string as is (English numerals)
			return numericOnly;
		}

		//Adjusting Inputs

		let serviceDetailsArrayModified =
			serviceDetailsArray && serviceDetailsArray.map((i) => i._id);

		const servicesPicked = employeeAvailability.servicesPicked;

		// Calculate the sum of "servicePriceDiscount"
		const totalServicePriceDiscount = servicesPicked.reduce(
			(sum, service) => sum + service.servicePriceDiscount,
			0
		);
		const totalServicePrice = servicesPicked.reduce(
			(sum, service) => sum + service.servicePrice,
			0
		);

		const createOrderData = {
			employees: [pickedEmployee],
			scheduledByUserName: scheduledByUserName,
			scheduledByUserEmail: convertArabicOrNumericToEnglish(customerPhone),
			amount: Number(totalServicePriceDiscount) - Number(discountCash),
			paidTip: 0,
			tipPercentage: 0,
			servicePrice: totalServicePrice,
			service: serviceDetailsArray.map((i) => i.serviceName).join(","),
			serviceDetails: employeeAvailability,
			serviceDetailsArray: serviceDetailsArrayModified,
			employeeAvailability: employeeAvailability,
			serviceDuration: employeeAvailability.totalServiceTime,
			LoyaltyPoints: 0,
			scheduledDate: chosenDate._d || chosenDate,
			scheduledTime: chosenTime,
			scheduleEndsAt: new Date(appointmentStarts()[1].replace(" at", "")),
			scheduleStartsAt: new Date(appointmentStarts()[0].replace(" at", "")),
			paymentStatus: false,
			status: "Not Paid",
			minLoyaltyPointsForAward: 0,
			onlineServicesFees: 0,
			phone: customerPhone,
			scheduleAppointmentPhoto: null,
			appointmentComment: "",
			discountedAmount: discountCash,
			discountedPercentage: 0,
			BookedFrom: "Store",
			transaction_id: "",
			card_data: "",
			applyPoints: false,
			appliedCoupon: "Functionality Not added",
			// totalwithNoDiscounts: actualPaymentByUser,
			appliedCouponData: "Not added",
			firstPurchase: "Not added yet",
			belongsTo: userBelongsToModified,
			sharePaid: false,
			updatedByUser:
				isAuthenticated() &&
				isAuthenticated().user &&
				isAuthenticated().user._id,
		};
		var userId =
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id;

		createScheduledAppointment(userId, token, createOrderData).then(
			(response) => {
				toast.success("Appointment Was Successfully Scheduled");
				window.scrollTo({ top: 0, behavior: "smooth" });
				localStorage.removeItem("barber");
				localStorage.removeItem("pickedServiceFirstAvailable");
				localStorage.removeItem("chosenDateFromFirstAvailable");
				localStorage.removeItem("CustomerType");

				// window.location.reload(false);
			}
		);
		return setTimeout(function () {
			window.location.href = `/store/book-appointment-from-store`;
		}, 1000);
	};

	// console.log(chosenDate, "chosenDate");
	return (
		<ScheduleFormFinalWrapper dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
			{loading ? (
				<div className='text-center mx-auto mt-5'>
					<Spin size='large' tip='LOADING...' />
				</div>
			) : (
				<>
					<DiscountModal
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						discountCash={discountCash}
						setDiscountCash={setDiscountCash}
					/>
					<NavbarPOS
						language={chosenLanguage}
						setLanguage={setLanguage}
						onlineStoreName={onlineStoreName}
					/>
					{chosenLanguage === "Arabic" ? (
						<ScheduleFormHelperArabic
							pickedEmployee={pickedEmployee}
							chosenDate={chosenDate}
							setChosenDate={setChosenDate}
							disabledDate={disabledDate}
							setChosenCustomerType={setChosenCustomerType}
							allCustomerTypes={allCustomerTypes}
							chosenCustomerType={chosenCustomerType}
							AllServices={AllServices}
							setServiceDetailsArray={setServiceDetailsArray}
							serviceDetailsArray={serviceDetailsArray}
							employeeAvailability={employeeAvailability}
							chosenTime={chosenTime}
							setChosenTime={setChosenTime}
							customerPhone={customerPhone}
							setCustomerPhone={setCustomerPhone}
							scheduledByUserName={scheduledByUserName}
							setScheduledByUserName={setScheduledByUserName}
							scheduledHours={scheduledHours}
							appointmentStarts={appointmentStartsArabic}
							clickSubmitSchedule_NoPayment={clickSubmitSchedule_NoPayment}
							setModalVisible={setModalVisible}
							discountCash={discountCash}
						/>
					) : (
						<ScheduleFormHelper
							pickedEmployee={pickedEmployee}
							chosenDate={chosenDate}
							setChosenDate={setChosenDate}
							disabledDate={disabledDate}
							setChosenCustomerType={setChosenCustomerType}
							allCustomerTypes={allCustomerTypes}
							chosenCustomerType={chosenCustomerType}
							AllServices={AllServices}
							setServiceDetailsArray={setServiceDetailsArray}
							serviceDetailsArray={serviceDetailsArray}
							employeeAvailability={employeeAvailability}
							chosenTime={chosenTime}
							setChosenTime={setChosenTime}
							customerPhone={customerPhone}
							setCustomerPhone={setCustomerPhone}
							scheduledByUserName={scheduledByUserName}
							setScheduledByUserName={setScheduledByUserName}
							scheduledHours={scheduledHours}
							appointmentStarts={appointmentStarts}
							clickSubmitSchedule_NoPayment={clickSubmitSchedule_NoPayment}
							setModalVisible={setModalVisible}
							discountCash={discountCash}
						/>
					)}

					<Link
						to='/store/book-appointment-from-store'
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
					>
						<div className='continueShoppingEmpty  my-5 mx-auto text-center'>
							{chosenLanguage === "Arabic"
								? "تغيير الموظف "
								: "Change Selected Stylist..."}
						</div>
					</Link>
				</>
			)}
		</ScheduleFormFinalWrapper>
	);
};

export default ScheduleFormFinal;

const ScheduleFormFinalWrapper = styled.div`
	min-height: 1200px;
	text-align: center;
	background-color: #222222;
	padding-bottom: 50px;
`;
