import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Product from '../product/product';

import HttpService from '../services/http-service';

const http = new HttpService();

class App extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {products:[]};
    
    //bind functions
    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this);
    
    
    this.loadData();
    
  }
  
  loadData = () => {
      
    var self = this;
    http.getProducts().then(data => {
        
        self.setState({products: data});   //  setState (refreshes)
        
    }, err => {
        console.log(err);
    });
  }
  
  
  productList = () => {
      const list = this.state.products.map((product) => 
          <div className="col-sm-4" key={product._id}>
            <Product title={product.Title} price={product.Price} imgUrl={product.imgUrl} />
          </div>
      );
      return (list);
  }
  
  render() {
    return (
      <div className=" App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">Welcome to geekShop</h2>
        </header>
        <div className="container">
          <div className="App-main">
          <div className="row">
                {this.productList()}
           </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
