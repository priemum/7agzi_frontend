/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getCategories } from "../apiAdmin";
import { isAuthenticated } from "../../auth/index";
import { Link } from "react-router-dom";
import UpdateCategorySingle from "./UpdateCategorySingle";

const UpdateCategory = ({ chosenLanguage }) => {
	const [allCategories, setAllCategories] = useState([]);
	// eslint-disable-next-line
	const { user, token } = isAuthenticated();
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("");

	const gettingAllCategories = () => {
		setLoading(true);
		getCategories(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllCategories(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllCategories();
		// eslint-disable-next-line
	}, []);

	return (
		<UpdateCategoryWrapper>
			{!selectedCategory ? (
				<div className='col-10'>
					<div className='contentWrapper'>
						<h3
							style={{ color: "#009ef7", fontWeight: "bold" }}
							className='mt-1 mb-3 text-center'
						>
							{chosenLanguage === "Arabic"
								? "تحديث الفئات"
								: "Update Categories"}
						</h3>

						<br />
						<ul className='list-group text-center'>
							{chosenLanguage === "Arabic" ? (
								<>
									<h3 className='text-center'>
										إجمالي {allCategories.length} فئات مضافة
									</h3>
									<p className='mt-2 text-center'>
										يرجى اختيار الفئة التي ترغب في تحديثها...
									</p>
								</>
							) : (
								<>
									<h3 className='text-center mt-5'>
										Total of {allCategories.length} Added Categories
									</h3>
									<p className='mt-2 text-center'>
										Please Select Which Category You Would Like To Update...
									</p>
								</>
							)}

							{allCategories.map((s, i) => (
								<Link
									to={`#`}
									key={i}
									onClick={() => setSelectedCategory(s._id)}
								>
									<div className='row text-center mx-auto'>
										<li
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center col-md-10 mx-auto'
											style={{
												fontSize: "0.9rem",
												textTransform: "capitalize",
											}}
										>
											{chosenLanguage === "Arabic" ? (
												<strong>{s.categoryName_Arabic}</strong>
											) : (
												<strong>{s.categoryName}</strong>
											)}
										</li>

										{!s.categoryStatus && (
											<li
												className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center  col-md-3 mx-auto'
												style={{
													fontSize: "0.7rem",
													color: "red",
													fontWeight: "bold",
												}}
											>
												<strong>Deactivated</strong>
											</li>
										)}
									</div>
								</Link>
							))}
						</ul>
					</div>
				</div>
			) : (
				<UpdateCategorySingle
					chosenLanguage={chosenLanguage}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
			)}
		</UpdateCategoryWrapper>
	);
};

export default UpdateCategory;

const UpdateCategoryWrapper = styled.div`
	min-height: 880px;
	overflow-x: hidden;
	/* background: #ededed; */

	.contentWrapper {
		margin-bottom: 15px;
		border: 2px solid lightgrey;
		padding: 20px;
		border-radius: 20px;
	}
`;
