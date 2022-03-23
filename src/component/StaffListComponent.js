import React, { Component } from 'react';
import dateFormat from 'dateformat';
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';

class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStaff: null
        }
    }

    onStaffSelect(staff) {
        this.setState({selectedStaff: staff});
    }

    renderStaff(staff) {
        if (staff != null)
            return (
                <Card>
                    <CardBody>
                        <CardTitle>Họ và tên: {staff.name}</CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </CardBody>
                </Card>
            );
        else 
            return(
                <div></div>
            );
    };

    render() {
        const staff = this.props.staffs.map((staff) => {
            return (
                <div className='col-12 col-md-6 col-lg-4 mt-3'>
                    <Card key={staff.id} onClick={() => this.onStaffSelect(staff)} >
                        <CardTitle>{staff.name}</CardTitle>
                    </Card>
                </div>
            )
        });
        return (
            <div className="container">
                <div className="row">
                    {staff}
                </div>
                <div>
                    <h4>Bấm vào tên nhân viên để xem thông tin</h4>
                </div>
                <div className="row">
                  <div>
                    {this.renderStaff(this.state.selectedStaff)}
                  </div>
                </div>
            </div>
        );
    };


};

export default StaffList;