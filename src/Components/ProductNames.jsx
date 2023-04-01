import React, { useState } from 'react';
import { reviewApi } from '../App.js';
import '../App.css';
import { Button } from 'react-bootstrap';

export default function ProductNames ({ product, getProduct }) {

	const [editMode, setEditMode] = useState(true);
	const [text, setText] = useState(product.product);

	function toggleEditMode() {
		setEditMode(!editMode);
	}

	function deleteProduct(id) {
		fetch(`${reviewApi}/${id}`, {
			method: 'DELETE',
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				// handle error
				console.log(`Error deleting product from api`);
			})
			.then(task => {
				// Do something with deleted task
				getProduct();
			})
			.catch(error => {
				// handle error
				console.log(`Error deleting product from api`);
			});
	}

	function updateProduct(id) {
		fetch(`${reviewApi}/${id}`, {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ product: text }),
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				// handle error
				console.log(`Error updating product to api`);
			})
			.then(task => {
				// Do something with updated task
				getProduct();
				setEditMode(false);
			})
			.catch(error => {
				// handle error
				console.log(`Error updating product to api`);
			});
	}

	if (editMode)
		return (
			<div className="product-title">
				<h1 className="inline">{product.product}</h1>
				<button onClick={toggleEditMode}
				style={{
					backgroundColor: "yellow",
					fontFamily: "revert",
					fontWeight: "bolder"
				}}>
					Edit 
				</button>
				<button onClick={() => deleteProduct(product.id)}
				style={{
					backgroundColor: "red",
					fontFamily: "revert",
					fontWeight: "bolder"
				}}>
					<span className="material-symbols-outlined icon">Delete</span>
				</button>
			</div>
		);
	return (
		<div className="product-title">
			<input
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder={product.product}
				maxLength="30"
				style={{
					fontFamily: 'revert',
				}}
			/>
			<button onClick={toggleEditMode} 
			style={{
				backgroundColor: 'green',
				fontFamily: "revert",
				fontWeight: "bolder"
			}}>
				Submit Edit
			</button>
			<button onClick={() => updateProduct(product.id)}
			style={{
				backgroundColor: 'orange',
				fontFamily: 'revert',
				fontWeight: 'bolder'
			}}>
			Done
			</button>	
		</div>
	);
}
