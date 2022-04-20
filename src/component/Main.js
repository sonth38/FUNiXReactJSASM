import React, { Component } from "react";
import Header from "./Header";
import StaffList from "./Staff";
import StaffDetail from "./StaffDetail";
import Department from "./Department";
import StaffOfDepart from "./DepartmentDetail";
import Footer from "./Footer";
import Salary from "./Salary";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchStaff, fetchDepart, fetchSalary, postStaff } from "../redux/ActionCreator";
import { TransitionGroup, CSSTransition } from 'react-transition-group'


const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        depart: state.depart,
        salary: state.salary
    }
}

const mapDispatchToProps = dispatch => ({
    fetchStaff: () => { dispatch(fetchStaff()) },
    fetchDepart: () => { dispatch(fetchDepart()) },
    fetchSalary: () => { dispatch(fetchSalary()) },
    postStaff: (
        id,
        name,
        doB,
        startDate,
        departmentId,
        salaryScale,
        annualLeave,
        overTime,
        image
    ) => dispatch(postStaff(
        id,
        name,
        doB,
        startDate,
        departmentId,
        salaryScale,
        annualLeave,
        overTime,
        image
    )),
});

class Main extends Component {
    constructor(props) {
        super(props)

        // this.addStaff = this.addStaff.bind(this);
    }

    // addStaff = (staff) => {
    //     const id = Math.floor(Math.random() * 10000 + 1);
    //     const newStaff = { id, ...staff };
    //     this.setState({
    //         staffs: [...this.props.staffs.staffs, newStaff]
    //     });
    //     console.log(newStaff);
    //     // console.log(this.state.staffs);
    // }

    componentDidMount() {
        this.props.fetchStaff();
        this.props.fetchDepart();
        this.props.fetchSalary();
    }
    render() {
        // console.log(this.props.staffs.staffs)

        const StaffWithId = ({ match }) => {
            return (
                <StaffDetail
                    staffs={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
                    staffsLoading={this.props.staffs.isLoading}
                    staffsErrMess={this.props.staffs.errMess}
                    depart={this.props.depart.depart}
                />
            );
        }

        const DepartmentWithId = ({ match }) => {
            return <StaffOfDepart
                staffs={this.props.staffs.staffs.filter(staff => staff.departmentId === match.params.departId)}
                depart={this.props.depart.depart.filter(depart => depart.id === match.params.departId)}
            />
        }
        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={1000}>
                        <Switch>
                            <Route
                                exact path='/staffs'
                                component={() =>
                                    <StaffList
                                        // onAdd={this.addStaff}
                                        staffs={this.props.staffs}
                                        postStaff={this.props.postStaff}
                                    />
                                }
                            />
                            <Route path='/staffs/:staffId' component={StaffWithId} />
                            <Route exact path='/departments' component={() => <Department depart={this.props.depart} />} />
                            <Route path='/departments/:departId' component={DepartmentWithId} />
                            <Route exact path='/salary' component={() => <Salary salary={this.props.salary} />} />
                            <Redirect to="/staffs" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));