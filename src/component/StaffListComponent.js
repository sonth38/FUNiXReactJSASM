import React, { Component } from 'react';
import dateFormat from 'dateformat';
import { Card, CardTitle, CardBody, CardText, CardImg } from 'reactstrap';

class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStaff: null,
            rowDefault: 'col-12 col-md-6 col-lg-4 mt-3'
        }
    }

    onStaffSelect(staff) {
        this.setState({selectedStaff: staff});
    }

    renderStaff(staff) {
        if (staff != null)
            return (
                <Card className="col-12">
                    <CardBody>
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                    </CardBody>
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

    onRowSelect(col) {
        this.setState({rowDefault: col});
    }

    render() {
        const staff = this.props.staffs.map((staff) => {
            return (
                <div className={this.state.rowDefault}>
                    <Card key={staff.id} onClick={() => this.onStaffSelect(staff)} >
                        <CardTitle>{staff.name}</CardTitle>
                    </Card>
                </div>
            )
        });
        return (
            <div className="container">
                <div className='row'>
                    <button onClick={() => this.onRowSelect("col-6 mt-3")}>2 cột</button>
                    <button onClick={() => this.onRowSelect("col-4 mt-3")}>3 cột</button>
                    <button onClick={() => this.onRowSelect("col-2 mt-3")}>6 cột</button>
                </div>
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