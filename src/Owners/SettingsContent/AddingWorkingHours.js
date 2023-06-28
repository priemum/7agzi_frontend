import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../../auth";
import {
	AddingAppointmentWorkingHours,
	getPreviousScheduledHours,
} from "../apiOwner";
import { toast } from "react-toastify";

const AllPossibleHours = [
	"00:00",
	"00:15",
	"00:30",
	"00:45",
	"01:00",
	"01:15",
	"01:30",
	"01:45",
	"02:00",
	"02:15",
	"02:30",
	"02:45",
	"03:00",
	"03:15",
	"03:30",
	"03:45",
	"04:00",
	"04:15",
	"04:30",
	"04:45",
	"05:00",
	"05:15",
	"05:30",
	"05:45",
	"06:00",
	"06:15",
	"06:30",
	"06:45",
	"07:00",
	"07:15",
	"07:30",
	"07:45",
	"08:00",
	"08:15",
	"08:30",
	"08:45",
	"09:00",
	"09:15",
	"09:30",
	"09:45",
	"10:00",
	"10:15",
	"10:30",
	"10:45",
	"11:00",
	"11:15",
	"11:30",
	"11:45",
	"12:00",
	"12:15",
	"12:30",
	"12:45",
	"13:00",
	"13:15",
	"13:30",
	"13:45",
	"14:00",
	"14:15",
	"14:30",
	"14:45",
	"15:00",
	"15:15",
	"15:30",
	"15:45",
	"16:00",
	"16:15",
	"16:30",
	"16:45",
	"17:00",
	"17:15",
	"17:30",
	"17:45",
	"18:00",
	"18:15",
	"18:30",
	"18:45",
	"19:00",
	"19:15",
	"19:30",
	"19:45",
	"20:00",
	"20:15",
	"20:30",
	"20:45",
	"21:00",
	"21:15",
	"21:30",
	"21:45",
	"22:00",
	"22:15",
	"22:30",
	"22:45",
	"23:00",
	"23:15",
	"23:30",
	"23:45",
];

