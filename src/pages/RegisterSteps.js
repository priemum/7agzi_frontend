/** @format */

import React from "react";
import styled from "styled-components";
// import ReactGA from "react-ga";
import Helmet from "react-helmet";
import StepsHeroComp from "../components/OtherHeroComp/StepsHeroComp";
import StepsHeroFooter from "../components/OtherHeroComp/StepsHeroFooter";
import IconStep1 from "../Images/IconStep1.png";
import IconStep2 from "../Images/IconStep2.png";
import IconStep3 from "../Images/IconStep3.png";

const RegisterSteps = ({ language }) => {
	// useEffect(() => {
	// 	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
	// 	// To Report Page View
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// 	// eslint-disable-next-line
	// }, []);

	return (
		<RegisterStepsWrapper dir={language === "Arabic" ? "rtl" : "ltr"}>
			<Helmet dir={language === "Arabic" ? "rtl" : "ltr"}>
				<meta charSet='utf-8' />
				{language === "Arabic" ? (
					<title dir='rtl'>إكس لوك | خطوات التسجيل</title>
				) : (
					<title>XLOOK | Registration Steps</title>
				)}

				<meta
					name='description'
					content={
						language === "Arabic"
							? `سارع بالتسجيل الآن! لا تفوت الفرصة لعرض نفسك ببراعة أمام مئات الآلاف من الأفراد حول مركز التجميل الخاص بك. Powered By https://infinite-apps.com`
							: `Hurry up and register now! Don't miss the opportunity to showcase yourself brilliantly in front of hundreds of thousands of individuals around your beauty center. Powered By https://infinite-apps.com`
					}
				/>

				<link rel='canonical' href='https://www.xlookpro.com/steps' />
			</Helmet>
			<div className='my-3 text-center'>
				{language === "Arabic" ? (
					<h1 className='m-0'>خطوات التسجيل</h1>
				) : (
					<h1 className='m-0'>Registration Steps</h1>
				)}
				<span>
					<strong>
						{language === "Arabic" ? (
							<div style={{ color: "darkred" }}>
								لأصحاب الصالونات ومراكز التجميل
							</div>
						) : (
							<div style={{ color: "darkred" }}>
								For Salon Owners and Beauty Centers
							</div>
						)}
					</strong>
				</span>
			</div>
			<div className='mb-5'>
				<StepsHeroComp language={language} />
			</div>
			<div
				className='container'
				dir={language === "Arabic" ? "rtl" : "ltr"}
				style={{ textAlign: language === "Arabic" ? "right" : "" }}
			>
				<h2 className='beforeRegis'>
					{language === "Arabic"
						? "أولا ما قبل التسجيل"
						: "First, what is required before registration"}
				</h2>
				<p>
					{language === "Arabic" ? (
						<p>
							طبعًا بيشرفنا وجودك كشريك في منصة <strong>XLOOK</strong> كعضو نشط.
							<ul className='mr-4'>
								<li>
									من أهم مراحل الشراكة هي مرحلة التسجيل والتي تحتاج إلى بعض
									الدقة والصبر في إدخال بيانات الحساب وقد يحتاج صاحب الحساب إلى
									الدعم أثناء مرحلة التسجيل
								</li>
								<li>
									وعشان نضمن إنك بتدير حسابك بأحسن طريقة، خصصنالك مدير عملاء من{" "}
									<strong>XLOOK</strong> بحيث يقدر يوجهك أثناء عملية تسجيل
									وإعداد حسابك بأحسن طريقة.
								</li>
							</ul>
						</p>
					) : (
						<p>
							We are delighted to have you as a partner on the{" "}
							<strong>XLOOK</strong> platform as an active member!
							<ul className='ml-4'>
								<li>
									One of the most important stages of the partnership is the
									registration phase, which requires precision when entering the
									account setup information. The account owner may need support
									during the registration process.
								</li>
								<li>
									To ensure you manage your account in the best way possible, we
									assign an <strong>XLOOK</strong> Account Manager who can guide
									you during the registration and account setup process.
								</li>
							</ul>
						</p>
					)}
				</p>
				<div className='mt-5 accountManagerSection'>
					{language === "Arabic" ? (
						<>
							<h3 style={{ color: "white" }}>من هو مدير العملاء؟</h3>

							<p style={{ color: "white" }}>
								مدير العملاء هو الشخص المسؤول والمدرب الذي يتمتع بخبرة ومعرفة
								تامة بجميع جوانب وتقنيات التطبيق. و قد تم إعداد مدير العملاء
								ليكون رفيق العمل والمساعد لأصحاب الحسابات في الصالونات و البيوتى
								سنتر.
							</p>
							<p style={{ color: "white" }}>
								سيقوم مدير العملاء بمتابعة حسابك لابقائك دائما على خط المنافسة و
								التاكد من ظهورك للالاف من هم فى منطقتك يوميا.
							</p>
							<p style={{ color: "white" }}>
								يكون مدير العملاء دائما فى جانب صاحب الحساب و من اهم مهماته هى
								الاعتناء بحسابك و التاكد من تطوره الدائم و نجاحه.
							</p>
							<p style={{ color: "white" }}>
								من أهم ما يميز <strong>XLOOK</strong> هو خاصية التسويق المقدمة
								كهدية مجانية لجميع حسابات الصالونات و مراكز التجميل المفعلة على
								المنصة.
							</p>
							<p style={{ color: "white" }}>
								{" "}
								يمكنك العثور على قائمة بمديري الحسابات المعتمدين لدينا، حيث
								يمكنك اختيار المدير الأقرب إليك أثناء عملية التسجيل.
							</p>
						</>
					) : (
						<>
							<h3 style={{ color: "white" }}>Who is the Account Manager?</h3>

							<p style={{ color: "white" }}>
								The Account Manager is a trained person who is familiar with all
								the intricacies and techniques of the application. The Account
								Manager is there to assist and support account owners.
							</p>
							<p style={{ color: "white" }}>
								One of the key features of <strong>XLOOK</strong> is the
								marketing feature provided as a free gift to all activated salon
								and beauty center accounts on the platform. The Account Manager
								will monitor your account to keep you competitive and ensure
								your visibility to thousands of people in your area on a daily
								basis.
							</p>
							<p style={{ color: "white" }}>
								The Account Manager is always by your side, and their main tasks
								include taking care of your account and ensuring its continuous
								development and success.
							</p>
							<p style={{ color: "white" }}>
								You can find a list of our certified Account Managers. Choose
								the one closest to you during the registration process.
							</p>
						</>
					)}
				</div>

				<div className='mt-5'>
					{language === "Arabic" ? (
						<>
							<h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
								خطوات التسجيل{" "}
							</h3>
							<div style={{ fontWeight: "bolder" }} className='mt-4'>
								<h4
									dir='rtl'
									style={{
										fontWeight: "bolder",
										backgroundImage: `url(${IconStep1})`,
										backgroundRepeat: "no-repeat",
										backgroundSize: "contain",
										padding: "20px",
										color: "black",
										minHeight: "130px",
										backgroundPosition: "right bottom",
									}}
								>
									<div className='longH4Arabic mt-5 mr-5'>ملئ طلب التسجيل </div>
								</h4>
								<p>
									مع <strong>XLOOK</strong> يقوم صاحب الصالون او مركز التجميل
									بملىء طلب” فتح حساب” صالون جديد على <strong>XLOOK</strong> من
									خلال ملىء “نموذج التسجيل الشركاء”, مع التاكد من ان كل البيانات
									صحيحة مع العلم ان اى اختلاف فى البيانات المدخلة عن البيانات
									الصحيحة سوف تحدث مشكلة فى مرحلة التحويلات المالية.
								</p>
							</div>
							<div>
								<h4
									dir='rtl'
									style={{
										fontWeight: "bolder",
										backgroundImage: `url(${IconStep2})`,
										backgroundRepeat: "no-repeat",
										backgroundSize: "contain",
										padding: "20px",
										color: "black",
										minHeight: "130px",
										backgroundPosition: "right bottom",
									}}
								>
									{" "}
									<div className='longH4Arabic mt-5 mr-5'>
										تجهيز الحساب{" "}
									</div>{" "}
								</h4>
								<p>
									بعد ملىء طلب التسجيل سيتم التواصل معاك من خلال الهاتف فى فترة
									لن تتعدى ال24 ساعة لإكمال باقى البيانات المطلوبة. و إن لم يتم
									التواصل معك, يرجى التواصل مع رقم خدمة العملاء ما بعد التسجيل
									على رقم 01098168674 من خلال الواتس أب.
									<ul className='mr-4'>
										<li>
											- يجب ان تكون لديك البيانات الأتية للتاكد من تسجيل سريع.
										</li>
										<li>لوجو الصالون او صورة للمحل باليافطة.</li>
										<li>
											صورة بطاقة الرقم القومى صاحب الصالون او البيوتى سنتر.
										</li>
										<li>بريد اليكترونى للتسجيل و رقم موبايل عليه واتس أب.</li>
									</ul>
								</p>
							</div>

							<div>
								<h4
									dir='rtl'
									style={{
										fontWeight: "bolder",
										backgroundImage: `url(${IconStep3})`,
										backgroundRepeat: "no-repeat",
										backgroundSize: "contain",
										padding: "20px",
										color: "black",
										minHeight: "130px",
										backgroundPosition: "right bottom",
									}}
								>
									<div className='longH4Arabic mt-5 mr-5'>
										مراجعة و تفعيل الحساب
									</div>
								</h4>
								<div>
									بعد إنهاء إدخال كافة البيانات المطلوبة, سيقوم فريق العمل
									بمراجعة بياناتكم و سيتم تفعيل حسابكم خلال يومين عمل.
									<br />
									وفى حالة وجود اى اعادة ادخال لبعض البيانات سيتم اخباركم من
									خلال مدير العملاء المسؤول عن حسابكم.
								</div>
							</div>
						</>
					) : (
						<>
							<h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
								The Registration Steps
							</h3>
							<div className='mt-4'>
								<h4
									style={{
										fontWeight: "bolder",
										backgroundImage: `url(${IconStep1})`,
										backgroundRepeat: "no-repeat",
										backgroundSize: "contain",
										padding: "20px",
										color: "black",
										minHeight: "130px",
									}}
								>
									<div className='longH4 mt-5 ml-5'>
										Filling out the registration form
									</div>
								</h4>
								<p>
									With <strong>XLOOK</strong>, salon owners or beauty center
									owners can fill out a "New Salon Account" request on{" "}
									<strong>XLOOK</strong> by completing the "Business Partner
									Registration Form."
									<br />
									<strong style={{ fontSize: "13px" }}>
										It is important to ensure all information is entered
										correctly. Discrepancies between the entered data and the
										correct data can cause issues during the financial
										transactions phase.
									</strong>
								</p>
							</div>
							<div>
								<h4
									style={{
										fontWeight: "bolder",
										backgroundImage: `url(${IconStep2})`,
										backgroundRepeat: "no-repeat",
										backgroundSize: "contain",
										padding: "20px",
										color: "black",
										minHeight: "140px",
									}}
								>
									{" "}
									<div className='mt-5 ml-5 longH4'>
										Account Preparation
									</div>{" "}
								</h4>
								<p>
									After completing the registration form, we will contact you by
									phone within 24 hours to finish the remaining information that
									is required. If you are not contacted, please contact customer
									service after registration at the following WhatsApp number:
									01098168674.
									<ul className='ml-4'>
										<li>
											You must have the following data to ensure quick
											registration.
										</li>
										<li>Salon logo or a picture of the store sign.</li>
										<li>
											Copy of the National ID of the salon owner or beauty
											center. This information is not shared.
										</li>
										<li>
											An email address for registration and a mobile number with
											WhatsApp.
										</li>
									</ul>
								</p>
							</div>

							<div>
								<h4
									style={{
										fontWeight: "bolder",
										backgroundImage: `url(${IconStep3})`,
										backgroundRepeat: "no-repeat",
										backgroundSize: "contain",
										padding: "20px",
										color: "black",
										minHeight: "130px",
									}}
								>
									<div className='mt-5 ml-5 longH4'>
										{" "}
										Account Review and Activation
									</div>
								</h4>
								<div>
									After entering all the required information, our team will
									review and confirm your data. Your account will be activated
									within two working days.
									<br />
									If any information needs to be re-entered, this may delay to
									activation of your account. You will be informed by your
									account manager responsible for your account to make any
									corrections needed.
								</div>
							</div>
						</>
					)}
				</div>
			</div>

			<div className='mb-5 mt-3'>
				<StepsHeroFooter language={language} />
			</div>
		</RegisterStepsWrapper>
	);
};

