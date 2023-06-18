/** @format */

import React, {useState, useEffect} from "react";
// eslint-disable-next-line
import FullCalendar, {formatDate} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import {listScheduledOrders2} from "../apiOwner";
import {isAuthenticated} from "../../../../auth";

const MyCalendar = ({language, ownerId}) => {
	const [state, setState] = useState({
		weekendsVisible: true,
		currentEvents: [],
	});

	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const {token} = isAuthenticated();

	const loadOrders = () => {
		function compareTotalAppointments(a, b) {
			const TotalAppointmentsA =
				a.employees &&
				a.employees[0] &&
				a.employees[0].employeeName &&
				a.employees[0].employeeName.toLowerCase();
			const TotalAppointmentsB =
				b.employees &&
				b.employees[0] &&
				b.employees[0].employeeName &&
				b.employees[0].employeeName.toLowerCase();
			let comparison = 0;
			if (TotalAppointmentsA < TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = -1;
			}
			return comparison;
		}
		setLoading(true);
		listScheduledOrders2(ownerId, token, ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data.sort(compareTotalAppointments));

				setLoading(false);
			}
		});
	};

	useEffect(() => {
		loadOrders();
		// eslint-disable-next-line
	}, []);

	// eslint-disable-next-line
	const checkLength = (i) => {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	};

	// eslint-disable-next-line
	function formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}

	const events =
		orders &&
		orders.map((i) => {
			return {
				id: i._id,
				title: i.employees[0].employeeName.substring(0, 9),
				// +
				// " =>" +
				// " " +
				// i.scheduledByUserName.substring(0, 6)
				start: new Date(i.scheduleStartsAt).toISOString(),
				end: new Date(i.scheduleEndsAt).toISOString(),
				employeeId: i.employees && i.employees[0] && i.employees[0]._id,
				scheduledDate: i.scheduledDate,
				BookedFrom: i.BookedFrom,
				color:
					i.status === "Cancelled"
						? "#ff9595"
						: i.status === "Scheduled From Store / Not Paid"
						? "#82feff"
						: i.status === "Scheduled From Store / Paid"
						? "#82ffc2"
						: i.status === "Scheduled Online / Paid" ||
						  i.status === "Scheduled Online / Paid in Store"
						? "#caff95"
						: "#092049",
				textColor:
					i.status === "Cancelled"
						? "black"
						: i.status === "Scheduled Online / Paid" ||
						  i.status === "Scheduled Online / Paid in Store" ||
						  i.status === "Scheduled From Store / Not Paid" ||
						  i.status === "Scheduled From Store / Paid"
						? "black"
						: "white",
			};
		});
	// console.log(events, "eventssssssssssss");
	// eslint-disable-next-line
	const renderSidebar = () => {
		return (
			<div
				className='demo-app-sidebar'
				style={{
					textAlign: "center",
					marginBottom: "5px",
					fontWeight: "bold",
					color: "darkblue",
					fontSize: "14px",
				}}
			>
				<div className='demo-app-sidebar-section'>
					<h2
						style={{
							textAlign: "center",
							marginBottom: "5px",
							fontWeight: "bold",
							color: "darkblue",
							fontSize: "23px",
						}}
					>
						{language === "Arabic" ? "جميع المواعيد" : "All Appointments"}(
						{state &&
							state.currentEvents &&
							state.currentEvents.filter(
								(i) =>
									new Date(i._def.extendedProps.scheduledDate).setHours(
										0,
										0,
										0,
										0
									) >
										new Date(
											i._context.dateProfile.currentRange.start
										).setHours(0, 0, 0, 0) &&
									new Date(i._def.extendedProps.scheduledDate).setHours(
										0,
										0,
										0,
										0
									) <=
										new Date(i._context.dateProfile.currentRange.end).setHours(
											0,
											0,
											0,
											0
										)
							).length}
						)
					</h2>
					{/* <ul>
						{state &&
							state.currentEvents &&
							state.currentEvents.map(renderSidebarEvent)}
					</ul> */}
				</div>
				<div className='demo-app-sidebar-section'>
					<label>
						(
						{state &&
							state.currentEvents &&
							state.currentEvents.filter(
								(i) =>
									new Date(i._def.extendedProps.scheduledDate).setHours(
										0,
										0,
										0,
										0
									) >
										new Date(
											i._context.dateProfile.currentRange.start
										).setHours(0, 0, 0, 0) &&
									new Date(i._def.extendedProps.scheduledDate).setHours(
										0,
										0,
										0,
										0
									) <=
										new Date(i._context.dateProfile.currentRange.end).setHours(
											0,
											0,
											0,
											0
										) &&
									i._def.extendedProps.BookedFrom === "Online"
							).length}{" "}
						{language === "Arabic" ? " عبر الإنترنت " : "Scheduled Online,"}{" "}
						{state &&
							state.currentEvents &&
							state.currentEvents.filter(
								(i) =>
									new Date(i._def.extendedProps.scheduledDate).setHours(
										0,
										0,
										0,
										0
									) >
										new Date(
											i._context.dateProfile.currentRange.start
										).setHours(0, 0, 0, 0) &&
									new Date(i._def.extendedProps.scheduledDate).setHours(
										0,
										0,
										0,
										0
									) <=
										new Date(i._context.dateProfile.currentRange.end).setHours(
											0,
											0,
											0,
											0
										) &&
									i._def.extendedProps.BookedFrom === "Store"
							).length}{" "}
						{language === "Arabic" ? "من المتجر" : "From Store"} )
					</label>
				</div>
				{/* <div className='demo-app-sidebar-section'>
					<h2>Instructions</h2>
					<ul>
						<li>Select dates and you will be prompted to create a new event</li>
						<li>Drag, drop, and resize events</li>
						<li>Click an event to delete it</li>
					</ul>
				</div> */}
				<div className='demo-app-sidebar-section'>
					<label>
						<input
							type='checkbox'
							className='mr-1'
							checked={state.weekendsVisible}
							onChange={handleWeekendsToggle}
						></input>
						Include/Exclude Weekends
					</label>
				</div>
				<div className='col-md-3 mx-auto'>
					<hr />
				</div>
			</div>
		);
	};

	const handleWeekendsToggle = () => {
		setState({...state, weekendsVisible: !state.weekendsVisible});
	};
	const handleDateSelect = (selectInfo) => {
		let title = prompt("Please enter a new title for your event");
		let calendarApi = selectInfo.view.calendar;

		calendarApi.unselect(); // clear date selection

		if (title) {
			calendarApi.addEvent({
				id: events.id,
				title,
				start: selectInfo.startStr,
				end: selectInfo.endStr,
				allDay: selectInfo.allDay,
			});
		}
	};
	const handleEventClick = (clickInfo) => {
		// console.log(clickInfo.event._def.extendedProps.employeeId, "clickInfo");
		return (window.location.href = `/boss/store/admin/single-appointment-details/${clickInfo.event._def.publicId}/${clickInfo.event._def.extendedProps.employeeId}/${ownerId}`);
	};

	const handleEvents = (events) => {
		setState({...state, currentEvents: events && events});
	};

	function renderEventContent(eventInfo) {
		return (
			<React.Fragment>
				<b>{eventInfo.timeText}</b>
				<i>{eventInfo.event.title}</i>
			</React.Fragment>
		);
	}
	// eslint-disable-next-line
	function renderSidebarEvent(event) {
		return (
			<li key={event.id}>
				<b>
					{formatDate(event.start, {
						year: "numeric",
						month: "short",
						day: "numeric",
					})}
				</b>
				<i>{event.title}</i>
			</li>
		);
	}
	return (
		<MainCalendar>
			{loading || orders.length === 0 ? (
				<div>
					<div className='col-md-8 mt-5'>Loading</div>
				</div>
			) : (
				<div className='demo-app'>
					{renderSidebar()}
					<FullCalendar
						// aspectRatio={0.2}
						themeSystem={"standard"}
						allDayContent={"All Day"}
						allDaySlot={false}
						slotMinTime={"7:00:00"}
						slotMaxTime={"23:59:59"}
						nowIndicator={true}
						// nowIndicatorContent={"Now"}
						contentHeight={800}
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
						headerToolbar={{
							left: "prev,next today",
							center: "title",
							right: "dayGridMonth,timeGridWeek,timeGridDay",
						}}
						initialView='timeGridDay'
						editable={false}
						eventOrder='-title'
						selectable={true}
						selectMirror={true}
						eventOverlap={false}
						dayMaxEvents={true}
						weekends={state.weekendsVisible}
						initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
						select={handleDateSelect}
						slotEventOverlap={false}
						eventContent={renderEventContent} // custom render function
						eventClick={handleEventClick}
						eventsSet={handleEvents} // called after events are initialized/added/changed/removed
						dayCellClassNames={(e) => {
							if (e.date.getDate() === new Date().getDate()) {
								return "today";
							}
							return "";
						}}

						/* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
					/>
				</div>
			)}
		</MainCalendar>
	);
};
export default MyCalendar;

const MainCalendar = styled.div`
	position: relative;
	margin-top: 50px;
	border: 1px solid black;
	margin-left: 20px;
	margin-right: 20px;
	padding: 10px;
	border-radius: 20px;

	/* box-shadow: 5px 5px 10px 10px rgb(0, 0, 0, 0.5); */
	/* background-color: black; */

	.fc-dayGridMonth-button {
		text-transform: capitalize;
		background-color: black;
		border-radius: 15px !important;
		padding: 10px;
		margin: 10px;
	}
	.fc-timeGridWeek-button {
		text-transform: capitalize;
		background-color: black;
		border-radius: 15px !important;
		padding: 10px;
		margin: 10px;
	}
	.fc-timeGridDay-button {
		text-transform: capitalize;
		border-radius: 15px !important;
		padding: 10px;
		margin: 10px;
	}
	.fc-today-button {
		text-transform: capitalize;
	}

	table {
		padding: 0px !important;
		margin: 0px !important;
	}

	h2 {
		margin: 0;
		font-size: 16px;
	}

	ul {
		margin: 0;
		/* padding: 0 0 0 1.5em; */
	}

	li {
		margin: 1.5em 0;
		padding: 0px;
	}

	b {
		/* used for event dates/times */
		margin-right: 4px;
	}

	.fc .fc-col-header-cell-cushion {
		display: inline-block;
		font-size: 1rem;
	}
	td {
		padding: 5px 0;
	}

	a {
		width: 100%;
		padding: 5px;
		height: 100%;
	}

	.today {
		background-color: #dfe9fb !important;
	}

	@media (max-width: 900px) {
		font-size: 10px !important;
		margin-left: 5px;
		margin-right: 5px;

		.fc-button-group {
			margin: 5px;
		}
	}
`;
