import React, { Component } from "react";
import Header from "./Header";
import StaffList from "./Staff";
import StaffDetail from "./StaffDetail";
import Department from "./Department";
import Footer from "./Footer";
import { STAFFS, DEPARTMENTS } from "../shared/staffs"
import { Switch, Route, Redirect } from 'react-router-dom';
import Salary from "./Salary";



class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS
        }

    }

    render() {
        const StaffWithId = ({ match }) => {
            return (
              <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
              />
            );
        }
    
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/staffs' component={() => <StaffList staffs={this.state.staffs} />} />
                    <Route path='/staffs/:staffId' component={StaffWithId} />
                    <Route path='/department' component={() => <Department departments={this.state.departments} />} />
                    <Route exact path='/salary' component={() => <Salary staffs={this.state.staffs} />} />
                    <Redirect to="/staffs" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main