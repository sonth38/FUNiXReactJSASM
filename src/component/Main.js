import React, { Component } from "react";
import Header from "./Header";
import StaffList from "./Staff";
import StaffDetail from "./StaffDetail";
import Department from "./Department";
import Footer from "./Footer";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchStaff, fetchDepart } from "../redux/ActionCreator";
import Salary from "./Salary";

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        depart: state.depart
    }
}

const mapDispatchToProps = dispatch => ({
    fetchStaff: () => { dispatch(fetchStaff()) },
    fetchDepart: () => { dispatch(fetchDepart()) },
});

class Main extends Component {
    constructor(props) {
        super(props)

        this.addStaff = this.addStaff.bind(this);
    }

    addStaff = (staff) => {
        const id = Math.floor(Math.random() * 10000 + 1);
        const newStaff = { id, ...staff };
        this.setState({
            staffs: [...this.state.staffs, newStaff]
        });
        console.log(newStaff);
        // console.log(this.state.staffs);
    }

    componentDidMount() {
        this.props.fetchStaff();
        this.props.fetchDepart();
    }

    render() {
        const StaffWithId = ({ match }) => {
            return (
                <StaffDetail
                    staffs={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
                    staffsLoading={this.props.staffs.isLoading}
                    staffsErrMess={this.props.staffs.errMess}
                />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route
                        exact path='/staffs'
                        component={() =>
                            <StaffList
                                onAdd={this.addStaff}
                                staffs={this.props.staffs}
                            />
                        }
                    />
                    <Route path='/staffs/:staffId' component={StaffWithId} />
                    <Route path='/departments' component={() => <Department depart={this.props.depart} />} />
                    <Route exact path='/salary' component={() => <Salary staffs={this.props.staffs} />} />
                    <Redirect to="/staffs" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));