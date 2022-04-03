import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from "./DishdetailComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      promotions: state.promotions,
      comments: state.comments,
      leader: state.leader
    }
}

class Main extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]} 
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leader.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithID = ({match}) => {
      console.log(match);
      return(
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        />
        )
      };

    return (
      <div className='App'>
        <Header />
        <Switch>
              <Route path='/home' component={HomePage} />
              <Route path='/aboutus' component={() => <About leaders = {this.props.leader} />} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithID} />
              <Route exact path='/contactus' component={Contact} />
              <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
      
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));