import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from "./DishdetailComponent";
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

import { Switch, Route, Redirect } from 'react-router-dom';
import '../App.css';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leader: LEADERS
    };
  }
  

  

  render() {
    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leader.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithID = ({match}) => {
      return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        />
      )
    };

    return (
      <div className='App'>
        <Header />
        <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithID} />
              <Route exact path='/contactus' component={Contact} />
              <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
      
    );
  }
}

export default Main;