import React from "react";
import styled from "styled-components";

const AddEmpSection3 = ({
	handleQueryChange,
	handleQueryChange_WorkingHours,
	handleQueryChange_Services,
	AllWorkingHours,
	allServices,
	loading,
	query4,
	query,
	query2,
}) => {
	return (
		<AddEmpSection3Wrapper>
			<div className='w-100'>
				<label>Please Select Working Days</label>
				<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
					<label htmlFor='one' className='block '>
						<input
							type='checkbox'
							id='one'
							onChange={handleQueryChange}
							value='Saturday'
							className='m-3'
							checked={query && query.indexOf("Saturday") !== -1}
						/>
						Saturday
					</label>
					<label htmlFor='two' className='block'>
						<input
							type='checkbox'
							id='two'
							onChange={handleQueryChange}
							value='Sunday'
							className='m-3'
							checked={query && query.indexOf("Sunday") !== -1}
						/>
						Sunday
					</label>
					<label htmlFor='three' className='block'>
						<input
							type='checkbox'
							id='three'
							onChange={handleQueryChange}
							value='Monday'
							className='m-3'
							checked={query && query.indexOf("Monday") !== -1}
						/>
						Monday
					</label>
					<label htmlFor='four' className='block'>
						<input
							type='checkbox'
							id='four'
							onChange={handleQueryChange}
							value='Tuesday'
							className='m-3'
							checked={query && query.indexOf("Tuesday") !== -1}
						/>
						Tuesday
					</label>
					<label htmlFor='five' className='block'>
						<input
							type='checkbox'
							id='five'
							onChange={handleQueryChange}
							value='Wednesday'
							className='m-3'
							checked={query && query.indexOf("Wednesday") !== -1}
						/>
						Wednesday
					</label>
					<label htmlFor='six' className='block'>
						<input
							type='checkbox'
							id='six'
							onChange={handleQueryChange}
							value='Thursday'
							className='m-3'
							checked={query && query.indexOf("Thursday") !== -1}
						/>
						Thursday
					</label>
					<label htmlFor='seven' className='block'>
						<input
							type='checkbox'
							id='seven'
							onChange={handleQueryChange}
							value='Friday'
							className='m-3'
							checked={query && query.indexOf("Friday") !== -1}
						/>
						Friday
					</label>
				</div>
			</div>
			<hr />
			<label>Please Select Stylist Working Hours</label>
			<div className='w-100'>
				<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
					{AllWorkingHours &&
						AllWorkingHours.sort() &&
						!loading &&
						AllWorkingHours.sort().map((h) => {
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
			</div>
			<hr />
			<label>Please Select Services Stylist Can do</label>
			<div className='w-100'>
				<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
					{allServices &&
						allServices.map((s, i) => {
							return (
								<span key={i} className='m-1 p-1'>
									<label
										htmlFor={i}
										className='block '
										style={{fontSize: "0.75rem"}}
									>
										<input
											type='checkbox'
											id={i}
											onChange={handleQueryChange_Services}
											value={s._id}
											className='m-3'
											checked={query2 && query2.indexOf(s._id) !== -1}
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
		</AddEmpSection3Wrapper>
	);
};

export default AddEmpSection3;

const AddEmpSection3Wrapper = styled.div`
	background-color: white;
	padding: 10px;
`;
