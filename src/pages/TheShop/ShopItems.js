/** @format */

import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { addItem, updateItem, removeItem } from "./checkout/cartHelpers";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import { showAverageRating2 } from "./Rating";
import { useCartContext2 } from "./checkout/cart_context";

const ShopItems = ({
	product,
	showViewProductButton = true,
	showAddToCartButton = true,
	cartUpdate = false,
	showRemoveProductButton = false,
	setRun = (f) => f,
	run = undefined,
	chosenLanguage,
	// changeCartSize
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	const { addToCart, openSidebar } = useCartContext2();

	const showViewButton = (showViewProductButton) => {
		return (
			showViewProductButton && (
				<Link
					to={`/product/${
						product && product.category && product.category.categorySlug
					}/${product.slug}/${product._id}`}
					className='mr-2'
					onClick={() => {
						window.scrollTo(0, 0);
					}}
				>
					<button className='btn btn-outline-primary mt-2 mb-2 card-btn-1'>
						{chosenLanguage === "Arabic" ? (
							<span className='arabicFonts'>عرض المنتج</span>
						) : (
							"View Product"
						)}
					</button>
				</Link>
			)
		);
	};
	// eslint-disable-next-line
	const addToCarts = () => {
		// console.log('added');
		addItem(product, setRedirect(true));

		// window.scrollTo(0, 0);
	};

	const shouldRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to='/cart' />;
		}
	};

	console.log(product, "product");

	const showAddToCartBtn = (showAddToCartButton) => {
		return (
			<>
				<Fragment>
					{chosenLanguage === "Arabic" ? (
						<Fragment>
							{product.quantity > 0 ? (
								<>
									{showAddToCartButton && (
										<span onClick={openSidebar}>
											<span
												onClick={() => addToCart(product._id, null, 1, product)}
												className='btn btn-warning mt-2 mb-2 card-btn-1  arabicFonts'
											>
												أضف إلى السلة
											</span>
										</span>
									)}
								</>
							) : (
								<>
									<button
										className='btn btn-warning mt-2 mb-2 card-btn-1 arabicFonts'
										disabled
									>
										أضف إلى السلة
									</button>
								</>
							)}
						</Fragment>
					) : (
						<Fragment>
							{product.quantity > 0 ? (
								<>
									{showAddToCartButton && (
										<span onClick={openSidebar}>
											<span
												onClick={() => addToCart(product._id, null, 1, product)}
												className='btn btn-warning mt-2 mb-2 card-btn-1  '
											>
												Add to cart
											</span>
										</span>
									)}
								</>
							) : (
								<>
									<button
										className='btn btn-warning mt-2 mb-2 card-btn-1 '
										disabled
									>
										Add to cart
									</button>
								</>
							)}
						</Fragment>
					)}
				</Fragment>
			</>
		);
	};

	const showStock = (quantity) => {
		return quantity > 0 ? (
			<span className='badge badge-primary badge-pill'>In Stock </span>
		) : (
			<span className='badge badge-danger badge-pill'>Sold Out</span>
		);
	};

	const handleChange = (productId) => (event) => {
		setRun(!run); // run useEffect in parent Cart
		setCount(event.target.value < 1 ? "" : event.target.value);
		if (event.target.value >= 1) {
			updateItem(productId, event.target.value);
		}
	};
	// eslint-disable-next-line
	const showCartUpdateOptions = (cartUpdate) => {
		return (
			cartUpdate && (
				<div>
					<div className='input-group mb-3'>
						<div className='input-group-prepend'>
							<span className='input-group-text'>Adjust Quantity</span>
						</div>
						<input
							type='number'
							className='form-control'
							value={count}
							onChange={handleChange(product._id)}
						/>
					</div>
				</div>
			)
		);
	};
	// eslint-disable-next-line
	const showRemoveButton = (showRemoveProductButton) => {
		return (
			showRemoveProductButton && (
				<button
					onClick={() => {
						removeItem(product._id);
						setRun(!run); // run useEffect in parent Cart
					}}
					className='btn btn-outline-danger mt-2 mb-2'
				>
					Remove Product
				</button>
			)
		);
	};

	const ShowImage = ({ item }) => (
		<div className='product-img' style={{ borderRadius: "50%" }}>
			{item && item.images && (
				<Carousel
					showArrows={false}
					dynamicHeight={true}
					autoPlay
					infiniteLoop
					interval={5000}
					showStatus={false}
					showIndicators={false}
					showThumbs={false}
				>
					{item.images.map((i) => (
						<img
							alt={item.productName}
							src={i.url}
							key={i.public_id}
							style={{ height: "280px", width: "280px", objectFit: "cover" }}
						/>
					))}
				</Carousel>
			)}
		</div>
	);
	// eslint-disable-next-line
	const productNameModified =
		product && product.productName && product.productName.split(" ").join("-");

	return (
		<ProductWrapper className='my-3'>
			<Fragment>
				<div
					className='card '
					style={{ borderRadius: "5px", backgroundColor: "#fafafa" }}
				>
					<div className='card-body  '>
						{shouldRedirect(redirect)}
						<div className='card-img-top center img'>
							{/* {product && product.ratings && product.ratings.length > 0 ? (
								<div className='mb-3'>{showAverageRating2(product)}</div>
							) : (
								<div
									className='mb-2'
									style={{
										fontSize: "0.75rem",
										fontStyle: "italic",
										fontWeight: "bold",
										color: "black",
									}}
								>
									{chosenLanguage === "Arabic" ? (
										<span className='arabicFonts'>لا يوجد تقييم</span>
									) : (
										"No Ratings"
									)}
								</div>
							)} */}
							<Link
								to={`/product/${
									product && product.category && product.category.categorySlug
								}/${product.slug}/${product._id}`}
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								<ShowImage item={product} />
							</Link>
						</div>
						<div
							className='mt-2 mb-3'
							style={{
								fontSize: "15px",
								fontWeight: "bold",
								textAlign: "center",
							}}
						>
							{chosenLanguage === "Arabic" ? (
								<span className='arabicFonts'>
									{product.productName_Arabic}
								</span>
							) : (
								product.productName
							)}
						</div>
						{product.price > product.priceAfterDiscount ? (
							<div
								className='mt-2 mb-3'
								style={{
									fontSize: "12px",
									fontWeight: "bold",
									textAlign: "center",
								}}
							>
								<span className='productprice'>
									Price: <s style={{ color: "red" }}>{product.price} EGP</s>{" "}
									{product.priceAfterDiscount} EGP
								</span>
							</div>
						) : (
							<div
								className='mt-2 mb-3'
								style={{
									fontSize: "12px",
									fontWeight: "bold",
									textAlign: "center",
								}}
							>
								Price: {product.price} EGP
							</div>
						)}

						{showStock(product.quantity)}
						<div>
							{showViewButton(showViewProductButton)}
							{showAddToCartBtn(showAddToCartButton)}
						</div>
					</div>
				</div>
			</Fragment>
		</ProductWrapper>
	);
};

export default ShopItems;

const ProductWrapper = styled.div`
	.card {
		box-shadow: 2.5px 2px 2.5px 0px rgba(0, 0, 0, 0.3);
		transition: var(--mainTransition);
		height: 100%;
		width: 100%;
	}
	.card:hover {
		box-shadow: 7px 10px 5px 0px rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}
	.card-img-top {
		transition: all 0.3s ease-in-out;
	}
	.center {
		text-align: center;
	}

	/*To zoom in into the picture when hovering */
	.card:hover .card-img-top {
		transform: scale(1.1);
		opacity: 0.7;
	}

	@media (max-width: 1000px) {
		.arabicFonts {
			font-size: 13px !important;
		}
	}
`;
