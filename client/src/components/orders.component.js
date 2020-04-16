import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Orders extends Component {
  constructor(props){
		super(props);
		this.state = {
			orders:[]
		}
	}
	componentDidMount(){
		axios.get('http://localhost:5000/order/')
		.then(res => this.setState({orders: res.data}))
		.catch(err => console.log(err));
	}
  render() {
    return(
      <React.Fragment>
      {(this.state.orders.length > 0) ? this.state.orders.map(order =>
        <div key={order._id} className="orders">
          <div className="title">
            <h6>Order - {order._id}</h6>
            <span>Ordered on - {order.createdAt.slice(0,10)}</span>
          </div>
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
            {order.items.map(item => 
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
                <td>{item.total}</td>
              </tr>	
            )}
            </tbody>
          </table>
            <p className="orderTotal">Grand Total - {order.total}</p>
            <hr/>
        </div>
      ) : <span className="page-empty-text">There is nothing here, Go to menu to order something</span>}
      </React.Fragment>
    )
}}