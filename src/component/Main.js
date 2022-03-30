import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route, Redirect } from 'react-router-dom';



class Main extends Component{
    render(){
        return(
            <div>
                <Header />
                <Footer />
            </div>
        );
    }
}

export default Main