import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import AgentGuideComp from "../components/OtherHeroComp/AgentGuideComp";
import { useCartContext } from "../sidebar_context";

const AgentGuide = ({ language, setLanguage }) => {
	const { chosenLanguage } = useCartContext();

	return (
		<AgentGuideWrapper>
			<Helmet dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
				<meta charSet='utf-8' />
				{chosenLanguage === "Arabic" ? (
					<title dir='rtl'>إكس لوك | دليل الوكلاء ومديري الحسابات</title>
				) : (
					<title>XLOOK | AGENTS & ACCOUNT MANAGERS GUIDE</title>
				)}
				<meta
					name='description'
					content={
						chosenLanguage === "Arabic"
							? `منصة إكس لوك هي منصة تجمع بين صالونات الحلاقة وصالونات تجميل النساء ومراكز التجميل. تُستخدم منصة إكس لوك لاختيار وحجز موعد في صالون الشعر أو مركز التجميل. يمكن للزوار التسجيل وحجز الخدمات المقدمة من خلال تطبيق مخصص للمستخدمين والباحثين عن خدمات التجميل. تقدم المنصة خدمات لجميع أفراد الأسرة بما في ذلك السيدات والفتيات والرجال والأطفال، بخدمات متخصصة ومحترفة. يجب أن يكون المتقدمون جادين ومهذبين ولديهم مظهر جيد. مدعوم بواسطة https://infinite-apps.com`
							: `The XLOOK platform is a platform that brings together barbershops, women's beauty salons, and beauty centers. The XLOOK platform is used to choose and book an appointment at a hair salon or beauty center. Visitors can register and book the services offered through a dedicated application for users and beauty service seekers. The platform provides services for all members of the family, including ladies, girls, men, and children, with specialized and professional services. Applicants should be serious, well-mannered, and have a good appearance. Powered By https://infinite-apps.com`
					}
				/>
				<meta
					name='keywords'
					content={
						chosenLanguage === "Arabic"
							? "إكس لوك، دليل الوكلاء، مديري الحسابات، صالونات الحلاقة، صالونات تجميل النساء، مراكز التجميل، خدمات التجميل"
							: "XLOOK, AGENTS, ACCOUNT MANAGERS, barbershops, women's beauty salons, beauty centers, beauty services"
					}
				/>
				<link rel='canonical' href='https://www.xlookpro.com/agent-guide' />
			</Helmet>

			<div className='mb-5'>
				<AgentGuideComp language={chosenLanguage} />
			</div>

			<div className='container my-5'>
				{chosenLanguage === "Arabic" ? (
					<div className='Arabic' dir='rtl'>
						<div className='section1Wrapper'>
							<h1 dir='rtl'>ما هى منصة XLOOK ؟</h1>
							<p dir='rtl'>
								منصة XLOOK هي عبارة عن منصة تجمع صالونات الحلاقة ومحلات الكوافير
								النسائية ومراكز التجميل في مصر.
							</p>

							<p dir='rtl'>
								تُستخدم منصة XLOOK لاختيار و حجز موعد صالون الحلاقة او البيوتى
								سنتر.
							</p>

							<p dir='rtl'>
								يُمكن للزوار بالتسجيل و حجز الخدمات المقدمة عبر تطبيق مخصص
								للمستخدمين وطالبي الخدمات التجميلية.
							</p>

							<p dir='rtl'>
								تُقدم المنصة الخدمات لكافة أفراد الاسرة سواء سيدات, آنسات, رجال
								أو أولاد فللجميع خدمات مقدمة بكل تخصصية و إحترافية.
							</p>
						</div>

						<div className='section2Wrapper'>
							<strong>
								<h2>المؤهلات اللازمة للمتقدمين</h2>
							</strong>
							<p dir='rtl'>
								يُشترط أن يكون للمتقدمين الجدية , اللباقة و حسن المظهر.
							</p>
							<p dir='rtl'>
								وأن يكونوا في سن يتراوح بين 17 و35 عامًا.
								<br />
								كما يجب أن يتمتع المتقدمين بمهارات التسويق سواء أون لاين (إدخال
								عملاء جدد من خلال الانترنت)أو أوفلاين عن طريق زيارة الصالونات
								شخصيًا.
							</p>

							<p dir='rtl'>
								يجب أن يكون لديهم وسائط اتصال مثل الهواتف الذكية ويُفضل وجود
								جهاز لابتوب أثناء تسجيل وتأهيل العملاء الجدد.
							</p>
						</div>

						<div className='section3Wrapper'>
							<h2>مسؤوليات مدير الحسابات</h2>
							<p dir='rtl'>
								من أحد المهام الأساسية لمدير العملاء هى فتح و تسجيل حسابات
								صالونات و بيوتى سنترز جديدة.
							</p>

							<p dir='rtl'>
								يقوم مدير العملاء أيضًا بمتابعة تسجيل العملاء وتأهيل حساباتهم
								منذ تقديم طلب التسجيل حتى تفعيل حساب الصالون أو بيوتي سنتر.
							</p>

							<p dir='rtl'>
								يقوم مدير العملاء بمراقبة حسابات العملاء لديه و توجيههم إما من
								حيث الاكثر حجوزات و إرشاده لزيادة أدائه أو من حيث الأقل و اخطاره
								لاسباب قلة الحجوزات لديه و توجيهه للتطوير و تحسين الأداء عن طريق
								البرامج المقدمةلتدريب مديرى العملاء و التسويق على منصة XLOOK على
								أكثر من برنامج تطوير و تحسين للحسابات الضعيفة.
							</p>

							<p dir='rtl'>
								فى حالة تثبيت مدير العملاء كأحد أفراد فريق العمل يقوم مدير
								العملاء بمتابعة تطويرحسابات عملائه طالما هو مستمر فى الوظيفة على
								منصة XLOOK.
							</p>
						</div>

						<div className='section4Wrapper'>
							<h2 className='text-center' style={{ fontWeight: "bolder" }}>
								<strong>التوظيف</strong>
							</h2>

							<div dir='rtl'>
								المبيعات و التسويق, موهبة او هبة يتميز بها الفرد عن الأخر, وقد
								حرصنا فى XLOOK على إعطاء الفرصة لكل من يفضل مجال المبيعات و
								التسويق لإبراز موهبتهم و إعطائهم الفرصة لتحقيق عائد مادى يقيم و
								يقدر جدياً موهبتهم.
							</div>

							<div dir='rtl' className='mt-3'>
								<h2 dir='rtl'>
									يتم قبول معظم المتقدمين و إعطائهم الفرصة للتثبيت و الترقى و
									تطوير دخلهم الشهرى. فلقد قمنا بتقسيم مديرين العملاء الى قسمين:
								</h2>
								<ol dir='rtl' className='arabicOl'>
									<li>
										<strong>مديرى عملاء فرى لانسر. Lvl 16:</strong> (وهو كل مدير
										عملاء عدد عملائه أقل من100 صالون حلاقة و بيوتى سنتر).
										العمولة عن كل عميل صالون او بيوتى سنتر جديد هى 30جنيه عن كل
										عميل جديد مفعل.
									</li>
									<li>
										<strong>مدير عملاء أساسى. Lvl 08:</strong> (وهو كل مدير
										عملاء عدد عملائه أتعدى الــ100 صالون حلاقة و بيوتى سنتر).
										العمولة عن كل عميل صالون او بيوتى سنتر جديد هى 35 جنيه مصرى.
									</li>
								</ol>
							</div>
						</div>

						<div dir='rtr'>
							<div className='table-responsive' dir='rtr'>
								<table className='table'>
									<thead>
										<tr>
											<th className='align-middle'> الحسابات</th>
											<th className='align-middle'>المستوى</th>
											<th className='align-middle'>حسابات نشطة جديدة</th>
											<th className='align-middle'>الراتب الأساسي الشهري</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>0-99</td>
											<td>16</td>
											<td>EGP 30</td>
											<td>NON</td>
										</tr>
										<tr>
											<td>100-149</td>
											<td>8</td>
											<td>EGP 35</td>
											<td>EGP 3,000</td>
										</tr>
										<tr>
											<td>150-250</td>
											<td>4</td>
											<td>EGP 50</td>
											<td>EGP 4,000</td>
										</tr>
										{/* Repeat <tr> for more rows */}
									</tbody>
								</table>
							</div>
						</div>

						<div className='section5Wrapper'>
							<h2 className='text-center' style={{ fontWeight: "bolder" }}>
								<strong>أوقات العمل</strong>
							</h2>
							<div dir='rtl' className='mt-3'>
								<h2 dir='rtl'>أولاً : مدير العملاء بنظام تعيين مؤقت.</h2>
								<p dir='rtl'>
									لا يوجد أى التزام بمواعيد محددة سوى التاكد من تلبية جميع
									مواعيد فتح حسابات جديدة مع أصحاب صالونات الحلاقة و البيوتى
									سنتر.
								</p>

								<h2 dir='rtl'>ثانياً: مدير العملاء بنظام تعيين دائم.</h2>
								<ul dir='rtl' className='arabicUl'>
									<li>
										العمل يكون من المنزل و يتم ترتيب جدول عمل كل مدير عملاء من
										خلال مدير مكتب التسويق الخاص بكل محافظة.
									</li>
									<li>
										يقوم مديرى العملاء بمعرفة المبالغ المستحقة و ذلك من خلال
										الأبليكشن من صفحة حسابى و يمكن طلب تحويل العمولات و المكافآت
										من خلال جميع أنواع المحافظ الإليكترونية و الحسابات البنكية.
									</li>
									<li>أقل مبلغ للتحويل هو 200 جنيه.</li>
									<li>
										لا تحتاج سوى ملىء طلب الالتحاق بفريق عمل XLOOK و سيتم مراجعة
										طلبكم خلال 24 ساعة على الأكثر.
									</li>

									<li>
										وعند تفعيل حسابك بنجاح سيمكنكم بدأ العمل و إدخال صالونات و
										مراكز التجميل على المنصة.
									</li>
								</ul>
							</div>
						</div>
					</div>
				) : (
					<div className='English'>
						<div className='section1Wrapper'>
							<h1>
								What is <strong>XLOOK</strong> Platform?
							</h1>
							<p>
								The <strong>XLOOK</strong> platform is a platform that brings
								together barbershop, women's beauty salons and beauty centers.
							</p>

							<p>
								The <strong>XLOOK</strong> platform is used to choose and book
								an appointment at a hair salon or beauty center.
							</p>

							<p>
								Visitors can register and book the services offered through a
								dedicated application for users and beauty service seekers.
							</p>

							<p>
								The platform provides services for all members of the family,
								including ladies, girls, men, and children, with specialized and
								professional services.
							</p>
						</div>

						<div className='section2Wrapper'>
							<strong>
								<h2>Qualifications for Applicants</h2>
							</strong>
							<p>
								Applicants should be serious, well-mannered, and have a good
								appearance.
							</p>
							<p>
								They should be between the ages of 17 and 35.
								<br />
								Additionally, applicants should have marketing skills, either
								online (bringing in new clients through the internet) or offline
								by visiting salons personally.
							</p>

							<p>
								They should have communication mediums such as smartphones, and
								it is preferred to have a laptop during the registration and
								qualification of new clients.
							</p>
						</div>

						<div className='section3Wrapper'>
							<h2>ACCOUNT MANAGER RESPONSIBILITIES</h2>
							<p>
								One of the main tasks of the account manager is to open and
								register new salon and beauty center accounts.
							</p>

							<p>
								The account manager also follows up on customer registrations
								and qualifies their accounts from the moment of registration
								request until the salon or beauty center account is activated.
							</p>

							<p>
								The account manager monitors his clients' accounts and guides
								them either in terms of high demand and advises them to increase
								their performance, or in terms of low demand and notifies them
								about the reasons for the low bookings and guides them to
								improve their performance through the provided programs to train
								account managers and market <strong>XLOOK</strong> platform on
								more than one development and improvement program for weak
								accounts.
							</p>

							<p>
								When the account manager is hired as part of the team, he/she
								will continue to follow up and develop his clients' accounts on
								the <strong>XLOOK</strong> platform.
							</p>
						</div>

						<div className='section4Wrapper'>
							<h2 className='text-center' style={{ fontWeight: "bolder" }}>
								<strong>Employments</strong>
							</h2>

							<div>
								Sales and marketing are talents or gifts that individuals excel
								in. At <strong>XLOOK</strong> , we have been keen to give the
								opportunity to those who prefer the sales and marketing field to
								showcase their talents and give them a chance to achieve a
								significant financial return.
								<br />
								Most applicants are accepted and given the opportunity to be
								hired, promoted, and develop their monthly income.
							</div>

							<div className='mt-3'>
								<h2>We have divided customer managers into two sections:</h2>
								<ol className='englishOl'>
									<li>
										<strong>Freelance customer managers (Level 16):</strong>{" "}
										These are customer managers with fewer than 100 hair salon
										and beauty center clients. The commission for each new salon
										or beauty center client is 30 EGP.
									</li>
									<li>
										<strong>Basic customer managers (Level 08):</strong> These
										are customer managers with more than 100 hair salon and
										beauty center clients. The commission for each new salon or
										beauty center client is 35 EGP.
									</li>
								</ol>
							</div>
						</div>
						<div dir='ltr'>
							<div className='table-responsive' dir='ltr'>
								<table className='table'>
									<thead>
										<tr>
											<th className='align-middle'>Accounts</th>
											<th className='align-middle'>Level</th>
											<th className='align-middle'>New Active Accounts</th>
											<th className='align-middle'>Monthly Basic Salary</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>0-99</td>
											<td>16</td>
											<td>$1</td>
											<td>NON</td>
										</tr>
										<tr>
											<td>100-149</td>
											<td>8</td>
											<td>EGP 35</td>
											<td>EGP 3,000</td>
										</tr>
										<tr>
											<td>150-250</td>
											<td>4</td>
											<td>EGP 50</td>
											<td>EGP 4,000</td>
										</tr>
										{/* Repeat <tr> for more rows */}
									</tbody>
								</table>
							</div>
						</div>

						<div className='section5Wrapper'>
							<h2 className='text-center' style={{ fontWeight: "bolder" }}>
								<strong>Work Schedules</strong>
							</h2>
							<div className='mt-3'>
								<h2>First: Temporary customer manager employment.</h2>
								<p>
									There is no commitment to specific schedules except ensuring
									that all new account openings with hair salon and beauty
									center owners are met.
								</p>

								<h2>Second: Permanent customer manager employment.</h2>
								<ul className='englishUl'>
									<li>
										The work is done from home, and each account manager's work
										schedule is arranged through the marketing office manager in
										each governorate.
									</li>
									<li>
										Account managers can check their due amounts through the
										application, from the "My Account" page. They can request
										the transfer of commissions and rewards through various
										electronic wallets and bank accounts.
									</li>
									<li>The minimum transfer amount is 200 EGP.</li>
									<li>
										You only need to fill out the application to join the{" "}
										<strong>XLOOK</strong> team, and your application will be
										reviewed within 24 hours at most.
									</li>

									<li>
										Once your account is successfully activated, you can start
										working and inputting salons and beauty centers into the
										platform.
									</li>
								</ul>
							</div>
						</div>
					</div>
				)}
			</div>
		</AgentGuideWrapper>
	);
};

