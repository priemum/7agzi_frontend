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
	activeWhatsAppNotification,
	setActiveWhatsAppNotification,
	language,
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
					<label className='text-muted'>
						{language === "Arabic"
							? "نقاط الولاء للمكافأة"
							: "Loyalty Points To Award"}
					</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange1}
						value={loyaltyPointsAward}
						placeholder={
							language === "Arabic"
								? "عدد النقاط التي يتم منحها للعميل مقابل النسبة المحددة"
								: "Number of points to award the customer with a specific %"
						}
						required
					/>
				</div>
			</div>

			<div className='col-md-10 mx-auto'>
				<div className='form-group'>
					<label className='text-muted'>
						{language === "Arabic"
							? "نسبة الخصم بناءً على نقاط الولاء"
							: "Loyalty Points Discount Percentage"}
					</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange2}
						value={discountPercentage}
						placeholder={
							language === "Arabic"
								? "النسبة المئوية التي سيتم خصمها من إجمالي المستخدم إذا تم الوصول إلى النقاط المطلوبة مثلاً 10٪ سيتم إضافة 10"
								: "Percentage to be discounted from the user total if reached to the required points e.g. 10% will be added as 10"
						}
						required
					/>
				</div>
			</div>

			<div className='col-md-10 mx-auto'>
				<div className='form-group form-check'>
					<label className='form-check-label' htmlFor='whatsAppNotification'>
						{language === "Arabic"
							? "هل ترغب في تلقي إشعارات WhatsApp؟"
							: "Would You Like To Get WhatsApp Notifications?"}
					</label>
					<label className='form-check-label ml-2'>
						<strong>{language === "Arabic" ? "نعم" : "YES"}</strong>
						<input
							type='checkbox'
							className='form-check-input ml-1'
							id='whatsAppNotification'
							onChange={(e) => setActiveWhatsAppNotification(e.target.checked)}
							checked={activeWhatsAppNotification}
						/>
					</label>
				</div>
			</div>

			<div className='col-md-12 mx-auto mt-5'>
				<div className='form-group'>
					<label className='text-muted'>
						{language === "Arabic"
							? "رسوم الخدمات الإلكترونية (رسوم ثابتة)"
							: "Online Services Fees (Flat Fee)"}
					</label>
					إ
					<input
						type='number'
						className='form-control'
						onChange={handleChange3}
						value={onlineServicesFees}
						placeholder={
							language === "Arabic"
								? "رسوم الخدمات الإلكترونية (رسوم ثابتة)"
								: "Online Services Fees (Flat Fee)"
						}
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
					{language === "Arabic"
						? "إضافة ساعات العمل النشطة"
						: "Add Active Working Hours"}
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
