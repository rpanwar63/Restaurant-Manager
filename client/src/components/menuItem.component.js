import React, { Component } from 'react';
import axios from 'axios';

export default class MenuItem extends Component {
	constructor(props){
		super(props);
		this.state = {
            cart:[],
            isAddedToCart: false,
            cartItem: {}
		}
	}
	componentDidMount(){
		axios.get('http://localhost:5000/cart/')
		.then(res => this.setState({cart: res.data, isAddedToCart: false, cartItem: {}}))
		.then(() => {
            for(let i = 0 ; i < this.state.cart.length ; i++){
                if(this.state.cart[i].item_id === this.props.item._id){
                    this.setState({isAddedToCart: true, cartItem: this.state.cart[i]})
                    break;
                }
            }
        })
		.catch(err => console.log(err));
	}

    addToCart = e => {
		let data = {
			item_id: e.target.id,
			name: e.target.dataset.name,
			price: e.target.dataset.price,
			qty: 1,
			total: e.target.dataset.price
		}
		axios.post('http://localhost:5000/cart/', data)
		.then(() => this.componentDidMount())
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
		axios.post('http://localhost:5000/cart/remove', data)
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
		axios.post('http://localhost:5000/cart/', data)
		.then(() => this.componentDidMount())
		.catch(err => console.log(err));
	}



  render() {
    return(
        <React.Fragment>
        <tr key={this.props.item._id}>
            <td>{this.props.item.name}</td>
            <td className="align-center">{this.props.item.price}</td>
            <td className="align-center">
                {this.state.isAddedToCart ?
                    <div className="addButton">
                        <button data-id={this.state.cartItem._id} data-name={this.props.item.name} data-price={this.props.item.price} onClick={this.removeOrder}>-</button>
                        <span>{this.state.cartItem.qty}</span>
                        <button data-id={this.props.item._id} data-name={this.props.item.name} data-price={this.props.item.price} onClick={this.repeatOrder}>+</button>
                    </div>
                :
                    <button id={this.props.item._id} data-name={this.props.item.name} data-price={this.props.item.price} onClick={this.addToCart}>Add To Cart</button>
                }
            </td>
        </tr>
        </React.Fragment>
    )
}}