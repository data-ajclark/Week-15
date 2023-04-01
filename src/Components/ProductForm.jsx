import React from 'react';
import { reviewApi } from '../App.js';
import { useState, useEffect } from 'react';

export default function ProductForm({ getProduct }) {
	const [text, setText] = useState('');

	function handleClickAdd(e) {
		e.preventDefault(); 

		if (text) {
			const newProduct = {
				product: text,
			};

			fetch(reviewApi, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(newProduct),
			})
				.then(res => {
					if (res.ok) {
						return res.json();
					}
					console.log('Error POSTing product to api');
				})
				.then(task => {
					getProduct();
					setText('');
				})
				.catch(error => {
					console.log('Error POSTing product to api');
				});
		}
	}

	return (
		<div id="container-new-product" className="mb-2">
			<h2 style={{
				fontFamily:'revert',
				fontWeight: 'bold',
				marginBottom: '20px'
			}}>Add a new reveiw:</h2>
			<form>
				<label htmlFor="input-product" className="me-2 input-label">Name: </label>
				<input
					id="input-product"
					value={text}
					onChange={e => setText(e.target.value)}
					maxLength="30"
				/>
				<button className="btn-add ms-2" onClick={handleClickAdd}
				style={{
					backgroundColor: 'green',
					fontFamily: 'revert',
					fontWeight: 'bolder'
				}}>
					Add
				</button>
				
			</form>
		</div>
	);
}
