import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const StoreTimePicker = ({
	language,
	openTime,
	setOpenTime,
	closeTime,
	setCloseTime,
	allHours,
	setAllHours,
}) => {
	const possibleTimes = [
		"00:00",
		"01:00",
		"02:00",
		"03:00",
		"04:00",
		"05:00",
		"06:00",
		"07:00",
		"08:00",
		"09:00",
		"10:00",
		"11:00",
		"12:00",
		"13:00",
		"14:00",
		"15:00",
		"16:00",
		"17:00",
		"18:00",
		"19:00",
		"20:00",
		"21:00",
		"22:00",
		"23:00",
		"23:45",
	];

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.gtag("event", "page_view", {
			page_path: window.location.pathname,
		});

		// eslint-disable-next-line
	}, [window.location.pathname]);

	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (openTime && closeTime) {
			let currentTime = moment(openTime, "HH:mm");
			const times = [];
			while (true) {
				times.push(currentTime.format("HH:mm"));
				currentTime = currentTime.clone().add(1, "hour");
				if (currentTime.isAfter(moment(closeTime, "HH:mm"))) {
					if (
						times[times.length - 1] !==
						moment(closeTime, "HH:mm").format("HH:mm")
					) {
						times.push(moment(closeTime, "HH:mm").format("HH:mm"));
					}
					break;
				}
			}
			setAllHours(times);
		}
		// eslint-disable-next-line
	}, [openTime, closeTime]);

	const onOpenTimeChange = (e) => {
		setOpenTime(e.target.value);

		ReactGA.event("Account_Picked_Salon_Open_Time", {
			event_category: "Account_Picked_Salon_Open_Time",
			event_label: "Account_Picked_Salon_Open_Time",
			value: 0, // Optional extra parameters
		});

		ReactPixel.track("Account_Picked_Salon_Open_Time", {
			content_name: "Account_Picked_Salon_Open_Time",
			content_category: "Account_Picked_Salon_Open_Time",
			value: "",
			currency: "",
		});
	};

	const onCloseTimeChange = (e) => {
		setCloseTime(e.target.value);

		ReactGA.event("Account_Picked_Salon_Closing_Time", {
			event_category: "Account_Picked_Salon_Closing_Time",
			event_label: "Account_Picked_Salon_Closing_Time",
			value: 0, // Optional extra parameters
		});

		ReactPixel.track("Account_Picked_Salon_Closing_Time", {
			content_name: "Account_Picked_Salon_Closing_Time",
			content_category: "Account_Picked_Salon_Closing_Time",
			value: "",
			currency: "",
		});
	};

	return (
		<StoreTimePickerWrapper
			dir={language === "Arabic" ? "rtl" : "ltr"}
			className='mb-5'
		>
			<div>
				Salon Hours From <strong>"{allHours && allHours[0]}"</strong> to{" "}
				<strong>
					"{allHours && allHours[0] && allHours[allHours.length - 1]}"
				</strong>
			</div>
			<select
				value={openTime}
				onChange={onOpenTimeChange}
				className='w-100 p-2 mt-2 mb-4 form-control'
			>
				<option value=''>
					{language === "Arabic"
						? "يفتح الصالون الساعة (اختر من فضلك*) "
						: "Salon Opens At (Required*)"}
				</option>
				{possibleTimes.map((time, index) => (
					<option key={index} value={time}>
						{time}
					</option>
				))}
			</select>
			<select
				value={closeTime}
				onChange={onCloseTimeChange}
				disabled={!openTime}
				className='mobile-scrollable-dropdown w-100 p-2 my-2 form-control'
			>
				<option value=''>
					{language === "Arabic"
						? "يغلق الصالون الساعة (اختر من فضلك*)"
						: "Salon Closes At"}
				</option>
				{possibleTimes
					.slice(possibleTimes.indexOf(openTime) + 1)
					.map((time, index) => (
						<option key={index} value={time}>
							{time}
						</option>
					))}
			</select>
		</StoreTimePickerWrapper>
	);
};

export default StoreTimePicker;

const StoreTimePickerWrapper = styled.div`
	.mobile-scrollable-dropdown .ant-picker-dropdown {
		overflow: auto;
		max-height: 200px;
	}
`;
