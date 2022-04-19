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


class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isModalOpen: false,
            name: '',
            doB: '',
            salaryScale: 1,
            startDate: '',
            department: 'Sale',
            annualLeave: 0,
            overTime: 0,
            salary: 300000,
            image: '/assets/images/alberto.png',
            touched: {
                name: false,
                doB: false,
                salaryScale: false,
                startDate: false,
                department: false,
                annualLeave: false,
                overTime: false,
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleSubmit(values) {
        // alert(JSON.stringify(values.searchtext));
        const searchStaffList = [...this.props.staffs];
        // const searchStaffList = this.props.staffs.filter((staff) => {
        //     return staff.name.toLowerCase().indexOf(values.searchtext.toLowerCase()) !== -1;
        // });


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

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handlePlus = () => {
        const newStaff = {
            name: this.state.name,
            doB: this.state.doB,
            salaryScale: this.state.salaryScale,
            startDate: this.state.startDate,
            department: this.state.department,
            annualLeave: this.state.annualLeave,
            overTime: this.state.overTime,
            image: this.state.image,

        };
        this.props.onAdd(newStaff);


    };

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(name, doB, salaryScale, startDate, department, annualLeave, overTime) {
        const errors = {
            name: '',
            doB: '',
            salaryScale: '',
            startDate: '',
            department: '',
            annualLeave: '',
            overTime: ''
        };

        if (this.state.touched.name && name.length < 3)
            errors.name = 'Yêu cầu nhập nhiều hơn 2 ký tự';
        else if (this.state.touched.name && name.length > 30)
            errors.name = 'Yêu cầu nhập ít hơn 30 ký tự';
        if (this.state.touched.department && department.length < 1)
            errors.department = 'Yêu cầu nhập ';
        if (this.state.touched.salaryScale && salaryScale.length < 1)
            errors.salaryScale = 'Yêu cầu nhập ';
        if (this.state.touched.doB && doB.length < 1)
            errors.doB = 'Yêu cầu nhập ';
        if (this.state.touched.startDate && startDate.length < 1)
            errors.startDate = 'Yêu cầu nhập ';
        if (this.state.touched.annualLeave && annualLeave.length < 1)
            errors.annualLeave = 'Yêu cầu nhập ';
        if (this.state.touched.overTime && overTime.length < 1)
            errors.overTime = 'Yêu cầu nhập ';
        return errors;
    }

    render() {
        const errors = this.validate(
            this.state.name,
            this.state.doB,
            this.state.salaryScale,
            this.state.startDate,
            this.state.department,
            this.state.annualLeave,
            this.state.overTime
        )

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
                            <Button outline onClick={this.toggleModal}>
                                <span className="fa fa-solid fa-plus">
                                </span> Thêm
                            </Button>
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
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handlePlus}>
                                <Row className='control-group'>
                                    <Label md={5}>Tên</Label>
                                    <Col md={7}>
                                        <Input
                                            type="text"
                                            className='form-control'
                                            id='name'
                                            name='name'
                                            value={this.state.name}
                                            valid={errors.name === ''}
                                            invalid={errors.name !== ''}
                                            onBlur={this.handleBlur('name')}
                                            onChange={this.handleInputChange}
                                        />
                                        <FormFeedback>{errors.name}</FormFeedback>
                                    </Col>
                                </Row>
                                <Row className='control-group'>
                                    <Label md={5}>Ngày sinh</Label>
                                    <Col md={7}>
                                        <Input
                                            type="date"
                                            className='form-control'
                                            id='doB'
                                            name='doB'
                                            value={this.state.doB}
                                            valid={errors.doB === ''}
                                            invalid={errors.doB !== ''}
                                            onBlur={this.handleBlur('doB')}
                                            onChange={this.handleInputChange}
                                        />
                                        <FormFeedback>{errors.doB}</FormFeedback>
                                    </Col>
                                </Row>
                                <Row className='control-group'>
                                    <Label md={5}>Ngày vào công ty</Label>
                                    <Col md={7}>
                                        <Input
                                            type="date"
                                            className='form-control'
                                            id='startDate'
                                            name='startDate'
                                            value={this.state.startDate}
                                            valid={errors.startDate === ''}
                                            invalid={errors.startDate !== ''}
                                            onBlur={this.handleBlur('startDate')}
                                            onChange={this.handleInputChange}
                                        />
                                        <FormFeedback>{errors.startDate}</FormFeedback>
                                    </Col>
                                </Row>
                                <Row className='control-group'>
                                    <Label md={5}>Phòng ban</Label>
                                    <Col md={7}>
                                        <Input
                                            type="select"
                                            className='form-control'
                                            id='department'
                                            name='department'
                                            value={this.state.department}
                                            valid={errors.department === ''}
                                            invalid={errors.department !== ''}
                                            onBlur={this.handleBlur('department')}
                                            onChange={this.handleInputChange}
                                        >
                                            <option>Sale</option>
                                            <option>HR</option>
                                            <option>Marketing</option>
                                            <option>IT</option>
                                            <option>Finance</option>
                                        </Input>
                                        <FormFeedback>{errors.department}</FormFeedback>
                                    </Col>
                                </Row>
                                <Row className='control-group'>
                                    <Label md={5}>Hệ số lương</Label>
                                    <Col md={7}>
                                        <Input
                                            type="text"
                                            className='form-control'
                                            id='salaryScale'
                                            name='salaryScale'
                                            value={this.state.salaryScale}
                                            valid={errors.salaryScale === ''}
                                            invalid={errors.salaryScale !== ''}
                                            onBlur={this.handleBlur('salaryScale')}
                                            onChange={this.handleInputChange}
                                        />
                                        <FormFeedback>{errors.salaryScale}</FormFeedback>
                                    </Col>
                                </Row>
                                <Row className='control-group'>
                                    <Label md={5}>Số ngày nghỉ còn lại</Label>
                                    <Col md={7}>
                                        <Input
                                            type="text"
                                            className='form-control'
                                            id='annualLeave'
                                            name='annualLeave'
                                            value={this.state.annualLeave}
                                            valid={errors.annualLeave === ''}
                                            invalid={errors.annualLeave !== ''}
                                            onBlur={this.handleBlur('annualLeave')}
                                            onChange={this.handleInputChange}
                                        />
                                        <FormFeedback>{errors.annualLeave}</FormFeedback>
                                    </Col>
                                </Row>
                                <Row className='control-group'>
                                    <Label md={5}>Số ngày đã làm thêm</Label>
                                    <Col md={7}>
                                        <Input
                                            type="text"
                                            className='form-control'
                                            id='overTime'
                                            name='overTime'
                                            value={this.state.overTime}
                                            valid={errors.overTime === ''}
                                            invalid={errors.overTime !== ''}
                                            onBlur={this.handleBlur('overTime')}
                                            onChange={this.handleInputChange}
                                        />
                                        <FormFeedback>{errors.overTime}</FormFeedback>
                                    </Col>
                                </Row>
                                <Button type="submit" value="submit" color="primary">Thêm</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            );

    }
}


export default StaffList