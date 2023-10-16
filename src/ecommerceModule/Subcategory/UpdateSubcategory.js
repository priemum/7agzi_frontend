/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getSubCategories } from "../apiAdmin";
import { isAuthenticated } from "../../auth/index";
import { Link } from "react-router-dom";
import UpdateSubcategorySingle from "./UpdateSubcategorySingle";

const UpdateSubcategory = ({ chosenLanguage }) => {
	const [allSubcategories, setAllSubCategories] = useState([]);
	const [mySelectedSubCategory, setMySelectedSubCategory] = useState("");
	// eslint-disable-next-line
	const { user, token } = isAuthenticated();
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);

	const gettingAllSubcategories = () => {
		setLoading(true);
		getSubCategories(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllSubCategories(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllSubcategories();
		// eslint-disable-next-line
	}, []);

	return (
		<UpdateSubcategoryWrapper>
			{!mySelectedSubCategory ? (
				<div className='col-11'>
					<div className='contentWrapper'>
						<h3
							style={{ color: "#009ef7", fontWeight: "bold" }}
							className='mt-1 mb-3 text-center'
						>
							Update Subcategories
						</h3>

						<br />
						<ul className='list-group text-center'>
							{chosenLanguage === "Arabic" ? (
								<>
									<h3 className='text-center '>
										إجمالي {allSubcategories.length} تصنيفات فرعية مضافة
									</h3>
									<p className='mt-2 text-center'>
										يرجى اختيار التصنيف الفرعي الذي ترغب في تحديثه...
									</p>
								</>
							) : (
								<>
									<h3 className='text-center '>
										Total of {allSubcategories.length} Added Subcategories
									</h3>
									<p className='mt-2 text-center'>
										Please Select Which Subcategory You Would Like To Update...
									</p>
								</>
							)}

							{allSubcategories.map((s, i) => (
								<Link
									to={`#`}
									key={i}
									onClick={() => setMySelectedSubCategory(s._id)}
								>
									<div className='row text-center mx-auto'>
										<li
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center col-md-11 mx-auto'
											style={{
												fontSize: "0.85rem",
												textTransform: "capitalize",
											}}
										>
											{chosenLanguage === "Arabic" ? (
												<strong>{s.SubcategoryName_Arabic}</strong>
											) : (
												<strong>{s.SubcategoryName}</strong>
											)}
										</li>

										{!s.subCategoryStatus && (
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
				<UpdateSubcategorySingle
					chosenLanguage={chosenLanguage}
					mySelectedSubCategory={mySelectedSubCategory}
					setMySelectedSubCategory={setMySelectedSubCategory}
				/>
			)}
		</UpdateSubcategoryWrapper>
	);
};

export default UpdateSubcategory;

const UpdateSubcategoryWrapper = styled.div`
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
