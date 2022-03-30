import React, { Component } from "react";
import { Card, CardImg, CardBody, CardSubtitle } from "reactstrap";

class StaffList extends Component{
    constructor(props){
        super(props)
        console.log(props.staffs)
    }

    render() {
        const RenderStaff = this.props.staffs.map((staff) => {
            return(
                <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3">
                    <Card>
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <CardBody>
                            <CardSubtitle>{staff.name}</CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
            );
        })

        return(
            <div className="container">
                <div className="row">
                    <h3>Nhân Viên</h3>
                </div>
                <div className="row">
                    {RenderStaff}
                </div>
            </div>
        );
    }
}

export default StaffList