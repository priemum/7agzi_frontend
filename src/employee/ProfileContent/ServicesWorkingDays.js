import React from "react";
import styled from "styled-components";

const ServicesWorkingDays = ({
	AllWorkingHours,
	AllServices,
	handleQueryChange,
	handleQueryChange_WorkingHours,
	handleQueryChange_Services,
	loading,
	employeeProfile,
}) => {
	return (
		<ServicesWorkingDaysWrapper>
			<div className='text-center'>
				<label style={{fontSize: "0.94rem"}}>Please Update Services</label>
			</div>

			<div className='w-100'>
				<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
					{AllServices &&
						AllServices.map((s, i) => {
							return (
								<span key={i} className='m-1 p-1'>
									<label
										htmlFor={i}
										className='block '
										style={{fontSize: "0.85rem"}}
									>
										<input
											type='checkbox'
											id={i}
											onChange={handleQueryChange_Services}
											value={s._id}
											className='m-3'
											checked={employeeProfile.services.indexOf(s._id) !== -1}
										/>
										<span style={{textTransform: "capitalize"}}>
											{s.customerType} / {s.serviceName}
										</span>
									</label>
								</span>
							);
						})}
				</div>
			</div>
			<div className='w-100 mt-4'>
				<div style={{fontSize: "0.94rem", textAlign: "center"}}>
					<label>Please Update Working Days</label>
				</div>

				<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center p-1'>
					<label htmlFor='one' className='block ' style={{fontSize: "0.85rem"}}>
						<input
							type='checkbox'
							id='one'
							onChange={handleQueryChange}
							value='Saturday'
							className='m-3'
							checked={
								employeeProfile &&
								employeeProfile.workingDays &&
								employeeProfile.workingDays[0] &&
								employeeProfile.workingDays.indexOf("Saturday") !== -1
							}
						/>
						Saturday
					</label>
					<label htmlFor='two' className='block' style={{fontSize: "0.85rem"}}>
						<input
							type='checkbox'
							id='two'
							onChange={handleQueryChange}
							value='Sunday'
							className='m-3'
							checked={
								employeeProfile &&
								employeeProfile.workingDays &&
								employeeProfile.workingDays[0] &&
								employeeProfile.workingDays.indexOf("Sunday") !== -1
							}
						/>
						Sunday
					</label>
					<label
						htmlFor='three'
						className='block'
						style={{fontSize: "0.85rem"}}
					>
						<input
							type='checkbox'
							id='three'
							onChange={handleQueryChange}
							value='Monday'
							className='m-3'
							checked={
								employeeProfile &&
								employeeProfile.workingDays &&
								employeeProfile.workingDays[0] &&
								employeeProfile.workingDays.indexOf("Monday") !== -1
							}
						/>
						Monday
					</label>
					<label htmlFor='four' className='block' style={{fontSize: "0.85rem"}}>
						<input
							type='checkbox'
							id='four'
							onChange={handleQueryChange}
							value='Tuesday'
							className='m-3'
							checked={
								employeeProfile &&
								employeeProfile.workingDays &&
								employeeProfile.workingDays[0] &&
								employeeProfile.workingDays.indexOf("Tuesday") !== -1
							}
						/>
						Tuesday
					</label>
					<label htmlFor='five' className='block' style={{fontSize: "0.85rem"}}>
						<input
							type='checkbox'
							id='five'
							onChange={handleQueryChange}
							value='Wednesday'
							className='m-3'
							checked={
								employeeProfile &&
								employeeProfile.workingDays &&
								employeeProfile.workingDays[0] &&
								employeeProfile.workingDays.indexOf("Wednesday") !== -1
							}
						/>
						Wednesday
					</label>
					<label htmlFor='six' className='block' style={{fontSize: "0.85rem"}}>
						<input
							type='checkbox'
							id='six'
							onChange={handleQueryChange}
							value='Thursday'
							className='m-3'
							checked={
								employeeProfile &&
								employeeProfile.workingDays &&
								employeeProfile.workingDays[0] &&
								employeeProfile.workingDays.indexOf("Thursday") !== -1
							}
						/>
						Thursday
					</label>
					<label
						htmlFor='seven'
						className='block'
						style={{fontSize: "0.85rem"}}
					>
						<input
							type='checkbox'
							id='seven'
							onChange={handleQueryChange}
							value='Friday'
							className='m-3'
							checked={
								employeeProfile &&
								employeeProfile.workingDays &&
								employeeProfile.workingDays[0] &&
								employeeProfile.workingDays.indexOf("Friday") !== -1
							}
						/>
						Friday
					</label>
				</div>
			</div>
			<div className='text-center mt-4'>
				<label>Update Your Working Hours</label>
			</div>
			<div className='w-100'>
				<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
					{AllWorkingHours &&
						!loading &&
						AllWorkingHours.map((h) => {
							return (
								<span key={h} className='m-1 p-1'>
									<label htmlFor={h} className='block '>
										<input
											type='checkbox'
											id={h}
											onChange={handleQueryChange_WorkingHours}
											value={h}
											className='m-3'
											checked={
												employeeProfile &&
												employeeProfile.workingHours &&
												employeeProfile.workingHours.indexOf(h) !== -1
											}
										/>
										{h}
									</label>
								</span>
							);
						})}
				</div>
			</div>
		</ServicesWorkingDaysWrapper>
	);
};

export default ServicesWorkingDays;

const ServicesWorkingDaysWrapper = styled.div``;