export default RegisterSteps;

const RegisterStepsWrapper = styled.section`
	padding-bottom: 100px;
	overflow: hidden;
	min-height: 1000px;
	color: black;
	background-color: white;

	.horizLine {
		border-bottom: #ffb2b2 solid 5px !important;
	}

	h1 {
		font-weight: bolder;
		font-size: 1.7rem;
		color: black;
	}

	h2 {
		font-weight: bolder;
		font-size: 1.3rem;
		color: #8b0000;
		text-align: center;
	}

	.beforeRegis {
		font-size: 1.5rem;
		color: black;
		font-weight: bolder;
		width: 100%;
	}

	p {
		font-size: 1rem;
		color: black;
	}

	li {
		font-size: 1rem;
		color: black;
	}

	.imageWrapper {
		text-align: center;
		margin: auto;
	}

	.iconImage {
		width: 50%;
	}

	.accountManagerSection {
		background-color: #be0000;
		color: white;
		padding: 10px;
		border-radius: 5px;
	}

	@media (max-width: 1000px) {
		.iconImage {
			width: 60%;
		}

		.longH4 {
			font-size: 1.3rem !important;
			margin-top: 60px !important;
			margin-left: 70px !important;
		}

		.longH4Arabic {
			font-size: 1.5rem !important;
			margin-top: 60px !important;
			margin-right: 70px !important;
		}
	}
`;