export default AgentGuide;

const AgentGuideWrapper = styled.div`
	min-height: 1170px;

	.Arabic {
		text-align: right;
	}

	h1 {
		font-size: 2.2rem;
		font-weight: bolder;
	}

	h2 {
		font-size: 1.8rem;
		font-weight: bolder;
	}

	strong {
		font-weight: bolder;
	}

	.arabicUl {
		margin-right: 25px;
	}

	.englishUl {
		margin-left: 25px;
	}

	.arabicOl {
		margin-right: 25px;
	}

	.englishOl {
		margin-left: 25px;
	}

	.section1Wrapper {
		background-color: #17a2b8;
		padding: 5px;
		border-radius: 5px;
		font-weight: bolder;
		color: white;
		box-shadow: 2px 5px 10px grey;

		h1 {
			color: white;
			text-align: center;
		}
		p {
			margin: 3px !important;
		}
	}

	.section2Wrapper {
		padding: 5px;
		color: black;
		margin-top: 10px;
		margin-bottom: 40px;

		h2 {
			color: black;
			text-align: center;
			font-size: 1.5rem;
		}
		p {
			margin: 3px !important;
		}
	}

	.section3Wrapper {
		background-color: grey;
		padding: 5px;
		border-radius: 5px;
		font-weight: bolder;
		color: white;
		margin-top: 10px;
		margin-bottom: 40px;
		box-shadow: 5px 5px 10px rgba(23, 162, 184, 1);

		h2 {
			color: white;
			text-align: center;
		}
		p {
			margin: 3px !important;
		}
	}

	th {
		background-color: darkred;
		color: white;
	}

	tr > td {
		border: 2px solid black;
		font-weight: bold;
	}

	@media (max-width: 1200px) {
		h1 {
			font-size: 1.5rem;
		}

		h2 {
			font-size: 1.2rem;
		}

		th {
			font-size: 13px;
			background-color: darkred;
			color: white;
		}

		tr > td {
			font-size: 13px;
		}
	}
`;
