import React from "react";
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardBody, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom'

function RenderStaffListDepart({staffs}) {
    console.log({staffs})
    return (
        <div>
            <Card>
                <CardImg width="100%" src={staffs.image} alt={staffs.name} />
                <CardBody>
                    <CardSubtitle>{staffs.name}</CardSubtitle>
                </CardBody>
            </Card>
        </div>
    );
}

const StaffOfDepartment = (props) => {
    const Staff0fDepartList = props.staffs.map((val) => {
        return (
            <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3" key={val.id}>
                <RenderStaffListDepart
                    staffs={val}
                />
            </div>
        );
    });
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/departments'>Phòng ban</Link> </BreadcrumbItem>
                    <BreadcrumbItem active>{props.depart.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.depart.name}</h3>
                    <hr />
                </div>
            </div>

            <div className="row">
                {Staff0fDepartList}
            </div>
        </div>
    );

}
export default StaffOfDepartment