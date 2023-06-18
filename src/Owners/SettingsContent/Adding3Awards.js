import styled from "styled-components";

const Adding3Awards = ({
	loyaltyPointsAward,
	setLoyaltyPointsAward,
	discountPercentage,
	setDiscountPercentage,
	onlineServicesFees,
	setOnlineServicesFees,
	alreadySetLoyaltyPointsManagement,
	clickSubmit,
	setClickedMenu,
}) => {
	const handleChange1 = (e) => {
		setLoyaltyPointsAward(e.target.value);
	};
	const handleChange2 = (e) => {
		setDiscountPercentage(e.target.value);
	};
	const handleChange3 = (e) => {
		setOnlineServicesFees(e.target.value);
	};

	return (
		<Adding3AwardsWrapper>
			<div className='col-md-10 mx-auto'>
				<div className='form-group'>
					<label className='text-muted'>Loyalty Points To Award</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange1}
						value={loyaltyPointsAward}
						placeholder='Number of points so you can award the customer with a specific %'
						required
					/>
				</div>
			</div>

			<div className='col-md-10 mx-auto'>
				<div className='form-group'>
					<label className='text-muted'>
						Loyalty Points Discount Percentage
					</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange2}
						value={discountPercentage}
						placeholder='Percentage to be discounted from the user total if reached to the required points e.g. 10% will be added as 10'
						required
					/>
				</div>
			</div>

			<div className='col-md-12 mx-auto mt-5'>
				<div className='form-group'>
					<label className='text-muted'>Online Services Fees (Flat Fee)</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange3}
						value={onlineServicesFees}
						placeholder='Online Services fee is the fee charged on scheduling online to your clients. You will get this money (e.g. 25 cents will be added as "0.25")'
					/>
				</div>
			</div>

			{/* <div className='ml-2 mb-3 col-md-8 mx-auto'>
				<button
					onClick={() => clickSubmit()}
					className='btn btn-outline-success btn-block mb-3 '
				>
					Submit Settings
				</button>
			</div> */}
			<div className='ml-2 mb-3 col-md-8 mx-auto'>
				<button
					onClick={() => setClickedMenu("WorkingHours")}
					className='btn btn-primary btn-block mb-3 '
				>
					Add Active Working Hours
				</button>
			</div>
		</Adding3AwardsWrapper>
	);
};

export default Adding3Awards;

const Adding3AwardsWrapper = styled.div`
	overflow: hidden;
	margin-left: 230px;
	margin-top: 50px;
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	width: 900px !important;
`;
