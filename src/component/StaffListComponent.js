import React, { Component } from 'react';
import dateFormat from 'dateformat';
import { Card, CardTitle } from 'reactstrap';

class StaffList extends Component {

    constructor(props) {
        super(props);

        
    }

    render() {
        const staff = this.props.staffs.map((staff) => {
            return (
                <div className='col-12 col-md-6 col-lg-4 mt-3'>
                    <Card key={staff.id} >
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
            </div>
        );
    };


};

export default StaffList;