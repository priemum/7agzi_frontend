import React, { useEffect } from "react";
import { TimePicker } from "antd";
import moment from "moment";
import styled from "styled-components";

const StoreTimePicker = ({
	language,
	openTime,
	setOpenTime,
	closeTime,
	setCloseTime,
	allHours,
	setAllHours,
}) => {
	useEffect(() => {
		if (openTime && closeTime) {
			let currentTime = moment(openTime);
			const times = [];
			while (true) {
				times.push(currentTime.format("HH:mm"));
				currentTime = currentTime.clone().add(15, "minutes");
				if (currentTime > moment(closeTime)) {
					if (times[times.length - 1] !== moment(closeTime).format("HH:mm")) {
						times.push(moment(closeTime).format("HH:mm"));
					}
					break;
				}
			}
			setAllHours(times);
		}
		// eslint-disable-next-line
	}, [openTime, closeTime]);

	const disabledTime = () => {
		return {
			disabledHours: () => {
				const hours = [];
				for (let i = 0; i < 24; i++) {
					if (openTime && i <= openTime.hours()) {
						hours.push(i);
					}
				}
				return hours;
			},
			disabledMinutes: (selectedHour) => {
				const minutes = [];
				if (openTime && selectedHour === openTime.hours()) {
					for (let i = 0; i < 60; i += 15) {
						if (i < openTime.minutes()) {
							minutes.push(i);
						}
					}
				}
				return minutes;
			},
		};
	};

	console.log(allHours, "allHours");

	return (
		<StoreTimePickerWrapper>
			<div>
				Salon Hours From "{allHours && allHours[0]}" to "
				{allHours && allHours[0] && allHours[allHours.length - 1]}"
			</div>
			<TimePicker
				format='HH:mm'
				minuteStep={15}
				value={openTime}
				onChange={setOpenTime}
				placeholder='Select Opening Time'
				className='w-75 text-center'
			/>
			<TimePicker
				format='HH:mm'
				minuteStep={15}
				value={closeTime}
				onChange={setCloseTime}
				disabled={openTime === null}
				placeholder='Select Closing Time'
				disabledTime={disabledTime}
				className='mobile-scrollable-dropdown w-75 text-center my-2'
			/>
		</StoreTimePickerWrapper>
	);
};

export default StoreTimePicker;

const StoreTimePickerWrapper = styled.div`
	.mobile-scrollable-dropdown .ant-picker-dropdown {
		overflow: auto;
		max-height: 200px; /* adjust as needed */
	}
`;
