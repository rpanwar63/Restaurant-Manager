import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar.component";
import Orders from "./components/orders.component";
import Menu from "./components/menu.component";
import Cart from "./components/cart.component";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/menu" exact component={Menu} />
      <Route path="/orders" exact component={Orders} />
      <Route path="/cart" exact component={Cart} />
    </Router>
  );
}

export default App;
