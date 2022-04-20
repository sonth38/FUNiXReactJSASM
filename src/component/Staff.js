import React, { Component } from "react";
import {
    Card, CardImg, CardBody, CardSubtitle,
    Breadcrumb, BreadcrumbItem, FormGroup, Input,
    Form, Label, Col, Button, Row,
    Modal, ModalBody, ModalHeader, FormFeedback
} from "reactstrap";
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from '../component/LoadingComponent'

function RenderStaffList({ staffs }) {
    return (
        <div >
            <Card>
                <Link to={`/staffs/${staffs.id}`}>
                    <CardImg width="100%" src={staffs.image} alt={staffs.name} />
                    <CardBody>
                        <CardSubtitle>{staffs.name}</CardSubtitle>
                    </CardBody>
                </Link>
            </Card>
        </div>
    );
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class StaffForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isStaffFormOpen: false
        }

        this.toggleStaffForm = this.toggleStaffForm.bind(this);
        this.handleSubmitStaff = this.handleSubmitStaff.bind(this);
    }

    toggleStaffForm() {
        this.setState({
            isStaffFormOpen: !this.state.isStaffFormOpen
        });
    }
    handleSubmitStaff(values) {
        this.toggleStaffForm();
        console.log(this.props.staffId.length)
        console.log(values)
        console.log(values.departmentId)
        this.props.postStaff(
            this.props.staffId.length,
            values.name,
            values.doB,
            values.startDate,
            values.departmentId,
            parseInt(values.salaryScale, 10), 
            parseInt(values.annualLeave, 10), 
            values.overTime,
            "/assets/images/alberto.png"
        );
    }

    render() {
        return (
            <div>
                <div>
                    <Row className='form-group'>
                        <Col md={{ size: 10 }}>
                            <Button
                                type='submit'
                                outline
                                onClick={this.toggleStaffForm}
                            >
                                <span className="fa fa-solid fa-plus">
                                </span>
                                Thêm
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.isStaffFormOpen}
                        toggle={this.toggleStaffForm}
                    >
                        <ModalHeader toggle={this.toggleStaffForm}>
                            Thêm Nhân viên
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={this.handleSubmitStaff}>
                                <Row>
                                    <Label md={5} htmlFor='name'>Tên</Label>
                                    <Col md={7}>
                                        <Control.text
                                            model='.name'
                                            id='name'
                                            name='name'
                                            placeholder='Tên nhân viên'
                                            className='form-control'
                                            validators={{
                                                required,
                                                minLength: minLength(3),
                                                maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Label md={5} htmlFor='doB'>Ngày sinh</Label>
                                    <Col md={7}>
                                        <Control
                                            type="date"
                                            model='.doB'
                                            id='doB'
                                            name='doB'
                                            className='form-control'
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".doB"
                                            show="touched"
                                            messages={{
                                                required: 'Required'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Label md={5} htmlFor='startDate'>Ngày vào công ty</Label>
                                    <Col md={7}>
                                        <Control
                                            type="date"
                                            model='.startDate'
                                            id='startDate'
                                            name='startDate'
                                            className='form-control'
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".startDate"
                                            show="touched"
                                            messages={{
                                                required: 'Required'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Label md={5}>Phòng ban</Label>
                                    <Col md={7}>
                                        <Control.select
                                            model='.departmentId'
                                            id="departmentId"
                                            name="departmentId"
                                            className="form-control"
                                        >
                                            <option value="Dept01">Sale</option>
                                            <option value="Dept02">HR</option>
                                            <option value="Dept03">Marketing</option>
                                            <option value="Dept04">IT</option>
                                            <option value="Dept05">Finance</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Label md={5} htmlFor='salaryScale'>Hệ số lương</Label>
                                    <Col md={7}>
                                        <Control.text
                                            model='.salaryScale'
                                            id='salaryScale'
                                            name='salaryScale'
                                            className='form-control'
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Label md={5} htmlFor='annualLeave'>Số ngày nghỉ</Label>
                                    <Col md={7}>
                                        <Control.text
                                            model='.annualLeave'
                                            id='annualLeave'
                                            name='annualLeave'
                                            className='form-control'
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Label md={5} htmlFor='overTime'>Số ngày làm thêm</Label>
                                    <Col md={7}>
                                        <Control.text
                                            model='.overTime'
                                            id='overTime'
                                            name='overTime'
                                            className='form-control'
                                        />
                                    </Col>
                                </Row>
                                <Row className='m-2'>
                                    <Button
                                        type="submit"
                                        value="submit"
                                        color="primary"
                                    >Submit
                                    </Button>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </div>

        )
    }
}

class StaffList extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(values) {

        const searchStaffList = [...this.props.staffs];

        if (values.searchtext == undefined || values.searchtext == null) {
            this.setState({
                staffs: searchStaffList
            });
        }
        else {
            this.setState({
                staffs: searchStaffList.filter((staff) => {
                    return staff.name.toLowerCase().indexOf(values.searchtext.toLowerCase()) !== -1;
                })
            });
        }
    }



    render() {
        const menu = this.props.staffs.staffs.map((val) => {
            return (
                <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3" key={val.id}>
                    <RenderStaffList
                        staffs={val}
                    />
                </div>
            );
        });

        if (this.props.staffs.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (this.props.staffs.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>{this.props.staffs.errMess}</h4>
                        </div>
                    </div>
                </div>
            )
        }
        else
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/staffs'>Nhân viên</Link></BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <Col md={2}>
                            <h3>Nhân Viên</h3>
                        </Col>
                        <Col md={1}>
                            <StaffForm
                                postStaff = {this.props.postStaff}
                                staffId = {this.props.staffs.staffs}
                            />
                        </Col>
                        <Col >
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col md={10}>
                                        <Control.text model=".searchtext" id="searchtext" name="searchtext"
                                            placeholder="Search....."
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Button style={{ float: "right" }} type="submit" className='dark'>
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </Col>
                    </div>
                    <div className="row">
                        {menu}
                    </div>

                </div>
            );

    }
}


export default StaffList