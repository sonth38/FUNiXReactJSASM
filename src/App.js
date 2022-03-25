import React, { Component } from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';
import Menu from './component/MenuComponent';
import { DISHES } from './shared/dishes';
import './App.css';
import DishDetail from './component/DishdetailComponent';
class App extends Component {


// Khai báo trạng thái lên App.js

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES
    };
  }

  render() {
    return (
      <div className='App'>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>

        {/* Truyền trạng thái của App.js cho thằng con Menu */}
        <Menu dishes={this.state.dishes}/>
        <DishDetail dishes={this.state.dishes}/>
      </div>
      
    );
  }
}

export default App;