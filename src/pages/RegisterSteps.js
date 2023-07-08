/** @format */

import React from "react";
import styled from "styled-components";
// import ReactGA from "react-ga";
import Helmet from "react-helmet";
import StepsHeroComp from "../components/OtherHeroComp/StepsHeroComp";

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
								لأصحاب صالونات التجميل ومراكز الجمال
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
						? "أولاً، قبل التسجيل"
						: "Firstly, Before Registeration"}
				</h2>
				<p>
					{language === "Arabic" ? (
						<p>
							طبعًا بيشرفنا وجودك كشريك في منصة XLOOK كعضو نشط.
							<ul className='mr-4'>
								<li>
									من أهم مراحل الشراكة هي مرحلة التسجيل والتي تحتاج إلى بعض
									الدقة والصبر في إدخال بيانات الحساب وقد يحتاج صاحب الحساب إلى
									الدعم أثناء مرحلة التسجيل
								</li>
								<li>
									وعشان نضمن إنك بتدير حسابك بأحسن طريقة، خصصنالك مدير عملاء من
									XLOOK بحيث يقدر يوجهك أثناء عملية تسجيل وإعداد حسابك بأحسن
									طريقة.
								</li>
							</ul>
						</p>
					) : (
						<p>
							Of course, we are delighted to have you as a partner on the XLOOK
							platform as an active member.
							<ul className='ml-4'>
								<li>
									One of the most important stages of the partnership is the
									registration phase, which requires precision and patience in
									entering the account information. The account owner may need
									support during the registration process.
								</li>
								<li>
									To ensure that you manage your account in the best way
									possible, we have assigned a customer manager from XLOOK who
									can guide you during the registration and account setup
									process.
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
								مدير العملاء هو شخص مدرب و على دراية بكل خبايا و تقنيات
								الابليكيشن و قد تم إعداد الاكونت مانجر ليكون عونا و رفيق عمل
								لاصحاب حسابات
							</p>
							<p style={{ color: "white" }}>
								من أهم ما يميز XLOOK هو خاصية التسويق المقدمة كهدية مجانية لجميع
								حسابات الصالونات و مراكز التجميل المفعلة على المنصة. سيقوم مدير
								العملاء بمتابعة حسابك لابقائك دائما على خط المنافسة و التاكد من
								ظهورك للالاف من هم فى منطقتك يوميا.
							</p>
							<p style={{ color: "white" }}>
								يكون مدير العملاء دائما فى جانب صاحب الحساب و من اهم مهماته هى
								الاعتناء بحسابك و التاكد من تطوره الدائم و نجاحه.
							</p>
							<p style={{ color: "white" }}>
								يمكنكم إيجاد قائمة بمدراء الحسابات المعتمدين لدينا. قم بإختيار
								الاقرب اليك أثناء عملية التسجيل.
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
								One of the key features of XLOOK is the marketing feature
								provided as a free gift to all activated salon and beauty center
								accounts on the platform. The Account Manager will monitor your
								account to keep you competitive and ensure your visibility to
								thousands of people in your area on a daily basis.
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
							<h3>خطوات التسجيل </h3>

							<p>
								مع XLOOK يقوم صاحب الصالون او مركز التجميل بملىء طلب فتح حساب
								صالون جديد على XLOOK من خلال ملىء نموذج التسجيل الشركاء, مع
								التاكد من ان كل البيانات صحيحة مع العلم ان اى اختلاف فى البيانات
								المدخلة عن البيانات الصحيحة هتكون مشكلة فى مرحلة التحويلات
								المالية.
							</p>
						</>
					) : (
						<>
							<h3>Registration Steps</h3>

							<p>
								With XLOOK, salon owners and beauty center owners fill out a
								request to open a new salon account on XLOOK by completing the
								partner registration form, ensuring that all the data entered is
								accurate. It is important to note that any discrepancy in the
								entered data from the correct data may cause issues in the
								financial transfer stage.
							</p>
						</>
					)}
				</div>

				<div className='mt-5'>
					{language === "Arabic" ? (
						<>
							<h3>تجهيز الحساب</h3>

							<p>
								بعد ملىء طلب التسجيل سيتم التواصل معاك من خلال الهاتف فى فترة لن
								تتعدى ال24 ساعة لإكمال باقى البيانات المطلوبة. و إن لم يتم
								التواصل معك, يرجى التواصل مع رقم خدمة ما بعد التسجيل على رقم
								0108768686 من خلال الواتس أب.
							</p>
							<p>
								يجب ان تكون لديك البيانات الأتية للتاكد من تسجيل سريع.
								<ul className='mr-4'>
									<li>لوجو الصالون او صورة للمحل باليافطة</li>

									<li>صورة بطاقة رقم قومى صاحب الصالون او البيوتى سنتر.</li>
									<li>إيميل للتسجيل و رقم موبايل عليه واتس أب.</li>
								</ul>
							</p>
						</>
					) : (
						<>
							<h3>Account Setup</h3>

							<p>
								After submitting the registration request, we will contact you
								via phone within 24 hours to complete the remaining required
								information. If you don't receive any communication, please
								contact our post-registration support number on 0108768686 via
								WhatsApp.
							</p>
							<p>
								To ensure a quick registration process, please have the
								following information ready:
								<ul className='ml-4'>
									<li>Salon logo or a picture of the salon with a signboard</li>
									<li>
										Copy of the national ID card for the salon owner or beauty
										center owner
									</li>
									<li>
										Email address for registration and a mobile number with
										WhatsApp
									</li>
								</ul>
							</p>
						</>
					)}
				</div>

				<div className='mt-5'>
					{language === "Arabic" ? (
						<>
							<h3>مراجعة و تفعيل</h3>

							<p>
								بعد إنهاء إدخال كافة البيانات المطلوبة, سيقوم فريق العمل بمراجعة
								بياناتكم و سيتم تفعيل حسابكم خلال يومين عمل . وفى حالة وجود اى
								اعادة ادخال لبعض البيانات هيتم اخباركم من خلال مدير العملاء
								المسؤل عن حسابكم.
							</p>
						</>
					) : (
						<>
							<h3>Review and Activation</h3>

							<p>
								After completing the entry of all required information, our team
								will review your data and activate your account within two
								business days. If any data needs to be re-entered, you will be
								informed by the account manager responsible for your account.
							</p>
						</>
					)}
				</div>
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

		ul {
			margin-right: 0px !important;
			margin-left: 0px !important;
		}
	}
`;
