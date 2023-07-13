import { DatePicker } from "antd";
import moment from "moment";
import styled from "styled-components";

const Adding2DaysClosed = ({
	daysStoreClosed,
	setDaysStoreClosed,
	datesStoreClosed,
	setDatesStoreClosed,
	alreadySetLoyaltyPointsManagement,
	query,
	setQuery,
	oneDateStoreOff,
	setOneDateStoreOff,
	setClickedMenu,
	activeOnlineBooking,
	setActiveOnlineBooking,
	setExtraData,
	extraData,
	language,
}) => {
	const pushToAllDates = (e) => {
		e.preventDefault();
		console.log(
			new Date(oneDateStoreOff._d).toLocaleDateString(),
			"oneDateStoreOff"
		);
		setDatesStoreClosed([
			...datesStoreClosed,
			new Date(oneDateStoreOff._d).toLocaleDateString(),
		]);
		setOneDateStoreOff("");
	};

	const handleQueryChange = (event) => {
		if (event.target.checked && !query.includes(event.target.value)) {
			setQuery([...query, event.target.value]);
			setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		} else if (!event.target.checked && query.includes(event.target.value)) {
			setQuery(query.filter((q) => q !== event.target.value));
			setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		}

		setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
	};

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};

	// console.log(daysStoreClosed.daysStoreClosed, "daysStore");

	const removeDay = (index) => {
		const newDatesStoreClosed = [...datesStoreClosed];
		newDatesStoreClosed.splice(index, 1);
		setDatesStoreClosed(newDatesStoreClosed);
	};

	return (
		<Adding2DaysClosedWrapper className='container'>
			<div className='mb-3'>
				<label className='mr-2' style={{ fontWeight: "bold" }}>
					{language === "Arabic"
						? "تفعيل الحجز الإلكتروني (خدمة الحجز الذاتي عبر الإنترنت)؟"
						: "Activate Online Booking (Self Service Online Booking)?"}
				</label>

				<label className='block'>
					<input
						type='checkbox'
						id='one'
						onChange={() => setActiveOnlineBooking(true)}
						value={activeOnlineBooking}
						className='my-3 mx-1'
						checked={activeOnlineBooking}
					/>
					{language === "Arabic" ? "نعم" : "Yes"}
				</label>
				<label className='block ml-3 '>
					<input
						type='checkbox'
						id='one'
						onChange={() => setActiveOnlineBooking(false)}
						value={activeOnlineBooking}
						className='my-3 mx-1'
						checked={!activeOnlineBooking}
					/>
					{language === "Arabic" ? "لا" : "No"}
				</label>
			</div>

			<div className='w-100 mb-5'>
				<label>
					{language === "Arabic"
						? "أيام إغلاق المتجر:"
						: "Store Closed on days:"}
				</label>
				<div className='checkboxes border-gray-200 border border-solid'>
					<div className='row'>
						<div className='col-md-1'>
							<label htmlFor='one' className='block '>
								<input
									type='checkbox'
									id='one'
									onChange={handleQueryChange}
									value='Saturday'
									className='m-3'
									checked={
										daysStoreClosed.daysStoreClosed.indexOf("Saturday") > -1
									}
								/>
								{language === "Arabic" ? "السبت" : "Saturday"}
							</label>
						</div>

						<div className='col-md-1'>
							<label htmlFor='two' className='block'>
								<input
									type='checkbox'
									id='two'
									onChange={handleQueryChange}
									value='Sunday'
									className='m-3'
									checked={
										daysStoreClosed.daysStoreClosed.indexOf("Sunday") > -1
									}
								/>
								{language === "Arabic" ? "الأحد" : "Sunday"}
							</label>
						</div>

						<div className='col-md-1'>
							<label htmlFor='three' className='block'>
								<input
									type='checkbox'
									id='three'
									onChange={handleQueryChange}
									value='Monday'
									className='m-3'
									checked={
										daysStoreClosed.daysStoreClosed.indexOf("Monday") > -1
									}
								/>
								{language === "Arabic" ? "الاثنين" : "Monday"}
							</label>
						</div>

						<div className='col-md-1'>
							<label htmlFor='four' className='block'>
								<input
									type='checkbox'
									id='four'
									onChange={handleQueryChange}
									value='Tuesday'
									className='m-3'
									checked={
										daysStoreClosed.daysStoreClosed.indexOf("Tuesday") > -1
									}
								/>
								{language === "Arabic" ? "الثلاثاء" : "Tuesday"}
							</label>
						</div>
						<div className='col-md-1'>
							<label htmlFor='five' className='block'>
								<input
									type='checkbox'
									id='five'
									onChange={handleQueryChange}
									value='Wednesday'
									className='m-3'
									checked={
										daysStoreClosed.daysStoreClosed.indexOf("Wednesday") > -1
									}
								/>
								{language === "Arabic" ? "الأربعاء" : "Wednesday"}
							</label>
						</div>
						<div className='col-md-1'>
							<label htmlFor='six' className='block'>
								<input
									type='checkbox'
									id='six'
									onChange={handleQueryChange}
									value='Thursday'
									className='m-3'
									checked={
										daysStoreClosed.daysStoreClosed.indexOf("Thursday") > -1
									}
								/>
								{language === "Arabic" ? "الخميس" : "Thursday"}
							</label>
						</div>
						<div className='col-md-1'>
							<label htmlFor='seven' className='block'>
								<input
									type='checkbox'
									id='seven'
									onChange={handleQueryChange}
									value='Friday'
									className='m-3'
									checked={
										daysStoreClosed.daysStoreClosed.indexOf("Friday") > -1
									}
								/>
								{language === "Arabic" ? "الجمعة" : "Friday"}
							</label>
						</div>
					</div>
				</div>
			</div>

			<div className='my-3'>
				<h4 style={{ fontWeight: "bolder" }}>
					{language === "Arabic" ? "البيانات العامة" : "General Data"}
				</h4>

				<div className='row'>
					<div className='mb-3 col-md-3'>
						<label className='mr-1' style={{ fontWeight: "bold" }}>
							{language === "Arabic" ? "قبول النقد؟" : "Accept Cash?"}
						</label>

						<label className='block'>
							<input
								type='checkbox'
								id='one'
								onChange={() =>
									setExtraData({ ...extraData, cashPayment: true })
								}
								value={extraData.cashPayment}
								className='my-3 mx-1'
								checked={extraData.cashPayment}
							/>
							{language === "Arabic" ? "نعم" : "Yes"}
						</label>
						<label className='block ml-1 '>
							<input
								type='checkbox'
								id='one'
								onChange={() =>
									setExtraData({ ...extraData, cashPayment: false })
								}
								value={extraData.cashPayment}
								className='my-3 mx-1'
								checked={!extraData.cashPayment}
							/>
							{language === "Arabic" ? "لا" : "No"}
						</label>
					</div>

					<div className='mb-3 col-md-3'>
						<label className='mr-1' style={{ fontWeight: "bold" }}>
							{language === "Arabic" ? "قبول البطاقات؟" : "Accept Cards?"}
						</label>

						<label className='block'>
							<input
								type='checkbox'
								id='one'
								onChange={() =>
									setExtraData({ ...extraData, visaPayment: true })
								}
								value={extraData.visaPayment}
								className='my-3 mx-1'
								checked={extraData.visaPayment}
							/>
							{language === "Arabic" ? "نعم" : "Yes"}
						</label>
						<label className='block ml-1 '>
							<input
								type='checkbox'
								id='one'
								onChange={() =>
									setExtraData({ ...extraData, visaPayment: false })
								}
								value={extraData.visaPayment}
								className='my-3 mx-1'
								checked={!extraData.visaPayment}
							/>
							{language === "Arabic" ? "لا" : "No"}
						</label>
					</div>

					<div className='mb-3 col-md-3'>
						<label className='mr-1' style={{ fontWeight: "bold" }}>
							{language === "Arabic" ? "موقف سيارات؟" : "Parking Lot?"}
						</label>

						<label className='block'>
							<input
								type='checkbox'
								id='one'
								onChange={() => setExtraData({ ...extraData, parking: true })}
								value={extraData.parking}
								className='my-3 mx-1'
								checked={extraData.parking}
							/>
							{language === "Arabic" ? "نعم" : "Yes"}
						</label>
						<label className='block ml-1 '>
							<input
								type='checkbox'
								id='one'
								onChange={() => setExtraData({ ...extraData, parking: false })}
								value={extraData.parking}
								className='my-3 mx-1'
								checked={!extraData.parking}
							/>
							{language === "Arabic" ? "لا" : "No"}
						</label>
					</div>

					<div className='mb-3 col-md-3'>
						<label className='mr-1' style={{ fontWeight: "bold" }}>
							{language === "Arabic" ? "تكييف الهواء؟" : "Air Condition?"}
						</label>

						<label className='block'>
							<input
								type='checkbox'
								id='one'
								onChange={() =>
									setExtraData({ ...extraData, airConditioned: true })
								}
								value={extraData.airConditioned}
								className='my-3 mx-1'
								checked={extraData.airConditioned}
							/>
							{language === "Arabic" ? "نعم" : "Yes"}
						</label>
						<label className='block ml-1 '>
							<input
								type='checkbox'
								id='one'
								onChange={() =>
									setExtraData({ ...extraData, airConditioned: false })
								}
								value={extraData.airConditioned}
								className='my-3 mx-1'
								checked={!extraData.airConditioned}
							/>
							{language === "Arabic" ? "لا" : "No"}
						</label>
					</div>

					<div className='col-md-4 mx-auto'>
						<div className='form-group'>
							<label className='text-muted'>
								{language === "Arabic"
									? "كم عدد الفروع؟"
									: "How Many Branches?"}
							</label>
							<input
								type='number'
								className='form-control'
								onChange={(e) =>
									setExtraData({ ...extraData, branchesCount: e.target.value })
								}
								value={extraData.branchesCount}
								placeholder={
									language === "Arabic" ? "عدد الفروع" : "How Many Branches"
								}
							/>
						</div>
					</div>

					<div className='col-md-4 mx-auto'>
						<div className='form-group'>
							<label className='text-muted'>
								{language === "Arabic"
									? "كم عدد الموظفين؟"
									: "How Many Employees?"}
							</label>
							<input
								type='number'
								className='form-control'
								onChange={(e) =>
									setExtraData({ ...extraData, stylistsCount: e.target.value })
								}
								value={extraData.stylistsCount}
								placeholder={
									language === "Arabic" ? "عدد الموظفين" : "How Many Employees"
								}
							/>
						</div>
					</div>

					<div className='col-md-4 mx-auto'>
						<div className='form-group'>
							<label className='text-muted'>
								{language === "Arabic" ? "كم عدد الكراسي؟" : "How Many Chairs?"}
							</label>
							<input
								type='number'
								className='form-control'
								onChange={(e) =>
									setExtraData({ ...extraData, chairsCount: e.target.value })
								}
								value={extraData.chairsCount}
								placeholder='Chairs Count'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='form-group'>
				<label className='text-muted'>
					{language === "Arabic"
						? "أضف التواريخ التي تكون فيها المتجر مغلقًا (مثل العطلات، يوم العمل، وما إلى ذلك)؟"
						: "Add dates your store is closed (e.g. Holidays, labor day, etc...)"}
				</label>
				<br />
				<DatePicker
					className='inputFieldsFirstAvail'
					onChange={(date) =>
						setOneDateStoreOff(date || new Date(date._d).toLocaleDateString())
					}
					disabledDate={disabledDate}
					max
					showToday={true}
					// defaultValue={moment()}
					placeholder='Please pick the desired store closing date'
				/>
				<div className='ml-5 mb-3'>
					<button
						onClick={pushToAllDates}
						className='btn btn-outline-info mb-3  ml-5'
					>
						{language === "Arabic" ? "إضافة التاريخ" : "Add Date"}
					</button>
				</div>
			</div>

			<div>
				{datesStoreClosed && datesStoreClosed.length > 0 ? (
					<strong>
						{language === "Arabic" ? "التواريخ المضافة:" : "Added Dates:"}
					</strong>
				) : (
					<strong>
						{language === "Arabic" ? "لا يوجد تواريخ مضافة" : "No Dates Added"}
					</strong>
				)}
				<ul>
					{datesStoreClosed &&
						datesStoreClosed.length > 0 &&
						datesStoreClosed.map((i, e) => (
							<li
								className='mb-1'
								style={{
									listStyle: "none",
									marginLeft: "20px",
									fontSize: "12px",
								}}
								key={e}
							>
								{new Date(i).toDateString()}
								<span
									className='ml-2 removeButton'
									onClick={() => removeDay(e)}
									style={{ cursor: "pointer", fontWeight: "bolder" }}
								>
									X
								</span>
							</li>
						))}
				</ul>
			</div>

			<div className='ml-2 mb-3 col-md-8 mx-auto'>
				<button
					onClick={() => setClickedMenu("Awards")}
					className='btn btn-primary btn-block mb-3 '
				>
					{language === "Arabic" ? "إضافة الجوائز" : "Add Awards"}
				</button>
			</div>
		</Adding2DaysClosedWrapper>
	);
};

export default Adding2DaysClosed;

const Adding2DaysClosedWrapper = styled.div`
	overflow: hidden;
	margin-top: 50px;
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	width: 1200px !important;

	.inputFieldsFirstAvail {
		padding-top: 9px;
		padding-bottom: 9px;
		border: #cfcfcf solid 1px;
		border-radius: 4px !important;
		width: 50%;
		font-size: 0.8rem;
		/* box-shadow: 2px 2px 2px 2px rgb(0, 0, 0, 0.2); */
		margin-bottom: 15px;
	}

	.removeButton {
		border: 1px solid darkgrey;
		border-radius: 10px;
	}

	@media (max-width: 1000px) {
		width: 100% !important;
	}
`;
