import React, { Component } from "react";
import { Card, CardImg, CardBody, CardSubtitle, 
    Breadcrumb, BreadcrumbItem, FormGroup, Input,
    Form, Label, Col, Button, Row } from "reactstrap";
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form';



class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
           staffs : this.props.staffs
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        // alert(JSON.stringify(values.searchtext));
        const searchStaffList = [...this.props.staffs];
        // const searchStaffList = this.props.staffs.filter((staff) => {
        //     return staff.name.toLowerCase().indexOf(values.searchtext.toLowerCase()) !== -1;
        // });


        if (values.searchtext == undefined || values.searchtext == null) {

            this.setState({
                staffs : searchStaffList
            });
        }
         else {

            this.setState({
                staffs : searchStaffList.filter((staff) => {
                    return staff.name.toLowerCase().indexOf(values.searchtext.toLowerCase()) !== -1;
                })
            });
        }
    }

    render() {
        const RenderStaffList = this.state.staffs.map((staff) => {
            return(
                <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3">
                    <Card>
                        <Link to={`/staffs/${staff.id}`}>
                            <CardImg width="100%" src={staff.image} alt={staff.name} />
                            <CardBody>
                                <CardSubtitle>{staff.name}</CardSubtitle>
                            </CardBody>
                        </Link>
                    </Card>
                </div>
            );
        })
        
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/staffs'>Nhân viên</Link></BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <Col md={3}>
                        <h3>Nhân Viên</h3>
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
                    {RenderStaffList}
                </div>
            </div>
        );

    }
} 


export default StaffList