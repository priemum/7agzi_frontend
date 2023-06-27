/** @format */

import React from "react";
import StarRating from "react-star-ratings";

export const showAverageRating = (e) => {
	if (e && e.ratings) {
		let ratingsArray = e && e.ratings;
		let total = [];
		let length = ratingsArray.length;
		// console.log("length", length);

		ratingsArray.map((r) => total.push(r.star));
		let totalReduced = total.reduce((p, n) => p + n, 0);
		// console.log("totalReduced", totalReduced);

		let highest = length * 5;
		// console.log("highest", highest);

		let result = (totalReduced * 5) / highest;
		// console.log("result", result);

		return (
			<div className='text-center '>
				<span>
					<StarRating
						starDimension='15px'
						starSpacing='2px'
						starRatedColor='red'
						rating={result}
						editing={false}
					/>{" "}
					<span style={{ fontSize: "0.68rem", color: "white" }}>
						({e.ratings.length}) Users Rated
					</span>
				</span>
			</div>
		);
	}
};

export const showAverageRating2 = (e) => {
	if (e && e.ratings) {
		let ratingsArray = e && e.ratings;
		let total = [];
		let length = ratingsArray.length;
		// console.log("length", length);

		ratingsArray.map((r) => total.push(r.star));
		let totalReduced = total.reduce((p, n) => p + n, 0);
		// console.log("totalReduced", totalReduced);

		let highest = length * 5;
		// console.log("highest", highest);

		let result = (totalReduced * 5) / highest;
		// console.log("result", result);

		return (
			<div className='text-center '>
				<span>
					<StarRating
						starDimension='20px'
						starSpacing='2px'
						starRatedColor='red'
						rating={result}
						editing={false}
					/>{" "}
					<span style={{ fontSize: "0.68rem", color: "black" }}>
						({e.ratings.length}) Users Rated
					</span>
				</span>
			</div>
		);
	}
};

export const showAverageRatingForEntireStore = (allRatings, store) => {
	let totalStars = 0;
	let totalCount = 0;
	let averageRating = 3.5; // default value for averageRating

	// Check if there are any ratings
	if (allRatings && allRatings.length > 0) {
		// Loop over all entities
		for (let i = 0; i < allRatings.length; i++) {
			let entityRatings = allRatings[i];

			// Check if the entity has any ratings
			if (entityRatings && entityRatings.length > 0) {
				// Loop over all ratings of the entity
				for (let j = 0; j < entityRatings.length; j++) {
					totalStars += entityRatings[j].star;
					totalCount++;
				}
			}
		}

		// Calculate the average star rating
		if (totalCount > 0) {
			averageRating = totalStars / totalCount;
		}
	}

	return (
		<div className='mb-2'>
			<span
				style={{ textTransform: "uppercase", fontSize: "11px" }}
				className='mr-1'
			>
				{store.belongsTo.storeAddress}{" "}
			</span>
			<span>
				<StarRating
					starDimension='15px'
					starSpacing='1px'
					starRatedColor='#ffba3b'
					rating={averageRating}
					editing={false}
				/>{" "}
			</span>
		</div>
	);
};
