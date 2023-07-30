import React, { useEffect, useState } from "react";
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
	const [openTimeOpen, setOpenTimeOpen] = useState(false);
	const [closeTimeOpen, setCloseTimeOpen] = useState(false);

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

	const onOpenTimeChange = (time) => {
		setOpenTime(time);
		setOpenTimeOpen(false); // Close the picker after selecting an option
	};

	const onCloseTimeChange = (time) => {
		setCloseTime(time);
		setCloseTimeOpen(false); // Close the picker after selecting an option
	};

	return (
		<StoreTimePickerWrapper>
			<div>
				Salon Hours From <strong>"{allHours && allHours[0]}"</strong> to{" "}
				<strong>
					"{allHours && allHours[0] && allHours[allHours.length - 1]}"
				</strong>
			</div>
			<TimePicker
				format='HH'
				value={openTime}
				onChange={onOpenTimeChange}
				open={openTimeOpen}
				onOpenChange={setOpenTimeOpen}
				placeholder='Select Opening Time'
				className='w-75 text-center'
			/>
			<TimePicker
				format='HH'
				value={closeTime}
				onChange={onCloseTimeChange}
				open={closeTimeOpen}
				onOpenChange={setCloseTimeOpen}
				disabled={openTime === null}
				placeholder='Select Closing Time'
				className='mobile-scrollable-dropdown w-75 text-center my-2'
			/>
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
