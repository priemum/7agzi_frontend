/** @format */
import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { useCartContext } from "../../../sidebar_context";
import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import CardForRelatedProducts from "../SingleProduct/CardForRelatedProducts";
import { useCartContext2 } from "./cart_context";

const Cart = () => {
	const { chosenLanguage } = useCartContext();
	const [relatedProducts, setRelatedProducts] = useState([]);

	const {
		cart,
		clearCart,
		removeItem,
		toggleAmount,
		// eslint-disable-next-line
		total_amount,
		// eslint-disable-next-line
		addShipmentFee,
		// eslint-disable-next-line
		addShipmentDetails,
		// eslint-disable-next-line
		shipping_fee,
	} = useCartContext2();

	useEffect(() => {
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
				dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
			>
				<div className='col-md-2 mx-auto text-center my-auto'>
					<img
						src={image}
						alt={name}
						style={{ width: "80px", height: "80px" }}
					/>
				</div>
				<div
					className='col-md-2 mx-auto text-center my-auto'
					style={{ fontSize: "0.7rem", fontWeight: "bold" }}
				>
					{chosenLanguage === "Arabic" ? nameArabic : name}
				</div>
				<div
					className='col-md-2 mx-auto text-center my-auto'
					style={{ color: "#347acd", fontWeight: "bold" }}
				>
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
						}}
					>
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
						onClick={() => removeItem(id)}
					>
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
				style={{ fontSize: "1rem", fontWeight: "bold" }}
			>
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

	return (
		<CartV2Styling>
			<Helmet>
				<meta charSet='utf-8' />
				<title>XLOOK | Cart</title>

				<link
					rel='stylesheet'
					href='http://fonts.googleapis.com/earlyaccess/droidarabickufi.css'
				/>
				<link rel='canonical' href='https://xlookpro.com/cart' />
			</Helmet>
			{cart && cart.length === 0 ? (
				<div
					className='text-center'
					style={{
						marginBottom: "590px",
						fontSize: "2rem",
						fontWeight: "bold",
						marginTop: "20px",
					}}
				>
					Your Cart Is Empty
					<br />
					<Link
						to='/xlook/shop'
						style={{
							fontSize: "1.5rem",
							fontWeight: "bold",
						}}
					>
						Continue Shopping
					</Link>
				</div>
			) : (
				<>
					<div className='fullScreen'>
						{CartColumns()}
						<hr />
						{cart &&
							cart.map((i, k) => {
								return (
									<Fragment key={k}>
										<span>
											{CartItem(
												i.id,
												i.image,
												i.name,
												i.price,
												i.amount,
												i.nameArabic
											)}
										</span>
										<hr />
									</Fragment>
								);
							})}
						<div className='link-container'>
							<Link to='/xlook/shop' className='link-btn btn-primary'>
								continue shopping
							</Link>
							<button
								type='button'
								className='link-btn clear-btn'
								onClick={clearCart}
							>
								clear shopping cart
							</button>
						</div>
					</div>
					<div className='cellPhoneLayout mt-5'>
						{cart &&
							cart.map((i, k) => {
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
													}}
												>
													{chosenLanguage === "Arabic" ? i.nameArabic : i.name}
												</div>
												{chosenLanguage === "Arabic" ? (
													<span
														className='buttons-up-down'
														style={{ color: "#282491", marginTop: "10px" }}
													>
														<button
															type='button'
															className='amount-btn'
															onClick={increase}
														>
															<FaPlus />
														</button>
														<span className='amount'>{i.amount}</span>

														<button
															type='button'
															className='amount-btn'
															onClick={decrease}
														>
															<FaMinus />
														</button>
														<span style={{ color: "black" }}>الكمية</span>
													</span>
												) : (
													<span
														className='buttons-up-down'
														style={{ color: "#282491", marginTop: "10px" }}
													>
														<span style={{ color: "black" }}>Quantity</span>
														<button
															type='button'
															className='amount-btn'
															onClick={decrease}
														>
															<FaMinus />
														</button>
														<span className='amount'>{i.amount}</span>
														<button
															type='button'
															className='amount-btn'
															onClick={increase}
														>
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
													}}
												>
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
						<div className='link-container'>
							<Link to='/xlook/shop' className='link-btn btn-primary'>
								continue shopping
							</Link>
							<button
								type='button'
								className='link-btn clear-btn'
								onClick={clearCart}
							>
								clear shopping cart
							</button>
						</div>
					</div>
				</>
			)}
			{relatedProducts && relatedProducts.length > 0 ? (
				<ProductWrapperRelated>
					<React.Fragment>
						<div className='title mb-2'>
							<h1 className='title'>Products You May Also Like!</h1>
						</div>
					</React.Fragment>
					<div className='container my-3 ProductSlider'>
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

const ProductWrapperRelated = styled.div`
	margin-top: 50px;

	.product-grid {
		display: grid;
		margin-top: 20px;
		margin-bottom: 100px;
		grid-template-columns: repeat(
			4,
			1fr
		); /* 5 items in one row for larger screens */
		gap: 10px;
	}

	.title {
		text-align: center;
		font-size: 2rem;
		letter-spacing: 7px;
		font-weight: bold;
		text-shadow: 1px 1px 5px;
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

		.container {
			padding: 0px !important;
			margin: 3px !important;
		}
		/* Assuming 768px as breakpoint for smaller screens */
		.product-grid {
			grid-template-columns: repeat(
				2,
				1fr
			); /* 2 items in one row for smaller screens */
			gap: 5px;
		}
	}
`;
