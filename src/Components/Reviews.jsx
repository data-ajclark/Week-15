import React, { useState } from 'react';
import { reviewApi } from '../App';

export default function Reviews({ product, getProduct }) {
	

	function addToApi(reviewsArr) {
		fetch(`${reviewApi}/${product.id}`, {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ reviews: reviewsArr }),
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				// handle error
				console.log(`Error PUTting new review`);
			})
			.then(task => {
				// Do something with updated task
				getProduct();
			})
			.catch(error => {
				// handle error
				console.log(`Error PUTting new review`);
			});
	}



	// return (
		  
  //   <div>
  //     {product.reviews.map((review, index) => (
	// 	  	<div className="container-review" key={index}>
	// 		  	<Review review={review} index={index} product={product} addToApi={addToApi} />
	// 		  </div>
  //     ))}
	// 		<div className="container-add-review">
	// 		  <AddReview product={product} addToApi={addToApi} />
	// 		</div>
  //   </div>
	// )
};


function Review ({ review, index, product, addToApi }) {
	const [editMode, setEditMode] = useState(false);
	const [text, setText] = useState(review);

	function toggleEditMode() {
		setEditMode(!editMode);
	}

	function updateReview(index, insert) {
		let newArray = product.reviews;
		insert ? newArray.splice(index, 1, insert) : newArray.splice(index, 1);
		addToApi(newArray);
		setEditMode(false);
	}

	if (!editMode)
		return (
			<>
				<p>{review}</p>
				<div>
					<button className="btn btn-edit" onClick={toggleEditMode}>
						<span className="material-symbols-outlined icon">edit</span>
					</button>
					<button className="btn btn-delete" onClick={() => updateReview(index)}>
						<span className="material-symbols-outlined icon">delete_forever</span>
					</button>
				</div>
			</>
		);
	return (
		<>
			<input
				className="block"
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder={review}
				maxLength="50"
			/>
			<div>
				<button className="btn btn-cancel" onClick={toggleEditMode}>
					<span className="material-symbols-outlined icon">close</span>
				</button>
				<button className="btn btn-commit" onClick={() => updateReview(index, text)}>
					<span className="material-symbols-outlined icon">done</span>
				</button>
			</div>
		</>
	);
}


function AddReview({ product, addToApi }) {
	const [inputVisible, setInputVisible] = useState(false);
	const [text, setText] = useState('');

	function handleClickPlus() {
		setInputVisible(!inputVisible);
	}

	function handleClickAdd(e) {
		e.preventDefault(); 

		if (text) {
			const reviewsArr = [...product.reviews, text];
			addToApi(reviewsArr);
			setInputVisible(false);
			setText('');
		}
	}

	if (!inputVisible)
		return (
			<span onClick={handleClickPlus}>
				add_circle
			</span>
		);
	return (
		<>
			<span onClick={handleClickPlus}>
				cancel
			</span>
			<form className="inline">
				<input
					id="input-product"
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder="review"
					maxLength="50"
				/>
				<button className="btn-add" onClick={handleClickAdd}>
					Add
				</button>
			</form>
		</>
	);
}