const AddingWorkingHours = ({
	clickSubmit2,
	storeThumbnail,
	addStoreName,
	addStoreNameArabic,
}) => {
	const [AllAddedHoursCombined, setAllAddedHoursCombined] = useState({
		AllAddedHoursCombined: [
			"08:00",
			"08:15",
			"08:30",
			"08:45",
			"09:00",
			"09:15",
			"09:30",
			"09:45",
			"10:00",
			"10:15",
			"10:30",
			"10:45",
			"11:00",
			"11:15",
			"11:30",
			"11:45",
			"12:00",
			"12:15",
			"12:30",
			"12:45",
			"13:00",
			"13:15",
			"13:30",
			"13:45",
			"14:00",
			"14:15",
			"14:30",
			"14:45",
			"15:00",
			"15:15",
			"15:30",
			"15:45",
			"16:00",
			"16:15",
			"16:30",
			"16:45",
			"17:00",
			"17:15",
			"17:30",
			"17:45",
			"18:00",
			"18:15",
			"18:30",
			"18:45",
			"19:00",
			"19:15",
			"19:30",
			"19:45",
			"20:00",
		],
	});
	const [query4, setQuery4] = useState([
		"08:00",
		"08:15",
		"08:30",
		"08:45",
		"09:00",
		"09:15",
		"09:30",
		"09:45",
		"10:00",
		"10:15",
		"10:30",
		"10:45",
		"11:00",
		"11:15",
		"11:30",
		"11:45",
		"12:00",
		"12:15",
		"12:30",
		"12:45",
		"13:00",
		"13:15",
		"13:30",
		"13:45",
		"14:00",
		"14:15",
		"14:30",
		"14:45",
		"15:00",
		"15:15",
		"15:30",
		"15:45",
		"16:00",
		"16:15",
		"16:30",
		"16:45",
		"17:00",
		"17:15",
		"17:30",
		"17:45",
		"18:00",
		"18:15",
		"18:30",
		"18:45",
		"19:00",
		"19:15",
		"19:30",
		"19:45",
		"20:00",
	]);
	// eslint-disable-next-line
	const [PreviousAddedHours, setPreviousAddedHours] = useState({});

	const { user, token } = isAuthenticated();
	let hoursCanBeScheduled = [];

	hoursCanBeScheduled = AllAddedHoursCombined.AllAddedHoursCombined;
	const clickSubmit = (e) => {
		e.preventDefault();
		if (hoursCanBeScheduled.length < 10) {
			return toast.error(
				"Please make sure to submit at least 10 active appointments' times."
			);
		}
		if (
			storeThumbnail &&
			storeThumbnail.images &&
			storeThumbnail.images.length === 0
		) {
			return toast.error("Please Add Store Thumbnail");
		}

		if (!addStoreName) {
			return toast.error("Store Name Required");
		}
		if (!addStoreNameArabic) {
			return toast.error("Store Name Arabic Required");
		}

		AddingAppointmentWorkingHours(user._id, token, {
			hoursCanBeScheduled,
			belongsTo: user._id,
		}).then((data) => {
			if (data.error) {
				console.log(data.error, "error handiling times for appointments");
			} else {
				toast.success("Settings was successfully Updated.");
				clickSubmit2();
				setTimeout(function () {
					setAllAddedHoursCombined("");
				}, 2000);
				setTimeout(function () {
					window.location.reload(false);
				}, 3000);
			}
		});
	};

	const PreviousAddedAppointmentHours = () => {
		getPreviousScheduledHours(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error, "Retrieving Previous Working Hours");
			} else {
				setPreviousAddedHours(data[data.length - 1]);
				if (data.length > 0) {
					setQuery4(data[data.length - 1].hoursCanBeScheduled);
				} else {
					return null;
				}
			}
		});
	};

	useEffect(() => {
		PreviousAddedAppointmentHours();
		// eslint-disable-next-line
	}, []);

	const handleQueryChange_WorkingHours = (e) => {
		// console.log(e.target, "event.target");
		if (e.target.checked && !query4.includes(e.target.value)) {
			setQuery4([...query4, e.target.value]);
			setAllAddedHoursCombined({
				...AllAddedHoursCombined,
				AllAddedHoursCombined: query4,
			});
		} else if (!e.target.checked && query4.includes(e.target.value)) {
			setQuery4(query4.filter((q) => q !== e.target.value));
			setAllAddedHoursCombined({
				...AllAddedHoursCombined,
				AllAddedHoursCombined: query4,
			});
		}

		setAllAddedHoursCombined({
			...AllAddedHoursCombined,
			AllAddedHoursCombined: query4,
		});
	};

	useEffect(() => {
		setAllAddedHoursCombined({
			...AllAddedHoursCombined,
			AllAddedHoursCombined: query4,
		});
		// eslint-disable-next-line
	}, [query4]);
	return (
		<AddingWorkingHoursWrapper>
			<div className='col-md-9 mx-auto p-3 mt-4 '>
				<form>
					<div
						className='form-group mx-auto p-4'
						style={{ border: "1px black solid", borderRadius: "20px" }}
					>
						<h3 className='mb-4 text-center'>
							Add Active Appointments Hours/Times
						</h3>

						<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
							{AllPossibleHours &&
								AllPossibleHours.map((h) => {
									return (
										<span key={h} className='m-1 p-1'>
											<label htmlFor={h} className='block '>
												<input
													type='checkbox'
													id={h}
													onChange={handleQueryChange_WorkingHours}
													value={h}
													className='m-3'
													checked={query4 && query4.indexOf(h) !== -1}
												/>
												{h}
											</label>
										</span>
									);
								})}
						</div>
						<React.Fragment>
							{hoursCanBeScheduled && hoursCanBeScheduled.length > 0 ? (
								<div className='mb-3'>
									<hr />
									Your added Times:
									<div className='row'>
										{AllAddedHoursCombined.AllAddedHoursCombined.map((t, i) => (
											<div key={i} className='col-md-2 mt-2'>
												{t}
											</div>
										))}
									</div>
									<hr />
								</div>
							) : (
								<React.Fragment>
									<hr />
									<div className='mb-3'>
										Please add new appointment times...
									</div>
									<hr />
								</React.Fragment>
							)}
						</React.Fragment>
						<div className='col-md-6 mx-auto'>
							<button
								className='btn btn-outline-success my-3 btn-block'
								onClick={clickSubmit}
								style={{ fontWeight: "bold", fontSize: "1.2rem" }}
							>
								Submit Added Settings...
							</button>
						</div>
					</div>
				</form>
			</div>
		</AddingWorkingHoursWrapper>
	);
};

export default AddingWorkingHours;

const AddingWorkingHoursWrapper = styled.div``;
