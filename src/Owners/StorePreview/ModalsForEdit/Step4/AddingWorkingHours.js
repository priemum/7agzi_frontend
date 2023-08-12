import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const AddingWorkingHours = ({
	allWorkingHours,
	values,
	setValues,
	language,
}) => {
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [availableEndTimes, setAvailableEndTimes] = useState([]);

	useEffect(() => {
		if (startTime) {
			setAvailableEndTimes(
				allWorkingHours.slice(allWorkingHours.indexOf(startTime) + 4)
			);
			ReactGA.event(`Account_Added_Shift_Start_Time`, {
				event_category: "Account_Added_Shift_Start_Time",
				event_label: "Account_Added_Shift_Start_Time",
				value: 0, // Optional extra parameters
			});

			ReactPixel.track("Account_Added_Shift_Start_Time", {
				content_name: "Account_Added_Shift_Start_Time",
				content_category: "Account_Added_Shift_Start_Time",
				value: "",
				currency: "",
			});
		}
	}, [startTime, allWorkingHours]); // include allWorkingHours

	useEffect(() => {
		if (!startTime || !endTime) return;

		const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
		const replaceArabicNumbers = (str) => {
			for (let i = 0; i <= 9; i++) {
				const regex = new RegExp(arabicNumbers[i], "g");
				str = str.replace(regex, i.toString());
			}
			return str;
		};

		const startIdx = allWorkingHours.indexOf(replaceArabicNumbers(startTime));
		const endIdx = allWorkingHours.indexOf(replaceArabicNumbers(endTime));
		const selectedWorkingHours = allWorkingHours
			.slice(startIdx, endIdx + 1)
			.map((time) => replaceArabicNumbers(time));

		setValues({ ...values, workingHours: selectedWorkingHours });

		ReactGA.event(`Account_Added_Shift_End_Time`, {
			event_category: "Account_Added_Shift_End_Time",
			event_label: "Account_Added_Shift_End_Time",
			value: 0, // Optional extra parameters
		});

		ReactPixel.track("Account_Added_Shift_End_Time", {
			content_name: "Account_Added_Shift_End_Time",
			content_category: "Account_Added_Shift_End_Time",
			value: "",
			currency: "",
		});

		// eslint-disable-next-line
	}, [endTime, startTime]);

	return (
		<AddingWorkingHoursWrapper>
			{language === "Arabic" ? (
				<div className=''>
					<label style={{ color: "black" }}>وقت بدء الشيفت:</label>
					<br />
					<select
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						className='form-control'
					>
						<option value='' disabled>
							اختر وقت البداية
						</option>
						{allWorkingHours.map((time, index) => (
							<option key={index} value={time}>
								{time}
							</option>
						))}
					</select>
					<br />
					<label>وقت انتهاء الشيفت:</label>
					<br />
					<select
						className='form-control'
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
						disabled={!startTime}
					>
						<option value='' disabled>
							اختر وقت الانتهاء
						</option>
						{availableEndTimes.map((time, index) => (
							<option key={index} value={time}>
								{time}
							</option>
						))}
					</select>
				</div>
			) : (
				<>
					<select
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						className='form-control'
					>
						<label>Shift Starting Time:</label>
						<br />

						<option value='' disabled>
							Select Starting Time
						</option>
						{allWorkingHours.map((time, index) => (
							<option key={index} value={time}>
								{time}
							</option>
						))}
					</select>
					<label>Shift Ending Time:</label>
					<br />
					<select
						className='form-control'
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
						disabled={!startTime}
					>
						<option value='' disabled>
							Select Ending Time
						</option>
						{availableEndTimes.map((time, index) => (
							<option key={index} value={time}>
								{time}
							</option>
						))}
					</select>
				</>
			)}
		</AddingWorkingHoursWrapper>
	);
};

export default AddingWorkingHours;

const AddingWorkingHoursWrapper = styled.div`
	label {
		font-size: 1rem;
	}
`;
