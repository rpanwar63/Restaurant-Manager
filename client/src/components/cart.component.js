import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Cart extends Component {
	constructor(props){
			super(props);
			this.state = {
					cart:[],
					total: 0,
					orderPlaced: false
			}
	}
	componentDidMount(){
		let total = 0;
		axios.get('http://localhost:5000/cart/')
		.then(res => this.setState({cart: res.data, total: 0, orderPlaced: false},
			() => {this.state.cart.map(item => {
				total += item.total;
			})
			this.setState({total})
			}
		))
		.catch(err => console.log(err));
	}
	removeOrder = e => {
		let data = {
			_id: e.target.dataset.id,
			name: e.target.dataset.name,
			price: e.target.dataset.price,
			qty: 1,
			total: e.target.dataset.price
		}
		console.log(data);
		axios.post('http://localhost:5000/cart/remove', data)
		.then(res => console.log(res))
		.then(() => this.componentDidMount())
		.catch(err => console.log(err));
		
	}
	repeatOrder = e => {
		let data = {
			item_id: e.target.dataset.id,
			name: e.target.dataset.name,
			price: e.target.dataset.price,
			qty: 1,
			total: e.target.dataset.price
		}
		console.log(data);
		axios.post('http://localhost:5000/cart/', data)
		.then(res => console.log(res))
		.then(() => this.componentDidMount())
		.catch(err => console.log(err));
	}

	emptyCart = () => {
		axios.delete('http://localhost:5000/cart/')
		.then(res => console.log(res))
		.then(() => this.componentDidMount())
		.catch(err => console.log(err));
	}

	placeOrder = () => {
		let data = {
			items: this.state.cart,
			total: this.state.total
		}
		axios.post('http://localhost:5000/order/', data)
		.then(res => console.log(res))
		.then(() => this.setState({orderPlaced: true}))
		.catch(err => console.log(err));
	}

  render() {
      return(
			<React.Fragment>
			{!this.state.orderPlaced ? (this.state.cart.length > 0 ? 
				<div className="cart">
					<div className="relative"><button className="cart-btn" onClick={this.emptyCart}>Empty Cart</button></div>
					<table>
						<thead>
							<tr>
								<td>Name</td>
								<td>Price</td>
								<td>Quantity</td>
								<td>Total</td>
							</tr>
						</thead>
						<tbody>
						{(this.state.cart.length > 0) && this.state.cart.map(item => 
							<tr key={item._id}>
								<td>{item.name}</td>
								<td>{item.price}</td>
								<td className="qty-btn">
									<button data-id={item._id} data-name={item.name} data-price={item.price} onClick={this.removeOrder}>-</button>
									{item.qty}
									<button data-id={item.item_id} data-name={item.name} data-price={item.price} onClick={this.repeatOrder}>+</button>
								</td>
								<td>{item.total}</td>
							</tr>	
						)}
						</tbody>
					</table>
					<div className="relative">
						<p className="cart-total">Grand Total : {this.state.total}</p>
						<button className="cart-btn" onClick={this.placeOrder}>Place Order</button>
					</div>
				</div>
			:
				<span className="page-empty-text">There is nothing here, Go to menu to add something</span>)
			:
				<span className="page-empty-text green">Hooray! Your order has been placed.</span>
			}
			</React.Fragment>
      	)
  }}