/** @format */

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
	const { addToCart, openSidebar } = useCartContext2();

	const showViewButton = (showViewProductButton) => {
		return (
			showViewProductButton && (
				<Link
					to={`/product/${
						product && product.category && product.category.categorySlug
					}/${product.slug}/${product._id}`}
					onClick={() => {
						window.scrollTo(0, 0);
					}}
				>
					<span className='btn btn-outline-primary mt-2 mb-2 card-btn-1'>
						{chosenLanguage === "Arabic" ? (
							<span className='arabicFonts'>عرض المنتج</span>
						) : (
							"View Product"
						)}
					</span>
				</Link>
			)
		);
	};

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
							style={{ height: "100%", width: "100%", objectFit: "cover" }}
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
					<div className='card-img-top center img'>
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
					<div className='card-body  '>
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
							<div className='button-grid mx-auto text-center'>
								<div className='showButton'>
									{showViewButton(showViewProductButton)}
								</div>
								<div className=''>{showAddToCartBtn(showAddToCartButton)}</div>
							</div>
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
		box-shadow: 1px 2px 1px 0px rgba(0, 0, 0, 0.1);
		transition: var(--mainTransition);
		height: 100%;
		width: 100%;
	}

	.card:hover {
		box-shadow: 7px 10px 5px 0px rgba(0, 0, 0, 0.3);
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
		transform: scale(1.01);
		opacity: 0.7;
	}

	.button-grid {
		display: grid;
		grid-template-columns: repeat(
			2,
			1fr
		); /* 5 items in one row for larger screens */
		gap: 10px;
	}

	.arabicFonts {
		font-size: 12px !important;
	}

	@media (max-width: 1000px) {
		.showButton {
			display: none;
		}

		.arabicFonts {
			font-size: 12px !important;
		}

		img {
			height: 100% !important;
			width: 100% !important;
		}

		.button-grid {
			grid-template-columns: repeat(
				1,
				1fr
			); /* 5 items in one row for larger screens */
			gap: 0px;
		}
	}
`;
