import React, { Component } from "react";
import Header from "./Header";
import StaffList from "./Staff";
import Footer from "./Footer";
import { STAFFS, DEPARTMENTS } from "../shared/staffs"
import { Switch, Route, Redirect } from 'react-router-dom';



class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS
        }

    }

    render(){
        return(
            <div>
                <Header />
                <StaffList staffs={this.state.staffs} />
                <Footer />
            </div>
        );
    }
}

export default Main