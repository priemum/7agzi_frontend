/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import AboutPhoto from "../imgs/traffic-3098747_1920.jpg";
// import AboutPhoto from "../Navbar/RCHDIGIMP_Logo.jpg";
// import ReactGA from "react-ga";
import Helmet from "react-helmet";
import AboutHeroComp from "../components/OtherHeroComp/AboutHeroComp";
import Icon1 from "../Images/Icon1.png";
import Icon2 from "../Images/Icon2.png";
import Icon3 from "../Images/Icon3.png";
import Icon4 from "../Images/Icon4.png";
import Icon5 from "../Images/Icon5.png";
import AboutHeroFooter from "../components/OtherHeroComp/AboutHeroFooter";
import { Link } from "react-router-dom";
import { useCartContext } from "../sidebar_context";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
import AffiliateLinks from "../components/HomePage/AffiliateLinks";
import { getAffiliates } from "../TheBoss/apiBoss";

const About = ({ language, setLanguage }) => {
	const { chosenLanguage } = useCartContext();
	const [affiliateProducts, setAffiliateProducts] = useState(null);
	const [loading2, setLoading2] = useState(true);

	const gettingAllAffiliates = () => {
		setLoading2(true);
		getAffiliates().then((data) => {
			if (data && data.error) {
				console.log("Affiliate Products Error");
			} else {
				setAffiliateProducts(data);
				setLoading2(false);
			}
		});
	};

	useEffect(() => {
		gettingAllAffiliates();
	}, []);

	return (
		<AboutPageWrapper dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
			<Helmet dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
				<meta charSet='utf-8' />
				{chosenLanguage === "Arabic" ? (
					<title dir='rtl'>اكس لوك | من نحن ولماذا اكس لوك</title>
				) : (
					<title>XLOOK | WHO & WHY XLOOK</title>
				)}
				<meta
					name='description'
					content={
						chosenLanguage === "Arabic"
							? `إكس لوك هي منصة تضم جميع صالونات الحلاقة وصالونات تجميل النساء ومراكز التجميل الموجودة في مصر.
				المنصة تقدم خدمات لجميع أفراد العائلة، بما في ذلك السيدات، الآنسات، الرجال، والأطفال، مع مجموعة متنوعة من الخدمات المقدمة.
				منصة إكس لوك تُستخدم لاختيار وحجز موعد في صالون الحلاقة أو مركز التجميل الأقرب أو الأبعد حسب موقعك.
				الزائرين يمكنهم حجز الخدمات التي تقدمها المنصة من خلال تطبيق خاص مصمم لتسجيل المستخدمين وحجز خدمات التجميل. Powered By https://infinite-apps.com`
							: `Free Barbershops & hair salons booking systems. XLOOK is a platform that includes barbershops, ladies' beauty salons, and beauty centers.
				The platform offers services for all family members, including women, girls, men, and children, with a variety of services provided.
				The XLOOK platform is used to choose and book a barbershop or beauty center appointment with the closest to the farthest offer according to your location.
				Visitors can book the services offered by the platform through a special application designed for user registration and booking beauty services. Powered By https://infinite-apps.com`
					}
				/>
				<meta
					name='keywords'
					content={
						chosenLanguage === "Arabic"
							? `إكس لوك، من نحن، لماذا إكس لوك، صالونات الحلاقة، صالونات تجميل النساء، مراكز التجميل، العائلة، حجز المواعيد، تسجيل المستخدمين`
							: `XLOOK, WHO, WHY XLOOK, barbershops, ladies' beauty salons, beauty centers, family, appointment booking, user registration`
					}
				/>
				<link rel='canonical' href='https://www.xlookpro.com/about' />
			</Helmet>

			<div className='mb-5'>
				<AboutHeroComp language={chosenLanguage} />
			</div>
			<div
				className='container'
				dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
				style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
			>
				<div
					className=''
					style={{
						backgroundColor: "#be0000",
						padding: "10px",
						borderRadius: "3px",
						color: "white",
					}}
				>
					<h1
						style={{
							color: "white",
						}}
						dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
					>
						{" "}
						<strong>
							{chosenLanguage === "Arabic"
								? "ما هو إكس لوك؟"
								: "What is XLOOK?"}
						</strong>{" "}
					</h1>
					<p
						style={{
							color: "white",
						}}
						dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
					>
						{chosenLanguage === "Arabic"
							? `إكس لوك هي منصة تضم جميع صالونات الحلاقة ومراكز الجمال والتجميل الموجودة في مصر. المنصة تقدم خدمات لجميع أفراد العائلة، بما في ذلك السيدات، الآنسات، الرجال، والأطفال، مع مجموعة متنوعة من الخدمات المقدمة. منصة إكس لوك تُستخدم لاختيار وحجز موعد في صالون الحلاقة أو مركز التجميل الأقرب أو الأبعد حسب موقعك. الزائرين يمكنهم حجز الخدمات التي تقدمها المنصة من خلال تطبيق خاص مصمم لتسجيل المستخدمين وحجز خدمات التجميل.`
							: `XLOOK is a platform for barbershops, ladies' beauty salons, and beauty centers. The platform gives users the opportunity to find a variety of services for all family members, including women, girls, men, and children. By using XLOOK, users can choose and book a an appointment with a barbershop or beauty center based on their current location. Users can book services through this special application designed for user registration and booking beauty or barber services.`}
					</p>
				</div>
				<div className='col-md-5 mx-auto mt-5 mb-3'>
					<div className='horizLine'></div>
				</div>
				<div>
					{loading2 ? null : (
						<AffiliateLinks
							affiliateProducts={affiliateProducts}
							loading={loading2}
						/>
					)}
					{/* <AdSense adSlot='5842698744' /> */}
				</div>
				<div
					className='col-md-10 mx-auto'
					dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
				>
					<h1
						className='mt-3'
						dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
					>
						{" "}
						<strong>
							{chosenLanguage === "Arabic" ? "لماذا إكس لوك؟" : "Why XLOOK?"}
						</strong>{" "}
					</h1>

					<div className='mb-2 imageWrapper'>
						<img
							className='iconImage'
							src={Icon3}
							alt={
								chosenLanguage === "Arabic"
									? "معنا ستزداد توسعاتك وفروعك."
									: "With us, your expansions and branches will increase."
							}
						/>
					</div>

					<h2>
						{chosenLanguage === "Arabic"
							? "عملاء جدد، حجوزات أكثر."
							: "New customers, more bookings"}
					</h2>
					<p>
						{chosenLanguage === "Arabic"
							? "لدينا آلاف العملاء في منطقتك ينتظرون لحجز موعد في صالونك أو مركز التجميل الخاص بك، فهو مناسب جدًا لهم. لا تتردد في الانضمام الآن."
							: "We currently have thousands of potential customers in your area actively searching for the unique and specialized services that your salon provides. By joining now, you'll tap into this extensive customer base eager to experience what your salon has to offer. This is not just an opportunity to expand your clientele but also to showcase your exceptional services to a broader audience. Sieze this chance to ensure your salon's growth and success in catering to the needs of these potential customers."}
					</p>
				</div>

				<div className='row'>
					<div className='col-md-4 mx-auto mt-5 mb-3'>
						<div className='mb-2 imageWrapper'>
							<img
								className='iconImage'
								src={Icon4}
								alt={
									chosenLanguage === "Arabic"
										? "ستكتشف حتى إذا لم تكن موقعك على الشارع الرئيسي."
										: "You'll be discovered even if your location is not on the main street"
								}
							/>
						</div>
						<h2>
							{" "}
							<strong>
								{chosenLanguage === "Arabic"
									? "زيادة مصادر الدخل."
									: "Increase income"}
							</strong>{" "}
						</h2>
						<p>
							{chosenLanguage === "Arabic"
								? "سيكون الفرق واضحًا جدًا عند مقارنة دخلك قبل الانضمام إلينا كشريك وبعد الانضمام. ستترك التسويق لنا وتقلل من النفقات على الإعلانات، وستحصل على المزيد من الحجوزات. هنا، ستكون التوفيرات من كلا الجانبين."
								: "After partnering with XLOOK, you'll see a noticeable difference in your sales. By entrusting your marketing to us, you'll cut down on advertising costs. This reduction in expenses, coupled with a boost in customer traffic, will lead to an increase in your revenue."}
						</p>
					</div>

					<div className='col-md-4 mx-auto mt-5 mb-3'>
						<div className='mb-2 imageWrapper'>
							<img
								className='iconImage'
								src={Icon5}
								alt={
									chosenLanguage === "Arabic"
										? "تسويق محترف."
										: "Professional marketing"
								}
							/>
						</div>

						<h2>
							{" "}
							<strong>
								{chosenLanguage === "Arabic"
									? "موقع حصري."
									: "Exclusive website"}
							</strong>{" "}
						</h2>
						<p>
							{chosenLanguage === "Arabic"
								? "أخيرًا، صالونك لديه موقع ويب احترافي ومتخصص خاص به لعرض قدراتك وخدماتك على منصة مصممة لمراكز وصالونات التجميل. ستتيح لك هذه الخاصية تقديم جميع خدماتك وفريقك المتخصص والمحترف."
								: "Your distinct salon boasts a dedicated, professional website, tailored specifically to highlight the creative talents of your team. This platform is expertly designed for beauty centers and salons, showcasing your unique capabilities."}
						</p>
					</div>

					<div
						onClick={() => {
							ReactGA.event("Ads_Clicked", {
								event_category: "Ads_Clicked",
								event_label: "Ads_Clicked",
								value: 1, // Optional extra parameters
							});

							ReactPixel.track("Ads_Clicked", {
								content_name: "Ads_Clicked",
								content_category: "Ads_Clicked",
								value: "",
								currency: "",
							});
						}}
					></div>

					<div className='col-md-4 mx-auto mt-5 mb-3'>
						<div className='mb-2 imageWrapper'>
							<img
								className='iconImage'
								src={Icon2}
								alt={
									chosenLanguage === "Arabic"
										? "موقع حصري."
										: "Exclusive website."
								}
							/>
						</div>
						<h2>
							{" "}
							<strong>
								{chosenLanguage === "Arabic"
									? "معنا ستزداد توسعاتك وفروعك."
									: "Focus on expanding your business"}
							</strong>{" "}
						</h2>
						<p>
							{chosenLanguage === "Arabic"
								? "نحرص دائمًا على تأمين حجوزات لك، وذلك سيزيد من حجوزاتك وعدد عملائك من خلال التركيز على تطوير الخدمة المستمر. ونتيجة لذلك، ستزداد قدراتك وفرص توسعك."
								: "We will focus on continuously developing your salon's services, ensuring an increase in bookings.  This will lead to a growth in your customer base, enhancing your capabilities and opening up more opportunities for expansion."}
						</p>
					</div>

					<div className='col-md-4 mx-auto mt-5 mb-3'>
						<div className='mb-2 imageWrapper'>
							<img
								className='iconImage'
								src={Icon1}
								alt={
									chosenLanguage === "Arabic"
										? "زيادة مصادر الدخل."
										: "Increase sources of income."
								}
							/>
						</div>
						<h2>
							{" "}
							<strong>
								{chosenLanguage === "Arabic"
									? "تسويق محترف."
									: "Professional marketing"}
							</strong>{" "}
						</h2>
						<p>
							{chosenLanguage === "Arabic"
								? "قررنا أن نخفف عنك الجهد والتكاليف في التسويق مقابل تقديم خدمات عالية الجودة وتركيز قوي على رضا العملاء ، وهو أمر يعد دائمًا أولوية. تحتاج فقط إلى الحفاظ على تقييمات العملاء الخاصة بك ، وهذا هو نهاية دورك في التسويق. لدينا حجوزات حصرية محجوزة لك لأيام."
								: "We relieve you of the effort and costs of marketing in exchange for providing high-quality services and a strong focus on customer satisfaction, which is always a priority. You only need to maintain your customer reviews, and that's the end of your marketing role. We have exclusive bookings reserved for you for days."}
						</p>
					</div>

					<div className='col-md-4 mx-auto mt-5 mb-3'>
						<h2>
							{" "}
							<strong>
								{chosenLanguage === "Arabic"
									? "ستكتشف حتى إذا لم تكن موقعك على الشارع الرئيسي."
									: "You'll be discovered even if your location is not on a main street"}
							</strong>{" "}
						</h2>
						<p>
							{chosenLanguage === "Arabic"
								? "مع منصة XLOOK ، ستكتشف حتى إذا كان موقعك مخفيًا عن الشارع الرئيسي. بمجرد تفعيل حسابك ، ستكون حقًا جزءًا من المنافسة وسيتم اكتشافك من قبل الجميع في منطقتك."
								: "With XLOOK platform, you'll be discovered even if your location is hidden from the street. Once you activate your account, you will truly be part of the competition and will be discovered by everyone in your area."}
						</p>
					</div>
				</div>

				{/* <div className='col-md-5 mx-auto mt-5 mb-3'>
					<div className='horizLine'></div>
				</div> */}

				{/* <div className='col-md-10 mx-auto mt-5 mb-3'>
					{language === "Arabic" ? (
						<h2>
							{" "}
							<strong>
								كن شريكًا ناجحًا معنا في إكس لوك.
								<br />
								أحد أهم مزايا الانضمام إلى منصة إكس لوك هو:
							</strong>{" "}
						</h2>
					) : (
						<h2>
							{" "}
							<strong>
								Be a successful partner with us at XLOOK!
								<br />
								Advantages of joining the XLOOK platform are:
							</strong>{" "}
						</h2>
					)}

					{language === "Arabic" ? (
						<ul>
							<li>
								كشريك، نعدك بأن حجوزاتك اليومية ستكتمل وسيتم تأكيد حجوزاتك
								دائمًا.
							</li>
							<li>
								ستترك جزءًا كبيرًا من مسؤوليات التسويق لنا، مما يتيح لك التركيز
								أكثر على تقديم خدمات جديدة وتحسين الخدمات الحالية.
							</li>
							<li>سوف تحصل على مصدر إضافي مجاني لزيادة أرباحك.</li>
							<li>
								ستتمكن من إدارة جميع فروعك من شاشة واحدة والوصول إلى جميع
								التفاصيل من خلال التقارير المصاحبة لأصحاب صالونات التجميل ومراكز
								التجميل.
							</li>
							<li>
								إكس لوك ليست مجرد منصة حجوزات عبر الإنترنت، بل هي برنامج إدارة
								صالونات شامل يتيح لك تتبع الحسابات والحجوزات عبر الإنترنت، بما
								في ذلك حجوزات عملائك العاديين.
							</li>
							<li>
								سيكون لديك رابط موقع الويب الخاص بك الذي يمكنك توزيعه على
								عملائك، مما يتيح لهم عرض أحدث العروض والتحديثات.
							</li>
						</ul>
					) : (
						<ul>
							<li>
								As a partner, we promise that your daily bookings will be
								complete, and your reservations will always be confirmed.
							</li>

							<li>
								You will leave a significant part of marketing concerns to us,
								allowing you to focus more on providing new services and
								improving existing ones.
							</li>

							<li>
								You will have an additional free source to increase your
								profits.
							</li>

							<li>
								You will be able to manage all your branches from a single
								screen and access all the details through the accompanying
								reports for salon owners and beauty centers.
							</li>

							<li>
								XLOOK is not just an online booking platform, but a complete
								salon management program that allows you to track online
								accounts and reservations, including those from your regular
								clients.
							</li>
							<li>
								You will have your own dedicated website link that you can
								distribute to your clients, enabling them to view the latest
								offers and updates.
							</li>
						</ul>
					)}
				</div> */}
				{chosenLanguage === "Arabic" ? (
					<div className='mt-5 text-center'>
						<strong
							style={{
								fontWeight: "bolder",
								fontSize: "2.3rem",
								color: "darkred",
							}}
						>
							مجانًا!
						</strong>
						<div>
							<strong style={{ fontWeight: "bolder", fontSize: "2rem" }}>
								موقعك الشخصي
							</strong>
						</div>
					</div>
				) : (
					<div className='mt-5 text-center'>
						<div>
							{loading2 ? null : (
								<AffiliateLinks
									affiliateProducts={affiliateProducts}
									loading={loading2}
								/>
							)}
							{/* <AdSense adSlot='5842698744' /> */}
						</div>
						<strong
							style={{
								fontWeight: "bolder",
								fontSize: "1.8rem",
								color: "darkred",
							}}
						>
							FOR FREE!
						</strong>
						<div>
							<strong style={{ fontWeight: "bolder", fontSize: "1.3rem" }}>
								YOUR PRIVATE WEBSITE!
							</strong>
						</div>
					</div>
				)}
			</div>
			<div className='mb-5 mt-1 '>
				<AboutHeroFooter language={chosenLanguage} />
			</div>

			<div>
				{chosenLanguage === "Arabic" ? (
					<p style={{ textAlign: "right", marginRight: "10px" }}>
						اخيرا اصبح لصالونك موقع خاص إحتراف متخصص لعرض امكانياتك و خدماتك على
						منصة مصممة لمراكز التجميل و صالونات الحلاقة مما سيتيح لك عرض جميع
						خدماتك و فريق العمل لديك بشكل احترافى متخصص
					</p>
				) : (
					<p style={{ textAlign: "left", marginLeft: "10px" }}>
						Finally, your salon has its own professional and specialized website
						to showcase your capabilities and services on a platform designed
						for beauty centers and barber shops, which will allow you to
						professionally and expertly display all your services and your team.
					</p>
				)}
			</div>

			{chosenLanguage === "Arabic" ? (
				<div className='redSquare'>
					<div>خطوات التسجيل</div>
					<div>للمزيد عن خطوات التسجيل</div>
					<div>
						<Link
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
							className='btn btn-primary btnArabic'
							to='/steps?ar'
						>
							دليل التسجيل من هنا
						</Link>
					</div>
				</div>
			) : (
				<div className='redSquare'>
					<div>Registration Steps</div>
					<div>For more about the registration steps</div>
					<div>
						<Link
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
							className='btn btn-primary btnArabic'
							to='/steps?ar'
						>
							Registration guide from here
						</Link>
					</div>
				</div>
			)}
		</AboutPageWrapper>
	);
};

export default About;

const AboutPageWrapper = styled.section`
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

	.heroFooterWrapper {
		display: none;
	}

	.redSquare {
		padding: 50px;
		background-color: #be0000;
		color: white;
		font-size: 1.9rem;
		font-weight: bolder;
		text-align: center;
		border-radius: 5px;
		margin: 20px 10px;
	}

	.btnArabic {
		position: absolute;
		margin-top: 8%;
		background-color: black;
		border: black 1px solid;
		left: 33%;
	}

	@media (max-width: 1200px) {
		.iconImage {
			width: 60%;
		}

		.heroFooterWrapper {
			display: block;
		}
	}
`;
