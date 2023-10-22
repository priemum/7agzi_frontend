/** @format */
import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { useCartContext } from "./cart_context";
import { Link } from "react-router-dom";
import { isAuthenticated, setLocalStorage } from "../../auth/index";
import {
	allLoyaltyPointsAndStoreStatus,
	getShippingOptions,
} from "../../admin/apiAdmin";
import { readShippingOption } from "../apiCore";
import { toast } from "react-toastify";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import CardForRelatedProducts from "../SingleProduct/CardForRelatedProducts";

const Cart = ({ chosenLanguage }) => {
	const [shippingFee, setShippingFee] = useState("");
	const [allShippingOptions, setAllShippingOptions] = useState([]);
	const [chosenShippingOption, setChosenShippingOption] = useState([]);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState([]);

	const {
		cart,
		clearCart,
		removeItem,
		toggleAmount,
		total_amount,
		addShipmentFee,
		addShipmentDetails,
		// eslint-disable-next-line
		shipping_fee,
	} = useCartContext();

	const gettingAllShippingOptions = () => {
		getShippingOptions().then((data) => {
			if (data.error) {
				console.log("Error from AdminSideBar");
			} else {
				setAllShippingOptions(data.filter((i) => i.carrierStatus === true));
			}
		});
	};

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAlreadySetLoyaltyPointsManagement(data && data[data.length - 1]);
			}
		});
	};

	useEffect(() => {
		gettingAllShippingOptions();
		gettingPreviousLoyaltyPointsManagement();
		if (
			cart &&
			cart[0] &&
			cart[0].relatedProducts &&
			cart[0].relatedProducts.length > 0
		) {
			setRelatedProducts(cart[0].relatedProducts);
		} else if (
			cart &&
			cart[1] &&
			cart[1].relatedProducts &&
			cart[1].relatedProducts.length > 0
		) {
			setRelatedProducts(cart[1].relatedProducts);
		} else {
			setRelatedProducts([]);
		}
		// eslint-disable-next-line
	}, []);

	const CartItem = (id, image, name, price, amount, nameArabic) => {
		const increase = () => {
			toggleAmount(id, "inc");
		};
		const decrease = () => {
			toggleAmount(id, "dec");
		};

		return (
			<WrapperCartItem
				className='row '
				dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
				<div className='col-md-2 mx-auto text-center my-auto'>
					<img
						src={image}
						alt={name}
						style={{ width: "80px", height: "80px" }}
					/>
				</div>
				<div
					className='col-md-2 mx-auto text-center my-auto'
					style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
					{chosenLanguage === "Arabic" ? nameArabic : name}
				</div>
				<div
					className='col-md-2 mx-auto text-center my-auto'
					style={{ color: "#347acd", fontWeight: "bold" }}>
					{price} KD
				</div>
				<div className='col-md-2 mx-auto text-center my-auto buttons-up-down'>
					{" "}
					<button type='button' className='amount-btn' onClick={decrease}>
						<FaMinus />
					</button>
					<span className='amount'>{amount}</span>
					<button type='button' className='amount-btn' onClick={increase}>
						<FaPlus />
					</button>
				</div>
				<div className='col-md-2 mx-auto text-center my-auto'>
					<span
						style={{
							fontSize: "0.9rem",
							fontWeight: "bold",
							letterSpacing: "3px",
							color: "#8d9124",
						}}>
						{price * amount} KD
					</span>
				</div>
				<div className='col-md-2 mx-auto text-center my-auto'>
					<button
						type='button'
						style={{
							padding: "0px",
							background: "none",
							color: "red",
							border: "none",
							fontWeight: "bold",
						}}
						onClick={() => removeItem(id)}>
						<FaTrash />
					</button>
				</div>
			</WrapperCartItem>
		);
	};

	const CartColumns = () => {
		return (
			<WrapperCartColumns
				dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
				className='row mt-3'
				style={{ fontSize: "1rem", fontWeight: "bold" }}>
				<div className='col-md-2 mx-auto text-center mt-3'>
					{chosenLanguage === "Arabic" ? "المنتجات" : "Item"}
				</div>
				<div className='col-md-2 mx-auto text-center mt-3'>
					{chosenLanguage === "Arabic" ? "اسم المنتج" : "Name"}
				</div>
				<div className='col-md-2 mx-auto text-center mt-3'>
					{chosenLanguage === "Arabic" ? "سعر المنتج" : "Price"}
				</div>
				<div className='col-md-2 mx-auto text-center mt-3'>
					{chosenLanguage === "Arabic" ? "الكمية" : "Quantity"}
				</div>
				<div className='col-md-2 mx-auto text-center mt-3'>
					{chosenLanguage === "Arabic" ? "المجموع الفرعي" : "Subtotal"}
				</div>
				<div className='col-md-2 mx-auto text-center mt-3'>
					{chosenLanguage === "Arabic" ? "إزالة" : "Remove"}
				</div>
				<hr />
			</WrapperCartColumns>
		);
	};

	const handleChange = (e) => {
		if (e.target.value === "Please select / Required*") {
			setChosenShippingOption("");
			setShippingFee("");
		} else if (e.target.value === "PickupInStore") {
			setChosenShippingOption({
				carrierName: "PickupInStore",
				carrierName_Arabic: "احصل على المنتج في المتجر",
				carrierStatus: true,
				createdAt: new Date().toLocaleString(),
				estimatedDays: 0,
				shippingPrice: 0,
				shippingPrice_Unit: "Kuwaiti Dinar",
				updatedAt: new Date().toLocaleString(),
			});

			setShippingFee(0);
			addShipmentFee(0);

			addShipmentDetails({
				carrierName: "PickupInStore",
				carrierName_Arabic: "احصل على المنتج في المتجر",
				carrierStatus: true,
				createdAt: new Date().toLocaleString(),
				estimatedDays: 1,
				shippingPrice: 0,
				shippingPrice_Unit: "Kuwaiti Dinar",
				updatedAt: new Date().toLocaleString(),
			});

			setLocalStorage("shipping_carrier", {
				carrierName: "PickupInStore",
				carrierName_Arabic: "احصل على المنتج في المتجر",
				carrierStatus: true,
				createdAt: new Date().toLocaleString(),
				estimatedDays: 1,
				shippingPrice: 0,
				shippingPrice_Unit: "Kuwaiti Dinar",
				updatedAt: new Date().toLocaleString(),
			});
		} else {
			readShippingOption(e.target.value).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setChosenShippingOption(data);
					setShippingFee(data.shippingPrice);
					addShipmentFee(data.shippingPrice);
					addShipmentDetails(data);
					setLocalStorage("shipping_carrier", data);
				}
			});
		}
	};

	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: relatedProducts && relatedProducts.length >= 4 ? 4 : 2,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					dots: true,
					infinite: true,
					autoplay: true,
					arrows: true,
					speed: 1000,
					slidesToShow: relatedProducts && relatedProducts.length >= 2 ? 2 : 1,
					slidesToScroll: 1,
					autoplaySpeed: 5000,
					pauseOnHover: true,
					adaptiveHeight: true,
				},
			},
		],
	};

	console.log(chosenShippingOption, "chosenShippingOption");

	const CartTotals = () => {
		return (
			<WrapperCartTotals>
				<div>
					<div className='form-group'>
						<label
							className=''
							style={{
								fontSize: "1.2rem",
								fontWeight: "bolder",
							}}>
							{chosenLanguage === "Arabic"
								? "خيارات الشحن"
								: "Please Choose A Shipping Option:"}
						</label>
						<select
							onChange={handleChange}
							className='form-control'
							style={{ fontSize: "0.80rem" }}>
							<option>Please select / Required*</option>
							{allShippingOptions &&
								allShippingOptions.map((i) => {
									return (
										<option value={i._id} key={i._id}>
											{chosenLanguage === "Arabic"
												? i.carrierName_Arabic
												: i.carrierName}
										</option>
									);
								})}
							{alreadySetLoyaltyPointsManagement &&
							alreadySetLoyaltyPointsManagement.activatePickupInStore ? (
								<option value='PickupInStore'>
									{chosenLanguage === "Arabic"
										? "احصل على المنتج في المتجر"
										: "Pick Up In Store"}
								</option>
							) : null}
						</select>
					</div>
					<article>
						<h5>
							subtotal : <span>{total_amount} KD</span>
						</h5>
						<p>
							shipping fee :{" "}
							{shippingFee ? <span>{shippingFee} KD</span> : <span>0 KD</span>}
						</p>
						<p>
							Days To Deliver :{" "}
							{(shippingFee || shippingFee === 0) && chosenShippingOption && (
								<span>{chosenShippingOption.estimatedDays} Days</span>
							)}
						</p>
						<hr />
						<h4>
							order total :
							{chosenShippingOption && shippingFee ? (
								<span>{total_amount + shippingFee} KD</span>
							) : (
								<span>{total_amount} KD</span>
							)}
						</h4>
					</article>
					{isAuthenticated() ? (
						<>
							{chosenShippingOption && (shippingFee || shippingFee === 0) ? (
								<Link
									to={
										chosenShippingOption.carrierName === "PickupInStore"
											? "/checkout-store-pickup"
											: "/checkout"
									}
									className='btn mb-5'
									style={{ backgroundColor: "#004c99", color: "white" }}>
									proceed to checkout
								</Link>
							) : (
								<Link
									onClick={() => {
										if (chosenLanguage === "Arabic") {
											return toast.error(` يرجى تحديد طريقة الشحن أولاً`);
										} else {
											return toast.error(` Please Select A Carrier First`);
										}
									}}
									to='#'
									className='btn mb-5'
									style={{ backgroundColor: "#004c99", color: "white" }}>
									proceed to checkout
								</Link>
							)}
						</>
					) : (
						<div className='row'>
							<Link
								to='/signin'
								type='button'
								style={{ backgroundColor: "#004c99", color: "white" }}
								className='btn mb-2 col-md-5 mx-auto'>
								Login
							</Link>
							<Link
								to='/signup'
								type='button'
								style={{ backgroundColor: "#004c99", color: "white" }}
								className='btn mb-2 col-md-5 mx-auto'>
								Register
							</Link>

							<>
								{chosenShippingOption && (shippingFee || shippingFee === 0) ? (
									<Link
										// to='/checkout-guest'
										to={
											chosenShippingOption.carrierName === "PickupInStore"
												? "/checkout-store-pickup-guest"
												: "/checkout-guest"
										}
										className='btn mb-5 col-md-10 mx-auto'
										style={{ backgroundColor: "#004c99", color: "white" }}>
										Check Out As A Guest
									</Link>
								) : (
									<Link
										onClick={() => {
											if (chosenLanguage === "Arabic") {
												return toast.error(` يرجى تحديد طريقة الشحن أولاً`);
											} else {
												return toast.error(` Please Select A Carrier First`);
											}
										}}
										to='#'
										className='btn mb-5 col-md-10 mx-auto'
										style={{ backgroundColor: "#004c99", color: "white" }}>
										Check Out As A Guest
									</Link>
								)}
							</>
						</div>
					)}
				</div>
			</WrapperCartTotals>
		);
	};

	return (
		<CartV2Styling>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Demo Ecommerce Web App | Developed By Infinite-Apps</title>

				<meta
					name='description'
					content='This is a demo website created by Infinite-Apps. This web app is mainly focusing on Ecommerce business/Web Shops and it could be used for Brick and Mortar stores to increase your sales. Infinite Apps can help with your SEO (Search Engine Optimization) so you can market for your business and rank higher with Google. If you are interested, Please contact infinite apps 9099914386 (www.infinite-apps.com)'
				/>
				<link
					rel='stylesheet'
					href='http://fonts.googleapis.com/earlyaccess/droidarabickufi.css'
				/>
				<link rel='canonical' href='http://infinite-apps.com' />
			</Helmet>
			{cart.length === 0 ? (
				<div
					className='text-center'
					style={{
						marginBottom: "590px",
						fontSize: "2rem",
						fontWeight: "bold",
						marginTop: "20px",
					}}>
					Your Cart Is Empty
					<br />
					<Link
						to='/our-products'
						style={{
							fontSize: "1.5rem",
							fontWeight: "bold",
						}}>
						Continue Shopping
					</Link>
				</div>
			) : (
				<>
					<div className='fullScreen'>
						{CartColumns()}
						<hr />
						{cart.map((i, k) => {
							return (
								<Fragment key={k}>
									<span>
										{CartItem(
											i.id,
											i.image,
											i.name,
											i.price,
											i.amount,
											i.nameArabic,
										)}
									</span>
									<hr />
								</Fragment>
							);
						})}
						<div className='link-container'>
							<Link to='/our-products' className='link-btn btn-primary'>
								continue shopping
							</Link>
							<button
								type='button'
								className='link-btn clear-btn'
								onClick={clearCart}>
								clear shopping cart
							</button>
						</div>
						<div className='row'>
							<div className='col-md-3 mt-5'>
								<span
									style={{
										color: "darkRed",
										fontWeight: "bold",
										textAlign: "center",
										marginLeft: "40px",
										letterSpacing: "4px",
										textShadow: "3px 3px 6px",
										fontSize: "1.1rem",
									}}>
									Shipping Options
								</span>
								<table
									className='table table-bordered table-md-responsive table-hover table-striped mt-2'
									style={{ fontSize: "0.75rem" }}>
									<thead className='thead-light'>
										<tr>
											<th scope='col'>Carrier</th>
											<th scope='col'>Days To Deliver</th>
											<th scope='col'>Shipping Fee</th>
										</tr>
									</thead>
									<tbody>
										{allShippingOptions &&
											allShippingOptions.map((i, e) => {
												return (
													<tr key={e}>
														<td>{i.carrierName}</td>
														<td>{i.estimatedDays} Days</td>
														<td>{i.shippingPrice} KD</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							</div>
							<div className='col-md-9'>{CartTotals()}</div>
						</div>
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
									<div className='row'>
										<div className='col-3'>
											<span>
												<img
													src={i.image}
													alt={i.name}
													style={{ width: "80px", height: "80px" }}
												/>
											</span>
										</div>
										<div className='col-9 mx-auto my-auto'>
											<div
												style={{
													fontSize: "12px",
													fontWeight: "bold",
													marginLeft: "10px",
												}}>
												{chosenLanguage === "Arabic" ? i.nameArabic : i.name}
											</div>
											{chosenLanguage === "Arabic" ? (
												<span
													className='buttons-up-down'
													style={{ color: "#282491", marginTop: "10px" }}>
													<button
														type='button'
														className='amount-btn'
														onClick={increase}>
														<FaPlus />
													</button>
													<span className='amount'>{i.amount}</span>

													<button
														type='button'
														className='amount-btn'
														onClick={decrease}>
														<FaMinus />
													</button>
													<span style={{ color: "black" }}>الكمية</span>
												</span>
											) : (
												<span
													className='buttons-up-down'
													style={{ color: "#282491", marginTop: "10px" }}>
													<span style={{ color: "black" }}>Quantity</span>
													<button
														type='button'
														className='amount-btn'
														onClick={decrease}>
														<FaMinus />
													</button>
													<span className='amount'>{i.amount}</span>
													<button
														type='button'
														className='amount-btn'
														onClick={increase}>
														<FaPlus />
													</button>
												</span>
											)}
											<div
												style={{
													fontSize: "0.9rem",
													fontWeight: "bold",
													letterSpacing: "3px",
													color: "#8d9124",
													marginLeft: "70px",
													marginTop: "10px",
												}}>
												{i.price * i.amount} KD
											</div>
											<button
												type='button'
												style={{
													marginLeft: "250px",
													color: "red",
													border: "none",
													fontWeight: "bold",
												}}
												onClick={() => removeItem(i.id)}>
												<FaTrash />
											</button>
										</div>
									</div>

									<hr />
								</div>
							);
						})}
						<div className='link-container'>
							<Link to='/our-products' className='link-btn btn-primary'>
								continue shopping
							</Link>
							<button
								type='button'
								className='link-btn clear-btn'
								onClick={clearCart}>
								clear shopping cart
							</button>
						</div>
						{CartTotals()}
						<div className='my-3'>
							<span
								style={{
									color: "darkRed",
									fontWeight: "bold",
									textAlign: "center",
									marginLeft: "40px",
									letterSpacing: "4px",
									textShadow: "3px 3px 6px",
									fontSize: "1.1rem",
								}}>
								Shipping Options
							</span>
							<table
								className='table table-bordered table-md-responsive table-hover table-striped mt-2'
								style={{ fontSize: "0.75rem" }}>
								<thead className='thead-light'>
									<tr>
										<th scope='col'>Carrier</th>
										<th scope='col'>Days To Deliver</th>
										<th scope='col'>Shipping Fee</th>
									</tr>
								</thead>
								<tbody>
									{allShippingOptions &&
										allShippingOptions.map((i, e) => {
											return (
												<tr key={e}>
													<td>{i.carrierName}</td>
													<td>{i.estimatedDays} Days</td>
													<td> {i.shippingPrice} KD</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
				</>
			)}
			{relatedProducts && relatedProducts.length > 0 ? (
				<ProductWrapperRelated>
					<React.Fragment>
						<div className='title mb-2'>
							<h1 className='title'>Products You May Like!</h1>
						</div>
					</React.Fragment>
					<div className='container-fluid my-3 ProductSlider'>
						<Slider {...settings} className='mb-5'>
							{relatedProducts &&
								relatedProducts.map((product, i) => (
									<div className='img-fluid images ' key={i}>
										<CardForRelatedProducts product={product} key={i} />
									</div>
								))}
						</Slider>
					</div>
				</ProductWrapperRelated>
			) : null}
		</CartV2Styling>
	);
};

export default Cart;

const CartV2Styling = styled.div`
	.link-container {
		display: flex;
		justify-content: space-between;
		margin-top: 3rem;
	}
	.link-btn {
		background: transparent;
		border-color: transparent;
		text-transform: capitalize;
		padding: 0.25rem 0.5rem;
		background: var(--clr-primary-5);
		color: var(--clr-white);
		border-radius: var(--radius);
		letter-spacing: var(--spacing);
		font-weight: 400;
		cursor: pointer;
	}
	.cellPhoneLayout {
		display: none;
	}
	margin-right: 20%;
	margin-left: 5%;

	@media (max-width: 770px) {
		.link-container {
			display: flex;
			justify-content: space-between;
			margin-top: 3rem;
		}
		.link-btn {
			background: transparent;
			border-color: transparent;
			text-transform: capitalize;
			padding: 0.25rem 0.5rem;
			background: var(--clr-primary-5);
			color: var(--clr-white);
			border-radius: var(--radius);
			letter-spacing: var(--spacing);
			font-weight: 400;
			cursor: pointer;
		}
		.fullScreen {
			display: none;
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
	}
`;
const WrapperCartColumns = styled.div`
	/* text-align: center; */
	/* border: 2px solid red; */
`;

const WrapperCartItem = styled.div`
	.buttons-up-down {
		display: grid;
		width: 100px;
		justify-items: center;
		grid-template-columns: repeat(3, 1fr);
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
		h2 {
			margin-bottom: 0;
		}
	}
`;

const WrapperCartTotals = styled.div`
	text-transform: capitalize;
	margin-top: 3rem;
	display: flex;
	justify-content: center;
	article {
		border: 1px solid var(--clr-grey-8);
		border-radius: var(--radius);
		padding: 1.5rem 3rem;
	}
	h4,
	h5,
	p {
		display: grid;
		grid-template-columns: 320px 1fr;
	}
	p {
		text-transform: capitalize;
	}
	h4 {
		margin-top: 2rem;
	}
	@media (min-width: 776px) {
		justify-content: flex-end;
	}
	@media (max-width: 776px) {
		h4,
		h5,
		p {
			display: grid;
			grid-template-columns: 200px 1fr;
		}
	}

	.btn {
		width: 100%;
		margin-top: 1rem;
		text-align: center;
		font-weight: 700;
	}
`;

const ProductWrapperRelated = styled.div`
	margin-top: 50px;

	.title {
		text-align: center;
		font-size: 2rem;
		letter-spacing: 7px;
		font-weight: bold;
		text-shadow: 3px 3px 10px;
	}

	.titleArabic {
		text-align: center;
		font-size: 2rem;
		/* letter-spacing: 7px; */
		font-weight: bold;
		text-shadow: 3px 3px 10px;
	}

	.images {
		margin-left: 20px;
		margin-bottom: 30px;
	}

	.ProductSlider {
		padding: 0px 100px 0px 100px;
	}

	@media (max-width: 1400px) {
		.ProductSlider {
			padding: 0px;
		}
	}
	@media (max-width: 1200px) {
		.ProductSlider {
			padding: 0px 10px 0px 10px;
		}
	}
`;
