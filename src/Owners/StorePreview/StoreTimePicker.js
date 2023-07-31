// eslint-disable-next-line
import React, { useEffect, useState } from "react";
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
		if (openTime && closeTime) {
			let currentTime = moment(openTime, "HH:mm");
			const times = [];
			while (currentTime.isSameOrBefore(moment(closeTime, "HH:mm"))) {
				times.push(currentTime.format("HH:mm"));
				currentTime = currentTime.clone().add(15, "minutes");
			}
			setAllHours(times);
		}
		// eslint-disable-next-line
	}, [openTime, closeTime]);

	const onOpenTimeChange = (e) => {
		setOpenTime(e.target.value);
	};

	const onCloseTimeChange = (e) => {
		setCloseTime(e.target.value);
	};

	// console.log(allHours, "allHours");

	return (
		<StoreTimePickerWrapper>
			<div>
				Salon Hours From <strong>"{allHours && allHours[0]}"</strong> to{" "}
				<strong>
					"{allHours && allHours[0] && allHours[allHours.length - 1]}"
				</strong>
			</div>
			<select
				value={openTime}
				onChange={onOpenTimeChange}
				className='w-75 text-center'
			>
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
				className='mobile-scrollable-dropdown w-75 text-center my-2'
			>
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
