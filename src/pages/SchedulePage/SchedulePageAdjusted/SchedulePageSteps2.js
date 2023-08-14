import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	createScheduledAppointment,
	getServices,
	gettingEmployeeFreeSlots,
	read,
} from "../../../apiCore";
import { authenticate, isAuthenticated, signin, signup } from "../../../auth";
import { Spin } from "antd";
import moment from "moment";
import ScheduleFormHelper from "./ScheduleFormHelper";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { allLoyaltyPointsAndStoreStatus } from "../../../apiCore";
import ScheduleFormHelperArabic from "./ScheduleFormHelperArabic";
import { useCartContext } from "../../../sidebar_context";

const SchedulePageSteps2 = ({ language }) => {
	const { chosenLanguage } = useCartContext();
	const chosenStoreLocalStorage = JSON.parse(
		localStorage.getItem("chosenStore")
	);

	const [pickedEmployee, setPickedEmployee] = useState("");
	const [loading, setLoading] = useState(false);
	const [scheduledHours, setScheduledHours] = useState([]);

	// eslint-disable-next-line
	const [onlineStoreName, setOnlineStoreName] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [AllServices, setAllServices] = useState("");
	const [serviceDetailsArray, setServiceDetailsArray] = useState([]);
	const [allCustomerTypes, setAllCustomerTypes] = useState([]);
	const [chosenCustomerType, setChosenCustomerType] = useState("");
	const [chosenTime, setChosenTime] = useState(null);
	const [employeeAvailability, setEmployeeAvailability] = useState("");
	const [scheduledByUserName, setScheduledByUserName] = useState("");
	// eslint-disable-next-line
	const [discountCash, setDiscountCash] = useState(0);
	const [customerPhone, setCustomerPhone] = useState(null);
	// const [fullName, setFullName] = useState("");
	// const [chosenTime, setChosenTime] = useState("");
	const [chosenDate, setChosenDate] = useState(moment().format("MM/DD/YYYY"));

	const { user, token } = isAuthenticated();

	const formatEnglishDate = (date) => {
		return moment(date).locale("en").format("MM/DD/YYYY");
	};

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
		if (user && user.name && user.email) {
			setScheduledByUserName(user.name);
			setCustomerPhone(user.phone);
		}
		// eslint-disable-next-line
	}, []);

	console.log(chosenDate, "chosenDateAgain");

	const loadPickedEmployee = (
		employeeId,
		pickedServiceFirstAvailable,
		CustomerType
	) => {
		const gettingBelongsTo =
			chosenStoreLocalStorage &&
			chosenStoreLocalStorage.belongsTo &&
			chosenStoreLocalStorage.belongsTo._id;

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
				getServices("token", gettingBelongsTo).then((data2) => {
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
		allLoyaltyPointsAndStoreStatus(
			"token",
			chosenStoreLocalStorage.belongsTo._id
		).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOnlineStoreName(data && data[data.length - 1]);
			}
		});
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
		const gettingBelongsTo =
			chosenStoreLocalStorage &&
			chosenStoreLocalStorage.belongsTo &&
			chosenStoreLocalStorage.belongsTo._id;
		if (
			pickedEmployee &&
			pickedEmployee._id &&
			chosenDate &&
			chosenCustomerType &&
			gettingBelongsTo &&
			serviceDetailsArray &&
			serviceDetailsArray.length > 0
		) {
			// Format date to "MM-DD-YYYY"
			const date = new Date(chosenDate);
			const formattedDate = `${
				date.getMonth() + 1
			}-${date.getDate()}-${date.getFullYear()}`;

			let allPickedServices =
				serviceDetailsArray && serviceDetailsArray.map((i) => i.serviceName);
			getEmployeeFreeSlots(
				pickedEmployee._id,
				chosenCustomerType,
				allPickedServices,
				formattedDate,
				gettingBelongsTo
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
		if (!user) {
			if (!/(?=.*\d).{6,}/.test(password)) {
				return toast.error(
					"Password should be at least 6 characters and a number should be included"
				);
			}
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

		const gettingBelongsTo =
			chosenStoreLocalStorage &&
			chosenStoreLocalStorage.belongsTo &&
			chosenStoreLocalStorage.belongsTo._id;

		//sign user up
		const cleanedPhone = convertArabicOrNumericToEnglish(customerPhone);

		if (!user) {
			signup({
				name: scheduledByUserName,
				email: convertArabicOrNumericToEnglish(customerPhone),
				phone: convertArabicOrNumericToEnglish(customerPhone),
				password,
				storeType: "No Store",
				storeName: "No Store",
				storeAddress: "No Store",
				storeGovernorate:
					chosenStoreLocalStorage &&
					chosenStoreLocalStorage.belongsTo.storeGovernorate,
				storeCountry:
					chosenStoreLocalStorage &&
					chosenStoreLocalStorage.belongsTo.storeCountry,
				storeDistrict:
					chosenStoreLocalStorage &&
					chosenStoreLocalStorage.belongsTo.storeDistrict,
				role: 0,
				roleDescription: "Client",
				activeUser: true,
			}).then((data1) => {
				if (data1.error) {
					console.log(data1.error, "data1.error");
					return toast.info(data1.error);
				} else {
					signin({ email: cleanedPhone, password }).then((data) => {
						if (data.error) {
							console.log(data, "Error Login");
						} else {
							authenticate(data, () => {
								console.log(data, "data");
							});

							//User Signed In Then Create The order
							const createOrderData = {
								employees: [pickedEmployee],
								scheduledByUserName: scheduledByUserName,
								scheduledByUserEmail:
									convertArabicOrNumericToEnglish(customerPhone),
								amount:
									Number(totalServicePriceDiscount) - Number(discountCash),
								paidTip: 0,
								tipPercentage: 0,
								servicePrice: totalServicePrice,
								service: serviceDetailsArray
									.map((i) => i.serviceName)
									.join(","),
								serviceDetails: employeeAvailability,
								serviceDetailsArray: serviceDetailsArrayModified,
								employeeAvailability: employeeAvailability,
								serviceDuration: employeeAvailability.totalServiceTime,
								LoyaltyPoints: 0,
								scheduledDate: chosenDate._d || chosenDate,
								scheduledTime: chosenTime,
								scheduleEndsAt: new Date(
									appointmentStarts()[1].replace(" at", "")
								).toLocaleString(),
								scheduleStartsAt: new Date(
									appointmentStarts()[0].replace(" at", "")
								).toLocaleString(),
								paymentStatus: false,
								status: "Not Paid",
								minLoyaltyPointsForAward: 0,
								onlineServicesFees: 0,
								phone: convertArabicOrNumericToEnglish(customerPhone),
								scheduleAppointmentPhoto: null,
								appointmentComment: "",
								discountedAmount: discountCash,
								discountedPercentage: 0,
								BookedFrom: "Online",
								transaction_id: "",
								card_data: "",
								applyPoints: false,
								appliedCoupon: "Functionality Not added",
								// totalwithNoDiscounts: actualPaymentByUser,
								appliedCouponData: "Not added",
								firstPurchase: "Not added yet",
								belongsTo: gettingBelongsTo,
								sharePaid: false,
							};
							var userId = data && data.user && data.user._id;

							setTimeout(function () {
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
							}, 1500);

							return setTimeout(function () {
								window.location.href = `/appointment-successfully-scheduled/YourAppointmentWasSuccesfullyScheduled/${userId}`;
							}, 2500);
						}
					});
				}
			});
		}

		if (user && user.name) {
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
				scheduleEndsAt: new Date(
					appointmentStarts()[1].replace(" at", "")
				).toLocaleString(),
				scheduleStartsAt: new Date(
					appointmentStarts()[0].replace(" at", "")
				).toLocaleString(),
				paymentStatus: false,
				status: "Not Paid",
				minLoyaltyPointsForAward: 0,
				onlineServicesFees: 0,
				phone: convertArabicOrNumericToEnglish(customerPhone),
				scheduleAppointmentPhoto: null,
				appointmentComment: "",
				discountedAmount: discountCash,
				discountedPercentage: 0,
				BookedFrom: "Online",
				transaction_id: "",
				card_data: "",
				applyPoints: false,
				appliedCoupon: "Functionality Not added",
				// totalwithNoDiscounts: actualPaymentByUser,
				appliedCouponData: "Not added",
				firstPurchase: "Not added yet",
				belongsTo: gettingBelongsTo,
				sharePaid: false,
			};
			var userId =
				isAuthenticated() &&
				isAuthenticated().user &&
				isAuthenticated().user._id;

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
				window.location.href = `/appointment-successfully-scheduled/YourAppointmentWasSuccesfullyScheduled/${user._id}`;
			}, 2000);
		}
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
							discountCash={discountCash}
							password={password}
							setPassword={setPassword}
							password2={password2}
							setPassword2={setPassword2}
							user={user}
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
							discountCash={discountCash}
							password={password}
							setPassword={setPassword}
							password2={password2}
							setPassword2={setPassword2}
							user={user}
						/>
					)}

					<Link
						to={`/schedule/${chosenStoreLocalStorage.addStoreName}/${chosenStoreLocalStorage.belongsTo.phone}`}
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

export default SchedulePageSteps2;

const ScheduleFormFinalWrapper = styled.div`
	min-height: 1200px;
	text-align: center;
	background-color: #222222;
	padding-bottom: 50px;
`;
