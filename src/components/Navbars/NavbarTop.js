/** @format */

import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";
import styled from "styled-components";
import myLogo from "../../Images/XLookLogo.png";
import EgyptianFlag from "../../Images/Egypt.png";
import AmericanFlag from "../../Images/UnitedStates.png";
import { useCartContext } from "../../sidebar_context";
import { useCartContext2 } from "../../pages/TheShop/checkout/cart_context";
import { FaTrash, FaMinus, FaPlus, FaTimes } from "react-icons/fa";

// import logo from "../pagesImgs/Sinai-I-Logo.jpg";

const Navbar1 = ({ history }) => {
	const {
		openSidebar2,
		closeSidebar2,
		isSidebarOpen2,
		chosenLanguageEngish,
		chosenLanguage,
		chosenLanguageArabic,
	} = useCartContext();

	const {
		cart,
		total_items,
		// clearCart,
		openSidebar,
		closeSidebar,
		isSidebarOpen,
		removeItem,
		toggleAmount,
		// total_amount,
	} = useCartContext2();

	const sideCart = () => {
		return (
			<SideWrapperCart
				show={isSidebarOpen}
				show2={chosenLanguage === "Arabic"}
				dir='ltr'
			>
				{cart && cart.length > 0 ? (
					<>
						<div
							onClick={closeSidebar}
							className='float-right mr-3'
							style={{ fontSize: "20px", color: "darkRed", cursor: "pointer" }}
						>
							<FaTimes />
						</div>
						<div className='cellPhoneLayout mt-5'>
							{cart.map((i, k) => {
								const increase = () => {
									toggleAmount(i.id, "inc");
								};
								const decrease = () => {
									toggleAmount(i.id, "dec");
								};
								return (
									<div key={k} className='mt-2'>
										<div className='row mx-auto'>
											<div className='col-3'>
												<span>
													<img
														src={i.image}
														alt={i.name}
														style={{
															width: "80px",
															height: "100px",
															objectFit: "cover",
														}}
													/>
												</span>
											</div>
											<div className='col-9 mx-auto my-auto'>
												<div
													style={{
														fontSize: "12px",
														fontWeight: "bold",
														marginLeft: "10px",
														textTransform: "capitalize",
													}}
												>
													{chosenLanguage === "Arabic" ? i.nameArabic : i.name}{" "}
												</div>
												<span
													className='buttons-up-down'
													style={{ color: "#282491", marginTop: "10px" }}
												>
													<span style={{ color: "black" }}>Quantity:</span>{" "}
													<button
														type='button'
														className='amount-btn'
														onClick={decrease}
														style={{
															border: "lightgrey solid 1px",
															backgroundColor: "white",
															color: "darkgrey",
															padding: "19px 13px",
														}}
													>
														<FaMinus />
													</button>
													<span
														className='amount my-auto mx-auto'
														style={{
															border: "lightgrey solid 1px",
															backgroundColor: "white",
															color: "black",
															padding: "9px 14px 11px 14px",
														}}
													>
														{i.amount}
													</span>
													<button
														type='button'
														className='amount-btn'
														onClick={increase}
														style={{
															border: "lightgrey solid 1px",
															backgroundColor: "white",
															color: "darkgrey",
															padding: "19px 13px",
														}}
													>
														<FaPlus />
													</button>
												</span>
												<div
													style={{
														fontSize: "0.9rem",
														fontWeight: "bold",
														letterSpacing: "3px",
														color: "#8d9124",
														marginLeft: "70px",
														marginTop: "10px",
													}}
												>
													EGP {i.priceAfterDiscount * i.amount}
												</div>
												<button
													className='trashIcon'
													type='button'
													style={{
														marginLeft: "250px",
														color: "red",
														border: "none",
														fontWeight: "bold",
													}}
													onClick={() => removeItem(i.id)}
												>
													<FaTrash />
												</button>
											</div>
										</div>

										<hr />
									</div>
								);
							})}
							<div className='link-container' onClick={closeSidebar}>
								<Link
									to='/xlook/shop'
									className='link-btn btn-primary'
									onClick={() =>
										window.scrollTo({ top: 0, behavior: "smooth" })
									}
								>
									continue shopping
								</Link>
								<Link
									to='/cart'
									className='link-btn btn-primary'
									onClick={() =>
										window.scrollTo({ top: 0, behavior: "smooth" })
									}
								>
									Check Out
								</Link>
							</div>
						</div>
					</>
				) : (
					<>
						<div
							onClick={closeSidebar}
							className='float-right mr-3'
							style={{ fontSize: "20px", color: "darkRed", cursor: "pointer" }}
						>
							<FaTimes />
						</div>
						<div
							style={{
								fontWeight: "bold",
								textAlign: "center",
								marginTop: "50px",
							}}
						>
							<h5 style={{ fontWeight: "bold" }}>
								No Products Currently In The Cart...
							</h5>
							<div
								className='link-container mx-auto text-center mx-3'
								onClick={closeSidebar}
							>
								<Link
									to='/xlook/shop'
									className='link-btn btn-primary mx-3'
									onClick={() =>
										window.scrollTo({ top: 0, behavior: "smooth" })
									}
								>
									continue shopping
								</Link>
							</div>
						</div>
					</>
				)}
			</SideWrapperCart>
		);
	};

	const sideBar = () => {
		return (
			<React.Fragment>
				<SideWrapper show={isSidebarOpen2} show2={chosenLanguage === "Arabic"}>
					<ul className=''>
						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
								window.location.href = "/";
							}}
						>
							<Link
								to='#'
								className={
									chosenLanguage === "Arabic"
										? "sidebar-linkArabic"
										: "sidebar-link"
								}
								onClick={closeSidebar2}
							>
								{isSidebarOpen2 && isSidebarOpen2 ? (
									<React.Fragment>
										{chosenLanguage === "Arabic" ? (
											<span
												style={{
													fontFamily: "Droid Arabic Kufi",
													letterSpacing: "0px",
												}}
											>
												الصفحة الرئيسية
											</span>
										) : (
											"Home"
										)}
									</React.Fragment>
								) : null}
							</Link>
						</li>
						<li
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							<Link
								to='/schedule'
								className={
									chosenLanguage === "Arabic"
										? " sidebar-linkArabic"
										: "sidebar-link"
								}
								onClick={closeSidebar2}
							>
								{isSidebarOpen2 && isSidebarOpen2 ? (
									<React.Fragment>
										{chosenLanguage === "Arabic" ? (
											<span
												style={{
													fontFamily: "Droid Arabic Kufi",
													letterSpacing: "0px",
												}}
											>
												احجز
											</span>
										) : (
											"Schedule"
										)}
									</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							<Link
								to='/xlook/shop'
								className={
									chosenLanguage === "Arabic"
										? " sidebar-linkArabic"
										: "sidebar-link"
								}
								onClick={closeSidebar2}
							>
								{isSidebarOpen2 && isSidebarOpen2 ? (
									<React.Fragment>XLOOK SHOP</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							<Link
								to='/about'
								className={
									chosenLanguage === "Arabic"
										? "sidebar-linkArabic"
										: "sidebar-link"
								}
								onClick={closeSidebar2}
							>
								{isSidebarOpen2 && isSidebarOpen2 ? (
									<React.Fragment>
										{chosenLanguage === "Arabic" ? (
											<span
												style={{
													fontFamily: "Droid Arabic Kufi",
													letterSpacing: "0px",
												}}
											>
												من نحن
											</span>
										) : (
											"About Us"
										)}
									</React.Fragment>
								) : null}
							</Link>
						</li>
						<li
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							<Link
								to='/contact'
								className={
									chosenLanguage === "Arabic"
										? "sidebar-linkArabic"
										: "sidebar-link"
								}
								onClick={closeSidebar2}
							>
								{isSidebarOpen2 && isSidebarOpen2 ? (
									<React.Fragment>
										{chosenLanguage === "Arabic" ? (
											<span
												style={{
													fontFamily: "Droid Arabic Kufi",
													letterSpacing: "0px",
												}}
											>
												اتصل بنا
											</span>
										) : (
											"Contact Us"
										)}
									</React.Fragment>
								) : null}
							</Link>
						</li>

						{isAuthenticated() && isAuthenticated().user.role === 0 && (
							<li
								className='nav-item ml-5 mt-3'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								<Link
									className='nav-link '
									to='/dashboard'
									onClick={closeSidebar2}
								>
									My Account/Dashboard
								</Link>
							</li>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 1000 && (
							<React.Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link '
										to='/store/book-appointment-from-store'
										onClick={closeSidebar2}
									>
										Your Salon Account
									</Link>
								</li>
								{/* <li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({top: 0, behavior: "smooth"});
									}}
								>
									<Link
										className='nav-link'
										to='/dashboard'
										onClick={() => {
											setClickMenu(false);
											setClick(false);
										}}
									>
										Owner Regular Account
									</Link>
								</li> */}
							</React.Fragment>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 3 && (
							<React.Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										to='/book-appointment-from-store'
										onClick={closeSidebar2}
									>
										Store Scheduler
									</Link>
								</li>
							</React.Fragment>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 10000 && (
							<React.Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										to='/boss/admin/dashboard'
										onClick={closeSidebar2}
									>
										XLOOK ADMIN
									</Link>
								</li>
							</React.Fragment>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 5000 && (
							<React.Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										to='/ecommerce/admin/dashboard'
										onClick={closeSidebar2}
									>
										Ecommerce Admin Dashboard
									</Link>
								</li>
							</React.Fragment>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 2000 && (
							<React.Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										to='/agent/dashboard'
										onClick={closeSidebar2}
									>
										XLOOK <strong>Account Manager</strong>
									</Link>
								</li>
							</React.Fragment>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 2 && (
							<React.Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										to='/stylist/dashboard'
										onClick={closeSidebar2}
									>
										Stylist Dashboard
									</Link>
								</li>
							</React.Fragment>
						)}

						{!isAuthenticated() && (
							<Fragment>
								<li
									className='nav-item ml-4 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link '
										to='/signin'
										onClick={closeSidebar2}
									>
										Login
									</Link>
								</li>

								<li
									className='nav-item ml-4 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										style={{ color: "#b2d3f4" }}
										to='/about'
										onClick={closeSidebar2}
									>
										{chosenLanguage === "Arabic" ? (
											<span style={{ fontSize: "1.2rem" }}>كن شريكنا</span>
										) : (
											"Register Your Salon"
										)}
									</Link>
								</li>

								<li
									className='nav-item ml-4 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										style={{ color: "#b2d3f4" }}
										to='/agent-guide?ar'
										onClick={closeSidebar2}
									>
										{chosenLanguage === "Arabic" ? (
											<span style={{ fontSize: "1.2rem" }}>
												قدّم للعمل معنا
											</span>
										) : (
											"Apply To Work With Us!"
										)}
									</Link>
								</li>
							</Fragment>
						)}

						{isAuthenticated() && (
							<li
								className='nav-item ml-5'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								<span>
									<span
										className='signoutbutton nav-link'
										style={{
											cursor: "pointer",
											margin: 10,
											fontWeight: "bold",
											textDecoration: "underline",
											color: "red",
											fontStyle: "italic",
										}}
										onClick={() => {
											closeSidebar2();
											signout(() => {
												history.push("/");
												localStorage.removeItem("userHistoryPurchases");
												localStorage.removeItem("order");
											});
										}}
									>
										Signout
									</span>
								</span>
							</li>
						)}
					</ul>
				</SideWrapper>
			</React.Fragment>
		);
	};
	return (
		<Nav
			dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
			className=' navbar  navbar-expand-sm nav-center py-1'
			style={{ backgroundColor: "#363636" }}
		>
			{isSidebarOpen2 ? (
				<i
					className='far fa-window-close nav-icon faaa-bars'
					onClick={closeSidebar2}
					style={{ color: "white", marginLeft: "5px", marginRight: "5px" }}
				></i>
			) : (
				<i
					className='fa fa-bars nav-icon faaa-bars'
					onClick={openSidebar2}
					style={{ color: "white", marginLeft: "5px", marginRight: "5px" }}
				></i>
			)}
			{sideBar()}
			<div className='logo-type'>
				<Link
					to='/'
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					<img src={myLogo} alt='infinite-apps.com' className='sinaiLogo' />

					{/* <div className='logo-type' style={{color: "white"}}>
						{onlineStoreName && onlineStoreName.addStoreName} <br />
					</div> */}
				</Link>
			</div>

			<div className='collapse navbar-collapse menu'>
				<ul className='navbar-nav actual-list'>
					{isAuthenticated() && isAuthenticated().user.role === 0 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								style={{
									color: "white",
									textDecoration: "underline",
									fontWeight: "bold",
									marginRight: "20px",
									fontStyle: "italic",
								}}
							>
								Hello {isAuthenticated().user.name}
							</Link>
						</li>
					)}
					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								style={{
									color: "white",
									textDecoration: "underline",
									fontWeight: "bold",
									marginRight: "20px",
									fontStyle: "italic",
								}}
							>
								Hello {isAuthenticated().user.name}
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 1000 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/store/book-appointment-from-store'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								style={{
									color: "white",
									textDecoration: "underline",
									fontWeight: "bold",
									marginRight: "20px",
									fontStyle: "italic",
								}}
							>
								Hello {isAuthenticated().user.name}
							</Link>
						</li>
					)}
					{isAuthenticated() && isAuthenticated().user.role === 2 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								style={{
									color: "white",
									textDecoration: "underline",
									fontWeight: "bold",
									marginRight: "20px",
									fontStyle: "italic",
								}}
							>
								Hello {isAuthenticated().user.name}
							</Link>
						</li>
					)}
					{!isAuthenticated() && (
						<Fragment>
							<li className='nav-item'>
								<Link
									className='nav-link '
									to='/signin'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
									style={{
										color: "white",
										textDecoration: "underline",
										fontWeight: "bold",
										marginRight: "10px",
										fontStyle: "italic",
									}}
								>
									{chosenLanguage === "Arabic" ? (
										<span
											style={{
												fontFamily: "Droid Arabic Kufi",
												letterSpacing: "0px",
											}}
										>
											تسجيل الدخول
										</span>
									) : (
										"Login"
									)}
								</Link>
							</li>

							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/signup'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
									style={{
										color: "white",
										textDecoration: "underline",
										fontWeight: "bold",
										marginRight: "50px",
										fontStyle: "italic",
									}}
								>
									{chosenLanguage === "Arabic" ? (
										<span
											style={{
												fontFamily: "Droid Arabic Kufi",
												letterSpacing: "0px",
											}}
										>
											إشترك الآن
										</span>
									) : (
										"Business Register"
									)}
								</Link>
							</li>
						</Fragment>
					)}
					{isAuthenticated() && (
						<li className='nav-item'>
							<span
								className='nav-link'
								style={{
									cursor: "pointer",
									fontWeight: "bold",
									textDecoration: "underline",
									color: "#ffc1c1",
									fontStyle: "italic",
									marginRight: "100px",
								}}
								onClick={() =>
									signout(() => {
										history.push("/");
										localStorage.removeItem("userHistoryPurchases");
										localStorage.removeItem("order");
										window.scrollTo({ top: 0, behavior: "smooth" });
									})
								}
							>
								Signout
							</span>
						</li>
					)}

					<li
						className='nav-item mt-2 languageList'
						style={{
							// border: "1px solid black",
							width: "90px",
							height: "30px",
						}}
					>
						<span className='' style={{ padding: "0px" }}>
							{chosenLanguage === "English" ? (
								<span className='' onClick={chosenLanguageArabic}>
									{" "}
									<img className='flags' src={EgyptianFlag} alt='Arabic' />
									{/* <span style={{ color: "white" }}>Arabic</span> */}
								</span>
							) : (
								<span
									style={{ color: "white" }}
									className=' '
									onClick={chosenLanguageEngish}
								>
									<img className='flags' src={AmericanFlag} alt='English' />{" "}
									English
								</span>
							)}
						</span>
					</li>
				</ul>
			</div>

			<div className='nav-cart mx-1 faaa-bars'>
				{/* <FaCartPlus className="nav-icon" onClick={handleCart} /> */}

				<div style={{ cursor: "pointer" }}>
					<span
						className='languageFlagsPhone'
						style={{ padding: "0px", marginLeft: "" }}
					>
						{chosenLanguage === "English" ? (
							<span className='' onClick={chosenLanguageArabic}>
								{" "}
								<img
									className='flags'
									src={EgyptianFlag}
									style={{ marginRight: "5px" }}
									alt='Arabic'
								/>
							</span>
						) : (
							<span
								className=' '
								style={{ color: "white" }}
								onClick={chosenLanguageEngish}
							>
								<img className='flags' src={AmericanFlag} alt='English' />{" "}
							</span>
						)}
					</span>
					<sup onClick={isSidebarOpen ? closeSidebar : openSidebar}>
						<small className='cart-badge'>{total_items}</small>
					</sup>
					<i
						onClick={isSidebarOpen ? closeSidebar : openSidebar}
						className='fa fa-cart-plus faaa-bars'
						style={{ color: "white" }}
						aria-hidden='true'
					></i>
				</div>

				{sideCart()}
			</div>
		</Nav>
	);
};

export default withRouter(Navbar1);

const Nav = styled.nav`
	.sinaiLogo {
		width: 100%;
		object-fit: cover !important;
	}

	.menu {
		justify-content: flex-end;
	}
	.logo-type {
		font-size: 1rem;
		font-family: "Snell Roundhand, cursive";
		font-weight: bold;
		text-align: center;
		font-style: italic;
		display: inline-block;
		/* box-shadow: 7px 7px 5px 0px rgba(0, 0, 0, 0.1); */
		vertical-align: middle;
		align-content: space-between;
	}

	.languageList:hover {
		cursor: pointer;
	}

	.cart-badge {
		color: white;
		margin: 2px;
		font-size: 14px;
	}

	@media (max-width: 680px) {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		width: 100%;
		padding: 0.5rem 1.5rem;
		background: var(--mainGrey);
		border-bottom: 3px solid var(--darkGrey);
		z-index: 300;

		.sinaiLogo {
			width: 100%;
			object-fit: cover !important;
		}
		.logo-type {
			font-family: "Snell Roundhand, cursive";
			font-weight: bold;
			text-align: center;
			font-style: italic;
			display: inline-block;
			vertical-align: middle;
			margin-bottom: 0;
		}

		.nav-center {
			display: flex;
			align-items: center;
			justify-content: space-between;
			max-width: 1170px;
			margin: 0 auto;
		}
		.nav-icon {
			font-size: 1.35rem;
			cursor: pointer;
			margin-left: 4px;
		}

		.nav-cart {
			position: relative;
		}
		.cart-items {
			background: var(--mainGrey);
			color: white;
			font-weight: bold;
			font-size: 0.7rem;
			position: absolute;
			padding: 0 5px;
		}
		.sinaiLogo {
		}
		.logo-type {
		}
	}
	font-size: 1rem;

	li a:hover {
		background: #727272;
		text-decoration: none;
		color: var(--mainWhite) !important;
		outline-color: var(--darkGrey);
		transition: var(--mainTransition);
	}
	@media (min-width: 580px) {
		.languageFlagsPhone {
			display: none;
		}
	}

	@media (min-width: 680px) {
		.faaa-bars {
			display: none;
		}
	}
	@media (max-width: 900px) {
		.actual-list {
			font-size: 0.7rem;
		}
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		z-index: 200;
		padding: 1px;
	}
`;

const SideWrapper = styled.nav`
	position: fixed;
	top: 66px;
	left: 0;
	width: 70%;
	height: 100%;
	/* background: var(--mainGrey); */
	z-index: 300;
	border-right: 3px solid var(--darkGrey);
	transition: 0.5s;
	/* transform: ${(props) =>
		props.show ? "translateX(0)" : "translateX(220%)"}; */
	background-color: black;
	transform: ${(props) =>
		props.show && props.show2
			? "translateX(45%)"
			: props.show && !props.show2
			? "translateX(0)"
			: "translateX(220%)"};

	/*transform: translateX(-100%);*/ /**this will hide the side bar */

	ul {
		list-style-type: none;
		padding: 0 !important;
	}
	.sidebar-link {
		display: block;
		font-size: 1rem;
		text-transform: capitalize;
		color: lightgrey;
		padding: 1.1rem 1.1rem;
		background-color: #2c2c2c;
		transition: var(--mainTransition);
		border-bottom: 1px black solid;
	}

	.sidebar-linkArabic {
		display: block;
		font-size: 1rem;
		/* color: var(--mainBlack); */
		color: lightgrey;
		padding: 1.1rem 1.1rem;
		background-color: #2c2c2c;
		text-align: right;
		transition: var(--mainTransition);
		border-bottom: 1px black solid;
	}

	.sidebar-link:hover {
		background: #727272;
		color: var(--mainWhite);
		/* padding: 1rem 2rem 1rem 2rem; */
		text-decoration: none;
	}
	@media (min-width: 600px) {
		width: 20rem;
	}
	@media (min-width: 680px) {
		display: none;
	}
`;

const SideWrapperCart = styled.nav`
	overflow-y: auto;
	position: fixed;
	top: 70px;
	right: 0;
	width: 80%;
	height: 100%;
	background: var(--mainGrey);
	z-index: 100;
	border-left: 3px solid var(--darkGrey);
	transition: 0.5s;
	transform: ${(props) =>
		props.show && props.show2
			? "translateX(-26%)"
			: props.show && !props.show2
			? "translateX(0)"
			: "translateX(-230%)"};
	/*transform: translateX(-100%);*/ /**this will hide the side bar */
	ul {
		list-style-type: none;
		padding: 0 !important;
	}
	.sidebar-link {
		display: block;
		font-size: 1rem;
		text-transform: capitalize;
		color: var(--mainBlack);
		padding: 1.1rem 1.1rem;
		background: transparent;
		transition: var(--mainTransition);
	}
	.sidebar-link:hover {
		background: #727272;
		color: var(--mainWhite);
		/* padding: 1rem 2rem 1rem 2rem; */
		text-decoration: none;
	}

	.link-container {
		display: flex;
		justify-content: space-between;
		margin-top: 1.5rem;
		margin-left: 5px;
		margin-right: 5px;
	}
	.link-btn {
		background: transparent;
		border-color: transparent;
		text-transform: capitalize;
		padding: 0.25rem 0.5rem;
		background: black;
		color: var(--clr-white);
		border-radius: var(--radius);
		letter-spacing: var(--spacing);
		font-weight: 400;
		cursor: pointer;
	}

	.cellPhoneLayout {
		display: block;
		.buttons-up-down {
			margin-left: 30px;
			display: grid;
			font-size: 12px;
			width: 100px;
			font-weight: bold;
			justify-items: center;
			grid-template-columns: repeat(4, 1fr);
			align-items: center;
			h2 {
				margin-bottom: 0;
			}
			button {
				background: transparent;
				border-color: transparent;
				cursor: pointer;
				padding: 1rem 0;
				width: 2rem;
				height: 1rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	@media (max-width: 1000px) {
		.trashIcon {
			margin-left: 180px !important;
		}
	}
`;
