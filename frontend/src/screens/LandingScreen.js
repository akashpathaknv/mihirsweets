import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, filterProducts } from '../actions/productActions';



function HomeScreen(props) {

	const productList = useSelector(state => state.productList);
	const category = props.match.params.id ? props.match.params.id : '';
	const { products, loading, error } = productList;
	//let filter_products = products.filter(product => product.category === category );
	
	
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listProducts(category))
	
	}, [category]);
	
	console.log(products);
	
			return loading ? <div>Loading....</div> :
		error ? <div>{error}</div> :
			
				<ul className="products">
	              {
	                products.map(product => 
	                <li key={product._id}>
	                <div className="product">
	                  <Link to={'/product/' + product._id}>
	                  	<img className="product-image" src={product.image} alt="Product" />
	                  </Link>
	                  <div className="product-name">
	                  	<Link to={'/product/' + product._id}>{product.name}</Link>
	                  </div>
	                  <div className="product-brand">{product.brand}</div>
	                  <div className="product-price">Rs.{product.price} {product.weight}</div>
	                  <div className="product-rating">
	                  	<Link to={'/product/' + product._id}>View Details</Link>
	                  </div>
	                </div>
	              </li>)  
	              }
	                         
	            </ul>  


};
export default HomeScreen;