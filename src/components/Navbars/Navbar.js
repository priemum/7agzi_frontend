/** @format */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import styled from "styled-components";
import { useCartContext } from "../../sidebar_context";
import { useCartContext2 } from "../../pages/TheShop/checkout/cart_context";
import { FaTrash, FaMinus, FaPlus, FaTimes } from "react-icons/fa";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "white !important",
			background: "#0c0000",
			fontWeight: "bold",
			// textDecoration: "underline",
		};
	} else {
		return { color: "#ffffff", fontWeight: "bold" };
	}
};

const isActive2 = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "white !important",
			background: "#0056b6",
			fontWeight: "bold",
			// textDecoration: "underline",
		};
	} else {
		return { color: "#ffffff", fontWeight: "bold" };
	}
};

const Navbar = ({ history, language }) => {
	const { chosenLanguage } = useCartContext();

	const {
		cart,
		total_items,
		// clearCart,
		removeItem,
		toggleAmount,
		// total_amount,
		openSidebar,
		closeSidebar,
		isSidebarOpen,
	} = useCartContext2();

	const sideCart = () => {
		return (
			<SideWrapper show={isSidebarOpen}>
				{cart && cart.length > 0 ? (
					<>
						<div
							onClick={closeSidebar}
							className='float-right mr-3'
							style={{
								fontSize: "20px",
								color: "darkred",
								cursor: "pointer",
								marginTop: "10px",
							}}
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
														style={{ width: "100%", height: "100%" }}
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
												{chosenLanguage === "Arabic" ? (
													<div
														className='buttons-up-down'
														style={{
															fontSize: "12px",
															fontWeight: "bold",
															marginLeft: "15px",
															marginTop: "10px",
															textTransform: "capitalize",
															color: "darkgreen",
														}}
													>
														<button
															type='button'
															className='amount-btn'
															style={{
																border: "lightgrey solid 1px",
																backgroundColor: "white",
																color: "darkgrey",
																padding: "19px 13px",
															}}
															onClick={decrease}
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
															style={{
																border: "lightgrey solid 1px",
																backgroundColor: "white",
																color: "darkgrey",
																padding: "19px 13px",
															}}
															type='button'
															className='amount-btn'
															onClick={increase}
														>
															<FaPlus />
														</button>
													</div>
												) : (
													<div
														className='buttons-up-down'
														style={{
															fontSize: "12px",
															fontWeight: "bold",
															marginLeft: "15px",
															marginTop: "10px",
															textTransform: "capitalize",
															color: "darkgreen",
														}}
													>
														<button
															type='button'
															className='amount-btn'
															style={{
																border: "lightgrey solid 1px",
																backgroundColor: "white",
																color: "darkgrey",
																padding: "19px 13px",
															}}
															onClick={decrease}
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
															style={{
																border: "lightgrey solid 1px",
																backgroundColor: "white",
																color: "darkgrey",
																padding: "19px 13px",
															}}
															type='button'
															className='amount-btn'
															onClick={increase}
														>
															<FaPlus />
														</button>
													</div>
												)}
												<div
													style={{
														fontSize: "0.9rem",
														fontWeight: "bold",
														letterSpacing: "3px",
														color: "#8d9124",
														marginLeft: "30px",
														marginTop: "10px",
													}}
												>
													EGP {i.priceAfterDiscount * i.amount}
												</div>
												<button
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
						<>
							<div
								onClick={closeSidebar}
								className='float-right mr-3'
								style={{
									fontSize: "20px",
									color: "darkRed",
									cursor: "pointer",
								}}
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
					</>
				)}
			</SideWrapper>
		);
	};

	return (
		<Nav
			className=' navbar  navbar-expand-sm'
			style={{ backgroundColor: "black" }}
		>
			<div
				className='collapse navbar-collapse '
				dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
			>
				<ul
					className='navbar-nav mx-auto navbar-expand '
					style={{ backgroundColor: "black" }}
				>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/")}
							to='/'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
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
								"HOME"
							)}
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/schedule")}
							to='/schedule'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
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
								"SCHEDULE"
							)}
						</Link>
					</li>

					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/xlook/shop")}
							to='/xlook/shop'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							XLOOK SHOP
						</Link>
					</li>

					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/contact")}
							to='/contact'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
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
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/about")}
							to='/about'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
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
						</Link>
					</li>

					{isAuthenticated() && isAuthenticated().user.role === 0 && (
						<li className='nav-item ml-5'>
							<Link
								className='nav-link'
								style={isActive2(history, "/dashboard")}
								to='/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								My Dasboard/Account
							</Link>
						</li>
					)}

					{/* {isAuthenticated() && isAuthenticated().user.role === 1 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								style={isActive(history, "/dashboard")}
								to='/dashboard'
								onClick={() => {
									window.scrollTo({top: 0, behavior: "smooth"});
								}}
							>
								Owner Regular Account
							</Link>
						</li>
					)} */}
					{isAuthenticated() && isAuthenticated().user.role === 1000 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/store/book-appointment-from-store")}
								to='/store/book-appointment-from-store'
								onClick={() => {
									window.scrollTo({ top: 90, behavior: "smooth" });
								}}
							>
								Salon Dashboard
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 10000 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/boss/admin/dashboard")}
								to='/boss/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								XLOOK Admin
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 5000 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/ecommerce/admin/dashboard")}
								to='/ecommerce/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								Ecommerce Admin Dashboard
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 2000 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/agent/dashboard")}
								to='/agent/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								XLOOK <strong>AGENT</strong>
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/admin/dashboard")}
								to='/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 90, behavior: "smooth" });
								}}
							>
								Admin Dashboard
							</Link>
						</li>
					)}

					{/* {isAuthenticated() && isAuthenticated().user.role === 2 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								style={isActive(history, "/dashboard")}
								to='/dashboard'
								onClick={() => {
									window.scrollTo({top: 0, behavior: "smooth"});
								}}
							>
								Stylist Regular Account
							</Link>
						</li>
					)} */}
					{isAuthenticated() && isAuthenticated().user.role === 2 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/stylist/dashboard")}
								to='/stylist/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								Stylist Dashboard
							</Link>
						</li>
					)}
				</ul>
			</div>

			<span
				style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
				className='mr-3'
				onClick={() => {
					history.push("/cart");
				}}
			>
				Cart
			</span>
			<div className='nav-cart mr-5 mt-2'>
				{/* <FaCartPlus className="nav-icon" onClick={handleCart} /> */}
				<div
					style={{ cursor: "pointer" }}
					// to='/cart'
					onClick={isSidebarOpen ? closeSidebar : openSidebar}
				>
					<sup>
						<small className='cart-badge'>{total_items}</small>
					</sup>
					<i
						className='fa fa-cart-plus faaa-bars'
						style={{ color: "white", fontSize: "20px" }}
						aria-hidden='true'
					></i>
				</div>
				{sideCart()}
			</div>
		</Nav>
	);
};

export default withRouter(Navbar);

const Nav = styled.nav`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	z-index: 100;
	padding: 1px;

	.cart-badge {
		color: white;
		font-size: 15px;
	}

	li a {
		font-size: 0.95rem;
	}
	.nav-link {
		color: white !important;
	}
	li {
		margin: 0px 12px 0px 0px;
	}

	li a:hover {
		background: #727272;
		color: var(--mainWhite) !important;
		outline-color: var(--darkGrey);
		transition: var(--mainTransition);
	}

	@media (max-width: 900px) {
		li a {
			color: black !important;
			font-size: 0.7rem;
			margin: 0px;
		}
		li {
			margin: 0px 0px 0px 0px;
		}
	}

	@media (max-width: 680px) {
		display: none;
	}
`;

const SideWrapper = styled.nav`
	position: fixed;
	top: 0px;
	right: 0;
	width: 22%;
	height: 100%;
	background: var(--mainGrey);
	z-index: 100;
	border-left: 1px solid var(--darkGrey);
	transition: 0.5s;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(220%)")};
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
		margin-top: 3rem;
		margin-left: 10px;
		margin-right: 10px;
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
`;
