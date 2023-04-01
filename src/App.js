import { useState, useEffect } from 'react'
import ProductNames from './Components/ProductNames.jsx'
import ProductForm from './Components/ProductForm.jsx'
import Reviews from './Components/Reviews.jsx'
import './App.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Overlay } from 'react-bootstrap';


export const reviewApi = "https://6425bb589e0a30d92b3a7de8.mockapi.io/reviews"

function App() {

  const [products, setProducts] = useState([]);

  useEffect(getProduct, []);

  function getProduct() {
    fetch(reviewApi, {
      method: 'GET',
      headers: { 'content-type': 'application/json'},
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      console.log('GET error');
    })
    .then(data => {
      setProducts(data);
    })
    .catch(error => {
      console.log('GET error')
    });
  }


  return (
    <div className="whole">
      <div className="App">
        <img src="https://accessibility-helper.co.il/wp-content/themes/wah-theme/images/Simple-Shiny.svg" alt="simple banner"
        style={{
         height: '200px',
         width: '100%' 
        }}></img>
          <header className="App-header" 
          style={{
            fontSize: '50px'
          }}>
            Leave a Product Review
          </header>     
        <div className="product-suggestion">
				  <ProductForm getProduct={getProduct} />
			  </div>
      </div>
      <div className="container">
        {products.map(e => (
             <div className="card mb-2" key={e.id}
             style={{
              backgroundColor: '#3598b5',
              textAlign: 'center',
              fontFamily: 'revert'
             }}>
                <ProductNames product={e} getProduct={getProduct} /> 
             </div>
        ))}
      </div>
    </div>   
  );
}

export default App;
