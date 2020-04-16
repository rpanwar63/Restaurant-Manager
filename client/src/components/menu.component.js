import React, { Component } from 'react';
import axios from 'axios';
import MenuItem from './menuItem.component'

export default class Menu extends Component {
	constructor(props){
		super(props);
		this.state = {
			menu:[],
			cart:[]
		}
	}

	componentDidMount(){
		axios.get('http://localhost:5000/menu/')
		.then(res => this.setState({menu: res.data}))
		.catch(err => console.log(err));
		axios.get('http://localhost:5000/cart/')
		.then(res => this.setState({cart: res.data}))
		.then(res => console.log(res))
		.catch(err => console.log(err));
	}

  render() {
    return(
        <div className="menu">
			<table>
				<thead>
					<tr>
						<td>Name</td>
						<td className="align-center">Price</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
				{this.state.menu.map(item => 
					<MenuItem key={item._id} item={item} addToCart={this.addToCart} />	
				)}
				</tbody>
			</table>
		</div>
    )
}}