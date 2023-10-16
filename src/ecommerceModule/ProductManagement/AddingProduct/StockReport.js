import React from "react";
import CountUp from "react-countup";
import styled from "styled-components";

const StockReport = ({ chosenLanguage, allProducts }) => {
	const englishFields = [
		{ key: "productName", label: "Product Name" },
		{ key: "productSKU", label: "SKU" },
		{ key: "price", label: "Price" },
		{ key: "priceAfterDiscount", label: "Price After Discount" },
		{ key: "loyaltyPoints", label: "Loyalty Points" },
		{ key: "quantity", label: "Available Stock" },
		{ key: "sold", label: "Sold Stock" },
		{ key: "activeProduct", label: "Active" },
		{ key: "viewsCount", label: "Views" },
	];

	const arabicFields = [
		{ key: "productName_Arabic", label: "اسم المنتج" },
		{ key: "productSKU", label: "رمز المنتج" },
		{ key: "price", label: "السعر" },
		{ key: "priceAfterDiscount", label: "السعر بعد الخصم" },
		{ key: "loyaltyPoints", label: "نقاط الولاء" },
		{ key: "quantity", label: "المخزون المتاح" },
		{ key: "sold", label: "المخزون المباع" },
		{ key: "activeProduct", label: "نشط" },
		{ key: "viewsCount", label: "المشاهدات" },
	];

	// Choose fields based on chosenLanguage
	const fields = chosenLanguage === "Arabic" ? arabicFields : englishFields;

	// Compute the sums for each metric
	const totalStockOnHand = allProducts.reduce(
		(sum, product) => sum + product.quantity,
		0
	);

	const totalSold = allProducts.reduce(
		(sum, product) => sum + product.sold * product.priceAfterDiscount,
		0
	);

	const stockWorth = allProducts.reduce(
		(sum, product) => sum + product.quantity * product.priceAfterDiscount,
		0
	);

	return (
		<StockReportWrapper className=' mt-4'>
			<h3
				style={{
					fontSize: "1.5rem",
					fontWeight: "bold",
					textAlign: "center",
					textDecoration: "underline",
				}}
			>
				Stock Report
			</h3>

			<div className='container-fluid mb-4'>
				<div className='row'>
					<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#f1416c" }}>
							<div className='card-body'>
								<h5 style={{ fontWeight: "bolder", color: "white" }}>
									{chosenLanguage === "Arabic"
										? "إجمالي المخزون المتاح"
										: "Total Stock Onhand"}
								</h5>
								<CountUp
									style={{ color: "white" }}
									duration='3'
									delay={1}
									end={totalStockOnHand}
									separator=','
								/>{" "}
								<span style={{ fontSize: "1.2rem", color: "wheat" }}>
									{chosenLanguage === "Arabic" ? "قطعة" : "Unit"}
								</span>
							</div>
						</div>
					</div>

					<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#009ef7" }}>
							<div className='card-body'>
								<h5 style={{ fontWeight: "bolder", color: "white" }}>
									{chosenLanguage === "Arabic"
										? " إجمالي المبيعات (جنيه مصري) "
										: "Total Sold (EGP)"}
								</h5>
								<CountUp
									style={{ color: "white" }}
									duration='3'
									delay={1}
									end={totalSold}
									separator=','
								/>
							</div>
						</div>
					</div>

					<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#50cd89" }}>
							<div className='card-body'>
								<h5 style={{ fontWeight: "bolder", color: "white" }}>
									{chosenLanguage === "Arabic"
										? "قيمة المخزون (جنيه مصري)"
										: "Stock Worth (EGP)"}
								</h5>
								<CountUp
									style={{ color: "white" }}
									duration='3'
									delay={1}
									end={stockWorth}
									separator=','
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				style={{
					maxHeight: "800px",
					overflow: "auto",
				}}
			>
				<table className='table table-bordered table-md-responsive table-hover text-center table-striped'>
					<thead>
						<tr>
							{fields.map((field) => (
								<th key={field.key}>{field.label}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{allProducts.map((product) => (
							<tr key={product._id}>
								{fields.map((field) => (
									<td
										key={field.key}
										style={
											field.key === "activeProduct" && !product[field.key]
												? { backgroundColor: "darkred", color: "white" }
												: {}
										}
									>
										{field.key === "activeProduct"
											? product[field.key]
												? chosenLanguage === "Arabic"
													? "نشط"
													: "Active"
												: chosenLanguage === "Arabic"
												? "غير نشط"
												: "Inactive"
											: product[field.key]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</StockReportWrapper>
	);
};

export default StockReport;

const StockReportWrapper = styled.div`
	min-height: 600px;

	.card-body {
		font-weight: bolder;
	}

	.card-body span {
		font-size: 1.5rem;
	}
`;
