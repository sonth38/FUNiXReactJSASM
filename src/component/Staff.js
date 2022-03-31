import React, { Component } from "react";
import { Card, CardImg, CardBody, CardSubtitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom'

function StaffList(props) {
    const RenderStaffList = props.staffs.map((staff) => {
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
                <h3>Nhân Viên</h3>
            </div>
            <div className="row">
                {RenderStaffList}
            </div>
        </div>
    );
}

export default StaffList